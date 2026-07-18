import { Card, CardContent, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import type { Facility } from 'src/types/property/facility';

type Props = {
    facility: Facility;
};

export default function FacilityEditContent({ facility }: Props) {
    const { t } = useTranslation();

    return (
        <Card>
            <CardContent>
                <Stack spacing={3}>
                    <Typography variant="h5">
                        {facility.name}
                    </Typography>

                    <Divider />

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="caption" color="text.secondary">
                                {t('facility.type')}
                            </Typography>

                            <Typography>
                                {t(`facilityType.${facility.type}`)}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="caption" color="text.secondary">
                                {t('facility.role')}
                            </Typography>

                            <Chip
                                label={t(`userRole.${facility.userRole}`)}
                                color="info"
                                size="small"
                            />
                        </Grid>

                        <Grid size={12}>
                            <Typography variant="caption" color="text.secondary">
                                {t('facility.addressLine1')}
                            </Typography>

                            <Typography>
                                {facility.addressLine1}
                            </Typography>
                        </Grid>

                        {facility.addressLine2 && (
                            <Grid size={12}>
                                <Typography variant="caption" color="text.secondary">
                                    {t('facility.addressLine2')}
                                </Typography>

                                <Typography>
                                    {facility.addressLine2}
                                </Typography>
                            </Grid>
                        )}

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="caption" color="text.secondary">
                                {t('facility.city')}
                            </Typography>

                            <Typography>
                                {facility.city || "-"}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="caption" color="text.secondary">
                                {t('facility.country')}
                            </Typography>

                            <Typography>
                                {facility.country || "-"}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="caption" color="text.secondary">
                                {t('facility.postalCode')}
                            </Typography>

                            <Typography>
                                {facility.postalCode || "-"}
                            </Typography>
                        </Grid>

                        {facility.description && (
                            <Grid size={12}>
                                <Typography variant="caption" color="text.secondary">
                                    {t('facility.description')}
                                </Typography>

                                <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                    {facility.description}
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Stack>
            </CardContent>
        </Card>
    );
}