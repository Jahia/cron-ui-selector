export const MINUTES = Array.from({length: 60}, (_, i) => (i < 10 ? `0${i}` : `${i}`));
export const HOURS = Array.from({length: 24}, (_, i) => (i < 10 ? `0${i}` : `${i}`));
export const MONTH_DAYS = Array.from({length: 31}, (_, i) => `${i + 1}`);

export const generateCronExpression = ({resourceBundle, frequency, minute, hour, weekDay, monthDay, month}) => {
    switch (frequency) {
        case 'NONE':
            return '';
        case 'EVERY_MINUTE':
            return '0 * * * * ?';
        case 'EVERY_HOUR':
            return `0 ${minute} * * * ?`;
        case 'EVERY_DAY':
            return `0 ${minute} ${hour} * * ?`;
        case 'EVERY_WEEK': {
            const weekDayIndex = resourceBundle.WEEK_DAYS.indexOf(weekDay) + 1; // Sunday=1
            return `0 ${minute} ${hour} ? * ${weekDayIndex}`;
        }

        case 'EVERY_MONTH':
            return `0 ${minute} ${hour} ${monthDay} * ?`;
        case 'EVERY_YEAR': {
            const monthIndex = resourceBundle.MONTHS.indexOf(month) + 1;
            return `0 ${minute} ${hour} ${monthDay} ${monthIndex} ?`;}

        default:
            return '';
    }
};

export const parseCronExpression = ({cron, resourceBundle, setFrequency, setMinute, setHour, setWeekDay, setMonthDay, setMonth}) => {
    if (!cron) {
        setFrequency('NONE');
        return;
    }

    // First element is second, don't need it
    const parts = cron.trim().split(/\s+/).slice(1);
    if (parts.length < 5) {
        console.error('Invalid cron expression');
        return;
    }

    const [min, hr, dayOfMonth, mon, dayOfWeek] = parts;

    if (min === '*' && hr === '*') {
        setFrequency('EVERY_MINUTE');
    } else if (hr === '*' && dayOfMonth === '*') {
        setMinute(min);
        setFrequency('EVERY_HOUR');
    } else if (dayOfWeek !== '?' && mon === '*') {
        setMinute(min);
        setHour(hr);
        setWeekDay(resourceBundle.WEEK_DAYS[parseInt(dayOfWeek, 10) - 1]);
        setFrequency('EVERY_WEEK');
    } else if (dayOfMonth === '*' && mon === '*') {
        setMinute(min);
        setHour(hr);
        setFrequency('EVERY_DAY');
    } else if (mon === '*') {
        setMinute(min);
        setHour(hr);
        setMonthDay(dayOfMonth);
        setFrequency('EVERY_MONTH');
    } else {
        setMinute(min);
        setHour(hr);
        setMonthDay(dayOfMonth);
        setMonth(resourceBundle.MONTHS[parseInt(mon, 10) - 1]);
        setFrequency('EVERY_YEAR');
    }
};
