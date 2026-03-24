'use client'

import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/pkg/locale'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/pkg/theme/ui/dropdown-menu'

type LanguageDropdownProps = {
  trigger: React.ReactNode
  defaultOpen?: boolean
  align?: 'start' | 'center' | 'end'
}

const LanguageDropdownComponent = ({
  defaultOpen,
  align,
  trigger,
}: LanguageDropdownProps) => {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const [language, setLanguage] = useState(locale)

  useEffect(() => {
    setLanguage(locale)
  }, [locale])

  const switchLanguage = (newLocale: string) => {
    const nextLocale = newLocale as 'en' | 'de'
    setLanguage(nextLocale)
    router.replace(pathname, { locale: nextLocale })
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
