import React from 'react';
import PropTypes from 'prop-types';
const cronConverterU2q = require('cron-converter-u2q');
import {Cron} from 'react-js-cron';
import 'react-js-cron/dist/styles.css';
import './style.css';
import * as Locales from './locales';

export const CronUISelector = ({value, editorContext, onChange}) => {
    const locale = Locales[`LOCALE_${editorContext?.uilang.toUpperCase() || editorContext.lang.toUpperCase()}`];
    const {CronConverterU2Q: c2q} = cronConverterU2q;
    let unixExpression = value;
    try {
        unixExpression = c2q.quartzToUnix(value);
    } catch (e) {
        console.warn(e);
    }

    return (
        <div style={{position: 'relative'}}>
            <Cron humanizeValue
                  locale={locale}
                  value={unixExpression}
                  setValue={(cron/* ,selectedPeriod */) => {
                      const quartzExpression = c2q.unixToQuartz(cron);
                      onChange(quartzExpression);
                  }}

            />
        </div>
    );
};

CronUISelector.propTypes = {
    value: PropTypes.arrayOf(PropTypes.string),
    editorContext: PropTypes.shape({
        lang: PropTypes.string.isRequired,
        uilang: PropTypes.string
    }).isRequired,
    onChange: PropTypes.func.isRequired
};
