import { render, screen } from '@testing-library/react'
import Page from '../../../app/page'
import { describe, it } from '@jest/globals'
import * as matchers from '@testing-library/jest-dom/matchers'

describe('Page', () => {
  it('renders a heading', async () => {
    render(await Page())
    const heading = screen.getByRole('heading', { level: 1 })

    matchers.toBeInTheDocument(heading)
  })
})
