'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/pkg/locale'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/pkg/theme/ui/dropdown-menu'

interface ILanguageDropdownProps {
  trigger: ReactNode
  defaultOpen?: boolean
  align?: 'start' | 'center' | 'end'
}

const LanguageDropdownComponent = (props: ILanguageDropdownProps) => {
  const { defaultOpen, align, trigger } = props

  const locale = useLocale()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [language, setLanguage] = useState(locale)

  useEffect(() => {
    setLanguage(locale)
  }, [locale])

  const switchLanguage = (newLocale: string) => {
    const params = new URLSearchParams(searchParams.toString())
    router.replace(`${pathname}?${params.toString()}`, { locale: newLocale })
  }

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align={align || 'end'}>
        <DropdownMenuRadioGroup value={language} onValueChange={switchLanguage}>
          <DropdownMenuRadioItem value="en" className="cursor-pointer">
            English
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="de" className="cursor-pointer">
            Deutsch
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageDropdownComponent
