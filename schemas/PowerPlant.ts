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

/**
 * This function will create a given amount of (dummy) power plants objects with random values.
 * @param amount - amount of power plants to create
 */
export function createDummyPowerPlants(amount: number): PowerPlant[] {
  return Array.from({ length: amount }).map(() => ({
    id: getRandomValue(),
    name: 'Dummy Power Plant',
    waterThroughput: getRandomValue(),
    rpm: getRandomValue(0, 1000),
    outputVoltage: getRandomValue(100, 230),
  }))
}

/**
 * This function validates a given object against the PowerPlant schema. If the object is not valid, it will throw an error.
 * @param obj - object to validate
 */
export function validatePowerPlant(obj: any): PowerPlant | never {
  return PowerPlantSchema.parse(obj)
}
