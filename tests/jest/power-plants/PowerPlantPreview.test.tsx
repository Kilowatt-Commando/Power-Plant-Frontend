import { describe, it } from '@jest/globals'
import { render } from '@testing-library/react'
import PowerPlantPreview from '@/components/power-plants/PowerPlantPreview'
import { createDummyPowerPlants } from '@/schemas/PowerPlant'

const dummyPowerPlants = createDummyPowerPlants(5)

describe('PowerPlantPreview - ', () => {
  it('has correct redirect link', async () => {
    const href = '/test'
    const powerPlant = dummyPowerPlants.at(0)
    const encodedPowerPlant = encodeURIComponent(
      JSON.stringify({
        id: powerPlant.id,
        name: powerPlant.name,
        status: powerPlant.status,
        rpm: powerPlant.rpm,
        outputVoltage: powerPlant.outputVoltage,
        waterThroughput: powerPlant.waterThroughput,
        nextWeather: powerPlant.nextWeather,
        timestamp: powerPlant.timestamp,
      }),
    )

    const { container } = render(<PowerPlantPreview {...powerPlant} previewHref={href} />)

    const links = container.getElementsByTagName('a')
    expect(links.length).toBeGreaterThanOrEqual(1)

    const link = links[0]

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', `${href}?powerplant=${encodedPowerPlant}`)
  })

  it('displays correct power plant name and id', async () => {
    const powerPlant = dummyPowerPlants.at(0)
    const { container } = render(<PowerPlantPreview {...powerPlant} />)

    const nameHeading = container.getElementsByTagName('h3')[0]
    const idSpan = container.getElementsByTagName('span')[0]

    expect(nameHeading).toBeInTheDocument()
    expect(nameHeading.textContent).toBe(powerPlant.name)

    expect(idSpan).toBeInTheDocument()
    expect(idSpan.textContent).toBe(`#${powerPlant.id}`)
  })
})
