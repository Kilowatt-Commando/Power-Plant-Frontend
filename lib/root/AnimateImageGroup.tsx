import Image from 'next/image'

interface ImageGroupProps {
  id: string
  step: number
  title: string
  text?: string
  image: any
  imageDimensions?: { width?: number; height?: number }
}

export function AnimateImageGroup({ id, title, step, image, text, imageDimensions }: ImageGroupProps) {
  return (
    <div id={id} className='opacity-0 flex flex-col justify-between items-center gap-2 rounded-xl bg-gray-300 dark:bg-neutral-700/80 shadow-md shadow-gray-400 dark:shadow-neutral-900 p-4 relative'>
      <span className='absolute left-0 top-0 pl-2 pt-2 bg-gray-100/80 dark:bg-neutral-600 pr-3 pb-2 rounded-br-2xl'>{step}</span>
      <span className='pb-8 text-xl font-semibold text-center max-w-48'>{title}</span>
      <Image src={image} alt={'Animated-Image'} width={imageDimensions?.width ?? 170} height={imageDimensions?.height ?? 200} />
      <span className='pt-4 max-w-48 text-center mx-auto text-lg dark:text-gray-300/90 text-balance'>{text}</span>
    </div>
  )
}
