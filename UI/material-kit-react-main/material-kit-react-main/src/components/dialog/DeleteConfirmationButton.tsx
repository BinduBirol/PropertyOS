import { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

type Props = {
    title: string;
    details: string;
    onConfirm: () => void;
};

export default function DeleteConfirmationButton({
    title,
    details,
    onConfirm,
}: Props) {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    const handleConfirm = () => {
        setOpen(false);
        onConfirm();
    };

    return (
        <>
            <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => setOpen(true)}
            >
                {title}
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>
                    {title}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        {details}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                    >
                        {t("common.cancel")}
                    </Button>

                    <Button
                        color="error"
                        variant="contained"
                        onClick={handleConfirm}
                    >
                        {t("common.delete")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}