import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import type { Facility } from 'src/types/property/facility';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

type FacilityTableRowProps = {
    row: Facility;
    selected: boolean;
    onSelectRow: () => void;
};

export function FacilityTableRow({
    row,
    selected,
    onSelectRow,
}: FacilityTableRowProps) {

    const { t } = useTranslation();

    const navigate = useNavigate();

    const [openPopover, setOpenPopover] =
        useState<HTMLButtonElement | null>(null);

    const handleOpenPopover = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setOpenPopover(event.currentTarget);
        },
        []
    );

    const handleClosePopover = useCallback(() => {
        setOpenPopover(null);
    }, []);

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
                </TableCell>

                <TableCell component="th" scope="row">
                    <RouterLink
                        href={`/property/facility/view/${row.id}`}
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Box sx={{ fontWeight: 600 }}>
                                {row.name}
                            </Box>

                            <Box
                                sx={{
                                    typography: 'caption',
                                    color: 'text.secondary',
                                }}
                            >
                                {row.addressLine1}
                            </Box>
                        </Box>
                    </RouterLink>
                </TableCell>

                <TableCell>{t(`facilityType.${row.type}`)}</TableCell>

                <TableCell>{row.city || '-'}</TableCell>



                <TableCell>
                    <Label color="info">
                        {t(`userRole.${row.userRole}`)}
                    </Label>
                </TableCell>

                <TableCell align="right">
                    <IconButton onClick={handleOpenPopover}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
            </TableRow>

            <Popover
                open={!!openPopover}
                anchorEl={openPopover}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuList
                    disablePadding
                    sx={{
                        p: 0.5,
                        gap: 0.5,
                        width: 180,
                        display: 'flex',
                        flexDirection: 'column',
                        [`& .${menuItemClasses.root}`]: {
                            px: 1,
                            gap: 2,
                            borderRadius: 0.75,
                            [`&.${menuItemClasses.selected}`]: {
                                bgcolor: 'action.selected',
                            },
                        },
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            handleClosePopover();
                            navigate(`/property/facility/edit/${row.id}/edit`);
                        }}
                    >
                        <Iconify icon="solar:pen-bold" />
                        {t('common.edit')}
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            handleClosePopover();
                            navigate(`/property/facility/view/${row.id}`);
                        }}
                    >
                        <Iconify icon="solar:settings-bold-duotone" />
                        {t('common.details')}
                    </MenuItem>


                </MenuList>
            </Popover>
        </>
    );
}