import { useCallback, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import GlobalStyles from '@mui/material/GlobalStyles';
import Link from '@mui/material/Link';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import { RouterLink } from 'src/routes/components/router-link';
import { register } from 'src/api/authApi';
import AlertDialog from 'src/components/dialog/AlertDialog';
import SocialLogin from 'src/components/auth/SocialLogin';
import { buildRegisterSchema, RegisterForm, STEP_FIELDS } from './register/register-schema';
import { PersonalInfoForm } from './register/personal-info-form';
import { FacilityInfoForm } from './register/facility-info-form';


const autofillStyles = (
    <GlobalStyles
        styles={{
            '@keyframes mui-auto-fill': { from: { opacity: 1 }, to: { opacity: 1 } },
            '@keyframes mui-auto-fill-cancel': { from: { opacity: 1 }, to: { opacity: 1 } },
            'input:-webkit-autofill': {
                animationName: 'mui-auto-fill',
                animationDuration: '0.001s',
            },
            'input:not(:-webkit-autofill)': {
                animationName: 'mui-auto-fill-cancel',
                animationDuration: '0.001s',
            },
        }}
    />
);

export function RegisterView() {

    const { t } = useTranslation();

    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [verifyUserId, setVerifyUserId] = useState<string>('');

    const steps = useMemo(
        () => [t('register.stepPersonalInfo'), t('register.stepFacilityInfo')],
        [t]
    );

    const schema = useMemo(() => buildRegisterSchema(t), [t]);


    const methods = useForm<RegisterForm>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            facilityTitle: '',
            facilityType: '',
            role: 'OWNER',
            addressLine1: '',
            description: '',
        },
    });

    const { handleSubmit, trigger } = methods;


    const handleNext = useCallback(async () => {
        console.log('NEXT CLICKED');

        const fields = STEP_FIELDS[activeStep];
        const valid = await trigger(fields as readonly (keyof RegisterForm)[]);

        console.log('VALID:', valid);

        if (valid) {
            setActiveStep((prev) => prev + 1);
        }
    }, [activeStep, trigger]);


    const handleBack = useCallback(() => {
        setActiveStep((prev) => prev - 1);
    }, []);


    const handleRegister = useCallback(
        async (data: RegisterForm) => {

            console.log('REGISTER SUBMITTED');

            try {

                setLoading(true);


                const response = await register({
                    ...data,
                });


                if (response.success) {

                    setSuccessMessage(
                        response.data ?? t('register.registrationSuccessful')
                    );

                    setSuccessDialogOpen(true);
                    setVerifyUserId(response.correlationId ?? '');

                    return;
                }


                enqueueSnackbar(
                    response.error?.message ??
                    t('register.registrationFailed'),
                    {
                        variant: 'error',
                    }
                );


            } catch (error) {


                if (axios.isAxiosError(error)) {

                    const apiError = error.response?.data;


                    enqueueSnackbar(
                        apiError?.error?.message ??
                        t('common.serverUnavailable'),
                        {
                            variant: 'error',
                        }
                    );

                } else {

                    enqueueSnackbar(
                        t('common.somethingWentWrong'),
                        {
                            variant: 'error',
                        }
                    );
                }


            } finally {

                setLoading(false);

            }


        },
        [
            enqueueSnackbar,
            t,
        ]
    );


    const renderForm = (

        <Box
            component="form"
            onSubmit={handleSubmit(handleRegister)}
            sx={{
                display: 'flex',
                alignItems: 'flex-end',
                flexDirection: 'column',
            }}
        >

            <Box sx={{ width: '100%' }}>
                {activeStep === 0 && <PersonalInfoForm />}
                {activeStep === 1 && <FacilityInfoForm />}
            </Box>


            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: 2,
                }}
            >

                <Button
                    type="button"
                    size="large"
                    disabled={activeStep === 0 || loading}
                    onClick={handleBack}
                >
                    {t('register.back')}
                </Button>


                <Button
                    type="button"
                    size="large"
                    variant="outlined"
                    color="primary"
                    onClick={handleNext}
                    sx={{
                        display: activeStep < steps.length - 1 ? 'inline-flex' : 'none',
                    }}
                >
                    {t('register.next')}
                </Button>

                <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    sx={{
                        display: activeStep === steps.length - 1 ? 'inline-flex' : 'none',
                    }}
                >
                    {loading ? t('register.loading') : t('register.submit')}
                </Button>

            </Box>

        </Box>

    );



    return (

        <>

            {autofillStyles}

            <Box
                sx={{
                    gap: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: 5,
                }}
            >

                <Typography variant="h5">
                    {t('register.title')}
                </Typography>


                <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary' }}
                >

                    {t('register.alreadyHaveAccount')}

                    <Link
                        component={RouterLink}
                        href="/sign-in"
                        variant="subtitle2"
                        sx={{ ml: 0.5 }}
                    >
                        {t('auth.signIn')}
                    </Link>

                </Typography>


            </Box>


            <Stepper activeStep={activeStep} sx={{ width: '100%', mb: 5 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>


            <FormProvider {...methods}>
                {renderForm}
            </FormProvider>



            <AlertDialog
                open={successDialogOpen}
                title={t('common.success')}
                message={successMessage}
                buttonText={t('otp.title')}
                link={`/verify-account?userId=${verifyUserId}`}
                onClose={() => setSuccessDialogOpen(false)}
            />

        </>

    );
}