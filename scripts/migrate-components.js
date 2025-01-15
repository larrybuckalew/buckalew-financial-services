const fs = require('fs').promises;
const path = require('path');

async function migrateComponents() {
  // List of component categories to migrate
  const categories = [
    'calculators',
    'clients',
    'documents',
    'error',
    'features',
    'layout',
    'policies',
    'ui'
  ];

  for (const category of categories) {
    try {
      // Create category directory if it doesn't exist
      const categoryPath = path.join('./src/components', category);
      await fs.mkdir(categoryPath, { recursive: true });

      // Move components from legacy to new structure
      const oldPath = path.join('./project-sources', category);
      const files = await fs.readdir(oldPath).catch(() => []);

      for (const file of files) {
        if (file.endsWith('.tsx') || file.endsWith('.ts')) {
          await fs.copyFile(
            path.join(oldPath, file),
            path.join(categoryPath, file)
          );
          console.log(`Migrated: ${file} to ${category}`);
        }
      }
    } catch (error) {
      console.error(`Error migrating ${category}:`, error);
    }
  }
}

migrateComponents().catch(console.error);