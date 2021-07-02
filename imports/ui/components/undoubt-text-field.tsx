
import React from 'react';
import { CSSProperties } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import { isNumber } from 'util';
import { IconButton, InputAdornment } from '@material-ui/core';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

const emailIsValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export enum FieldType {
    Text,
    Number,
    Email,
}

export const UndoubtTextField: React.FC<{
    label: string;
    style?: CSSProperties;
    required?: boolean;
    multiline?: boolean;
    rowsMax?: number;
    onChange?: (value: string) => void;
    onEnter?: (value: string) => void;
    value?: string | number;
    type?: FieldType;
    submitSubscription?: (validate: () => boolean) => void;
}> = ({
    label,
    style,
    required = false,
    multiline = false,
    rowsMax = 5,
    onChange,
    onEnter,
    value,
    type = FieldType.Text,
    submitSubscription,
}) => {
    const inputValue: string = value ? value.toString() : '';
    const [hasError, setHasError] = React.useState(false);
    const isRequiredAndEmpty = required && !value;
    const isTypeEmailAndInWrongFormat =
        type === FieldType.Email && value && !emailIsValid(value.toString());
    const isTypeNumberAndNotANumber =
        type === FieldType.Number && !isNumber(value);
    const errorMessage =
        isRequiredAndEmpty && hasError
            ? 'Pole jest wymagane.'
            : isTypeEmailAndInWrongFormat && hasError
            ? 'Email ma zły format.'
            : isTypeNumberAndNotANumber && hasError
            ? 'Pole jest numeryczne.'
            : undefined;
    const validate = () => {
        if (
            isRequiredAndEmpty ||
            isTypeEmailAndInWrongFormat ||
            isTypeNumberAndNotANumber
        ) {
            setHasError(true);

            return false;
        } else {
            setHasError(false);

            return true;
        }
    };
    if (submitSubscription) {
        submitSubscription(validate);
    }

    return (
        <div className='undoubt-input' style={style}>
            <TextField
                error={hasError}
                value={inputValue}
                required={required}
                label={label}
                margin='normal'
                multiline={multiline}
                rowsMax={rowsMax}
                variant='outlined'
                style={{ width: '100%' }}
                helperText={errorMessage}
                onBlur={validate}
                type={
                    type === FieldType.Number
                        ? 'number'
                        : type === FieldType.Email
                        ? 'email'
                        : 'text'
                }
                InputProps={onEnter ? {
                    endAdornment: <InputAdornment position="end">
                          <IconButton onClick={(e) => onEnter(inputValue)}>
                            <KeyboardReturnIcon />
                          </IconButton>
                        </InputAdornment>
                } : {}}
                onChange={changeEvent =>
                    onChange ? onChange(changeEvent.target.value) : undefined
                }
                onKeyDown={(e) => e.key === 'Enter' && onEnter ? onEnter(inputValue) : null}
            />
        </div>
    );
};
