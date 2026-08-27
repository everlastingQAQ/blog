import type {
  CardListData,
  Config,
  IntegrationUserConfig,
  ThemeUserConfig
} from 'astro-pure/types'

export const theme: ThemeUserConfig = {
  // [基础信息]

  /** 网站标题，将用于 metadata 和浏览器标签页标题 */
  title: 'Everlasting Pages',

  /** 作者名称，将用于首页与版权信息 */
  author: 'Everlasting',

  /** 网站简介 */
  description: '记录编程、学习与生活',

  /** 网站图标，文件位于 public/ 目录 */
  favicon: '/favicon/favicon.ico',

  /** 网站分享时使用的默认预览图 */
  socialCard: '/images/social-card.png',

  /** 网站语言与日期格式 */
  locale: {
    lang: 'zh-CN',
    attrs: 'zh_CN',

    dateLocale: 'zh-CN',

    dateOptions: {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  },

  /** 首页头像 */
  logo: {
    src: '/src/assets/avatar.jpg',
    alt: 'Everlasting'
  },

  /** 页面标题分隔符，例如：文章标题 | Everlasting Pages */
  titleDelimiter: '|',

  /** 静态页面预渲染 */
  prerender: true,

  /** npm CDN */
  npmCDN: 'https://cdn.jsdelivr.net/npm',

  /** 自定义 head 内容 */
  head: [],

  /** 自定义 CSS */
  customCss: [],

  // [顶部导航栏]

  header: {
    menu: [
      { title: '博客', link: '/blog/' },
      { title: '文档', link: '/docs/' },
      { title: '项目', link: '/projects/' },
      { title: '友链', link: '/links/' },
      { title: '关于', link: '/about/' }
    ]
  },

  // [页脚]

  footer: {
    /** 自动显示当前年份 */
    year: `© ${new Date().getFullYear()}`,

    links: [
      // ICP 备案
      {
        title: '鄂ICP备2026035887号',
        link: 'https://beian.miit.gov.cn/',
        style: 'text-xs'
      },

      // 公安备案
      {
        title: '鄂公网安备42010402001794号',
        link: 'https://beian.mps.gov.cn/#/query/webSearch?code=42010402001794',
        style: 'text-xs'
      },
    ],

    /** 是否显示 Astro + Pure Theme 的 Powered by 信息 */
    credits: true,

    /** 社交链接 */
    social: [
      {
        icon: 'github',
        label: 'GitHub',
        href: 'https://github.com/everlastingQAQ/blog'
      },
      {
        icon: 'rss',
        label: 'RSS',
        href: '/rss.xml'
      }
    ]
  },

  // [内容]

  content: {
    /** 外部链接后显示 ↗ */
    externalLinks: {
      content: ' ↗',
      properties: {
        style: 'user-select:none'
      }
    },

    /** Blog 每页文章数量 */
    blogPageSize: 8,

    /** 文章分享按钮 */
    share: ['weibo', 'x', 'bluesky']

    /** 开启图片标题 */
    // imageCaption: true
  }
}

export const integ: IntegrationUserConfig = {
  // [友链]

  links: {
    /** 友链日志，没有内容可以先留空 */
    logbook: [],

    /** 别人申请你的友链时需要的信息 */
    applyTip: [
      {
        name: '名称',
        val: theme.title
      },
      {
        name: '简介',
        val: theme.description || '暂无简介'
      },
      {
        name: '链接',
        val: 'https://blog.everlasting.xin'
      },
      {
        name: '头像',
        val: 'https://blog.everlasting.xin/favicon/favicon.ico'
      }
    ],

    /** 是否把友链头像缓存到 public/avatars/ */
    cacheAvatar: false
  },

  // [站内搜索]

  pagefind: true,

  // [随机一言]

  quote: {
    /** 一言 API */
    server: 'https://v1.hitokoto.cn/?c=i',

    /** 从 API 返回数据中提取一言 */
    target: `(data) => (data.hitokoto || '暂时没有一言')`
  },

  // [文章排版]

  typography: {
    class: 'prose text-base',

    /** 中文大段引用使用正常字体会更易读 */
    blockquoteStyle: 'normal',

    /** 行内代码样式 */
    inlineCodeBlockStyle: 'modern'
  },

  // [图片放大]

  mediumZoom: {
    enable: true,

    selector: '.prose .zoomable',

    options: {
      className: 'zoomable'
    }
  },

  // [评论系统]

  waline: {
    enable: true,

    /**
     * Waline 服务地址
     * 建议之后替换成你自己部署的 Waline Server
     */
    server: 'https://astro-theme-pure-waline.arthals.ink/',

    /** 是否显示评论者设备等信息 */
    showMeta: true,

    /** 评论区表情 */
    emoji: ['bmoji', 'weibo'],

    additionalConfigs: {
      /** 浏览量统计 */
      pageview: true,

      /** 评论 */
      comment: true,

      /** 评论区中文文案 */
      locale: {
        reaction0: '喜欢',
        placeholder: '欢迎评论！填写邮箱可接收回复，无需登录。'
      },

      /** 禁止评论区上传图片 */
      imageUploader: false
    }
  }
}

export const terms: CardListData = {
  title: '网站政策',

  list: [
    {
      title: '隐私政策',
      link: '/terms/privacy-policy/'
    },
    {
      title: '使用条款',
      link: '/terms/terms-and-conditions/'
    },
    {
      title: '版权声明',
      link: '/terms/copyright/'
    },
    {
      title: '免责声明',
      link: '/terms/disclaimer/'
    }
  ]
}

const config = {
  ...theme,
  integ
} as Config

export default config
