import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { RegisterForm } from './register-schema';
import { FacilityType } from 'src/types/property/facility';
import { RoleName } from 'src/types/auth/userRole';

// ----------------------------------------------------------------------

const FACILITY_TYPES = [
    'Hospital',
    'Clinic',
    'Pharmacy',
    'Laboratory',
    'Diagnostic Center',
    'Other',
];

const ROLES = ['OWNER', 'MANAGER', 'STAFF', 'ADMIN'];

// ----------------------------------------------------------------------

export function FacilityInfoForm() {

    const { t } = useTranslation();

    const {
        register: registerField,
        trigger,
        getValues,
        formState: { errors },
    } = useFormContext<RegisterForm>();


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
                label={t('register.facilityTitle')}
                {...registerField('facilityTitle')}
                slotProps={{ htmlInput: autofillProps('facilityTitle') }}
                error={!!errors.facilityTitle}
                helperText={errors.facilityTitle?.message}
                sx={{ mb: 3 }}
            />


            <TextField
                fullWidth
                select
                label={t('register.facilityType')}
                {...registerField('facilityType')}
                error={!!errors.facilityType}
                helperText={errors.facilityType?.message}
                defaultValue=""
                sx={{ mb: 3 }}
            >
                {Object.values(FacilityType).map((type) => (
                    <MenuItem key={type} value={type}>
                        {t(`facilityType.${type.toUpperCase()}`)}
                    </MenuItem>
                ))}
            </TextField>


            <TextField
                fullWidth
                select
                label={t('register.role')}
                {...registerField('role')}
                error={!!errors.role}
                helperText={errors.role?.message}
                defaultValue="OWNER"
                sx={{ mb: 3 }}
            >
                {Object.values(RoleName).map((type) => (
                    <MenuItem key={type} value={type}>
                        {t(`userRole.${type.toUpperCase()}`)}
                    </MenuItem>
                ))}
            </TextField>


            <TextField
                fullWidth
                label={t('register.addressLine1')}
                {...registerField('addressLine1')}
                slotProps={{ htmlInput: autofillProps('addressLine1') }}
                error={!!errors.addressLine1}
                helperText={errors.addressLine1?.message}
                sx={{ mb: 3 }}
            />


            <TextField
                fullWidth
                multiline
                minRows={3}
                label={t('register.description')}
                {...registerField('description')}
                error={!!errors.description}
                helperText={errors.description?.message}
                sx={{ mb: 3 }}
            />

        </Box>

    );

}