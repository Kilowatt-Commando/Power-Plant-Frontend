'use client'

import { AnimationScope } from 'framer-motion'
import { FramerMotionAnimate } from '@/typings/root/FramerMotionAnimate'

class GenericKeyframesTarget<T> {}

interface AnimateWorkflowProps {
  iteration: number
  scope: AnimationScope
  animate: FramerMotionAnimate
  maxIterations: number
  delay: number
}
export async function animateWorkflow({ iteration, ...props }: AnimateWorkflowProps) {
  const { scope, animate, delay, maxIterations } = props
  const children = scope.current.children

  for (let i = 0; i < children.length; i++) {
    const id: string = children[i].id
    console.log('Animating:', id)

    await wait(delay)
    animate(`#${id}`, { opacity: 1 }, { duration: 0.75 })
  }

  if (iteration > maxIterations) return

  Array.from(children).forEach((child) => animate(child, { opacity: 0 }, { duration: 0.6 }))

  await animateWorkflow({ iteration: iteration + 1, ...props })
}

function wait(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
