
import { Metadata } from 'next'
import Link from 'next/link'
import { useState } from 'react'

export const metadata: Metadata = {
  title: 'Financial Calculators - Buckalew Financial Services',
  description: 'Use our financial calculators to plan your future'
}

export default function CalculatorsPage() {
  const [selectedCalculator, setSelectedCalculator] = useState('retirement')
  const [inputs, setInputs] = useState({
    retirementAge: 65,
    currentAge: 35,
    currentSavings: 100000,
    monthlySavings: 500,
    desiredRetirementIncome: 60000
  })
  const [result, setResult] = useState(0)

  const calculateRetirementSavings = () => {
    // Implement retirement savings calculation logic
    const { retirementAge, currentAge, currentSavings, monthlySavings, desiredRetirementIncome } = inputs
    const yearsToRetirement = retirementAge - currentAge
    const totalSavings = currentSavings + (monthlySavings * 12 * yearsToRetirement)
    const annualRetirementIncome = totalSavings * 0.04 // Assuming 4% withdrawal rate
    setResult(annualRetirementIncome)
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-bfs-blue">Financial Calculators</h1>
            <p className="mt-6 text-xl text-bfs-blue">
              Tools to help you make informed financial decisions
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-bfs-blue mb-4">
              Retirement Savings Calculator
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="retirementAge" className="block text-sm font-medium text-bfs-blue">
                  Retirement Age
                </label>
                <input
                  type="number"
                  id="retirementAge"
                  value={inputs.retirementAge}
                  onChange={(e) => setInputs({ ...inputs, retirementAge: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bfs-green-0 focus:ring-bfs-green-0"
                />
              </div>
              <div>
                <label htmlFor="currentAge" className="block text-sm font-medium text-bfs-blue">
                  Current Age
                </label>
                <input
                  type="number"
                  id="currentAge"
                  value={inputs.currentAge}
                  onChange={(e) => setInputs({ ...inputs, currentAge: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bfs-green-0 focus:ring-bfs-green-0"
                />
              </div>
              <div>
                <label htmlFor="currentSavings" className="block text-sm font-medium text-bfs-blue">
                  Current Savings
                </label>
                <input
                  type="number"
                  id="currentSavings"
                  value={inputs.currentSavings}
                  onChange={(e) => setInputs({ ...inputs, currentSavings: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bfs-green-0 focus:ring-bfs-green-0"
                />
              </div>
              <div>
                <label htmlFor="monthlySavings" className="block text-sm font-medium text-bfs-blue">
                  Monthly Savings
                </label>
                <input
                  type="number"
                  id="monthlySavings"
                  value={inputs.monthlySavings}
                  onChange={(e) => setInputs({ ...inputs, monthlySavings: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bfs-green-0 focus:ring-bfs-green-0"
                />
              </div>
              <div>
                <label htmlFor="desiredRetirementIncome" className="block text-sm font-medium text-bfs-blue">
                  Desired Retirement Income
                </label>
                <input
                  type="number"
                  id="desiredRetirementIncome"
                  value={inputs.desiredRetirementIncome}
                  onChange={(e) => setInputs({ ...inputs, desiredRetirementIncome: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bfs-green-0 focus:ring-bfs-green-0"
                />
              </div>
            </div>
            <button
              onClick={calculateRetirementSavings}
              className="mt-6 px-4 py-2 bg-bfs-green-0 text-white rounded-md hover:bg-bfs-green-2"
            >
              Calculate
            </button>
            {result > 0 && (
              <div className="mt-6">
                <p className="text-bfs-blue font-medium">
                  Your estimated annual retirement income is ${result.toFixed(2)}.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
