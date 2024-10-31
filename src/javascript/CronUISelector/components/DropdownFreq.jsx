import React from 'react';
import {Dropdown/* , toIconComponent */} from '@jahia/moonstone';
import {useTranslation} from 'react-i18next';
import {FREQUENCIES} from '../CronPickerUtils';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core';

const styles = (/* theme */) => ({
    dropDown: {
        // MaxWidth: '100px',
        display: 'inline-block',
        marginLeft: 'var(--spacing-small)'
    }
    // CopyButton: {
    //     marginLeft: 'var(--spacing-small)'
    // },
    // fieldSetDescription: {
    //     overflowWrap: 'anywhere',
    //     marginTop: 'var(--spacing-nano)',
    //     color: 'var(--color-dark60)',
    //     backgroundColor: theme.palette.ui.epsilon,
    //     width: '100%',
    //     /* Height: theme.spacing.unit * 9, */
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    //     border: '1px rgba(218, 218, 218, 0.4) solid',
    //     // Border: '1px var(--color-gray40) solid',
    //     // boxShadow: '1px 5px 6px rgba(64, 77, 86, 0.1)',
    //     borderRadius: '2px',
    //     padding: '6px'
    // }
});

const DropdownFreqCmp = ({classes, value = '', onChange, readOnly}) => {
    const {t} = useTranslation('cron-ui-selector');

    const {label/* , iconName */, dropdownData} = React.useMemo(() => ({
        label: t(`label.frequencies.${FREQUENCIES.find(({value: v}) => v === value).labelKey || FREQUENCIES[0].labelKey}`),
        // IconName: managedValue.config?.icon || '',
        dropdownData: FREQUENCIES.map(({value, labelKey}) => {
            // Const iconStart = icon;
            return {
                label: t(`label.frequencies.${labelKey}`),
                value: value
                // Description: t(description),
                // iconStart: iconStart && toIconComponent(iconStart),
                // attributes: {
                //     'data-value': picker
                // }
            };
        })
    }), [t, value]);

    return (
        <Dropdown
            className={classes.dropDown}
            name="cron-frequency"
            id="cron-frequency"
            // ImageSize="small"
            isDisabled={readOnly}
            variant="outlined"
            size="medium"
            data={dropdownData}
            label={label}
            value={value}
            // Icon={iconName && toIconComponent(iconName)}
            hasSearch={dropdownData && dropdownData.length >= 5}
            searchEmptyText={t('content-editor:label.contentEditor.global.noResult')}
            onChange={(e, item) => onChange(item)}
            // OnBlur={onBlur}
        />
    );
};

DropdownFreqCmp.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    // eslint-disable-next-line react/boolean-prop-naming
    readOnly: PropTypes.bool
};

export const DropdownFreq = withStyles(styles)(DropdownFreqCmp);
