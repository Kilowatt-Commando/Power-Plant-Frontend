import '@testing-library/jest-dom'
import '@testing-library/jest-dom/jest-globals'

//? Suppress console.error output that clutter the test output with irrelevant information
console.error = jest.fn()

//? Mocking the UserProfile component to prevent the test from failing due to the "UserProfile" component being asynchronous and thus not being able to properly render it.
jest.mock('./components/root/UserProfile/UserProfie', () => ({
  __esModule: true, // Indicates that the module uses ES modules
  default: jest.fn(), // Mock the default export as a Jest mock function
}))

//? Mocking the getSession function to prevent the test from failing due to the "getServerSession" function not being available in the test environment
jest.mock('./lib/getSession', () => ({
  __esModule: true, // Indicates that the module uses ES modules
  default: jest.fn(), // Mock the default export as a Jest mock function
}))

//? Mocking the ColorModeSwitcher component because Jest does not recognize the window.match function and thus cannot properly render the component
jest.mock('./components/root/ColorModeSwitcher', () => ({
  __esModule: true, // Indicates that the module uses ES modules
  default: jest.fn(), // Mock the default export as a Jest mock function
}))

//? Mocking the getColorMode function because the `cookies` property is not available in the jest test environment.
jest.mock('@/lib/getColorMode', () => ({
  __esModule: true, // Indicates that the module uses ES modules
  default: jest.fn(), // Mock the default export as a Jest mock function
}))
