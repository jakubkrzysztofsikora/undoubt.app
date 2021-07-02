import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { CSSProperties } from '@material-ui/styles';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import { parseDate } from '../infrastructure/parse-date';

export const UndoubtDateField: React.FC<{
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
                <KeyboardDatePicker
                    label={label}
                    format='dd/MM/yyyy'
                    value={value}
                    onBlur={validate}
                    error={hasError}
                    required={required}
                    helperText={hasError ? 'Pole jest wymagane.' : undefined}
                    onChange={(date, value) => {
                        return value
                            ? onChange(parseDate(value, 'dd/MM/yyyy'))
                            : undefined;
                    }}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
        </div>
    );
};
