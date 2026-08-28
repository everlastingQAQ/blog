import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  CONTENT_ROOT,
  IMPORT_MARKER,
  MANIFEST_PATH,
  OLD_DOCS_URL_PREFIX,
  PUBLIC_ASSET_ROOT,
  RESPONSIVE_ASSET_ROOT,
  buildPlan,
  findHtmlAttributes,
  findInlineLinks,
  findFirstH1,
  forEachOutsideFence,
  imageTargetForPath,
  isExternalUrl,
  parseFrontmatter,
  splitUrlSuffix,
  walkFiles
} from './import-cs61b.mjs';

function destinationFromMarkdownTarget(raw) {
  const value = raw.trim();
  if (value.startsWith('<')) {
    const closing = value.indexOf('>');
    return closing >= 0 ? value.slice(1, closing) : value;
  }
  const match = value.match(/^(\S+)/);
  return match ? match[1] : '';
}

function sortedSet(values) {
  return new Set(Array.from(values).sort());
}

function comparePathSets(actual, expected, label, errors) {
  const actualSet = sortedSet(actual);
  const expectedSet = sortedSet(expected);
  const missing = Array.from(expectedSet).filter((value) => !actualSet.has(value));
  const extra = Array.from(actualSet).filter((value) => !expectedSet.has(value));
  if (missing.length > 0) {
    errors.push(label + ' 缺少：' + missing.join(', '));
  }
  if (extra.length > 0) {
    errors.push(label + '多出：' + extra.join(', '));
  }
}

function sha256(filePath) {
  return crypto
    .createHash('sha256')
    .update(fs.readFileSync(filePath))
    .digest('hex');
}

function countPatternOutsideFences(text, pattern) {
  let count = 0;
  forEachOutsideFence(text, (line) => {
    const matches = line.match(pattern);
    if (matches) {
      count += matches.length;
    }
  });
  return count;
}

function checkPageLinks(page, body, expectedAssets, errors) {
  const expectedImageTargets = new Set(
    expectedAssets.map((asset) =>
      imageTargetForPath(page.sourcePath, asset.path)
    )
  );
  forEachOutsideFence(body, (line) => {
    for (const link of findInlineLinks(line)) {
      const destination = destinationFromMarkdownTarget(link.target);
      if (link.isImage) {
        const imagePath = splitUrlSuffix(destination).pathPart;
        if (!imagePath || isExternalUrl(imagePath)) {
          continue;
        }
        if (!expectedImageTargets.has(imagePath)) {
          errors.push(
            '页面图片不是预期的自适应或原样资源路径：' +
              page.sourcePath +
              ' -> ' +
              destination
          );
        }
      } else if (
        destination &&
        !isExternalUrl(destination) &&
        splitUrlSuffix(destination).pathPart.toLowerCase().endsWith('.md')
      ) {
        errors.push(
          '页面仍包含本地 .md 链接：' +
            page.sourcePath +
            ' -> ' +
            destination
        );
      }
    }
    for (const attribute of findHtmlAttributes(line)) {
      const destination = attribute.target;
      if (
        attribute.name === 'href' &&
        destination &&
        !isExternalUrl(destination) &&
        splitUrlSuffix(destination).pathPart.toLowerCase().endsWith('.md')
      ) {
        errors.push(
          '页面 HTML 仍包含本地 .md 链接：' +
            page.sourcePath +
            ' -> ' +
            destination
        );
      }
      if (attribute.name === 'src') {
        const imagePath = splitUrlSuffix(destination).pathPart;
        if (!imagePath || isExternalUrl(imagePath)) {
          continue;
        }
        if (!expectedImageTargets.has(imagePath)) {
          errors.push(
            '页面 HTML 图片未出现在资源清单：' +
              page.sourcePath +
              ' -> ' +
              destination
          );
        }
      }
    }
  });
}

function checkPage(page, plan, errors) {
  const content = fs.readFileSync(page.outputAbsolute, 'utf8');
  const parsed = parseFrontmatter(content, page.sourcePath);
  const keys = Object.keys(parsed.values).sort();
  const expectedKeys = ['description', 'order', 'title'];
  if (JSON.stringify(keys) !== JSON.stringify(expectedKeys)) {
    errors.push(
      '页面 frontmatter 键不兼容：' +
        page.sourcePath +
        '，实际为 ' +
        keys.join(', ')
    );
  }
  if (
    parsed.values.title !== page.title ||
    parsed.values.description !== page.description ||
    parsed.values.order !== page.order
  ) {
    errors.push('页面 frontmatter 值与导入计划不一致：' + page.sourcePath);
  }
  if (content.split(IMPORT_MARKER).length - 1 !== 1) {
    errors.push('页面生成标记数量不是 1：' + page.sourcePath);
  }
  if (findFirstH1(parsed.body)) {
    errors.push('页面正文仍有 Markdown 一级标题：' + page.sourcePath);
  }
  if (
    countPatternOutsideFences(
      parsed.body,
      /\s+\{\s*#[^}\s]+\s*\}/g
    ) > 0
  ) {
    errors.push('页面仍有 MkDocs 标题属性列表：' + page.sourcePath);
  }
  if (
    countPatternOutsideFences(parsed.body, /(\]\([^)\n]*\))\s*\{[^}\n]+\}/g) >
    0
  ) {
    errors.push('页面仍有 MkDocs 链接属性列表：' + page.sourcePath);
  }
  if (
    countPatternOutsideFences(
      parsed.body,
      /<[A-Za-z][^>]*\smarkdown(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?(?=\s|\/?>)/gi
    ) > 0
  ) {
    errors.push('页面仍有 MkDocs markdown HTML 属性：' + page.sourcePath);
  }
  if (parsed.body.includes(OLD_DOCS_URL_PREFIX)) {
    errors.push('页面仍有旧 CS61B URL 前缀：' + page.sourcePath);
  }
  checkPageLinks(page, parsed.body, plan.assets, errors);
}

export function checkCs61b() {
  const errors = [];
  let plan;
  try {
    plan = buildPlan();
  } catch (error) {
    errors.push(error.message);
    return errors;
  }

  if (!fs.existsSync(MANIFEST_PATH)) {
    errors.push('缺少 CS61B 导入清单：' + MANIFEST_PATH);
  } else {
    try {
      const actualManifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
      if (
        JSON.stringify(actualManifest) !== JSON.stringify(plan.manifest)
      ) {
        errors.push('CS61B 导入清单与当前确定性导入计划不一致。');
      }
    } catch (error) {
      errors.push('无法读取 CS61B 导入清单：' + error.message);
    }
  }

  const actualPagePaths = fs.existsSync(CONTENT_ROOT)
    ? walkFiles(CONTENT_ROOT).filter((filePath) =>
        filePath.toLowerCase().endsWith('.md')
      )
    : [];
  const expectedPagePaths = plan.pages.map((page) =>
    path.posix.normalize(page.sourcePath)
  );
  comparePathSets(actualPagePaths, expectedPagePaths, 'CS61B 页面', errors);

  for (const page of plan.pages) {
    if (!fs.existsSync(page.outputAbsolute)) {
      errors.push('缺少生成页面：' + page.outputAbsolute);
      continue;
    }
    const actualContent = fs.readFileSync(page.outputAbsolute, 'utf8');
    if (actualContent !== page.content) {
      errors.push('页面内容与确定性导入计划不一致：' + page.sourcePath);
    }
    checkPage(page, plan, errors);
  }

  const actualResponsiveAssetPaths = fs.existsSync(RESPONSIVE_ASSET_ROOT)
    ? walkFiles(RESPONSIVE_ASSET_ROOT)
    : [];
  const expectedResponsiveAssetPaths = plan.assets
    .filter((asset) => asset.delivery !== 'public')
    .map((asset) => asset.path);
  comparePathSets(
    actualResponsiveAssetPaths,
    expectedResponsiveAssetPaths,
    'CS61B 自适应资源',
    errors
  );

  const actualPublicAssetPaths = fs.existsSync(PUBLIC_ASSET_ROOT)
    ? walkFiles(PUBLIC_ASSET_ROOT)
    : [];
  const expectedPublicAssetPaths = plan.assets
    .filter((asset) => asset.delivery !== 'responsive')
    .map((asset) => asset.path);
  comparePathSets(
    actualPublicAssetPaths,
    expectedPublicAssetPaths,
    'CS61B 原样资源',
    errors
  );

  for (const asset of plan.assets) {
    const roots = [];
    if (asset.delivery !== 'public') roots.push(RESPONSIVE_ASSET_ROOT);
    if (asset.delivery !== 'responsive') roots.push(PUBLIC_ASSET_ROOT);
    for (const root of roots) {
      const target = path.resolve(root, asset.path);
      if (!fs.existsSync(target)) {
        errors.push('缺少生成资源：' + target);
        continue;
      }
      if (sha256(target) !== sha256(asset.sourceAbsolute)) {
        errors.push('生成资源与只读源资源内容不一致：' + asset.path);
      }
    }
  }

  return errors;
}

function isMainModule() {
  return (
    process.argv[1] &&
    path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
  );
}

if (isMainModule()) {
  try {
    const errors = checkCs61b();
    if (errors.length > 0) {
      console.error('CS61B check failed:');
      for (const error of errors) {
        console.error('- ' + error);
      }
      process.exitCode = 1;
    } else {
      console.log(
        'CS61B check passed: generated output matches the deterministic import plan.'
      );
    }
  } catch (error) {
    console.error('CS61B check failed: ' + error.message);
    process.exitCode = 1;
  }
}
