import Image from 'next/image'
import { type FC } from 'react'

import { cn } from '@/pkg/theme/lib/utils'

// interface
interface IProps {}

// constants
const gallerySections = [
  {
    images: [
      {
        src: 'https://picsum.photos/seed/main-hero/1200/800',
        alt: 'Explore the Unexplored',
      },
    ],
  },
  {
    type: 'grid',
    images: [
      {
        src: 'https://picsum.photos/seed/gallery-1/600/800',
        alt: 'Thoughts and Ideas',
      },
      {
        src: 'https://picsum.photos/seed/gallery-2/600/800',
        alt: 'Digital Journey',
      },
    ],
  },
]

// component
const GalleryComponent: FC<Readonly<IProps>> = () => {
  // return
  return (
    <section className='py-8'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid gap-6 md:grid-cols-2'>
          {gallerySections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className={cn({
                'grid grid-cols-2 gap-6': section.type === 'grid',
              })}
            >
              {section.images.map((image, imageIndex) => (
                <Image
                  key={imageIndex}
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={800}
                  priority
                  className='h-full w-full rounded-lg object-cover'
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GalleryComponent
