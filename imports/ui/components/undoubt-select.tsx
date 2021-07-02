import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export const UndoubtSelect: React.FC<{
    elements: any;
    label: string;
    getValue: (element: any) => string;
    getLabel: (element: any) => string;
    onChange?: (changedValue: string) => void;
    value?: string;
    required?: boolean;
    submitSubscription?: (validate: () => boolean) => void;
}> = ({
    elements,
    label,
    getValue,
    getLabel,
    onChange,
    value,
    required = true,
    submitSubscription,
}) => {
    const [hasError, setHasError] = React.useState(false);
    const validate = () => {
        if (required && !value) {
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
        <FormControl
            variant='outlined'
            required
            style={{ width: '100%' }}
            margin='normal'>
            <InputLabel htmlFor='event-type-select'>{label}</InputLabel>
            <Select
                value={value}
                inputProps={{
                    id: 'event-type-select',
                }}
                error={hasError}
                onBlur={validate}
                onChange={event =>
                    onChange
                        ? onChange(event.target.value as string)
                        : undefined
                }>
                <MenuItem value=''>
                    <em>---</em>
                </MenuItem>
                {elements.map((element: any) => {
                    return (
                        <MenuItem
                            value={getValue(element)}
                            key={getValue(element)}>
                            {getLabel(element)}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};
