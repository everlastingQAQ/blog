import type { CollectionEntry } from 'astro:content'

export type DocsNavigationItem = {
  href: string
  label: string
  order: number
}

export type DocsNavigationGroup = {
  children: DocsNavigationGroup[]
  items: DocsNavigationItem[]
  key: string
  label: string
  order: number
}

type SidebarGroup = {
  label: string
  order?: number
}

const collator = new Intl.Collator('zh-CN', {
  numeric: true,
  sensitivity: 'base'
})

function humanizePathSegment(segment: string) {
  const decoded = decodeURIComponent(segment)
  const words = decoded.replace(/[-_]+/g, ' ').trim()

  if (!words) return '文档'
  if (/^[a-z]+\d+[a-z\d]*$/i.test(words)) return words.toUpperCase()

  return words.charAt(0).toUpperCase() + words.slice(1)
}

function inferredGroups(doc: CollectionEntry<'docs'>): SidebarGroup[] {
  const segments = doc.id.split('/').filter(Boolean)
  const isDirectoryIndex = /(^|[\\/])index\.(md|mdx)$/i.test(doc.filePath ?? '')
  const directorySegments = isDirectoryIndex ? segments : segments.slice(0, -1)

  if (directorySegments.length === 0) {
    return [{ label: '其他文档', order: doc.data.order }]
  }

  return directorySegments.map((segment) => ({
    label: humanizePathSegment(segment),
    order: doc.data.order
  }))
}

function groupsForDoc(doc: CollectionEntry<'docs'>) {
  const configured = doc.data.sidebar?.groups
  return configured?.length ? configured : inferredGroups(doc)
}

function sortGroups(groups: DocsNavigationGroup[]) {
  groups.sort(
    (left, right) => left.order - right.order || collator.compare(left.label, right.label)
  )

  for (const group of groups) {
    group.items.sort(
      (left, right) => left.order - right.order || collator.compare(left.label, right.label)
    )
    sortGroups(group.children)
  }
}

export function buildDocsNavigation(docs: CollectionEntry<'docs'>[]) {
  const roots: DocsNavigationGroup[] = []

  for (const doc of docs) {
    if (doc.data.sidebar?.hidden) continue

    const groups = groupsForDoc(doc)
    let siblings = roots
    let parentKey = ''
    let currentGroup: DocsNavigationGroup | undefined

    for (const configuredGroup of groups) {
      const key = `${parentKey}/${configuredGroup.label}`
      currentGroup = siblings.find((group) => group.key === key)

      if (!currentGroup) {
        currentGroup = {
          children: [],
          items: [],
          key,
          label: configuredGroup.label,
          order: configuredGroup.order ?? doc.data.order
        }
        siblings.push(currentGroup)
      } else {
        currentGroup.order = Math.min(currentGroup.order, configuredGroup.order ?? doc.data.order)
      }

      parentKey = key
      siblings = currentGroup.children
    }

    currentGroup?.items.push({
      href: `/docs/${doc.id}/`,
      label: doc.data.sidebar?.label ?? doc.data.title,
      order: doc.data.order
    })
  }

  sortGroups(roots)
  return roots
}

export function normalizeDocsPath(pathname: string) {
  return pathname.endsWith('/') ? pathname : `${pathname}/`
}

export function groupContainsPath(group: DocsNavigationGroup, pathname: string): boolean {
  const normalizedPath = normalizeDocsPath(pathname)
  return (
    group.items.some((item) => normalizeDocsPath(item.href) === normalizedPath) ||
    group.children.some((child) => groupContainsPath(child, normalizedPath))
  )
}
