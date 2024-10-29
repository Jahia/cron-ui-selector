import React, {useState, useEffect} from 'react';
// Import {Dropdown, Typography} from '@jahia/moonstone';
import PropTypes from 'prop-types';
import * as Locales from './locales';
import {MINUTES, HOURS, MONTH_DAYS, parseCronExpression, generateCronExpression} from './CronPickerUtils';

/* eslint-disable react/jsx-child-element-spacing */
export const CronPicker = ({value = '', editorContext, onChange}) => {
    const resourceBundle = Locales[`LOCALE_CRON_PICKER_${editorContext?.uilang.toUpperCase() || editorContext.lang.toUpperCase()}`];
    const [frequency, setFrequency] = useState();
    const [minute, setMinute] = useState();
    const [hour, setHour] = useState();
    const [monthDay, setMonthDay] = useState();
    const [month, setMonth] = useState();
    const [weekDay, setWeekDay] = useState();

    useEffect(() => {
        parseCronExpression({
            cron: value,
            resourceBundle,
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
            const cron = generateCronExpression({resourceBundle, frequency, minute, hour, weekDay, monthDay, month});
            onChange(cron);
        }
    }, [resourceBundle, frequency, minute, hour, weekDay, monthDay, month, onChange]);

    const handleFrequencyChange = e => {
        setFrequency(e.target.value);
    };

    return (
        <div className="cron-picker">
            <label htmlFor="frequency">Every: </label>
            <select id="frequency" value={frequency} onChange={handleFrequencyChange}>
                {resourceBundle.FREQUENCIES.map(freq => (
                    <option key={freq.value} value={freq.value}>
                        {freq.label}
                    </option>
                ))}
            </select>

            {frequency === 'EVERY_HOUR' && (
                <div>
                    At mins:
                    <select value={minute} onChange={e => setMinute(e.target.value)}>
                        {MINUTES.map(m => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {['EVERY_DAY', 'EVERY_WEEK', 'EVERY_MONTH', 'EVERY_YEAR'].includes(frequency) && (
                <div>
                    At:
                    <select value={hour} onChange={e => setHour(e.target.value)}>
                        {HOURS.map(h => (
                            <option key={h} value={h}>
                                {h}
                            </option>
                        ))}
                    </select>
                    :
                    <select value={minute} onChange={e => setMinute(e.target.value)}>
                        {MINUTES.map(m => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {frequency === 'EVERY_WEEK' && (
                <div>
                    On:
                    <select value={weekDay} onChange={e => setWeekDay(e.target.value)}>
                        {resourceBundle.WEEK_DAYS.map(day => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {['EVERY_MONTH', 'EVERY_YEAR'].includes(frequency) && (
                <div>
                    On day:
                    <select value={monthDay} onChange={e => setMonthDay(e.target.value)}>
                        {MONTH_DAYS.map(d => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {frequency === 'EVERY_YEAR' && (
                <div>
                    Of:
                    <select value={month} onChange={e => setMonth(e.target.value)}>
                        {resourceBundle.MONTHS.map(m => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

CronPicker.propTypes = {
    value: PropTypes.arrayOf(PropTypes.string),
    editorContext: PropTypes.shape({
        lang: PropTypes.string.isRequired,
        uilang: PropTypes.string
    }).isRequired,
    onChange: PropTypes.func.isRequired
};

// Export default CronPicker;
