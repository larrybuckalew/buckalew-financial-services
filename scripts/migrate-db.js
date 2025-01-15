const { execSync } = require('child_process');

// This script runs database migrations during the build process
async function main() {
  try {
    // Run database migrations
    console.log('Running database migrations...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });

    // Generate Prisma Client
    console.log('Generating Prisma Client...');
    execSync('npx prisma generate', { stdio: 'inherit' });

    console.log('Database migration completed successfully');
  } catch (error) {
    console.error('Error during database migration:', error);
    process.exit(1);
  }
}

main();