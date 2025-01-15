const fs = require('fs').promises;
const path = require('path');

async function validateSetup() {
  const checks = {
    directories: {
      '_legacy': false,
      '_legacy/styles': false,
      '_legacy/scripts': false,
      'public/images': false,
      'public/icons': false,
      'public/fonts': false,
      'src/app': false,
      'src/components': false,
      'src/lib': false,
      'src/types': false,
      'src/styles': false,
      'docs': false,
      'e2e': false
    },
    files: {
      'jest.config.js': false,
      'playwright.config.ts': false,
      'tsconfig.json': false,
      'docs/README.md': false,
      'docs/INVENTORY.md': false
    }
  };

  // Check directories
  for (const dir of Object.keys(checks.directories)) {
    try {
      await fs.access(dir);
      checks.directories[dir] = true;
    } catch {}
  }

  // Check files
  for (const file of Object.keys(checks.files)) {
    try {
      await fs.access(file);
      checks.files[file] = true;
    } catch {}
  }

  // Report results
  console.log('Setup Validation Results:\n');
  
  console.log('Directories:');
  Object.entries(checks.directories).forEach(([dir, exists]) => {
    console.log(`${exists ? '✅' : '❌'} ${dir}`);
  });

  console.log('\nFiles:');
  Object.entries(checks.files).forEach(([file, exists]) => {
    console.log(`${exists ? '✅' : '❌'} ${file}`);
  });

  // Additional checks
  console.log('\nAdditional Checks:');
  
  // Check if components have tests
  const componentsWithTests = await hasComponentTests();
  console.log(`${componentsWithTests ? '✅' : '❌'} Component Tests`);

  // Check if types are defined
  const hasTypes = await checkTypeDefinitions();
  console.log(`${hasTypes ? '✅' : '❌'} Type Definitions`);
}

async function hasComponentTests() {
  try {
    const testFiles = await fs.readdir('src/components/ui/__tests__');
    return testFiles.length > 0;
  } catch {
    return false;
  }
}

async function checkTypeDefinitions() {
  try {
    const typeFiles = await fs.readdir('src/types');
    return typeFiles.length > 0;
  } catch {
    return false;
  }
}

validateSetup().catch(console.error);