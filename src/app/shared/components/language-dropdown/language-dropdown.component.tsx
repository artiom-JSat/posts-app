'use client'

import { useSearchParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import { type FC, type ReactNode, useEffect, useState } from 'react'

import { usePathname, useRouter } from '@/pkg/locale'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/pkg/theme/ui/dropdown-menu'

// interface
interface IProps {
  trigger: ReactNode
  defaultOpen?: boolean
  align?: 'start' | 'center' | 'end'
}

// component
const LanguageDropdownComponent: FC<Readonly<IProps>> = (props: IProps) => {
  const { defaultOpen, align, trigger } = props

  const locale = useLocale()
  const [language, setLanguage] = useState(locale)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setLanguage(locale)
  }, [locale])

  function switchLanguage(newLocale: string) {
    router.replace({ pathname, query: Object.fromEntries(searchParams.entries()) }, { locale: newLocale })
  }

  // return
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align={align || 'end'}>
        <DropdownMenuRadioGroup value={language} onValueChange={switchLanguage}>
          <DropdownMenuRadioItem value='en' className='cursor-pointer'>
            English
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='de' className='cursor-pointer'>
            Deutsch
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageDropdownComponent
