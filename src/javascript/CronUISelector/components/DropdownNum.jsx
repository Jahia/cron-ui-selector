import React from 'react';
import {Dropdown} from '@jahia/moonstone';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core';

const styles = (/* theme */) => ({
    dropDown: {
        // MaxWidth: '50px',
        display: 'inline-block',
        marginLeft: 'var(--spacing-small)'
    }
});

const DropdownNumCmp = ({classes, value = '', data, onChange, readOnly}) => {
    const {t} = useTranslation('cron-ui-selector');

    const {label, dropdownData} = React.useMemo(() => ({
        label: value,
        dropdownData: data.map(v => {
            return {
                label: v,
                value: v
            };
        })
    }), [data, value]);

    return (
        <Dropdown
            className={classes.dropDown}
            name="cron-frequency"
            id="cron-frequency"
            isDisabled={readOnly}
            variant="outlined"
            size="small"
            data={dropdownData}
            label={label}
            value={value}
            hasSearch={dropdownData && dropdownData.length >= 10}
            searchEmptyText={t('content-editor:label.contentEditor.global.noResult')}
            onChange={onChange}
        />
    );
};

DropdownNumCmp.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    onChange: PropTypes.func.isRequired,
    // eslint-disable-next-line react/boolean-prop-naming
    readOnly: PropTypes.bool
};

export const DropdownNum = withStyles(styles)(DropdownNumCmp);
