import React from 'react';
import PropTypes from 'prop-types';

import {Cron} from 'react-js-cron';
import 'react-js-cron/dist/styles.css';
import './style.css';
import * as Locales from './locales';

export const CronUISelector = ({value, editorContext, onChange}) => {
    // React.useEffect(() => {
    //     import(`cron-input-ui/dist/locales/${editorContext.lang}.js`);
    // }, [editorContext.lang]);

    const locale = Locales[`LOCALE_${editorContext?.uilang.toUpperCase() || editorContext.lang.toUpperCase()}`];
    return (
        <div style={{position: 'relative'}}>
            <Cron humanizeValue
                  locale={locale}
                  value={value}
                  setValue={(cron, selectedPeriod) => {
                      console.log(selectedPeriod);
                      onChange(cron);
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
