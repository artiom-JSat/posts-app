import { useTranslations } from 'next-intl'
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui'
import { LoginForm, RegisterForm } from '@/features/auth'

export default function LoginPage() {
  const t = useTranslations('Auth')

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-[450px] p-2">
        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{t('loginTab')}</TabsTrigger>
            <TabsTrigger value="register">{t('registerTab')}</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>

          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
