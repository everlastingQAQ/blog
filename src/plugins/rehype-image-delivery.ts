import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

type HastNode = {
  type?: string
  tagName?: string
  properties?: Record<string, unknown>
  children?: HastNode[]
}

const PUBLIC_IMAGE_PREFIX = '/docs-assets/cs61b/2021spring/assets/'
const publicRoot = path.resolve(process.cwd(), 'public')

function collectImages(node: HastNode, images: HastNode[]) {
  if (node.type === 'element' && node.tagName === 'img') images.push(node)
  for (const child of node.children ?? []) collectImages(child, images)
}

function resolvePublicImage(src: string) {
  const target = path.resolve(publicRoot, decodeURIComponent(src.slice(1)))
  const relative = path.relative(publicRoot, target)
  if (relative === '' || relative.startsWith('..') || path.isAbsolute(relative)) return null
  return target
}

export default function rehypeImageDelivery() {
  return async (tree: HastNode) => {
    const images: HastNode[] = []
    collectImages(tree, images)

    await Promise.all(
      images.map(async (image) => {
        const properties = (image.properties ??= {})
        properties.loading ??= 'lazy'
        properties.decoding ??= 'async'

        const src = typeof properties.src === 'string' ? properties.src : ''
        if (!src.startsWith(PUBLIC_IMAGE_PREFIX)) return

        const imagePath = resolvePublicImage(src)
        if (!imagePath || !fs.existsSync(imagePath)) return

        const metadata = await sharp(imagePath, { animated: true }).metadata()
        const height = metadata.pageHeight ?? metadata.height
        if (metadata.width && height) {
          properties.width ??= metadata.width
          properties.height ??= height
        }
      })
    )
  }
}
