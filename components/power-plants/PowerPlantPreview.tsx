import Link from 'next/link'
import Image from 'next/image'
import PowerPlantImage from '@/public/images/power-plant-image.png'
import { twMerge } from 'tailwind-merge'
import MetricColorization from '@/components/power-plants/MetricColorization'
import TemperatureSvg from '@/icons/TemperatureSvg'
import RpmSvg from '@/icons/RpmSvg'
import WaterLevelSvg from '@/icons/WaterLevelSvg'
import React from 'react'
import IconProps from '@/typings/icons/IconProps'
import { PowerPlant } from '@/schemas/PowerPlant'

export interface PowerPlantPreviewProps extends PowerPlant {
  previewHref?: string
}

/**
 * This component renders a preview of a power plant that shows its name and id and three of the most important metrics. When clicked it navigates to the power plant's detail page.
 */
export default function PowerPlantPreview({ id, name, status, rpm, outputVoltage, waterThroughput, nextWeather, timestamp, previewHref }: PowerPlantPreviewProps) {
  return (
    <Link
      href={previewHref ?? `/power-plants/${id}`}
      role='listitem'
      className='p-4 dark:bg-neutral-700/50 bg-neutral-200 shadow-neutral-400 dark:shadow-neutral-900 shadow-md rounded-md flex flex-col gap-8 hover:bg-neutral-400/40 dark:hover:bg-neutral-700 hover:cursor-pointer'>
      <div className='flex justify-between items-center '>
        <h3 className='text-lg font-semibold'>{name}</h3>
        <span className='w-12 text-center tabular-nums p-2 rounded-md rounded-bl-[40%] bg-blue-300/30 dark:bg-blue-600/30'>#{id}</span>
      </div>
      <PowerPlantPreviewIcon className='size-20' />
      <div className='flex justify-evenly mb-2'>
        <MetricColorization value={outputVoltage} thresholdWarning={200} thresholdCritical={150}>
          <TemperatureSvg className='size-7 dark:fill-neutral-200 fill-neutral-600' />
        </MetricColorization>
        <MetricColorization value={rpm} thresholdWarning={500} thresholdCritical={250}>
          <RpmSvg className='size-7 dark:fill-neutral-300 fill-neutral-600' />
        </MetricColorization>
        <MetricColorization value={waterThroughput} thresholdWarning={50} thresholdCritical={25}>
          <WaterLevelSvg className='size-7 dark:fill-neutral-300 fill-neutral-600' />
        </MetricColorization>
      </div>
    </Link>
  )
}

function PowerPlantPreviewIcon({ className }: IconProps) {
  const colorOptions = [
    'bg-neutral-700/15 dark:bg-orange-400/30',
    'bg-blue-700/15 dark:bg-blue-400/30',
    'bg-green-700/15 dark:bg-green-400/30',
    'bg-red-700/15 dark:bg-red-400/30',
    'bg-yellow-700/25 dark:bg-yellow-400/30',
  ]
  const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)]

  return <Image src={PowerPlantImage} alt='power-plant-image' className={twMerge('mx-auto p-4 object-contain rounded-tl-3xl rounded-br-3xl', className, randomColor)} />
}
