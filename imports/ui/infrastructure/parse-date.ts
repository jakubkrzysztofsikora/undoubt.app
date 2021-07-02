import DateFnsUtils from '@date-io/date-fns';

export const parseDate: (date: string, format: string) => Date = (
    date,
    format
) => {
    return new DateFnsUtils().parse(date, format);
};
