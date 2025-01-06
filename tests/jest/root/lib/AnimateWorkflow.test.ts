import { animateWorkflow, AnimateWorkflowProps } from '@/lib/root/AnimateWorkflow'
import { AnimationScope } from 'framer-motion'
import { beforeEach } from '@jest/globals'

const mockedAnimate = jest.fn()

beforeEach(() => {
  mockedAnimate.mockClear()
})

function getAnimationScope(elements_count: number) {
  const elements = Array.from({ length: elements_count }, (_, i) => ({ id: `${i}` }))

  const scope = {
    current: {
      children: elements,
    },
  } as AnimationScope

  return scope
}

describe('Testing the AnimateWorkflow function ', () => {
  test('check whether the function goes through the container elements', async () => {
    const ELEMENT_COUNT = 4
    const scope = getAnimationScope(ELEMENT_COUNT)

    await animateWorkflow({ iteration: 1, scope, animate: mockedAnimate, delay: 50, maxIterations: 1 })

    for (const element of scope.current.children) {
      expect(mockedAnimate).toBeCalledWith(`#${element.id}`, { opacity: 1 }, { duration: 0.75 })
    }
    expect(mockedAnimate).toHaveBeenCalledTimes(ELEMENT_COUNT)
  })

  test(
    'check whether the animation stops when maxIterations is reached',
    async () => {
      const ELEMENT_COUNT = 4
      const options: AnimateWorkflowProps = {
        iteration: 1,
        scope: getAnimationScope(ELEMENT_COUNT),
        animate: mockedAnimate,
        delay: 50,
        maxIterations: 3,
      }

      await animateWorkflow(options)

      // Each iterations calls animate twice expect the last one
      expect(mockedAnimate).toHaveBeenCalledTimes(ELEMENT_COUNT * options.maxIterations * 2 - ELEMENT_COUNT)
    },
    1000 * 30,
  )
})
