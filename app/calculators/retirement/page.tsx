export default function RetirementCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Retirement Savings Calculator</h1>
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
        <form className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="current-age" className="block mb-2">Current Age</label>
              <input
                type="number"
                id="current-age"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter your current age"
              />
            </div>
            <div>
              <label htmlFor="retirement-age" className="block mb-2">Desired Retirement Age</label>
              <input
                type="number"
                id="retirement-age"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter retirement age"
              />
            </div>
          </div>
          <div>
            <label htmlFor="annual-income" className="block mb-2">Current Annual Income</label>
            <input
              type="number"
              id="annual-income"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your annual income"
            />
          </div>
          <div>
            <label htmlFor="current-savings" className="block mb-2">Current Retirement Savings</label>
            <input
              type="number"
              id="current-savings"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your current retirement savings"
            />
          </div>
          <div>
            <label htmlFor="monthly-contribution" className="block mb-2">Monthly Contribution</label>
            <input
              type="number"
              id="monthly-contribution"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter monthly contribution"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Calculate Retirement Needs
          </button>
        </form>
      </div>
    </div>
  )
}