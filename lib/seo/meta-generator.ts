import { Metadata } from 'next'

interface SeoMetadata {
  title: string
  description: string
  keywords?: string[]
  canonicalUrl?: string
}

export class SeoMetaGenerator {
  public static generate(config: SeoMetadata): Metadata {
    return {
      title: config.title,
      description: config.description,
      keywords: config.keywords?.join(', '),
      openGraph: {
        title: config.title,
        description: config.description,
        type: 'website',
        url: config.canonicalUrl || 'https://www.buckalew-financial.com',
        siteName: 'Buckalew Financial Services'
      },
      twitter: {
        card: 'summary_large_image',
        title: config.title,
        description: config.description
      },
      alternates: {
        canonical: config.canonicalUrl || 'https://www.buckalew-financial.com'
      }
    }
  }

  public static forPage(pageName: string): Metadata {
    const pageMetadata = {
      home: {
        title: 'Buckalew Financial Services - Expert Financial Planning',
        description: 'Comprehensive financial planning and investment management services tailored to your unique needs.',
        keywords: ['financial planning', 'investment management', 'wealth strategy', 'retirement planning']
      },
      services: {
        title: 'Our Financial Services | Buckalew Financial',
        description: 'Explore our range of financial services including investment management, retirement planning, and personalized financial strategies.',
        keywords: ['financial services', 'investment advice', 'financial consulting']
      },
      about: {
        title: 'About Buckalew Financial - Our Mission and Values',
        description: 'Learn about our commitment to providing personalized, strategic financial guidance.',
        keywords: ['financial advisors', 'about us', 'financial mission']
      }
    }

    return this.generate(pageMetadata[pageName as keyof typeof pageMetadata] || pageMetadata.home)
  }
}