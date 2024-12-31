// Image Optimization Utility
const sharp = require('sharp');
const path = require('path');

class ImageOptimizer {
    constructor(options = {}) {
        this.config = {
            sizes: {
                thumbnail: 150,
                small: 300,
                medium: 600,
                large: 1200,
                og: 1200, // Open Graph image size
            },
            quality: {
                jpeg: 80,
                webp: 75,
                avif: 70
            },
            ...options
        };
    }

    async optimizeImage(inputPath, outputDir) {
        const filename = path.parse(inputPath).name;
        const promises = [];

        // Generate different sizes and formats
        for (const [sizeName, width] of Object.entries(this.config.sizes)) {
            // JPEG version
            promises.push(
                this.processImage(inputPath, {
                    width,
                    format: 'jpeg',
                    outputPath: path.join(outputDir, `${filename}-${sizeName}.jpg`)
                })
            );

            // WebP version
            promises.push(
                this.processImage(inputPath, {
                    width,
                    format: 'webp',
                    outputPath: path.join(outputDir, `${filename}-${sizeName}.webp`)
                })
            );

            // AVIF version for modern browsers
            promises.push(
                this.processImage(inputPath, {
                    width,
                    format: 'avif',
                    outputPath: path.join(outputDir, `${filename}-${sizeName}.avif`)
                })
            );
        }

        try {
            await Promise.all(promises);
            return {
                success: true,
                message: 'All image variants generated successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async processImage(inputPath, { width, format, outputPath }) {
        try {
            let pipeline = sharp(inputPath)
                .resize(width, null, {
                    fit: 'inside',
                    withoutEnlargement: true
                });

            // Apply format-specific optimizations
            switch (format) {
                case 'jpeg':
                    pipeline = pipeline.jpeg({
                        quality: this.config.quality.jpeg,
                        progressive: true
                    });
                    break;
                case 'webp':
                    pipeline = pipeline.webp({
                        quality: this.config.quality.webp,
                        lossless: false
                    });
                    break;
                case 'avif':
                    pipeline = pipeline.avif({
                        quality: this.config.quality.avif,
                        speed: 5
                    });
                    break;
            }

            // Add metadata
            pipeline = pipeline.withMetadata({
                exif: {
                    IFD0: {
                        Copyright: 'Buckalew Financial Services',
                        ImageDescription: `Optimized image for Buckalew Financial Services - ${width}px width`
                    }
                }
            });

            await pipeline.toFile(outputPath);
            return true;
        } catch (error) {
            console.error(`Error processing image: ${error.message}`);
            throw error;
        }
    }

    generateHTMLMarkup(filename, alt, sizes = 'auto') {
        return `
            <picture>
                <!-- AVIF format -->
                <source
                    type="image/avif"
                    srcset="
                        ${filename}-small.avif 300w,
                        ${filename}-medium.avif 600w,
                        ${filename}-large.avif 1200w"
                    sizes="${sizes}">
                <!-- WebP format -->
                <source
                    type="image/webp"
                    srcset="
                        ${filename}-small.webp 300w,
                        ${filename}-medium.webp 600w,
                        ${filename}-large.webp 1200w"
                    sizes="${sizes}">
                <!-- JPEG fallback -->
                <img
                    src="${filename}-medium.jpg"
                    srcset="
                        ${filename}-small.jpg 300w,
                        ${filename}-medium.jpg 600w,
                        ${filename}-large.jpg 1200w"
                    sizes="${sizes}"
                    alt="${alt}"
                    loading="lazy"
                    decoding="async">
            </picture>
        `;
    }

    generateBackgroundStyle(filename) {
        return `
            .bg-image {
                background-image: url('${filename}-large.jpg');
            }
            @supports (background-image: url('${filename}-large.webp')) {
                .bg-image {
                    background-image: url('${filename}-large.webp');
                }
            }
            @supports (background-image: url('${filename}-large.avif')) {
                .bg-image {
                    background-image: url('${filename}-large.avif');
                }
            }
            @media (max-width: 768px) {
                .bg-image {
                    background-image: url('${filename}-medium.jpg');
                }
                @supports (background-image: url('${filename}-medium.webp')) {
                    .bg-image {
                        background-image: url('${filename}-medium.webp');
                    }
                }
                @supports (background-image: url('${filename}-medium.avif')) {
                    .bg-image {
                        background-image: url('${filename}-medium.avif');
                    }
                }
            }
        `;
    }
}

module.exports = ImageOptimizer;