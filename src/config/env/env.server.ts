import { z } from 'zod'

import { createEnv } from '@t3-oss/env-nextjs'

// env server
export const envServer = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    JWT_SECRET: z.string().min(1, { message: 'JWT_SECRET is required' }),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
  },
})
