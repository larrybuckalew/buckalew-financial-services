const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages(directory) {
  try {
    const files = await fs.readdir(directory);
    
    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png)$/i)) {
        const filePath = path.join(directory, file);
        const outputPath = path.join(directory, `optimized-${file}`);
        
        await sharp(filePath)
          .resize(1920, 1080, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .jpeg({ quality: 80 })
          .toFile(outputPath);
          
        // Replace original with optimized version
        await fs.unlink(filePath);
        await fs.rename(outputPath, filePath);
        
        console.log(`Optimized: ${file}`);
      }
    }
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

const imageDirectories = [
  './public/images',
  './public/icons'
];

imageDirectories.forEach(dir => {
  optimizeImages(dir);
});