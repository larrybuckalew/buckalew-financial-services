const { chromium } = require('playwright')
const { AxeBuilder } = require('@axe-core/playwright')

async function runAccessibilityTests() {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  // Define pages to test
  const pagesToTest = [
    { url: 'http://localhost:3000', name: 'Home Page' },
    { url: 'http://localhost:3000/services', name: 'Services Page' },
    { url: 'http://localhost:3000/contact', name: 'Contact Page' }
  ]

  const results = []

  for (const pageTest of pagesToTest) {
    await page.goto(pageTest.url)

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()

    results.push({
      page: pageTest.name,
      violations: accessibilityScanResults.violations
    })
  }

  await browser.close()

  // Generate report
  console.log('Accessibility Test Results:')
  results.forEach(result => {
    console.log(`Page: ${result.page}`)
    if (result.violations.length === 0) {
      console.log('✅ No accessibility issues found')
    } else {
      console.log('❌ Accessibility violations detected:')
      result.violations.forEach(violation => {
        console.log(`- ${violation.id}: ${violation.description}`)
        violation.nodes.forEach(node => {
          console.log(`  Impact: ${violation.impact}`)
          console.log(`  HTML: ${node.html}`)
        })
      })
    }
  })

  // Exit with non-zero code if violations found
  process.exit(results.some(r => r.violations.length > 0) ? 1 : 0)
}

runAccessibilityTests()