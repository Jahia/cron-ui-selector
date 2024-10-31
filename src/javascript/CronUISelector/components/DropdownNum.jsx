import React from 'react';
import {Dropdown/* , toIconComponent */} from '@jahia/moonstone';
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

    const {label/* , iconName */, dropdownData} = React.useMemo(() => ({
        label: value,
        // IconName: managedValue.config?.icon || '',
        dropdownData: data.map(v => {
            // Const iconStart = icon;
            return {
                label: v,
                value: v
                // Description: t(description),
                // iconStart: iconStart && toIconComponent(iconStart),
                // attributes: {
                //     'data-value': picker
                // }
            };
        })
    }), [data, value]);

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

DropdownNumCmp.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    onChange: PropTypes.func.isRequired,
    // eslint-disable-next-line react/boolean-prop-naming
    readOnly: PropTypes.bool
};

export const DropdownNum = withStyles(styles)(DropdownNumCmp);
