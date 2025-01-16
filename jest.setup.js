import '@testing-library/jest-dom'

global.ResizeObserver = require('resize-observer-polyfill')

jest.mock('next/router', () => require('next-router-mock'))
jest.mock('next/navigation', () => require('next-router-mock/navigation'))