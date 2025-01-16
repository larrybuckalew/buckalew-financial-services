/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Image optimization configurations
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    domains: [
      'localhost',
      'buckalew-financial.com',
      'cdn.buckalew-financial.com'
    ],
    
    // Optimize static images
    minimumCacheTTL: 60,
    
    // Custom image loader for external optimizations
    loader: 'default',
    path: '/_next/image',
  },

  // Performance and compression
  compress: true,

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Minimize CSS
    config.optimization.minimizer = [
      ...config.optimization.minimizer,
      new (require('css-minimizer-webpack-plugin'))()
    ];

    // Optimize images on server-side
    if (isServer) {
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      });
    }

    return config;
  },

  // Performance monitoring
  experimental: {
    // Enables automatic static optimization
    staticPageGenerationTimeout: 60,
  }
};

module.exports = nextConfig;
