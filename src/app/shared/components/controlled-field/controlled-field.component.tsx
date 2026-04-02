import { type FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Input } from '@/pkg/theme/ui/input'
import { Label } from '@/pkg/theme/ui/label'

// interface
interface IProps {
  id?: string
  name: string
  label: string
  placeholder?: string
  type?: string
}

// component
const ControlledFieldComponent: FC<Readonly<IProps>> = (props: IProps) => {
  const { id, name, label, placeholder, type = 'text' } = props

  const { control } = useFormContext()
  const inputId = id ?? name

  // return
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className='space-y-2'>
          <Label htmlFor={inputId}>{label}</Label>
          <Input
            {...field}
            id={inputId}
            type={type}
            placeholder={placeholder}
            className={error ? 'border-destructive' : ''}
            value={field.value ?? ''}
          />
          {error && <p className='text-destructive text-sm'>{error.message}</p>}
        </div>
      )}
    />
  )
}

export default ControlledFieldComponent
