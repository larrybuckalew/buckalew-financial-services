export const brandConfig = {
  colors: {
    primary: {
      light: '#C2EF7E',    // Color 1
      medium: '#85C872',   // Color 0
      dark: '#5EA669',     // Color 2
      text: '#285A84',     // Text color
    },
    background: '#FFFFFF',  // Background color
  },
  fonts: {
    primary: {
      name: 'Montserrat',
      weights: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      }
    }
  },
  spacing: {
    container: {
      maxWidth: '1400px',
      padding: '2rem',
    }
  },
  company: {
    name: 'Buckalew Financial Services',
    shortName: 'BFS',
    contact: {
      phone: '+1 (801) 234-5678',
      email: 'info@buckalewfinancial.com',
      address: {
        street: '123 Financial Plaza',
        suite: 'Suite 400',
        city: 'Salt Lake City',
        state: 'UT',
        zip: '84101',
      }
    },
    hours: {
      weekday: '9:00 AM - 5:00 PM MT',
      weekend: 'Closed'
    }
  }
} as const;