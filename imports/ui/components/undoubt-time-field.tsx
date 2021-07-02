import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { CSSProperties } from '@material-ui/styles';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers';
export const UndoubtTimeField: React.FC<{
    label: string;
    value: Date;
    style: CSSProperties;
    onChange: (date: Date) => void;
    required?: boolean;
    submitSubscription?: (validate: () => boolean) => void;
}> = ({
    label,
    value,
    style,
    onChange,
    required = true,
    submitSubscription,
}) => {
    const [hasError, setHasError] = React.useState(false);
    const validate = (event: React.FocusEvent<HTMLInputElement>) => {
        if (required && !event.target.value) {
            setHasError(true);
        } else {
            setHasError(false);
        }
    };
    if (submitSubscription) {
        submitSubscription(() => {
            if (required && !value) {
                setHasError(true);
                return false;
            } else {
                setHasError(false);
                return true;
            }
        });
    }
    return (
        <div className='undoubt-input' style={style}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                    id='time-picker'
                    label={label}
                    value={value}
                    onBlur={validate}
                    error={hasError}
                    required={required}
                    helperText={hasError ? 'Pole jest wymagane.' : undefined}
                    onChange={(date: any, value: any) => {
                        return value ? onChange(new Date(date)) : undefined;
                    }}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                />
            </MuiPickersUtilsProvider>
        </div>
    );
};
