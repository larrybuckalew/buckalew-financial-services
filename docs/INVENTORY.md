# Project Inventory

## Components

### UI Components
- Button
- Card
- Input
- Select
- Form
- Modal

### Feature Components
- MortgageCalculator
- RetirementCalculator
- InsuranceCalculator
- SavingsCalculator
- InvestmentCalculator
- BudgetCalculator
- ServiceCard
- TestimonialCard
- ContactForm
- Hero

### Layout Components
- Header
- Footer
- Layout
- PageTemplate
- Navigation

## Pages
1. Core Pages
   - Home (/)
   - About (/about)
   - Contact (/contact)
   - Services (/services)
   - Privacy Policy (/privacy)

2. Service Pages
   - Financial Planning (/services/financial-planning)
   - Investment Management (/services/investment-management)
   - Insurance Solutions (/services/insurance-solutions)
   - Retirement Planning (/services/retirement)

3. Calculator Pages
   - Mortgage Calculator (/calculators/mortgage)
   - Retirement Calculator (/calculators/retirement)
   - Insurance Calculator (/calculators/insurance)
   - Savings Calculator (/calculators/savings)
   - Investment Calculator (/calculators/investment)
   - Budget Calculator (/calculators/budget)

4. Authentication Pages
   - Login (/auth/login)
   - Register (/auth/register)
   - Reset Password (/auth/reset-password)

## Features

### Core Features
1. Authentication & Authorization
   - User login/signup
   - Password reset
   - Session management

2. Financial Calculators
   - Mortgage calculations
   - Retirement projections
   - Insurance needs analysis
   - Investment returns
   - Budgeting tools
   - Savings projections

3. Client Management
   - Contact form submissions
   - Appointment scheduling
   - Client dashboard
   - Document management

4. Content Management
   - Service information
   - Blog posts
   - Resources
   - FAQs

## Dependencies Map

### Component Dependencies
- UI Components < Feature Components < Pages
- Layout Components < Pages
- Feature Components < Pages

### Feature Dependencies
- Authentication < Client Management
- Calculators < Client Dashboard
- Contact Form < Client Management

## Migration Priority

1. High Priority
   - Core UI components
   - Layout components
   - Authentication system
   - Main service pages
   - Contact functionality

2. Medium Priority
   - Calculator components
   - Client management features
   - Blog system
   - Resource center

3. Low Priority
   - Advanced analytics
   - Additional calculators
   - Marketing features