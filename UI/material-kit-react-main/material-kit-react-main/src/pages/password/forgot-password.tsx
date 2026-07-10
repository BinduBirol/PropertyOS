import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    Box,
    Button,
    Link,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { RouterLink } from 'src/routes/components';

type LoginType = 'EMAIL' | 'MOBILE';

export default function ForgotPasswordPage() {
    const { t } = useTranslation();

    const [loginType, setLoginType] = useState<LoginType>('EMAIL');
    const [identifier, setIdentifier] = useState('');

    const isEmail = loginType === 'EMAIL';

    return (
        <Stack spacing={3}>
            <Box>
                <Typography variant="h4">
                    {t('auth.forgotPassword.title')}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                >
                    {t('auth.forgotPassword.description')}
                </Typography>
            </Box>

            <TextField
                select
                fullWidth
                label={t('auth.forgotPassword.loginType')}
                value={loginType}
                onChange={(e) => setLoginType(e.target.value as LoginType)}
            >
                <MenuItem value="EMAIL">
                    {t('auth.forgotPassword.email')}
                </MenuItem>

                <MenuItem value="MOBILE">
                    {t('auth.forgotPassword.phone')}
                </MenuItem>
            </TextField>

            <TextField
                fullWidth
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                label={
                    isEmail
                        ? t('auth.forgotPassword.email')
                        : t('auth.forgotPassword.phone')
                }
                placeholder={
                    isEmail
                        ? t('auth.forgotPassword.emailPlaceholder')
                        : t('auth.forgotPassword.phonePlaceholder')
                }
            />

            <Button
                fullWidth
                size="large"
                variant="contained"
            >
                {isEmail
                    ? t('auth.forgotPassword.sendResetLink')
                    : t('auth.forgotPassword.sendOtp')}
            </Button>

            <Typography
                variant="body2"
                color="text.secondary"
                align="center"
            >
                {t('auth.forgotPassword.info')}
            </Typography>

            <Link
                component={RouterLink}
                href="/sign-in"
                variant="body2"
                underline="hover"
                sx={{ alignSelf: 'center' }}
            >
                {t('auth.forgotPassword.backToSignIn')}
            </Link>


            
        </Stack>

        
    );
}