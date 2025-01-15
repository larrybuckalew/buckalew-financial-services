# Accessibility Testing Guide for Buckalew Financial Services

## Manual Accessibility Testing Checklist

### Keyboard Navigation
- [ ] All interactive elements are focusable
- [ ] Focus states are clearly visible
- [ ] Can navigate entire site using keyboard
- [ ] Logical tab order
- [ ] Escape key closes modals and dropdowns

### Screen Reader Compatibility
- [ ] All images have meaningful alt text
- [ ] Form inputs have associated labels
- [ ] Complex components have proper ARIA attributes
- [ ] Error messages are announced
- [ ] Page titles and headings are descriptive

### Color and Contrast
- [ ] Minimum color contrast ratio of 4.5:1
- [ ] Color is not the only method of conveying information
- [ ] Works in high contrast mode
- [ ] Color scheme supports color-blind users

### Form Accessibility
- [ ] Error messages are clear and descriptive
- [ ] Required fields are marked
- [ ] Form validation is keyboard-accessible
- [ ] Error states are announced by screen readers

## Automated Testing Tools

### Recommended Tools
1. axe-core (React integration)
2. WAVE Web Accessibility Evaluation Tool
3. Lighthouse in Chrome DevTools
4. WebAIM Color Contrast Checker

### Browser Extensions
- Chrome Accessibility Insights
- Firefox WCAG Contrast Checker
- WAVE Evaluation Tool

## Testing Procedures

### Development Environment
```bash
# Run accessibility tests
npm run test:a11y

# Generate accessibility report
npm run a11y:report
```

### Common Issues to Check
- [ ] Semantic HTML usage
- [ ] ARIA attribute correctness
- [ ] Keyboard trap prevention
- [ ] Dynamic content accessibility
- [ ] Focus management in single-page applications

## Continuous Integration
Accessibility tests are integrated into CI/CD pipeline
- Blocks deployment if critical a11y issues detected
- Generates comprehensive accessibility report

## Reporting Issues
- Create GitHub issue with `accessibility` label
- Include:
  - Detailed description
  - Screenshots
  - Affected component/page
  - Recommended fix

## Training Resources
- [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)
- [MDN Web Docs - Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)