import { z } from 'zod'

const PowerPlantSchema = z.object({
  id: z.number(),
  name: z.string(),
  waterThroughput: z.number(),
  rpm: z.number(),
  outputVoltage: z.number(),
})

export type PowerPlant = z.infer<typeof PowerPlantSchema>

/**
 * This function generates a random number between min and max, by default between 0 and 100
 * @param min - minimum value, by default 0
 * @param max - maximum value, by default 100
 */
const getRandomValue = (min = 0, max = 100) => {
  return (Math.floor(Math.random() * max) + min) % max
}

export function createDummyPowerPlants(amount: number): PowerPlant[] {
  return Array.from({ length: amount }).map(() => ({
    id: getRandomValue(),
    name: 'Dummy Power Plant',
    waterThroughput: getRandomValue(),
    rpm: getRandomValue(0, 1000),
    outputVoltage: getRandomValue(100, 230),
  }))
}

export function validatePowerPlant(obj: any): PowerPlant | never {
  return PowerPlantSchema.parse(obj)
}
