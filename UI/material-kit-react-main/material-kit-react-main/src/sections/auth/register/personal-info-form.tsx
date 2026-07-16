import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { RegisterForm } from './register-schema';

// ----------------------------------------------------------------------

export function PersonalInfoForm() {

    const { t } = useTranslation();

    const {
        register: registerField,
        trigger,
        getValues,
        formState: { errors },
    } = useFormContext<RegisterForm>();


    // Spread onto a field's `htmlInput` slot to catch browser autofill and
    // force RHF to re-validate that field, clearing stale error state.
    // Guarded against browsers firing the autofill pseudo-class
    // speculatively on mount before any value is actually committed.
    const autofillProps = (name: keyof RegisterForm) => ({
        onAnimationStart: (event: React.AnimationEvent<HTMLInputElement>) => {
            if (event.animationName !== 'mui-auto-fill') {
                return;
            }

            const currentValue = getValues(name);

            if (currentValue) {
                trigger(name);
            }
        },
    });


    return (

        <Box>

            <TextField
                fullWidth
                label={t('register.firstName')}
                {...registerField('firstName')}
                slotProps={{ htmlInput: autofillProps('firstName') }}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                sx={{ mb: 3 }}
            />


            <TextField
                fullWidth
                label={t('register.lastName')}
                {...registerField('lastName')}
                slotProps={{ htmlInput: autofillProps('lastName') }}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                sx={{ mb: 3 }}
            />


            <TextField
                fullWidth
                label={t('auth.emailAddress')}
                {...registerField('email')}
                slotProps={{ htmlInput: autofillProps('email') }}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ mb: 3 }}
            />


            <TextField
                fullWidth
                label={t('auth.mobileNumber')}
                {...registerField('phone')}
                slotProps={{ htmlInput: autofillProps('phone') }}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                sx={{ mb: 3 }}
            />


            <TextField
                fullWidth
                type="password"
                label={t('auth.password')}
                {...registerField('password')}
                slotProps={{ htmlInput: autofillProps('password') }}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{ mb: 3 }}
            />

        </Box>

    );

}