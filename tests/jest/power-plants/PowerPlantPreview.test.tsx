import { describe, it } from '@jest/globals'
import { render } from '@testing-library/react'
import PowerPlantPreview from '@/components/power-plants/PowerPlantPreview'
import { createDummyPowerPlants } from '@/typings/Shared/PowerPlant'

const dummyPowerPlants = createDummyPowerPlants(5)

describe('PowerPlantPreview - ', () => {
  it('has correct redirect link', async () => {
    const href = '/test'
    const Component = await PowerPlantPreview({ ...dummyPowerPlants.at(0), previewHref: href })
    const { container } = render(Component)

    const links = container.getElementsByTagName('a')
    expect(links.length).toBeGreaterThanOrEqual(1)

    const link = links[0]

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', href)
  })

  it('displays correct power plant name and id', async () => {
    const Component = await PowerPlantPreview({ ...dummyPowerPlants.at(0) })
    const { container } = render(Component)

    const nameHeading = container.getElementsByTagName('h3')[0]
    const idSpan = container.getElementsByTagName('span')[0]

    expect(nameHeading).toBeInTheDocument()
    expect(nameHeading.textContent).toBe(dummyPowerPlants.at(0).name)

    expect(idSpan).toBeInTheDocument()
    expect(idSpan.textContent).toBe(`#${dummyPowerPlants.at(0).id}`)
  })
})