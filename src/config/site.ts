import { SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'Buckalew Financial Services',
  description: 'Expert financial planning, Medicare, and insurance solutions tailored to your needs.',
  url: 'https://buckalewfinancialservices.com',
  links: {
    facebook: 'https://facebook.com/buckalewfinancial',
    linkedin: 'https://linkedin.com/company/buckalew-financial-services'
  },
  nav: [
    {
      title: 'Home',
      href: '/'
    },
    {
      title: 'Services',
      href: '/services'
    },
    {
      title: 'About',
      href: '/about'
    },
    {
      title: 'Contact',
      href: '/contact'
    }
  ]
}
