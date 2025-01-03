# Contributing to Buckalew Financial Services

We love your input! We want to make contributing to Buckalew Financial Services as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/buckalew-financial-services.git
   cd buckalew-financial-services
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Testing

Run the full test suite:
```bash
npm test
```

Run specific tests:
```bash
npm test -- financial-calculations.test.js
```

## Coding Style

- Use 2 spaces for indentation
- Use meaningful variable names
- Write comments for complex logic
- Follow ESLint rules

## Security

- Never commit sensitive credentials
- Always validate user input
- Follow OWASP security guidelines
- Report security vulnerabilities privately

## Deployment

We use GitHub Actions for CI/CD. The deployment process is:

1. Merge to main triggers tests
2. Passing tests trigger staging deploy
3. Manual approval for production

## License

By contributing, you agree that your contributions will be licensed under its MIT License.