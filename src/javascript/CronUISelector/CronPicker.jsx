import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import {
    MINUTES,
    HOURS,
    WEEK_DAYS,
    MONTH_DAYS,
    MONTHS,
    parseCronExpression,
    generateCronExpression
} from './CronPickerUtils';
import {useTranslation} from 'react-i18next';
import {DropdownFreq, DropdownNum, DropdownStr} from './components';
import {Typography} from '@jahia/moonstone';
import {withStyles} from '@material-ui/core';

const styles = (/* theme */) => ({
    label: {
        marginLeft: 'var(--spacing-small)'
    }
});

const CronPickerCmp = ({classes, value = '', field: {readOnly}, onChange}) => {
    const {t} = useTranslation('cron-ui-selector');
    // Const resourceBundle = Locales[`LOCALE_CRON_PICKER_${editorContext?.uilang.toUpperCase() || editorContext.lang.toUpperCase()}`];
    const [frequency, setFrequency] = useState('NONE');
    const [minute, setMinute] = useState('00');
    const [hour, setHour] = useState('00');
    const [monthDay, setMonthDay] = useState('1');
    const [month, setMonth] = useState('jan');
    const [weekDay, setWeekDay] = useState('sun');
    const isFirstRender = useRef(true);

    useEffect(() => {
        parseCronExpression({
            cron: value,
            setFrequency,
            setMinute,
            setHour,
            setWeekDay,
            setMonthDay,
            setMonth
        });
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const cron = generateCronExpression({frequency, minute, hour, weekDay, monthDay, month});
        onChange(cron);
    }, [frequency, minute, hour, weekDay, monthDay, month, onChange]);

    const handleFrequencyChange = item => {
        setFrequency(item.value);
    };

    return (
        <div className="cron-picker">
            <Typography variant="body" component="span">
                {t('label.prefix.period')} :
            </Typography>
            <DropdownFreq {...{
                value: frequency,
                onChange: handleFrequencyChange,
                readOnly
            }}/>
            {frequency === 'EVERY_HOUR' && (
                <>
                    <Typography className={classes.label} variant="body" component="span">
                        {t('label.prefix.minutesForHourPeriod')} :
                    </Typography>
                    <DropdownNum {...{
                        value: minute,
                        data: MINUTES,
                        onChange: (e, item) => setMinute(item.value),
                        readOnly
                    }}/>
                    <Typography className={classes.label} variant="body" component="span">
                        {Number.parseInt(minute, 10) <= 1 && t('label.suffix.minuteForHourPeriod')}
                        {Number.parseInt(minute, 10) > 1 && t('label.suffix.minutesForHourPeriod')}
                    </Typography>
                </>
            )}

            {frequency === 'EVERY_WEEK' && (
                <>
                    <Typography className={classes.label} variant="body" component="span">
                        {t('label.prefix.weekDays')} :
                    </Typography>
                    <DropdownStr {...{
                        value: weekDay,
                        data: WEEK_DAYS,
                        labelKey: 'weekDays',
                        onChange: (e, item) => setWeekDay(item.value),
                        readOnly
                    }}/>
                </>
            )}

            {['EVERY_MONTH', 'EVERY_YEAR'].includes(frequency) && (
                <>
                    <Typography className={classes.label} variant="body" component="span">
                        {t('label.prefix.monthDays')} :
                    </Typography>
                    <DropdownNum {...{
                        value: monthDay,
                        data: MONTH_DAYS,
                        onChange: (e, item) => setMonthDay(item.value),
                        readOnly
                    }}/>
                </>
            )}

            {frequency === 'EVERY_YEAR' && (
                <>
                    <Typography className={classes.label} variant="body" component="span">
                        {t('label.prefix.months')} :
                    </Typography>
                    <DropdownStr {...{
                        value: month,
                        data: MONTHS,
                        labelKey: 'months',
                        onChange: (e, item) => setMonth(item.value),
                        readOnly
                    }}/>
                </>
            )}

            {['EVERY_DAY', 'EVERY_WEEK', 'EVERY_MONTH', 'EVERY_YEAR'].includes(frequency) && (
                <>
                    <Typography className={classes.label} variant="body" component="span">
                        {t('label.prefix.hours')} :
                    </Typography>
                    <DropdownNum {...{
                        value: hour,
                        data: HOURS,
                        onChange: (e, item) => setHour(item.value),
                        readOnly
                    }}/>
                    <Typography className={classes.label} variant="body" component="span">
                        {t('label.prefix.minutes')}
                    </Typography>
                    <DropdownNum {...{
                        value: minute,
                        data: MINUTES,
                        onChange: (e, item) => setMinute(item.value),
                        readOnly
                    }}/>
                </>
            )}
        </div>
    );
};

CronPickerCmp.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.arrayOf(PropTypes.string),
    field: PropTypes.shape({
        readOnly: PropTypes.bool
    }),
    //     Lang: PropTypes.string.isRequired,
    // EditorContext: PropTypes.shape({
    //     lang: PropTypes.string.isRequired,
    //     uilang: PropTypes.string
    // }).isRequired,
    onChange: PropTypes.func.isRequired
};

export const CronPicker = withStyles(styles)(CronPickerCmp);
