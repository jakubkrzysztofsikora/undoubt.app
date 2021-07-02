import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';

export const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

export const UndoubtNotification: React.FC<{
    className?: string;
    variant: keyof typeof variantIcon;
    message: string;
    opened?: boolean;
    onClose: () => void;
}> = ({ className, variant, message, opened = false, onClose }) => {
    const Icon = variantIcon[variant];
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            className={`undoubt-notification ${className}`}
            open={opened}
            autoHideDuration={6000}>
            <SnackbarContent
                aria-describedby='client-snackbar'
                message={
                    <span
                        id='client-snackbar'
                        className='undoubt-notification__icon'>
                        <Icon />
                        {message}
                    </span>
                }
                className={`undoubt-notification__container ${variant}`}
                action={[
                    <IconButton
                        className={variant}
                        key='close'
                        aria-label='close'
                        color='inherit'
                        onClick={onClose}>
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </Snackbar>
    );
};
