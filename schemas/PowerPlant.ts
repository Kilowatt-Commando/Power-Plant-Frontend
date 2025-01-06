import { z } from 'zod'

const PowerPlantSchema = z.object({
  id: z.number(),
  name: z.string(),
  waterThroughput: z.number(),
  rpm: z.number(),
  outputVoltage: z.number(),
})

export type PowerPlant = z.infer<typeof PowerPlantSchema>

const getRandomInt = (min = 0, max = 100) => {
  return (Math.floor(Math.random() * max) + min) % max
}

export function createDummyPowerPlants(amount: number): PowerPlant[] {
  return Array.from({ length: amount }).map(() => ({
    id: getRandomInt(),
    name: 'Dummy Power Plant',
    waterThroughput: getRandomInt(),
    rpm: getRandomInt(0, 1000),
    outputVoltage: getRandomInt(100, 230),
  }))
}

export function validatePowerPlant(obj: any): PowerPlant | never {
  return PowerPlantSchema.parse(obj)
}
