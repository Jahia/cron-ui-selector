import {registry} from '@jahia/ui-extender';
// Import {CronUISelector} from './CronUISelector';
import {CronPicker} from './CronUISelector';

export default function () {
    registry.add('callback', 'cron-ui-selector', {
        targets: ['jahiaApp-init:2'],
        callback: () => {
            registry.add('selectorType', 'Cron', {
                cmp: CronPicker,
                supportMultiple: true
            });
            console.debug('%c Cron Editor Extensions  is activated', 'color: #3c8cba');
        }
    });
}
