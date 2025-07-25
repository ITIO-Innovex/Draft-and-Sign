import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
  authMethod: z.string().optional(),
  additionalData: z.record(z.any()).optional(),
});

export const enhancedRegisterSchema = {
  step1: z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),

  step2: z.object({
    accountType: z.enum(['personal', 'business', 'enterprise'], {
      required_error: 'Please select an account type',
    }),
    organizationName: z.string().optional(),
    inviteCode: z.string().optional(),
  }).refine((data) => {
    if (data.accountType === 'business' && !data.inviteCode && !data.organizationName) {
      return false;
    }
    return true;
  }, {
    message: 'Organization name is required for business accounts',
    path: ['organizationName'],
  }),

  step3: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    company: z.string().optional(),
    position: z.string().optional(),
    department: z.string().optional(),
    phone: z.string().optional(),
  }),

  step4: z.object({
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms of service',
    }),
  }),
};

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  position: z.string().optional(),
  department: z.string().optional(),
});

export const passwordStrength = (password: string): { score: number; text: string; color: string } => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score < 2) return { score, text: 'Weak', color: 'bg-red-500' };
  if (score < 4) return { score, text: 'Fair', color: 'bg-yellow-500' };
  if (score < 5) return { score, text: 'Good', color: 'bg-blue-500' };
  return { score, text: 'Strong', color: 'bg-green-500' };
};