import { it } from '@jest/globals'
import { render, renderHook, screen } from '@testing-library/react'
import ClientComponent from '@/components/ClientComponent'

it('test client component', async () => {
  renderHook(() => render(ClientComponent()))

  const heading = screen.getByRole('heading', { level: 1 })
  expect(heading).toBeInTheDocument()
})
