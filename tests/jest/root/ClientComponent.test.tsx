import { it } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import ClientComponent from '@/components/ClientComponent'

it('test client component', async () => {
  const Component = await ClientComponent()
  render(Component)

  const heading = screen.getByRole('heading', { level: 1 })
  expect(heading).toBeInTheDocument()
})
