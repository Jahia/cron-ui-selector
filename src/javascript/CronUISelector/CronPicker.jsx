import React, {useState, useEffect} from 'react';
// Import {Dropdown, Typography} from '@jahia/moonstone';
import PropTypes from 'prop-types';

import {
    // FREQUENCIES,
    MINUTES,
    HOURS,
    WEEK_DAYS,
    MONTH_DAYS,
    MONTHS,
    parseCronExpression,
    generateCronExpression
} from './CronPickerUtils';
import {useTranslation} from 'react-i18next';
import {DropdownFreq} from './components/DropdownFreq';
import {DropdownNum} from './components/DropdownNum';
import {DropdownStr} from './components/DropdownStr';

export const CronPicker = ({value = '', field: {readOnly}, onChange}) => {
    const {t} = useTranslation('cron-ui-selector');
    // Const resourceBundle = Locales[`LOCALE_CRON_PICKER_${editorContext?.uilang.toUpperCase() || editorContext.lang.toUpperCase()}`];
    const [frequency, setFrequency] = useState('NONE');
    const [minute, setMinute] = useState();
    const [hour, setHour] = useState();
    const [monthDay, setMonthDay] = useState();
    const [month, setMonth] = useState();
    const [weekDay, setWeekDay] = useState();

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
        if (frequency) {
            const cron = generateCronExpression({frequency, minute, hour, weekDay, monthDay, month});
            onChange(cron);
        }
    }, [frequency, minute, hour, weekDay, monthDay, month, onChange]);

    const handleFrequencyChange = item => {
        setFrequency(item.value);
    };

    return (
        <div className="cron-picker">
            <label htmlFor="frequency">{t('label.prefix.period')}: </label>
            <DropdownFreq {...{
                value: frequency,
                onChange: handleFrequencyChange,
                readOnly
            }}/>
            {frequency === 'EVERY_HOUR' && (
                <div>
                    {t('label.prefix.minutesForHourPeriod')}:
                    <DropdownNum {...{
                        value: minute,
                        data: MINUTES,
                        onChange: (e, item) => setMinute(item.value),
                        readOnly
                    }}/>
                    {t('label.suffix.minutesForHourPeriod')}
                </div>
            )}

            {frequency === 'EVERY_WEEK' && (
                <div>
                    {t('label.prefix.weekDays')}:
                    <DropdownStr {...{
                        value: weekDay,
                        data: WEEK_DAYS,
                        labelKey: 'weekDays',
                        onChange: (e, item) => setWeekDay(item.value),
                        readOnly
                    }}/>
                    {/* <select value={weekDay} onChange={e => setWeekDay(e.target.value)}> */}
                    {/*    {WEEK_DAYS.map(day => ( */}
                    {/*        <option key={day} value={day}> */}
                    {/*            {t(`label.weekDays.${day}`)} */}
                    {/*        </option> */}
                    {/*    ))} */}
                    {/* </select> */}
                </div>
            )}

            {['EVERY_MONTH', 'EVERY_YEAR'].includes(frequency) && (
                <div>
                    {t('label.prefix.monthDays')}:
                    <DropdownNum {...{
                        value: monthDay,
                        data: MONTH_DAYS,
                        onChange: (e, item) => setMonthDay(item.value),
                        readOnly
                    }}/>
                </div>
            )}

            {frequency === 'EVERY_YEAR' && (
                <div>
                    {t('label.prefix.months')}:
                    <DropdownStr {...{
                        value: month,
                        data: MONTHS,
                        labelKey: 'months',
                        onChange: (e, item) => setMonth(item.value),
                        readOnly
                    }}/>
                    {/* <select value={month} onChange={e => setMonth(e.target.value)}> */}
                    {/*    {MONTHS.map(m => ( */}
                    {/*        <option key={m} value={m}> */}
                    {/*            {t(`label.months.${m}`)} */}
                    {/*        </option> */}
                    {/*    ))} */}
                    {/* </select> */}
                </div>
            )}

            {['EVERY_DAY', 'EVERY_WEEK', 'EVERY_MONTH', 'EVERY_YEAR'].includes(frequency) && (
                <div>
                    {t('label.prefix.hours')}:
                    <DropdownNum {...{
                        value: hour,
                        data: HOURS,
                        onChange: (e, item) => setHour(item.value),
                        readOnly
                    }}/>
                    {t('label.prefix.minutes')}
                    <DropdownNum {...{
                        value: minute,
                        data: MINUTES,
                        onChange: (e, item) => setMinute(item.value),
                        readOnly
                    }}/>
                </div>
            )}
        </div>
    );
};

CronPicker.propTypes = {
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

// Export default CronPicker;
