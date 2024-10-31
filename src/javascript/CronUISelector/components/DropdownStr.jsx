import React from 'react';
import {Dropdown/* , toIconComponent */} from '@jahia/moonstone';
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

    const {label/* , iconName */, dropdownData} = React.useMemo(() => ({
        label: t(value ? `label.${labelKey}.${value}` : 'label.emptyLabel'),
        // IconName: managedValue.config?.icon || '',
        dropdownData: data.map(v => {
            // Const iconStart = icon;
            return {
                label: t(`label.${labelKey}.${v}`),
                value: v
                // Description: t(description),
                // iconStart: iconStart && toIconComponent(iconStart),
                // attributes: {
                //     'data-value': picker
                // }
            };
        })
    }), [t, data, labelKey, value]);

    return (
        <Dropdown
            className={classes.dropDown}
            name="cron-frequency"
            id="cron-frequency"
            // ImageSize="small"
            isDisabled={readOnly}
            maxWidth="75px"
            variant="outlined"
            size="medium"
            data={dropdownData}
            label={label}
            value={value}
            // Icon={iconName && toIconComponent(iconName)}
            hasSearch={dropdownData && dropdownData.length >= 5}
            searchEmptyText={t('content-editor:label.contentEditor.global.noResult')}
            onChange={onChange}
            // OnBlur={onBlur}
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
