import React from 'react';
import {Dropdown} from '@jahia/moonstone';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core';

const styles = (/* theme */) => ({
    dropDown: {
        // MaxWidth: '100px',
        display: 'inline-block',
        marginLeft: 'var(--spacing-small)'
    }
});

const DropdownStrCmp = ({classes, value = '', data, labelKey, onChange, readOnly}) => {
    const {t} = useTranslation('cron-ui-selector');

    const {label, dropdownData} = React.useMemo(() => ({
        label: t(value ? `label.${labelKey}.${value}` : 'label.emptyLabel'),
        dropdownData: data.map(v => {
            return {
                label: t(`label.${labelKey}.${v}`),
                value: v
            };
        })
    }), [t, data, labelKey, value]);

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
            hasSearch={dropdownData && dropdownData.length > 12}
            searchEmptyText={t('content-editor:label.contentEditor.global.noResult')}
            onChange={onChange}
        />
    );
};

DropdownStrCmp.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.string).isRequired,
    labelKey: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    // eslint-disable-next-line react/boolean-prop-naming
    readOnly: PropTypes.bool
};

export const DropdownStr = withStyles(styles)(DropdownStrCmp);
