import type { ReactNode } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";

export type CommonDialogProps = {
    open: boolean;
    title?: ReactNode;
    description?: ReactNode;

    children?: ReactNode;
    actions?: ReactNode;

    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
    fullWidth?: boolean;

    onClose: () => void;
};

export default function CommonDialog({
    open,
    title,
    description,
    children,
    actions,
    maxWidth = "xs",
    fullWidth = true,
    onClose,
}: CommonDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
        >
            {title && <DialogTitle>{title}</DialogTitle>}

            {(description || children) && (
                <DialogContent>
                    {description && (
                        <DialogContentText sx={{ mb: children ? 2 : 0 }}>
                            {description}
                        </DialogContentText>
                    )}

                    {children}
                </DialogContent>
            )}

            {actions && <DialogActions>{actions}</DialogActions>}
        </Dialog>
    );
}