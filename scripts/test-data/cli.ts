import { Command } from 'commander';
import { testDataGenerator } from './generators';
import ora from 'ora';

const program = new Command();

program
  .name('test-data-generator')
  .description('CLI for generating test data')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate test data')
  .option('-u, --users <number>', 'Number of users to generate', '10')
  .option('-p, --portfolios <number>', 'Portfolios per user', '2')
  .option('-h, --holdings <number>', 'Holdings per portfolio', '10')
  .option('-t, --transactions <number>', 'Transactions per portfolio', '50')
  .option('-d, --documents <number>', 'Documents per user', '5')
  .action(async (options) => {
    const spinner = ora('Generating test data...').start();

    try {
      await testDataGenerator.generateTestData({
        userCount: parseInt(options.users),
        portfoliosPerUser: parseInt(options.portfolios),
        holdingsPerPortfolio: parseInt(options.holdings),
        transactionsPerPortfolio: parseInt(options.transactions),
        documentCount: parseInt(options.documents)
      });

      spinner.succeed('Test data generated successfully');
    } catch (error) {
      spinner.fail('Error generating test data');
      console.error(error);
      process.exit(1);
    }
  });

program
  .command('generate-behavior')
  .description('Generate realistic user behavior data')
  .requiredOption('-u, --user <id>', 'User ID')
  .option('-d, --days <number>', 'Number of days of data to generate', '30')
  .action(async (options) => {
    const spinner = ora('Generating user behavior data...').start();

    try {
      await testDataGenerator.generateRealisticUserBehavior(
        options.user,
        parseInt(options.days)
      );

      spinner.succeed('User behavior data generated successfully');
    } catch (error) {
      spinner.fail('Error generating user behavior data');
      console.error(error);
      process.exit(1);
    }
  });

program
  .command('cleanup')
  .description('Clean up test data')
  .option('--all', 'Remove all test data')
  .option('--users', 'Remove test users only')
  .option('--portfolios', 'Remove test portfolios only')
  .option('--before <date>', 'Remove data before date')
  .action(async (options) => {
    const spinner = ora('Cleaning up test data...').start();

    try {
      if (options.all) {
        await testDataGenerator.cleanupAllTestData();
      } else if (options.users) {
        await testDataGenerator.cleanupTestUsers();
      } else if (options.portfolios) {
        await testDataGenerator.cleanupTestPortfolios();
      } else if (options.before) {
        await testDataGenerator.cleanupDataBefore(new Date(options.before));
      } else {
        spinner.fail('No cleanup option specified');
        process.exit(1);
      }

      spinner.succeed('Test data cleaned up successfully');
    } catch (error) {
      spinner.fail('Error cleaning up test data');
      console.error(error);
      process.exit(1);
    }
  });

program.parse();