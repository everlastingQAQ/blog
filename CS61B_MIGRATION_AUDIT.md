# CS61B Spring 2021 中文翻译迁移审计

> 审计状态：只读审计已完成；当前发布范围已按后续需求收窄并完成实现，未提交、未推送。

- 审计日期：2026-08-27
- 源仓库事实来源：`D:\project\CS-Self-Leanring-Materials\courses\CS61B\2021Spring`
- 源文档目录：`D:\project\CS-Self-Leanring-Materials\courses\CS61B\2021Spring\docs`
- 目标内容目录：`src/content/docs/cs61b/2021spring/`
- 目标 URL 前缀：`/docs/cs61b/2021spring/`
- 本审计只新增博客根目录的 `CS61B_MIGRATION_AUDIT.md`。工作区原有的 `astro.config.ts` 状态保持不动。

## 1. 审计结论

源目录共有 **53 个 Markdown 页面**，`mkdocs.yml` 导航共有 **53 个叶子页面**，二者逐路径完全对应：导航缺失页面 0 个，未列入导航的源 Markdown 0 个。

| 项目 | 精确结果 | 迁移含义 |
| --- | ---: | --- |
| Markdown 文件 / 总字节 / 总行数 | 源 53 / 879,486 / 19,660 | 源仓库完整审计清单；当前发布范围导入 42 个页面 |
| `docs/assets` 文件 | 352 个，共 100,253,377 字节 | 不应把未引用的运行时文件误当成正文图片 |
| Markdown 图片引用 / 唯一路径 | 241 / 240 | 需要保证 241 次引用全部可访问；其中 1 个路径重复引用 2 次 |
| 图片引用缺失 | 0 | 源相对路径当前全部能解析到文件 |
| 非图片链接 | 946（Markdown 569，HTML `href` 377） | 内部路径须在迁移时重写 |
| 相对 `.md` 内部链接 / 外部 `.md` 链接 | 27 / 1 | 27 个内部链接需改为 Astro 路径；外部 GitHub README 链接保持原样 |
| 旧站绝对内部链接 | 94 次，88 个唯一路径 | `course/index.md` 中必须改为 `/docs/cs61b/2021spring/…` |
| Markdown 正文 H1 | 52 个，分布在 52 个文件 | 当前 Astro 文档路由还会渲染一个标题 H1，52 页会重复 |
| 显式标题 ID `{ #id }` | 191 处，涉及 13 个文件 | 当前 Astro 配置不会解析 `attr_list`，导入器需转换为普通标题 + 显式锚点 |
| 链接属性列表 | 7 处 | `.md-button`、`target`、`rel` 不能原样依赖当前 Markdown 管线 |
| raw HTML 标签样式行 | 504 行（其中 `course/index.md` 为 387 行） | 课程主页依赖原 MkDocs/Material 页面结构与样式，需单独适配 |
| Mermaid fenced blocks | 2 个 | 当前 Astro 会显示普通代码块，不会自动绘图 |
| 数学公式 | 行内 200，块级 25 | 当前 `remarkMath + rehypeKatex` 可识别 `$…$`/`$$…$$`，仍需逐页验证 |

复核说明：标题属性列表按 Unicode ID 扫描，排除 fenced code 后共 **191 处、涉及 13 个文件**；当前导入器已逐项转换并保留锚点。

## 2. 审计范围、方法与只读边界

本次读取并交叉比对了：源 `mkdocs.yml`、源 `docs` 下全部 Markdown、源 `docs/assets` 全部文件、父仓库许可证与 README，以及当前 Astro 的内容集合、文档路由、侧栏、RSS、配置和 CI 工作流。Markdown 语法扫描按 fenced code 排除标题和 MkDocs 指令；图片扫描额外处理了 `[![图片](…)](…)` 这种嵌套写法，因此不漏计图片。

源仓库被视为严格只读：没有在 `D:\project\CS-Self-Leanring-Materials\courses\CS61B\2021Spring` 下执行写入、删除、格式化、构建或安装。源目录中的既有 `site/` 是 MkDocs 构建产物，本审计只把它作为旁证，不把它作为 Astro 迁移后的锚点事实。

## 3. `mkdocs.yml` 与原导航

源文件：`D:\project\CS-Self-Leanring-Materials\courses\CS61B\2021Spring\mkdocs.yml`。

| 配置项 | 实际值 |
| --- | --- |
| `site_name` | `CS61B Spring 2021 中文教程` |
| `site_description` | `Java 与数据结构课程中文学习笔记` |
| `site_author` | `Josh Hug；中文整理：everlasting` |
| `site_url` | `https://docs.everlasting.xin/CS61B/2021Spring/` |
| `docs_dir` / `site_dir` | `docs` / `site` |
| `use_directory_urls` / `strict` | `true` / `true` |
| theme | Material，语言 `zh`，关闭字体，启用 navigation tabs/sections/indexes/top、toc.follow、search 与 code.copy/annotate |
| Markdown 扩展 | `attr_list`、`md_in_html`、`tables`、`pymdownx.arithmatex`、`pymdownx.highlight`、`pymdownx.superfences`、`pymdownx.tabbed` 等；完整启用项见源文件 |
| 额外 CSS / JS | `assets/stylesheets/extra.css?v=20260805-1` / `assets/javascripts/mathjax-config.js、assets/vendor/mathjax/es5/tex-mml-chtml.js` |
| 备案信息 | `鄂ICP备2026035887号`；`鄂公网安备42010402001794号` |

原导航的 8 个一级节点及叶子数量：

- **首页**： 1 个叶子页面
- **中文课程主页**： 1 个叶子页面
- **课程教材**： 22 个叶子页面
- **实验**： 12 个叶子页面
- **作业**： 4 个叶子页面
- **项目**： 7 个叶子页面
- **考试**： 5 个叶子页面
- **关于与许可**： 1 个叶子页面

导航叶子与源文件的逐路径对应表见第 4 节；扫描结果为导航叶子 53 = 源 Markdown 53。

## 4. 精确内容清单与统计

### 4.1 按目录统计

| 源目录 | 文件数 | 字节数 | 行数 |
| --- | ---: | ---: | ---: |
| `(root)` | 2 | 1,495 | 48 |
| `chapters` | 22 | 371,166 | 10,139 |
| `course` | 1 | 65,004 | 417 |
| `labs` | 12 | 165,832 | 3,023 |
| `homeworks` | 4 | 27,814 | 1,135 |
| `projects` | 7 | 240,608 | 4,682 |
| `exams` | 5 | 7,567 | 216 |

### 4.2 全部 53 个待迁移 Markdown 文件

| # | 源文件 | 原导航位置 | frontmatter 键 | 字节 | 行数 | H1 | fenced blocks |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: |
| 1 | `about.md` | 关于与许可 | title, description | 1,007 | 27 | 1 | 0 |
| 2 | `chapters/00-introduction.md` | 课程教材 / 导论 | description | 1,639 | 24 | 1 | 0 |
| 3 | `chapters/01-java-basics.md` | 课程教材 / 第 1 章 Java 入门 | description | 25,088 | 612 | 1 | 32 |
| 4 | `chapters/02-lists.md` | 课程教材 / 第 2 章 列表 | description | 63,068 | 1,446 | 1 | 67 |
| 5 | `chapters/03-testing.md` | 课程教材 / 第 3 章 测试 | description | 29,175 | 670 | 1 | 36 |
| 6 | `chapters/04-inheritance-and-interfaces.md` | 课程教材 / 第 4 章 继承与接口 | description | 49,085 | 1,190 | 1 | 61 |
| 7 | `chapters/05-generics-and-autoboxing.md` | 课程教材 / 第 5 章 泛型与自动装箱 | description | 16,416 | 467 | 1 | 23 |
| 8 | `chapters/06-exceptions-iterators-object-methods.md` | 课程教材 / 第 6 章 异常、迭代器与 Object 方法 | description | 33,791 | 1,219 | 1 | 68 |
| 9 | `chapters/07-packages-and-access-control.md` | 课程教材 / 第 7 章 包与访问控制 | description | 7,681 | 226 | 1 | 11 |
| 10 | `chapters/08-efficient-programming-and-asymptotic-analysis.md` | 课程教材 / 第 8 章 高效编程与渐近分析 | description | 30,900 | 995 | 1 | 39 |
| 11 | `chapters/09-disjoint-sets.md` | 课程教材 / 第 9 章 并查集 | description | 9,862 | 321 | 1 | 11 |
| 12 | `chapters/10-adts-and-trees.md` | 课程教材 / 第 10 章 抽象数据类型与树 | description | 7,884 | 240 | 1 | 4 |
| 13 | `chapters/11-balanced-trees.md` | 课程教材 / 第 11 章 平衡树 | description | 12,161 | 338 | 1 | 6 |
| 14 | `chapters/12-hashing.md` | 课程教材 / 第 12 章 哈希 | description | 13,802 | 378 | 1 | 5 |
| 15 | `chapters/13-heaps-and-priority-queues.md` | 课程教材 / 第 13 章 堆与优先队列 | description | 8,717 | 275 | 1 | 8 |
| 16 | `chapters/14-data-structures-summary.md` | 课程教材 / 第 14 章 数据结构总结 | description | 2,621 | 55 | 1 | 0 |
| 17 | `chapters/15-tries.md` | 课程教材 / 第 15 章 Trie 字典树 | description | 10,179 | 288 | 1 | 5 |
| 18 | `chapters/16-quadtrees-and-kd-trees.md` | 课程教材 / 第 16 章 四叉树与 K-D 树 | description | 7,283 | 165 | 1 | 0 |
| 19 | `chapters/17-tree-traversals-and-graphs.md` | 课程教材 / 第 17 章 树遍历与图 | description | 9,620 | 331 | 1 | 12 |
| 20 | `chapters/18-graph-traversal-and-representation.md` | 课程教材 / 第 18 章 图遍历与表示 | description | 5,890 | 160 | 1 | 3 |
| 21 | `chapters/19-shortest-paths.md` | 课程教材 / 第 19 章 最短路径 | description | 9,200 | 261 | 1 | 5 |
| 22 | `chapters/20-minimum-spanning-trees.md` | 课程教材 / 第 20 章 最小生成树 | description | 5,073 | 136 | 1 | 1 |
| 23 | `chapters/21-reductions-and-decomposition.md` | 课程教材 / 第 21 章 归约与分解 | description | 12,031 | 342 | 1 | 7 |
| 24 | `course/index.md` | 中文课程主页 | title, description, template, hide | 65,004 | 417 | 0 | 0 |
| 25 | `exams/final.md` | 考试 / 期末考试 | title, description | 2,097 | 56 | 1 | 0 |
| 26 | `exams/index.md` | 考试 / 考试目录 | title, description | 300 | 14 | 1 | 0 |
| 27 | `exams/midterm-1-practice.md` | 考试 / 期中考试 1 模拟评测 | title, description | 1,612 | 47 | 1 | 0 |
| 28 | `exams/midterm-1.md` | 考试 / 期中考试 1 | title, description | 1,844 | 51 | 1 | 0 |
| 29 | `exams/midterm-2.md` | 考试 / 期中考试 2 | title, description | 1,714 | 48 | 1 | 0 |
| 30 | `homeworks/hw-0-java.md` | 作业 / HW 0：Java 速成 | title, description | 12,746 | 610 | 1 | 44 |
| 31 | `homeworks/hw-2-conceptual-review.md` | 作业 / HW 2：概念复习 | title, description | 4,702 | 174 | 1 | 8 |
| 32 | `homeworks/hw-3-conceptual-review.md` | 作业 / HW 3：概念复习 | title, description | 10,094 | 338 | 1 | 10 |
| 33 | `homeworks/index.md` | 作业 / 作业目录 | title, description | 272 | 13 | 1 | 0 |
| 34 | `index.md` | 首页 | title, description, hide | 488 | 21 | 1 | 0 |
| 35 | `labs/index.md` | 实验 / 实验目录 | title, description | 776 | 21 | 1 | 0 |
| 36 | `labs/lab-1-intellij-java-git.md` | 实验 / Lab 1：IntelliJ、Java 与 Git | title, description | 29,148 | 438 | 1 | 21 |
| 37 | `labs/lab-1-setup.md` | 实验 / Lab 1 Setup：配置计算机 | title, description | 10,716 | 239 | 1 | 15 |
| 38 | `labs/lab-12-project-3-rendering.md` | 实验 / Lab 12：Project 3 入门 | title, description | 7,857 | 201 | 1 | 10 |
| 39 | `labs/lab-13-project-3-interactivity.md` | 实验 / Lab 13：Project 3 交互 | title, description | 11,179 | 135 | 1 | 2 |
| 40 | `labs/lab-2-junit-debugging.md` | 实验 / Lab 2：JUnit 与调试 | title, description | 26,775 | 364 | 1 | 8 |
| 41 | `labs/lab-3-timing-randomized-tests.md` | 实验 / Lab 3：计时与随机测试 | title, description | 22,093 | 322 | 1 | 8 |
| 42 | `labs/lab-4-git-debugging.md` | 实验 / Lab 4：Git 与调试 | title, description | 15,413 | 291 | 1 | 11 |
| 43 | `labs/lab-5-peer-code-review.md` | 实验 / Lab 5：同伴代码审查 | title, description | 3,668 | 57 | 1 | 0 |
| 44 | `labs/lab-6-project-2.md` | 实验 / Lab 6：Project 2 入门 | title, description | 16,219 | 659 | 1 | 58 |
| 45 | `labs/lab-7-bstmap.md` | 实验 / Lab 7：BSTMap | title, description | 7,659 | 125 | 1 | 2 |
| 46 | `labs/lab-8-hashmap.md` | 实验 / Lab 8：HashMap | title, description | 14,329 | 171 | 1 | 3 |
| 47 | `projects/index.md` | 项目 / 项目目录 | title, description | 501 | 16 | 1 | 0 |
| 48 | `projects/project-0-2048.md` | 项目 / Project 0：2048 | title, description | 34,656 | 498 | 1 | 16 |
| 49 | `projects/project-1-data-structures.md` | 项目 / Project 1：数据结构 | title, description | 34,934 | 471 | 1 | 8 |
| 50 | `projects/project-1ec-autograder.md` | 项目 / Project 1 EC：自动评分器 | title, description | 8,831 | 133 | 1 | 5 |
| 51 | `projects/project-2-gitlet.md` | 项目 / Project 2：Gitlet | title, description | 94,094 | 1,807 | 1 | 99 |
| 52 | `projects/project-3-byow.md` | 项目 / Project 3：CS61BYoW | title, description | 55,324 | 1,258 | 1 | 40 |
| 53 | `projects/project-3-game-sharing.md` | 项目 / Project 3：游戏共享 | title, description | 12,268 | 499 | 1 | 42 |

### 4.3 标题与代码块统计

- 标题总数（排除 fenced code）：`965`；H1 52、H2 262、H3 415、H4 215、H5 21。
- H1 文件：52 个；没有 H1 的唯一文件：`course/index.md`。
- fenced code blocks：`814` 个；语言分布：`java` 454、`text` 235、`python` 8、`bash` 111、`matlab` 2、`scheme` 2、`mermaid` 2。
- 已有源 `title` 长度最大 25 个字符；22 个无 `title` 页面若从首个 H1 派生，最大长度为 29 个字符；源 `description` 最大 58 个字符，均未超过当前 docs schema 的 60/160 限制。

## 5. 资源审计

### 5.1 `docs/assets` 总量

| 扩展名 | 数量 |
| --- | ---: |
| `.css` | 2 |
| `.gif` | 8 |
| `.jpg` | 3 |
| `.js` | 70 |
| `.json` | 15 |
| `.png` | 229 |
| `.svg` | 1 |
| `.woff` | 23 |
| `(no extension)` | 1 |

| 一级目录 | 数量 |
| --- | ---: |
| `assets/coursework/` | 76 |
| `assets/images/` | 166 |
| `assets/javascripts/` | 1 |
| `assets/stylesheets/` | 2 |
| `assets/vendor/` | 107 |

总计 **352 个文件 / 100,253,377 字节**。

### 5.2 Markdown/HTML 图片引用

- Markdown 图片引用：**241 次**，**240 个唯一路径**；全部为相对本地路径。
- HTML `<img src>` 引用：**0 次**。
- 当前解析到的缺失本地图片：**0 次**。
- 唯一重复图片路径：`assets/images/1d3b67618b1e-dllist_circular_sentinel_size_2.png`，出现 2 次。
- 240 个唯一路径的目录分布：`assets/coursework/` 76，`assets/images/` 164。

### 5.3 全部 240 个已引用本地图片路径

#### `assets/coursework/`（76 个）

- `assets/coursework/008f3e528937-two_versions.png`
- `assets/coursework/0ddf7321a5c6-main_screen_when_done_lab1_HelloNumbers_run_run_after_click.png`
- `assets/coursework/1026cb90dd7d-main_screen_when_done_lab1_HelloNumbers_run_run.png`
- `assets/coursework/148c74f05d2d-windows_check_lab_config_option.png`
- `assets/coursework/14d71c23ddba-test-empty-space-all-fail.png`
- `assets/coursework/1d29ffcc1fec-just_called_branch.png`
- `assets/coursework/1dd92ccfd0b8-list-files.png`
- `assets/coursework/20022dee9862-intellij-pre-open.png`
- `assets/coursework/20840d2e6a42-lab3_run_menu.png`
- `assets/coursework/2134fe4fb149-split_point.png`
- `assets/coursework/28aaf1f8c736-example-2048.gif`
- `assets/coursework/28c10098be02-debug_button.png`
- `assets/coursework/29b28a03dee4-UI_example0.png`
- `assets/coursework/3177f6d443ae-windows_about_to_run_checklabconfig.png`
- `assets/coursework/33919f7aa6eb-before_and_after_commit.png`
- `assets/coursework/339213fb9911-commits-and-blobs.png`
- `assets/coursework/3f7f193ca2a6-run-main.png`
- `assets/coursework/4023de93bf32-history.png`
- `assets/coursework/403e3f0bf2f6-commit_on_branch.png`
- `assets/coursework/424292970faf-github_repo_and_branch_selection.png`
- `assets/coursework/426fa433f3f6-three_commits.png`
- `assets/coursework/43bd74b00a6a-31358-zelda-ii-the-adventure-of-link-nes-screenshot-an-overhead-view.jpg`
- `assets/coursework/45417e6ad9f2-encounter.gif`
- `assets/coursework/45de95c2bb1b-reverted_head.png`
- `assets/coursework/4f12c26bda85-folder_structure.png`
- `assets/coursework/59f38de5d072-image.png`
- `assets/coursework/5bcb81b08cb7-line-of-sight.gif`
- `assets/coursework/5e45b6aaf4d6-checkout_master.png`
- `assets/coursework/63fe673b576c-invalidate-caches.png`
- `assets/coursework/69ebaae365b0-two_developed_versions.png`
- `assets/coursework/73fbd695f7e3-plugin_setup2.png`
- `assets/coursework/753c247a68dc-program_args.png`
- `assets/coursework/77b22d0f7282-path.png`
- `assets/coursework/7b9cd3b85542-java15.png`
- `assets/coursework/7e36c59cbafd-intellij-setup.gif`
- `assets/coursework/7f5a4ca20f39-main_screen_when_done_lab1_HelloNumbers_open.png`
- `assets/coursework/80b341d8f449-toggle-lights.gif`
- `assets/coursework/81161dae4a08-intellij-open.png`
- `assets/coursework/817e828aaa56-memory-game-example.gif`
- `assets/coursework/865a7fa5ac91-karplus-strong.png`
- `assets/coursework/86f29a9e3c62-enemy.gif`
- `assets/coursework/875d5efe0663-ngrok.png`
- `assets/coursework/886b9446d10d-intellij-error.png`
- `assets/coursework/8b22af5878e1-simple_head.png`
- `assets/coursework/8ba3056c9265-branched.png`
- `assets/coursework/9914ad1934d8-step_into.png`
- `assets/coursework/9ca265a119da-ht-buckets.png`
- `assets/coursework/a0faa0debe02-breakpoint.png`
- `assets/coursework/a7824ffc91cf-mainmenu_example.png`
- `assets/coursework/a8b0e6cd4507-UI_example1.png`
- `assets/coursework/ab1bb5215644-exception_breakpoint_1.png`
- `assets/coursework/abc142b7bdab-run_button.png`
- `assets/coursework/ae0a56ec69ff-main_screen_when_done_lab1.png`
- `assets/coursework/b1116d0afde9-replay.gif`
- `assets/coursework/b4066dd1a0fa-simple_history.png`
- `assets/coursework/c4a7e0af85d0-resume_button.png`
- `assets/coursework/ca1375bcd3f1-plugin_setup1.png`
- `assets/coursework/cc595ade5dfd-compliant_world_example.png`
- `assets/coursework/d0397c466724-UI_example2.png`
- `assets/coursework/d51504d10285-brogue_textbased_example.png`
- `assets/coursework/d8b514a88d1a-test-completely-empty.png`
- `assets/coursework/d8ca628a8231-plugin_setup3.png`
- `assets/coursework/deda8b86fe36-conditional_breakpoint.png`
- `assets/coursework/e019f853d72a-access_config.png`
- `assets/coursework/e0e9ff68b04d-how-to-run-a-single-test.png`
- `assets/coursework/e3d0cb27a620-lab3_run.png`
- `assets/coursework/e66e7290cf4f-intellij_start_menu.png`
- `assets/coursework/e7065a8b9dbe-java_visualizer.png`
- `assets/coursework/eb1805cded5b-just_switched_branch.png`
- `assets/coursework/edda3a37aafd-exception_breakpoint_2.png`
- `assets/coursework/f104bd6bdb2c-comparison.png`
- `assets/coursework/f7dba6bc793f-debuggerPickAFunction.png`
- `assets/coursework/fcab3d7aee38-test-up-error-msg.png`
- `assets/coursework/feeb486c088e-hello_world.png`
- `assets/coursework/fefe3f9d8a78-opening-project-structure.png`
- `assets/coursework/ff3e948349fe-default_renderer.png`

#### `assets/images/`（164 个）

- `assets/images/0098828f55d9-deque.png`
- `assets/images/0273c74a8734-x_and_y_empty_filled.png`
- `assets/images/04b021699e48-Screen-Shot-2019-04-14-at-8.57.22-PM.png`
- `assets/images/05b2aaebed7b-21.4.3.png`
- `assets/images/07c4e0e5621a-Screen-Shot-2019-04-01-at-12.55.39-PM.png`
- `assets/images/07ddadf65cbe-loops2_3.png`
- `assets/images/0b92a28b29b9-Screen-Shot-2019-03-06-at-10.51.15-PM.png`
- `assets/images/0c42e9987984-checked_exceptions.png`
- `assets/images/0c7d438947c2-hierarchy.png`
- `assets/images/0f6aa602e985-Screen-Shot-2019-02-28-at-10.35.56-AM.png`
- `assets/images/15a3a3d73374-Screen-Shot-2019-03-27-at-2.03.36-AM.png`
- `assets/images/175bba3ac789-Screen-Shot-2019-03-06-at-10.30.30-PM.png`
- `assets/images/1786960e3f77-Screen-Shot-2019-03-08-at-1.49.56-PM.png`
- `assets/images/198a09a8dd8d-Screen-Shot-2019-04-01-at-12.51.49-PM.png`
- `assets/images/1b174adee1a0-21.4.2.png`
- `assets/images/1b60f972b5fb-Screen-Shot-2019-03-16-at-1.46.01-AM.png`
- `assets/images/1b6a8bbf02af-usage_ratio.png`
- `assets/images/1d3b67618b1e-dllist_circular_sentinel_size_2.png`（2 次引用）
- `assets/images/1e460fbf33eb-1920px-Cube-maximal-independence.svg.png`
- `assets/images/1fc651dd512e-timetable.png`
- `assets/images/203964fe8bc0-Screen-Shot-2019-03-15-at-11.41.02-AM.png`
- `assets/images/221e2cd285c7-intro2_resized.png`
- `assets/images/238e705ddcab-sllist_last_pointer.png`
- `assets/images/23e5e7f72dda-full_naive_alist.png`
- `assets/images/245d3ada8d51-21.4.4.png`
- `assets/images/24b285073b81-java.png`
- `assets/images/2dc4e3b68ab3-Screen-Shot-2019-03-23-at-7.30.04-PM.png`
- `assets/images/2dc740182972-Screen-Shot-2019-03-05-at-4.35.18-PM.png`
- `assets/images/2de368c2344b-Screen-Shot-2019-03-09-at-10.26.05-PM.png`
- `assets/images/2e6b1dd8cd43-loops2_4.png`
- `assets/images/2e81170887ad-dllist_circular_sentinel_size_0.png`
- `assets/images/2f90d96269e1-Screen-Shot-2019-03-16-at-5.44.54-PM.png`
- `assets/images/304318233b30-Screen-Shot-2019-03-06-at-10.56.51-PM.png`
- `assets/images/3053d66cd8ff-Screen-Shot-2019-03-15-at-11.32.09-AM.png`
- `assets/images/3117296e282c-someWalrus_bit_notation.png`
- `assets/images/34fb259f2a9f-Screen-Shot-2019-02-28-at-10.36.39-AM.png`
- `assets/images/36a9a2ca16d8-Screen-Shot-2019-03-05-at-4.02.58-PM.png`
- `assets/images/39addbcc3cea-21.2.1.png`
- `assets/images/39e64727b87c-dllist_double_sentinel_size_0.png`
- `assets/images/3c6990b0c70f-cell_encapsulated.png`
- `assets/images/3ed88deccda0-exceptions.png`
- `assets/images/4077347586a8-Screen-Shot-2019-03-16-at-1.33.08-AM.png`
- `assets/images/4346882d3320-21.4.1.png`
- `assets/images/44a23044e35c-21.4.5.png`
- `assets/images/450180c89876-someWalrus_simplified_bit_notation.png`
- `assets/images/4892d1f77f59-Screen-Shot-2019-03-08-at-1.44.43-PM.png`
- `assets/images/49daff26367d-Screen-Shot-2019-03-17-at-4.37.32-PM.png`
- `assets/images/4a231c032302-asymptotics2_tree2.png`
- `assets/images/4b1439a6fbe7-Screen-Shot-2019-03-08-at-1.19.34-PM.png`
- `assets/images/4ddcb9a41da2-wrapper_classes.png`
- `assets/images/50c4dee6e3e2-21.1.4.png`
- `assets/images/52bbc4704e9a-dllist_basic_size_0.png`
- `assets/images/541c9a4c6f4d-loops2_2.png`
- `assets/images/54db55609872-Screen-Shot-2019-03-09-at-10.03.15-PM.png`
- `assets/images/570dc348872f-dllist_basic_size_2.png`
- `assets/images/59248367dc9e-insert_experiment.png`
- `assets/images/59e4439609b7-average_a_b.png`
- `assets/images/5be2d553b81b-Screen-Shot-2019-03-15-at-11.40.56-AM.png`
- `assets/images/5d40c6910142-21.1.3.png`
- `assets/images/5d822bef1102-intro1_resized.png`
- `assets/images/5d89fd7ebe83-Screen-Shot-2019-03-05-at-4.05.03-PM.png`
- `assets/images/60936d73f594-dynamic_selection.png`
- `assets/images/60ab09473272-empty_sentinelized_SLList.png`
- `assets/images/613d9f5fcd67-callstack.png`
- `assets/images/63d0b76aec58-loops2_1.png`
- `assets/images/647a13eb5350-Screen-Shot-2019-03-23-at-8.29.56-PM.png`
- `assets/images/6d195c983bda-Screen-Shot-2019-03-14-at-12.47.38-AM.png`
- `assets/images/6f6a95ee91f2-Screen-Shot-2019-02-28-at-10.34.53-AM.png`
- `assets/images/70665a3df1b0-x_and_y_simplified_box_notation.png`
- `assets/images/70eff54b76df-Screen-Shot-2019-03-23-at-7.29.30-PM.png`
- `assets/images/7568188b6621-Screen-Shot-2019-03-16-at-1.33.04-AM.png`
- `assets/images/765ac3f3006b-Screen-Shot-2019-03-06-at-10.25.18-PM.png`
- `assets/images/76ccdee61f5a-Screen-Shot-2019-03-08-at-1.37.16-PM.png`
- `assets/images/798d666f7ce9-Screen-Shot-2019-02-28-at-10.43.45-AM.png`
- `assets/images/80c9ecf733a4-Screen-Shot-2019-03-23-at-7.27.24-PM.png`
- `assets/images/833ce1e6b2f6-Screen-Shot-2019-02-28-at-9.36.01-AM.png`
- `assets/images/85af6d04564b-compilation_figure.svg`
- `assets/images/85f72b4c21a2-Screen-Shot-2019-03-05-at-3.53.32-PM.png`
- `assets/images/87049caa1804-IntList_vs_SLList.png`
- `assets/images/87c3e25e2698-ascii.png`
- `assets/images/87e175929b6c-21.1.1.jpg`
- `assets/images/88b638c488d8-Screen-Shot-2019-03-16-at-1.57.42-AM.png`
- `assets/images/8a088212d965-9.3.2.png`
- `assets/images/8bb63f0dc7b5-reverse_list2.png`
- `assets/images/8cb11147d723-Screen-Shot-2019-03-27-at-2.03.44-AM-2.png`
- `assets/images/8e8a479ed229-amortized_adds.png`
- `assets/images/914600e8de67-mystery_of_the_walrus_resolved_step3.png`
- `assets/images/91d30f7a05e3-Screen-Shot-2019-03-06-at-11.33.14-PM.png`
- `assets/images/9730197a8bcb-Screen-Shot-2019-03-09-at-10.15.11-PM.png`
- `assets/images/97fc799f5d3d-Screen-Shot-2019-03-06-at-11.37.57-PM.png`
- `assets/images/9920f3104cef-dog_comparable.png`
- `assets/images/9fb7cffb0af0-Screen-Shot-2019-03-16-at-5.33.01-PM.png`
- `assets/images/a089537fe5f9-Screen-Shot-2019-03-16-at-5.42.50-PM.png`
- `assets/images/a401cefc317c-Screen-Shot-2019-03-06-at-10.37.17-PM.png`
- `assets/images/a465a9b1e62d-mystery_of_the_walrus_resolved_step2.png`
- `assets/images/a54ddfca379e-Screen-Shot-2019-02-28-at-12.58.07-AM.png`
- `assets/images/a572888e74c6-access_modifiers.png`
- `assets/images/a5fc2cf57bba-Screen-Shot-2019-03-06-at-11.14.41-PM.png`
- `assets/images/a91c68e56540-Screen-Shot-2019-03-27-at-2.03.44-AM-1.png`
- `assets/images/ad26b13fe6d9-Screen-Shot-2019-03-08-at-12.49.36-PM.png`
- `assets/images/ae33c78d893d-Screen-Shot-2019-03-27-at-2.05.55-AM.png`
- `assets/images/b2ba0dd82bc7-Screen-Shot-2019-03-06-at-11.36.00-PM.png`
- `assets/images/b2e33f764cdf-9.4.2.png`
- `assets/images/b2f137542945-someWalrus_simplified_bit_notation_null.png`
- `assets/images/b4e099cb6e6f-9.3.1.png`
- `assets/images/b5a1ed27a954-Screen-Shot-2019-03-14-at-12.38.42-AM.png`
- `assets/images/b5f6e4230eb1-Screen-Shot-2019-03-27-at-1.58.11-AM.png`
- `assets/images/b788e2535eea-comparator.png`
- `assets/images/b78fd85fa3cb-x_and_y_empty_bitwise.png`
- `assets/images/bac739f68c3a-Screen-Shot-2019-03-08-at-1.49.51-PM.png`
- `assets/images/bba029cd2c51-Screen-Shot-2019-02-27-at-1.54.27-PM.png`
- `assets/images/bc20f35ce1d6-Screen-Shot-2019-03-17-at-3.53.23-PM.png`
- `assets/images/bdfdee68b4c7-Screen-Shot-2019-02-28-at-12.59.39-AM.png`
- `assets/images/be971c06f261-Screen-Shot-2019-03-09-at-9.54.04-PM.png`
- `assets/images/bee2d7417a68-intro3_resized.png`
- `assets/images/bf408e0e79f2-Doge.png`
- `assets/images/bfd2fe6d846d-bad_SLList.png`
- `assets/images/c1173b000e78-Screen-Shot-2019-03-05-at-12.56.54-PM.png`
- `assets/images/c128067ea022-mystery_of_the_walrus_resolved_step1.png`
- `assets/images/c17198313f16-9.4.1.png`
- `assets/images/c1796b08bcfa-main_x_y.png`
- `assets/images/c467b64c1798-Screen-Shot-2019-04-01-at-1.18.57-PM.png`
- `assets/images/c57028055018-Screen-Shot-2019-02-28-at-12.55.40-AM.png`
- `assets/images/c6fd5e6fefe7-pz1muo.jpg`
- `assets/images/c7d6f1b37fb3-9.3.3.png`
- `assets/images/c940ab90f707-8.1---chart.png`
- `assets/images/ca056c28099f-asymptotics2_tree.png`
- `assets/images/cb2e94956e66-org-chart-software-maker.png`
- `assets/images/cb52ed7d41dd-python.png`
- `assets/images/ce19fa0015fe-dllist_double_sentinel_size_2.png`
- `assets/images/cea1a396ae8b-loops2_graph.png`
- `assets/images/d273ea71fd43-Screen-Shot-2019-03-16-at-1.45.55-AM.png`
- `assets/images/d4dea57e5fde-comparable.png`
- `assets/images/d59cfed2c7f9-loops2_graph2.png`
- `assets/images/d87fa9ebceb0-heap-13.2.1.png`
- `assets/images/d8be735c125e-subclass.png`
- `assets/images/da441549d85b-collection_hierarchy.png`
- `assets/images/de5b376a5e16-comparable_interface.png`
- `assets/images/e1f744ca554d-Screen-Shot-2019-02-28-at-9.25.43-AM.png`
- `assets/images/e34b7812a6b9-9.2.2.png`
- `assets/images/e714bc7c090d-21.1.2.png`
- `assets/images/e75a693ac9b0-Screen-Shot-2019-03-23-at-7.25.41-PM.png`
- `assets/images/e95323938d1d-Screen-Shot-2019-03-23-at-8.10.37-PM.png`
- `assets/images/eb0107c28514-Screen-Shot-2019-03-17-at-4.19.24-PM.png`
- `assets/images/ec912e8b1b76-Screen-Shot-2019-03-27-at-2.03.44-AM.png`
- `assets/images/ecc97f013a15-Screen-Shot-2019-03-05-at-4.12.17-PM.png`
- `assets/images/ed28b82cc75f-Screen-Shot-2019-03-17-at-4.24.36-PM.png`
- `assets/images/eefc63f5a4fe-9.2.1.png`
- `assets/images/f0f75b1613fa-Screen-Shot-2019-04-14-at-9.03.06-PM.png`
- `assets/images/f1619b5c6b28-Screen-Shot-2019-03-09-at-10.08.44-PM.png`
- `assets/images/f1be3b3d3e39-someWalrus_bit_notation_null.png`
- `assets/images/f25a5f2e3d80-Screen-Shot-2019-03-15-at-11.11.28-AM.png`
- `assets/images/f2e9007e6c7b-anonymous_walrus.png`
- `assets/images/f514b1dead93-Screen-Shot-2019-03-13-at-11.37.10-PM.png`
- `assets/images/f518c76661b7-Screen-Shot-2019-03-06-at-6.53.22-PM.png`
- `assets/images/f51a7d8955ad-reverse_list1.png`
- `assets/images/f87ca942f9aa-list_subclasses.png`
- `assets/images/f89c889f647d-Screen-Shot-2019-03-15-at-10.46.02-AM.png`
- `assets/images/faf76c3d2542-Screen-Shot-2019-02-28-at-12.51.06-AM.png`
- `assets/images/fbd461ae473b-three_item_sentenlized_SLList.png`
- `assets/images/fd010ab51038-Screen-Shot-2019-03-17-at-4.26.41-PM.png`
- `assets/images/fdc8937dafd7-21.2.2.png`
- `assets/images/fe8cdd7c490d-dup1_square.png`
- `assets/images/ff74b24f6eea-Screen-Shot-2019-03-08-at-12.53.44-PM.png`

### 5.4 未被正文图片引用的资源

未被上述 Markdown/HTML 图片引用的资源共 **112 个**：

- `assets/vendor/mathjax/` 下 107 个 MathJax 运行时文件；源 Markdown 没有直接引用它们。
- `assets/images/gongan-beian.png`
- `assets/images/manifest.json`
- `assets/javascripts/mathjax-config.js`
- `assets/stylesheets/course-home-v2.css`
- `assets/stylesheets/extra.css`

其中 `assets/images/gongan-beian.png`、`assets/stylesheets/extra.css`、`assets/stylesheets/course-home-v2.css` 等是否需要服务于新主题，必须在实现阶段按实际组件依赖决定；不要因为它们存在于源目录就自动复制。

## 6. MkDocs 专用语法与当前 Astro 兼容性

| 模式 | 精确数量 | 源中示例 | 当前 Astro 现状 | 实现要求 |
| --- | ---: | --- | --- | --- |
| `attr_list` 标题 ID | 56 | `projects/project-3-byow.md:42`：`## 引言 { #introduction }` | 当前 `astro.config.ts` 没有 `attr_list`/等价 remark 插件；测试结果会把 `{ #introduction }` 当作标题文字的一部分 | 转换为普通标题 + 显式 ID，或增加经过验证的属性处理插件；必须保留旧锚点 |
| `attr_list` 链接属性 | 7 | `index.md:12`：`[开始阅读](chapters/00-introduction.md){ .md-button .md-button--primary }` | 属性会变成普通文本，`.md-button` 不会自动变为按钮类 | 把按钮转换为 Astro/HTML 组件或安全的 HTML 属性；考试页的 `target/rel` 也要保留 |
| `md_in_html` | 1 | `index.md:10`：`<div class="course-home-actions" markdown>` | 当前处理器保留 raw HTML，但不会提供 MkDocs `md_in_html` 的嵌套 Markdown 语义 | 将首页操作区改成 Astro 组件/HTML，或增加并测试等价 remark 处理 |
| raw HTML | 504 行标签样式命中 | `course/index.md` 包含公告、日历、表格、内联样式/类名等大段 HTML | Astro 可保留 HTML，但不会携带 Material 的课程主页模板和 CSS；统计包含少量 `<int>` 等 code span 误匹配 | 为课程主页做独立组件和样式适配；逐块验证结构、链接、移动端显示 |
| Mermaid fenced block | 2 | `homeworks/hw-3-conceptual-review.md:86`：````mermaid`；另一个在 `homeworks/hw-3-conceptual-review.md:156` | 当前 Shiki 只输出 `language-mermaid` 的普通 `<pre><code>`，不会绘图 | 选用 Mermaid 客户端/集成并加入安全 CSP/构建验证；或明确接受代码展示 |
| GFM 表格 | 15 个表头行 | 分布在章节、作业和项目正文 | 当前 Astro Markdown 默认支持 GFM 表格，但尚未在迁移内容上构建验证 | 构建后检查 15 张表格的列数、宽度和移动端溢出 |
| fenced code | 814 个 | Java、text、bash、Python、Matlab、Scheme、Mermaid | 当前 Astro 使用 Shiki；Mermaid 是唯一明确不会自动渲染图的语言 | 验证代码高亮、长行、中文、复制按钮及 Mermaid 决策 |
| admonition `!!!`/`???` | 0 | 未发现 | 不构成当前迁移阻点 | 无需为源页面额外实现 |
| `pymdownx.tabbed` `===` | 0 | 未发现 | 不构成当前迁移阻点 | 无需为源页面额外实现 |
| snippets/macros/TOC 指令 | 0 / 0 / 0 | 未发现 `--8<--`、模板宏、`[[toc]]` | 不构成当前迁移阻点 | 无需为源页面额外实现 |
| code fence 属性 | 0 | 未发现 `title=`、`linenums`、`hl_lines`、`.annotate` | 不构成当前迁移阻点 | 无需为源页面额外实现 |

`mkdocs.yml` 明确启用了 `abbr`、`def_list`、`footnotes`、`inlinehilite` 等扩展；本次源文件扫描未发现对应的明显专用块语法，但后续构建仍应把 Markdown 解析错误作为验收失败处理。

## 7. 链接、锚点与图片重写规则

### 7.1 链接数量与清单

- 普通 Markdown 链接：`569` 个；HTML `href`：`377` 个；合计非图片链接：`946` 个。
- 仅片段链接：`209` 个；含片段的链接：`300` 个。
- 相对 `.md` 链接全部 27 个如下：

| 源位置 | 原目标 |
| --- | --- |
| `exams/index.md:10` | `midterm-1-practice.md` |
| `exams/index.md:11` | `midterm-1.md` |
| `exams/index.md:12` | `midterm-2.md` |
| `exams/index.md:13` | `final.md` |
| `homeworks/index.md:10` | `hw-0-java.md` |
| `homeworks/index.md:11` | `hw-2-conceptual-review.md` |
| `homeworks/index.md:12` | `hw-3-conceptual-review.md` |
| `index.md:12` | `chapters/00-introduction.md` |
| `index.md:13` | `course/index.md` |
| `index.md:20` | `about.md` |
| `labs/index.md:10` | `lab-1-setup.md` |
| `labs/index.md:11` | `lab-1-intellij-java-git.md` |
| `labs/index.md:12` | `lab-2-junit-debugging.md` |
| `labs/index.md:13` | `lab-3-timing-randomized-tests.md` |
| `labs/index.md:14` | `lab-4-git-debugging.md` |
| `labs/index.md:15` | `lab-5-peer-code-review.md` |
| `labs/index.md:16` | `lab-6-project-2.md` |
| `labs/index.md:17` | `lab-7-bstmap.md` |
| `labs/index.md:18` | `lab-8-hashmap.md` |
| `labs/index.md:19` | `lab-12-project-3-rendering.md` |
| `labs/index.md:20` | `lab-13-project-3-interactivity.md` |
| `projects/index.md:10` | `project-0-2048.md` |
| `projects/index.md:11` | `project-1-data-structures.md` |
| `projects/index.md:12` | `project-1ec-autograder.md` |
| `projects/index.md:13` | `project-2-gitlet.md` |
| `projects/index.md:14` | `project-3-byow.md` |
| `projects/index.md:15` | `project-3-game-sharing.md` |

- 外部 `.md` 链接 1 个如下，保持原样：

  - `chapters/01-java-basics.md:104` → `https://github.com/joshhug/hug61b/tree/e1d84817521747a76f17d2ed077abab493505c3f/chap1/TBA/README.md`

### 7.2 旧站绝对路径的精确清单

旧站内部前缀命中 `94` 次、唯一路径 `88` 个；全部来自 `course/index.md` 的 HTML `href`。以下表格列出全部唯一路径及出现次数：

| 旧路径 | 次数 | 示例位置 |
| --- | ---: | --- |
| `/CS61B/2021Spring/chapters/01-java-basics/#11` | 1 | `course/index.md:37` |
| `/CS61B/2021Spring/chapters/01-java-basics/#12` | 1 | `course/index.md:44` |
| `/CS61B/2021Spring/chapters/02-lists/#21` | 1 | `course/index.md:66` |
| `/CS61B/2021Spring/chapters/02-lists/#22-sllist` | 1 | `course/index.md:71` |
| `/CS61B/2021Spring/chapters/02-lists/#23-dllist` | 1 | `course/index.md:80` |
| `/CS61B/2021Spring/chapters/02-lists/#24` | 1 | `course/index.md:80` |
| `/CS61B/2021Spring/chapters/02-lists/#25-alist` | 1 | `course/index.md:92` |
| `/CS61B/2021Spring/chapters/03-testing/#31` | 1 | `course/index.md:53` |
| `/CS61B/2021Spring/chapters/04-inheritance-and-interfaces/#41` | 1 | `course/index.md:97` |
| `/CS61B/2021Spring/chapters/04-inheritance-and-interfaces/#42-extends` | 1 | `course/index.md:109` |
| `/CS61B/2021Spring/chapters/04-inheritance-and-interfaces/#43` | 1 | `course/index.md:119` |
| `/CS61B/2021Spring/chapters/06-exceptions-iterators-object-methods/#61-listset-arrayset` | 1 | `course/index.md:124` |
| `/CS61B/2021Spring/chapters/06-exceptions-iterators-object-methods/#62` | 1 | `course/index.md:124` |
| `/CS61B/2021Spring/chapters/06-exceptions-iterators-object-methods/#63` | 1 | `course/index.md:124` |
| `/CS61B/2021Spring/chapters/06-exceptions-iterators-object-methods/#64-object` | 1 | `course/index.md:124` |
| `/CS61B/2021Spring/chapters/08-efficient-programming-and-asymptotic-analysis/#81-api-adt` | 1 | `course/index.md:148` |
| `/CS61B/2021Spring/chapters/08-efficient-programming-and-asymptotic-analysis/#82-i` | 1 | `course/index.md:148` |
| `/CS61B/2021Spring/chapters/08-efficient-programming-and-asymptotic-analysis/#83-ii` | 1 | `course/index.md:169` |
| `/CS61B/2021Spring/chapters/08-efficient-programming-and-asymptotic-analysis/#84-omega` | 1 | `course/index.md:169` |
| `/CS61B/2021Spring/chapters/09-disjoint-sets/#91` | 1 | `course/index.md:157` |
| `/CS61B/2021Spring/chapters/09-disjoint-sets/#92-quick-find` | 1 | `course/index.md:157` |
| `/CS61B/2021Spring/chapters/09-disjoint-sets/#93-quick-union` | 1 | `course/index.md:157` |
| `/CS61B/2021Spring/chapters/09-disjoint-sets/#94-quick-unionwqu` | 1 | `course/index.md:157` |
| `/CS61B/2021Spring/chapters/09-disjoint-sets/#95-quick-union` | 1 | `course/index.md:157` |
| `/CS61B/2021Spring/chapters/10-adts-and-trees/#101-adt` | 1 | `course/index.md:174` |
| `/CS61B/2021Spring/chapters/10-adts-and-trees/#102` | 1 | `course/index.md:174` |
| `/CS61B/2021Spring/chapters/11-balanced-trees/#111-b` | 1 | `course/index.md:183` |
| `/CS61B/2021Spring/chapters/11-balanced-trees/#112-b` | 1 | `course/index.md:183` |
| `/CS61B/2021Spring/chapters/11-balanced-trees/#113-b` | 1 | `course/index.md:183` |
| `/CS61B/2021Spring/chapters/11-balanced-trees/#114` | 1 | `course/index.md:195` |
| `/CS61B/2021Spring/chapters/11-balanced-trees/#115` | 1 | `course/index.md:195` |
| `/CS61B/2021Spring/chapters/12-hashing/#121` | 1 | `course/index.md:200` |
| `/CS61B/2021Spring/chapters/12-hashing/#122` | 1 | `course/index.md:200` |
| `/CS61B/2021Spring/chapters/12-hashing/#123` | 1 | `course/index.md:200` |
| `/CS61B/2021Spring/chapters/12-hashing/#124` | 1 | `course/index.md:200` |
| `/CS61B/2021Spring/chapters/12-hashing/#125` | 1 | `course/index.md:200` |
| `/CS61B/2021Spring/chapters/13-heaps-and-priority-queues/#131` | 1 | `course/index.md:207` |
| `/CS61B/2021Spring/chapters/13-heaps-and-priority-queues/#132` | 1 | `course/index.md:207` |
| `/CS61B/2021Spring/chapters/13-heaps-and-priority-queues/#133` | 1 | `course/index.md:207` |
| `/CS61B/2021Spring/chapters/14-data-structures-summary/#141` | 1 | `course/index.md:268` |
| `/CS61B/2021Spring/chapters/15-tries/#151-trie` | 1 | `course/index.md:268` |
| `/CS61B/2021Spring/chapters/15-tries/#152` | 1 | `course/index.md:268` |
| `/CS61B/2021Spring/chapters/15-tries/#153` | 1 | `course/index.md:268` |
| `/CS61B/2021Spring/chapters/16-quadtrees-and-kd-trees/#161` | 1 | `course/index.md:248` |
| `/CS61B/2021Spring/chapters/16-quadtrees-and-kd-trees/#162` | 1 | `course/index.md:248` |
| `/CS61B/2021Spring/chapters/16-quadtrees-and-kd-trees/#163-k-d` | 1 | `course/index.md:248` |
| `/CS61B/2021Spring/chapters/17-tree-traversals-and-graphs/#171` | 1 | `course/index.md:218` |
| `/CS61B/2021Spring/chapters/17-tree-traversals-and-graphs/#172` | 1 | `course/index.md:218` |
| `/CS61B/2021Spring/chapters/17-tree-traversals-and-graphs/#173` | 1 | `course/index.md:218` |
| `/CS61B/2021Spring/chapters/17-tree-traversals-and-graphs/#174` | 1 | `course/index.md:218` |
| `/CS61B/2021Spring/chapters/18-graph-traversal-and-representation/#181-bfs` | 1 | `course/index.md:223` |
| `/CS61B/2021Spring/chapters/18-graph-traversal-and-representation/#182` | 1 | `course/index.md:223` |
| `/CS61B/2021Spring/chapters/19-shortest-paths/#191` | 1 | `course/index.md:232` |
| `/CS61B/2021Spring/chapters/19-shortest-paths/#192-dijkstra` | 1 | `course/index.md:232` |
| `/CS61B/2021Spring/chapters/19-shortest-paths/#193-a` | 1 | `course/index.md:232` |
| `/CS61B/2021Spring/chapters/20-minimum-spanning-trees/#201` | 1 | `course/index.md:243` |
| `/CS61B/2021Spring/chapters/20-minimum-spanning-trees/#202-prim-kruskal` | 1 | `course/index.md:243` |
| `/CS61B/2021Spring/chapters/21-reductions-and-decomposition/#211-dag` | 1 | `course/index.md:284` |
| `/CS61B/2021Spring/chapters/21-reductions-and-decomposition/#212-dag` | 1 | `course/index.md:284` |
| `/CS61B/2021Spring/chapters/21-reductions-and-decomposition/#213` | 1 | `course/index.md:284` |
| `/CS61B/2021Spring/chapters/21-reductions-and-decomposition/#214` | 1 | `course/index.md:284` |
| `/CS61B/2021Spring/exams/final/` | 1 | `course/index.md:408` |
| `/CS61B/2021Spring/exams/midterm-1-practice/` | 1 | `course/index.md:117` |
| `/CS61B/2021Spring/exams/midterm-1/` | 1 | `course/index.md:122` |
| `/CS61B/2021Spring/exams/midterm-2/` | 1 | `course/index.md:246` |
| `/CS61B/2021Spring/homeworks/hw-0-java/` | 1 | `course/index.md:34` |
| `/CS61B/2021Spring/homeworks/hw-2-conceptual-review/` | 1 | `course/index.md:192` |
| `/CS61B/2021Spring/homeworks/hw-3-conceptual-review/` | 1 | `course/index.md:357` |
| `/CS61B/2021Spring/labs/lab-1-intellij-java-git/` | 1 | `course/index.md:32` |
| `/CS61B/2021Spring/labs/lab-1-setup/` | 1 | `course/index.md:32` |
| `/CS61B/2021Spring/labs/lab-12-project-3-rendering/` | 1 | `course/index.md:300` |
| `/CS61B/2021Spring/labs/lab-13-project-3-interactivity/` | 1 | `course/index.md:328` |
| `/CS61B/2021Spring/labs/lab-2-junit-debugging/` | 1 | `course/index.md:60` |
| `/CS61B/2021Spring/labs/lab-3-timing-randomized-tests/` | 1 | `course/index.md:87` |
| `/CS61B/2021Spring/labs/lab-4-git-debugging/` | 1 | `course/index.md:116` |
| `/CS61B/2021Spring/labs/lab-5-peer-code-review/` | 1 | `course/index.md:137` |
| `/CS61B/2021Spring/labs/lab-6-project-2/` | 1 | `course/index.md:164` |
| `/CS61B/2021Spring/labs/lab-7-bstmap/` | 1 | `course/index.md:190` |
| `/CS61B/2021Spring/labs/lab-8-hashmap/` | 1 | `course/index.md:214` |
| `/CS61B/2021Spring/projects/project-0-2048/` | 2 | `course/index.md:41`、`course/index.md:62` |
| `/CS61B/2021Spring/projects/project-1-data-structures/` | 2 | `course/index.md:89`、`course/index.md:101` |
| `/CS61B/2021Spring/projects/project-2-gitlet/` | 4 | `course/index.md:145`、`course/index.md:166`、`course/index.md:240` |
| `/CS61B/2021Spring/projects/project-2-gitlet/#checkpoint-grader` | 1 | `course/index.md:216` |
| `/CS61B/2021Spring/projects/project-3-byow/` | 2 | `course/index.md:302`、`course/index.md:356` |
| `/CS61B/2021Spring/projects/project-3-byow/#phase-1` | 1 | `course/index.md:332` |
| `/CS61B/2021Spring/projects/project-3-byow/#phase-2` | 1 | `course/index.md:381` |
| `/CS61B/2021Spring/projects/project-3-byow/#submission` | 1 | `course/index.md:380` |
| `/CS61B/2021Spring/projects/project-3-game-sharing/` | 1 | `course/index.md:309` |

### 7.3 链接重写规则

1. 相对 `foo.md`：先按源文件目录解析到具体源 Markdown，再移除 `.md`，前置 `/docs/cs61b/2021spring/`。例如 `index.md` 中的 `chapters/00-introduction.md` → `/docs/cs61b/2021spring/chapters/00-introduction/`。
2. 相对 `foo.md#fragment`：按同样规则重写路径，保留 `#fragment` 原值；不得把锚点静默改成标题 slug。
3. 旧 `/CS61B/2021Spring/`：映射为 `/docs/cs61b/2021spring/`；后续路径、尾斜杠和片段原样保留并按新路由规范化。
4. 旧路径末尾的 `/index/` 或源 `index.md`：目标应是所在目录根路径，例如 `course/index.md` → `/docs/cs61b/2021spring/course/`，而不是 `/course/index/`。顶层 `index.md` → `/docs/cs61b/2021spring/`。
5. `index.md` 中 `[返回教程总目录](/)` 的语义不是源课程内页路径，不能机械按 `.md` 规则处理；实现时应明确改到博客文档总目录 `/docs/`，或在产品决定后改到课程根路径。
6. 外部 `http(s)`、`//`、GitHub、Berkeley、视频、许可证等链接保持原目标；不因为链接文字是中文就改 URL。
7. 仅 `#fragment` 链接保持片段文本，但前提是迁移后的 HTML 确实生成对应 ID。

### 7.4 锚点事实与重写规则

源 Markdown 有 `56` 个显式 `{ #id }` 标题属性。当前 Astro 实际处理测试：`## 引言 { #introduction }` 会得到包含字面量属性文本的标题，并生成类似 `引言--introduction-` 的自动 ID，而不是 `introduction`；`[按钮](x.md){ .md-button }` 的属性也会作为文本留下。因此实现不能只复制文件后期待锚点自动兼容。

锚点规则：

- 对 `{ #id }`：删除属性语法但给对应 `<h2…>`/`<h3…>` 设置精确 `id`，或使用已验证的 remark/rehype 方案；ID 大小写、数字开头、连字符和反引号标题都必须按源值验收。
- 对没有显式 ID 的标题：使用当前 Astro 的 heading ID 规则，但在内部片段链接上做构建后反查，不凭 slug 经验推断。
- 不把旧 MkDocs 生成的静态 `site/` HTML 当作源事实；源 Markdown 的显式 ID 和新构建产物才是验收依据。
- 验收时建立“每个本地 `#fragment` → 目标页面元素 ID”的集合，要求 0 个未解析片段。

### 7.5 图片重写规则（推荐方案）

推荐把实际引用的 240 个图片文件放到静态公共目录：

- `public/docs-assets/cs61b/2021spring/assets/coursework/**`
- `public/docs-assets/cs61b/2021spring/assets/images/**`

把源中的 `../assets/coursework/x.png` / `../assets/images/x.png` 重写为 `/docs-assets/cs61b/2021spring/assets/coursework/x.png` / `/docs-assets/cs61b/2021spring/assets/images/x.png`。这样可以避免当前 `src/pages/docs/rss.xml.ts` 只按 `./image`、只扫描 `src/content/docs` 的解析假设，并让正文、静态站点和 RSS 使用同一 URL。

如果实现阶段选择把图片留在 `src/content/docs/cs61b/2021spring/assets/`，则必须同时改造 RSS 的 `imagesGlob` 与 `imagePathPrefix`，并验证 `.svg`、`.gif`、`.jpg` 等当前 glob 未覆盖/需覆盖的格式；两种方案不能混用。

## 8. Frontmatter 与 `src/content.config.ts` 兼容性

当前 docs collection 在 `src/content.config.ts:45-56` 使用 `glob({ base: './src/content/docs', pattern: '**/*.{md,mdx}' })`，schema 为：

```ts
title: z.string().max(60)
description: z.string().max(160)
publishDate: z.coerce.date().optional()
updatedDate: z.coerce.date().optional()
tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase)
draft: z.boolean().default(false)
order: z.number().default(999)
```

源 frontmatter 频次：

| 源键 | 文件数 | 事实 |
| --- | ---: | --- |
| `description` | 53 | 53 个页面全部有描述 |
| `title` | 31 | 31 个页面有标题 |
| `template` | 1 | 仅 `course/index.md`：`course-home.html` |
| `hide` | 2 | `index.md` 为 `["toc"]`；`course/index.md` 为 `["navigation", "toc"]` |
| `publishDate`/`updatedDate`/`tags`/`draft`/`order` | 0 | 源没有这些 Astro 键 |

没有 `title` 的 22 个文件（全部为章节页，只有 `description`）：

- `chapters/00-introduction.md`
- `chapters/01-java-basics.md`
- `chapters/02-lists.md`
- `chapters/03-testing.md`
- `chapters/04-inheritance-and-interfaces.md`
- `chapters/05-generics-and-autoboxing.md`
- `chapters/06-exceptions-iterators-object-methods.md`
- `chapters/07-packages-and-access-control.md`
- `chapters/08-efficient-programming-and-asymptotic-analysis.md`
- `chapters/09-disjoint-sets.md`
- `chapters/10-adts-and-trees.md`
- `chapters/11-balanced-trees.md`
- `chapters/12-hashing.md`
- `chapters/13-heaps-and-priority-queues.md`
- `chapters/14-data-structures-summary.md`
- `chapters/15-tries.md`
- `chapters/16-quadtrees-and-kd-trees.md`
- `chapters/17-tree-traversals-and-graphs.md`
- `chapters/18-graph-traversal-and-representation.md`
- `chapters/19-shortest-paths.md`
- `chapters/20-minimum-spanning-trees.md`
- `chapters/21-reductions-and-decomposition.md`

转换规则：

1. `title`：有源 `title` 的 31 页原样保留；没有源 `title` 的 22 个章节页从其第一个正文 H1 派生。不得把文件名直接当中文标题。
2. `description`：53 页全部保留；不得为空，不得超出 160 字符。
3. `publishDate`/`updatedDate`：源没有日期，不制造课程日期；如侧栏排序需要稳定顺序，用导航序号映射到 `order`，不要伪造发布时间。
4. `tags`：源没有标签；默认 `[]`。如果要加入 `cs61b`、`2021spring` 或导航分组标签，应作为明确的迁移策略单独决定，不从不存在的分类字段推断。
5. `draft`：源没有草稿键，按 schema 默认 `false`。
6. `order`：建议按 `mkdocs.yml` 的叶子顺序生成稳定序号，供侧栏使用；不能用日期排序代替导航顺序。
7. `template`：不能直接放入当前 docs schema 作为可执行模板；`course-home.html` 必须转换为 Astro 专用课程主页组件/布局。
8. `hide`：不能静默丢弃。应扩展 schema 或用受控路由元数据支持：顶层 `index.md` 隐藏 TOC，`course/index.md` 同时隐藏 navigation/TOC。
9. 不新增 `category` 独立字段；源也没有 category。若要分组，使用独立导航数据而不是污染正文 frontmatter。

## 9. 重复 H1 与布局冲突

当前 `src/pages/docs/[...id].astro` 在渲染 `<Content />` 之前，会从 `post.data.title` 输出页面标题 H1；源 53 页中 52 页正文也有一个 Markdown H1，唯一没有正文 H1 的是 `course/index.md`。如果直接复制并补 frontmatter，会有 52 页出现重复顶层 H1。

建议的实现选择：在迁移转换阶段仅移除每个有正文 H1 页面中的第一个 Markdown H1，保留 Astro 路由标题；正文后续 H2/H3 层级和文字保持不变。`course/index.md` 的 raw HTML 标题不能用这个规则盲删，需在课程主页组件适配时单独处理。

## 10. 当前 Astro 文档路由、侧栏与相关实现

| 文件 | 当前事实 | 迁移影响 |
| --- | --- | --- |
| `src/pages/docs/[...id].astro` | `getStaticPaths()` 从 docs collection 读取 `post.id`；渲染 `ContentLayout`、标题 H1、description、`DocsContents`、正文；`editPath` 固定指向 Astro Theme Pure 仓库 | 需要把 `index.md` 的 `post.id` 映射为父目录路由；课程页不应继续显示错误的主题仓库编辑链接；同时处理 H1/TOC |
| `src/pages/docs/DocsContents.astro` | 按 `doc.id.split('/')[0]` 分组，并硬编码 `setup`/`integrations`/`advanced` 三组 | 不会显示 `cs61b`；必须接入 CS61B 的完整 `mkdocs.yml` 导航树，且支持多级章节/目录页 |
| `src/pages/docs/index.astro` | 当前只介绍 Astro Theme Pure 文档 | 应加入 CS61B 课程入口、描述和许可证/来源入口 |
| `src/pages/docs/rss.xml.ts` | 图片 glob 只扫 `src/content/docs/**/*.{jpeg,jpg,png,gif,avif,webp}`；解析器把图片拼为 `post.id + ./image` | 与源 `../assets/...` 不兼容；推荐使用绝对静态图片 URL或改造解析器，并覆盖 SVG/资源格式 |
| `src/layouts/ContentLayout.astro` | 提供页面骨架和 sidebar/header slot | 需要验证课程长文宽度、TOC、移动端侧栏和 raw HTML，不要改全站个性化样式 |
| `astro.config.ts` | `site` 已为 `https://blog.everlasting.xin`；`trailingSlash: 'ignore'`；`output: 'static'`；已有 `remarkMath` + `rehypeKatex`；redirect 目前只有 `/archive` → `/archives` | 课程要求的尾斜杠、索引路由、旧 `/CS61B/2021Spring/**` 静态跳转需增加明确实现和构建验证 |

重要路由细节：Astro 的 rest 动态路由要求静态输出时为每个参数生成 `getStaticPaths()`；当前简单使用 `post.id` 会把 `cs61b/2021spring/index.md` 生成到可能的 `/docs/cs61b/2021spring/index/`，与期望的课程根 `/docs/cs61b/2021spring/` 不一致。实现必须提供 `index` → 父目录的规范化函数，并让侧栏、RSS、canonical、旧站跳转共用它。

旧地址跳转建议：为 `/CS61B/2021Spring/` 及其 53 个页面生成静态 HTML 跳转页，或者增加专门的静态 rest redirect route；不要只假定服务器级 301 在 GitHub Pages 上存在。每个跳转页的最终目标必须经过构建产物检查。

## 11. 目标目录结构（源审计结构；当前发布范围见第 18 节）

```text
src/content/docs/cs61b/2021spring/
├── course/
│   └── index.md
├── chapters/
│   ├── 00-introduction.md
│   ├── 01-java-basics.md
│   └── … 其余 20 个章节页
├── labs/
│   ├── index.md
│   └── 11 个实验页
├── projects/
│   ├── index.md
│   └── 6 个项目页
└── （不导入 homeworks/、exams/、about.md 和顶层 index.md）

public/docs-assets/cs61b/2021spring/assets/
├── coursework/  # 76 个被正文引用的资源
└── images/      # 164 个被正文引用的资源
```

当前发布结构对应 42 个内容页面和 240 个被正文实际引用的图片；源中未引用的 112 个资源不在复制集合内。

## 12. Astro 组件/实现改动对照清单

1. **内容集合 schema**：保留当前主题字段约束，补充受控的 `hide`/导航元数据能力，或在迁移转换时把特殊页面元数据移入独立映射；绝不把 `template: course-home.html` 原样当作可执行 Astro 模板。
2. **内容转换器**：为 22 个章节补标题，去除会与路由重复的第一个 H1，处理 56 个显式 heading ID 和 7 个链接属性列表；正文代码、公式、外部 URL 不做语义改写。
3. **课程导航数据**：从源 `mkdocs.yml` 固化一个经过审查的 CS61B 多级导航树，保留 8 个一级节点、中文显示名和原叶子顺序；`DocsContents.astro` 改为通用树渲染，不再硬编码三组主题文档。
4. **索引路由**：统一 `index.md` → 父目录、非 index 文件 → 去扩展名路径的函数，供 `[...id].astro`、侧栏、RSS、canonical 和跳转页复用。
5. **课程主页**：把 `course/index.md` 中的原始 HTML/日历/公告拆解为 Astro 可维护组件或至少提供专用 CSS；处理原 `course-home.html` 和 Material 类名的等价物。
6. **图片与 RSS**：按第 7.5 节推荐的 `public/docs-assets` 方案重写 241 次图片引用；RSS 改为使用绝对静态图片 URL，或实现可靠的 source-relative asset resolver。
7. **Mermaid**：对 2 个 Mermaid 图作出明确产品选择；若渲染，添加集成、客户端加载/构建检查和失败回退；若不渲染，验收标准应明确为代码块可读。
8. **旧 URL 兼容**：覆盖旧大写课程前缀、根路径、所有页面路径和片段；静态 GitHub Pages 下验证跳转 HTML，而不是只看配置文件。
9. **文档入口与元数据**：在 `/docs/` 入口展示 CS61B，修正错误的 Astro Theme Pure 编辑链接，补齐课程来源、许可证和搜索/归档/RSS 的课程页面纳入逻辑。

## 13. 许可、署名与外部内容

事实来源：

- 源课程目录自身没有独立 `README` 或 `LICENSE`；父仓库许可证为 `D:\project\CS-Self-Leanring-Materials\LICENSE.md`，标题为 `CC BY-NC-SA 4.0`。
- 父仓库许可证要求署名 Josh Hug、中文整理者 everlasting 和来源，并遵守署名、非商业、相同方式共享和不增加额外限制等条件；法律文本为 `https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.zh-hans`。
- 源 `docs/about.md` 明确给出原作 Josh Hug、UC Berkeley CS61B Spring 2021、原始网站 `https://joshhug.gitbooks.io/hug61b/content/`、课程网站 `https://sp21.datastructur.es/`、中文整理者 everlasting 和 CC BY-NC-SA 4.0。
- 各章节页页尾保留“原作 Josh Hug / 中文整理 everlasting / 非商业学习 / CC BY-NC-SA 4.0 / 原始网站”的署名信息；4 个考试页也有原始来源与许可证链接。
- `mkdocs.yml` 的 copyright 当前为 `原作 Josh Hug · 中文整理 everlasting · CC BY-NC-SA 4.0`，并含许可证链接；迁移后必须在课程 About/页尾继续可见。

边界：课程页中的外部视频、仓库、图片和其他站点资源不应自动宣称都受父仓库 CC 许可证覆盖；继续保留各自外链与原有署名，必要时在 About 中区分“翻译整理内容”和第三方资源。源实验文档还包含一个公开样式的 Berkeley 邮箱示例；迁移时保留/脱敏必须由用户明确决定，审计文件不复制该地址。

## 14. 构建、验证与上线命令

### 14.1 源仓库已有命令（只记录，不执行）

- 父仓库严格构建：`./scripts/build.sh`（Docker；构建门户与 CS61B、生成跳转并校验）。
- 父仓库本地预览：`./scripts/serve.sh`，地址 `http://127.0.0.1:8000/`。
- 差异检查：`git diff --check`。
- 2021Spring 子目录本身没有独立 `requirements.txt`、构建脚本或许可证文件；依赖由父仓库管理，记录的版本包括 `mkdocs-material==9.7.7`、`jieba==0.42.1`、`beautifulsoup4==4.13.4`。

### 14.2 当前 Astro 项目命令

- 安装：`bun install --frozen-lockfile`。
- 类型/内容检查：`bun run check`（`astro check`）。
- 构建：`bun run build`，脚本内部依次包含 `astro-pure check`、`astro check`、`astro build`。
- CI `build.yml` 在 push/PR `main` 上执行 Bun 安装、check 和 build；`deploy.yml` 用 `withastro/action@v6`、Bun 和 GitHub Pages 部署。
- 按项目 `AGENTS.md` 预览：`astro dev --background`；管理：`astro dev status`、`astro dev logs`、`astro dev stop`。

审计阶段没有执行安装、开发服务器、构建或 GitHub Pages 发布；后续实现阶段已使用 pnpm 完成同步、检查和构建，当前 PowerShell PATH 中未发现独立 `bun` 命令（`Get-Command bun` 返回 NOT_FOUND）。

### 14.3 迁移完成后的验证顺序

1. 在不改源仓库的前提下复制/转换内容后执行 `bun install --frozen-lockfile`、`bun run check`、`bun run build`。
2. 用 `astro dev --background` 预览，检查课程根、目录页、章节、实验、作业、项目、考试和 About；确认目录页 `index` 不多出一层。
3. 统计构建产物：53 个 CS61B 页面、所有索引页、240 个图片文件/241 次引用、RSS、Sitemap、搜索索引均无 404 或构建错误。
4. 对源内部链接做自动化重写回查：27 个相对 `.md`、94 次旧绝对内部路径、209 个片段链接全部有预期目标；外部 `.md` 链接与外链 URL 不变。
5. 运行 HTML 检查：无重复顶层 H1；56 个显式 ID 可定位；所有本地片段 0 个未解析；表格、raw HTML、代码块和公式可见；Mermaid 按最终产品决策验收。
6. 做移动端和宽屏检查，尤其是 `course/index.md` 的公告/日历、长表格、代码块、图片和侧栏；不要用全站样式回归掩盖课程主页的局部问题。
7. 发布前检查 `git diff --check`、工作区 diff 和源仓库只读状态；只有用户另行要求时才 commit/push。

## 15. 预期风险

- **路由风险**：`index.md` 的 collection ID、尾斜杠策略和 GitHub Pages 静态跳转可能产生 `/index/`、大小写或相对路径错误。
- **锚点风险**：56 个显式 ID 当前不会被 Astro 原生 Markdown 解析；自动 slug 可能改变中文、数字开头或代码标题的 ID。
- **布局风险**：52 个正文 H1 与现有路由标题重复；`course/index.md` 没有普通 Markdown H1，却有 raw HTML 结构，不能套同一规则。
- **课程主页风险**：`course-home.html`、Material CSS 类、日历和大段 raw HTML 在新主题中没有同等模板；简单保留 HTML 可能可读但样式/响应式失效。
- **资源风险**：当前 RSS 图片解析假设图片与文章同目录且路径以 `./` 开头；源文件使用 `../assets`，还包含 SVG/GIF/JPG。
- **语法风险**：`.md-button`、`target/rel` 属性列表、`markdown` HTML 属性和 Mermaid 在当前配置中不等价。
- **排序/元数据风险**：源没有日期、标签和草稿字段；若随意补日期，会改变排序、RSS 和 SEO 语义。
- **许可证风险**：翻译整理许可与第三方课程资源/外链许可边界必须继续清晰，不能只复制一段版权文字就覆盖所有资产。
- **体积风险**：352 个源资产中有 107 个 MathJax vendor 文件未被正文引用；全量复制会增加仓库和部署负担。

## 16. 明确验收标准

- [ ] 源目录 `D:\project\CS-Self-Leanring-Materials\courses\CS61B\2021Spring` 在迁移前后保持只读、无新增/删除/修改；审计阶段没有写入源仓库。
- [ ] 目标包含精确 53 个 CS61B Markdown 页面，所有 53 个 `mkdocs.yml` 叶子都能在新导航树中访问，0 个 orphan/missing 页面。
- [ ] `index.md`、`course/index.md`、各分组 `index.md` 分别落在课程根或对应分组根，不产生多余 `/index/` 层。
- [ ] 240 个唯一图片资源全部存在，241 次 Markdown 图片引用全部返回 200；HTML 图片引用为 0 的事实不被迁移改写成错误 `<img>` 路径。
- [ ] 27 个相对 `.md` 内链和 94 次旧绝对内部路径已重写；旧 `/CS61B/2021Spring/**` 静态跳转均到对应新 `/docs/cs61b/2021spring/**`；外部链接保持不变。
- [ ] 56 个显式标题 ID 全部保留语义；209 个片段链接逐一解析，未解析数为 0；无重复顶层 H1。
- [ ] 200 个行内公式和 25 个块级公式成功渲染；实际审计为 814 个 fenced blocks，语言分布在构建后逐类验收；Java、text、bash、Python、Matlab、Scheme 均可读，Mermaid 按决策通过。
- [ ] 课程主页 raw HTML/日历/表格在桌面和移动端可读；`template`/`hide` 语义有明确实现；侧栏显示完整中文导航。
- [ ] `bun run check`、`bun run build`、`git diff --check` 全部通过；搜索、RSS、Sitemap 和静态资源无构建错误/404。
- [ ] 课程 About/页尾保留 Josh Hug、everlasting、原始课程链接、CC BY-NC-SA 4.0 和第三方资源边界说明。
- [ ] 审计文件完成不等于迁移完成；在用户明确允许前，不执行 commit、push、GitHub Pages 设置或 DNS 修改。

## 17. 参考资料

- Astro Routing：<https://docs.astro.build/en/guides/routing/>
- Astro Content Collections：<https://docs.astro.build/en/guides/content-collections/>
- Astro Markdown：<https://docs.astro.build/en/guides/markdown-content/>
- 源许可证法律文本：<https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.zh-hans>

## 18. 当前实施范围修订（以本节为准）

后续产品要求将发布范围从源仓库的完整 53 页收窄为只发布课程教材、实验和项目内容。源仓库仍严格只读，以下是目标博客的实际结果：

- 保留并导入 **42 个页面**：`course/index.md`、22 个 `chapters` 页面、12 个 `labs` 页面、7 个 `projects` 页面。
- 不导入并已从目标生成目录安全删除：顶层 `index.md`（截图中的课程入口页）、`about.md`、全部 `homeworks/`、全部 `exams/`。
- 页面仍统一位于 `/docs/cs61b/2021spring/`；顶层课程入口页不再生成，访问其路径返回 404。
- 240 个图片资源和 241 次图片引用数量未因删页变化；被删除页面没有独占图片资源。
- 191 个显式标题 ID（涉及 13 个源文件）已转换为 `<a id="…"></a>` 加普通 Markdown 标题，正文和 TOC 不再显示 `{ #id }` 或 `${ #id }` 残留。代码示例中的 `${COMMIT_HEAD}`、`${1}` 等变量属于正文语义，保留不改。
- `/docs/` 仍使用 Astro Theme Pure 的 `DocsContents` 列表展示课程文章；文档文章页关闭整个左侧侧栏及移动端侧栏按钮，普通博客页的布局侧栏保持原有默认行为。
- `pnpm import:cs61b`、`pnpm check:cs61b`、`pnpm sync`、`pnpm check` 和 `pnpm build` 均作为当前实现的验证命令；导入器重复执行应保持无差异。
