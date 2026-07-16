import { z } from 'zod';
import type { TFunction } from 'i18next';

export const buildRegisterSchema = (t: TFunction) =>
  z.object({
    firstName: z.string().min(1, t('register.firstNameRequired')),

    lastName: z.string().min(1, t('register.lastNameRequired')),

    email: z.string().min(1, t('register.emailRequired')).email(t('register.invalidEmail')),

    phone: z.string().min(1, t('register.phoneRequired')),

    password: z
      .string()
      .min(1, t('register.passwordRequired'))
      .min(8, t('register.passwordMinLength')),

    facilityTitle: z.string().min(1, t('register.facilityTitleRequired')),

    facilityType: z.string().min(1, t('register.facilityTypeRequired')),

    role: z.string().min(1, t('register.roleRequired')),

    addressLine1: z.string().min(1, t('register.addressLine1Required')),

    description: z.string().optional(),
  });

export type RegisterForm = z.infer<ReturnType<typeof buildRegisterSchema>>;

export const STEP_FIELDS = [
  ['firstName', 'lastName', 'email', 'phone', 'password'],
  ['facilityTitle', 'facilityType', 'role', 'addressLine1', 'description'],
] as const;
