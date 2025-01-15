export interface NavItem {
  title: string
  href: string
  description?: string
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  links: {
    facebook: string
    linkedin: string
  }
  nav: NavItem[]
}
