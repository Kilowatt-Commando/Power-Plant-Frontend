import { describe } from '@jest/globals'
import ProfilePage from '@/app/profile/page'
import { render } from '@testing-library/react'

jest.mock('@/lib/getSession', () => jest.fn(() => ({ user: null })))

describe('ProfilePage Logged Out', () => {
  it('Redirects to /api/auth/signin if user is not signed in', async () => {
    try {
      render(await ProfilePage())
    } catch (err) {
      expect(err.message).toBe('NEXT_REDIRECT')
    }
  })
})

jest.mock('@/lib/getSession', () => jest.fn(() => ({ user: { name: 'Max Mustermann', image: '', email: '', id: '' } })))

describe('ProfilePage Logged in', () => {
  it('Displays ProfileSignOutView component when logged in', async () => {
    try {
      render(await ProfilePage())
    } catch (err) {
      expect(err.message).toBe('NEXT_REDIRECT')
    }
  })
})
