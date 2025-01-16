import '@testing-library/jest-dom'
import ResizeObserver from 'resize-observer-polyfill'

global.ResizeObserver = ResizeObserver

import 'next-router-mock'
import { setupNavigation } from 'next-router-mock/navigation'

setupNavigation()