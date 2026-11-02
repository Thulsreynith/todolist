import { z } from 'zod'

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, 'Username is required'),

    password: z
      .string()
      .min(6, 'Password must be at least 6 characters'),

    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password')
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Passwords do not match.',
      path: ['confirmPassword']
    }
  )