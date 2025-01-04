'use client'

import PowerPlantImage from '@/public/images/power-plant-image.png'
import DatabaseServiceImage from '@/public/images/Database-Service.png'
import FrontendImage from '@/public/images/Frontend-Service.png'
import ControllerService from '@/public/images/Controller-Service.png'
import { useAnimate } from 'framer-motion'
import { useEffect } from 'react'
import { animateWorkflow } from '@/lib/root/AnimateWorkflow'
import { AnimateImageGroup } from '@/components/root/PowerPlantAnimation/AnimateImageGroup'

export default function AnimatedPowerPlant() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animateWorkflow({ iteration: 0, scope, animate, delay: 1000, maxIterations: 50 }).then()
  }, [])

  return (
    <div
      ref={scope}
      className='grid grid-cols-1 @[760px]:grid-cols-2 @[1800px]:grid-cols-4
                 max-w-[400px] @[760px]:max-w-[1000px] @[1800px]:max-w-[2000px]
                 pt-12 @[1800px]:pt-[25vh] gap-[5vw] mx-auto 
      '>
      <AnimateImageGroup step={1} id='backend' title='Simulation Service' image={PowerPlantImage} text='Generates Data' />
      <AnimateImageGroup step={2} id='db-controller' title={'DB Service'} image={DatabaseServiceImage} text='Stores the Data' imageDimensions={{ width: 170, height: 200 }} />
      <AnimateImageGroup step={3} id='frontend' title='Frontend' image={FrontendImage} text='Shows Data + Sends Commands' imageDimensions={{ width: 130 }} />
      <AnimateImageGroup step={4} id='controller-api' title='Controller Service' image={ControllerService} text='Receives commands from Frontend' />
    </div>
  )
}
