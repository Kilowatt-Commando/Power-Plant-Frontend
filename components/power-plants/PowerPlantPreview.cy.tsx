import React from 'react'
import PowerPlantPreview from './PowerPlantPreview'

describe('<PowerPlantPreview />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PowerPlantPreview />)
  })
})