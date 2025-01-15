
# API Documentation

## Authentication

### Login
**POST** `/api/auth/login`
- **Request Body:**
  - `email` (string, required)
  - `password` (string, required)
- **Response:**
  - `token` (string)
  - `user` (object)

### Register
**POST** `/api/auth/register`
- **Request Body:**
  - `firstName` (string, required)
  - `lastName` (string, required)
  - `email` (string, required)
  - `password` (string, required)
- **Response:**
  - `token` (string)
  - `user` (object)

## Calculators

### Retirement Savings Calculator
**POST** `/api/calculators/retirement`
- **Request Body:**
  - `retirementAge` (number, required)
  - `currentAge` (number, required)
  - `currentSavings` (number, required)
  - `monthlySavings` (number, required)
  - `desiredRetirementIncome` (number, required)
- **Response:**
  - `annualRetirementIncome` (number)
