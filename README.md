# cron-ui-selector

The Jahia Cron UI Selector is a user-friendly interface that enables administrators and content editors
to easily schedule automated tasks within the Jahia content management system. This tool allows you to
configure complex cron expressions without the need to manually write cron syntax. It offers intuitive
options to select frequencies, days, times, and other parameters, simplifying the process of scheduling
repetitive or timed tasks.

## Quick start
To use the Cron selector in your Jahia project, follow these steps:

1- **Enable the Cron Selector Module**: Ensure that the Cron selector module is enabled in your project.
This module provides the necessary functionality for the Cron UI selector.

2- **Create a JSON Override**: To map the Cron selector to your property, you need to create a [JSON override][jsonOverride]
in the `jahia-content-editor-forms/fieldsets` directory of your project.

## Example
### Content definition
Suppose you have the following content definition:
```cnd
[jnt:cronTest] > jnt:content, jmix:basicContent
 - schedule (string)
```
This defines a content type `jnt:cronTest` with a `schedule` property of type `string`.

### Creating the JSON Override
To map the `schedule` property to use the Cron selector in the content editor, create a JSON override file
named `jnt_cronTest.json` with the following content:
```json
{
  "name": "jnt:cronTest",
  "fields": [
    {
      "name": "schedule",
      "selectorType": "Cron"
    }
  ]
}
```
* Explanation:
    * The `"name"` field specifies the content type (`jnt:cronTest`) you're overriding.
    * The `"fields"` array contains field configurations.
    * For the `schedule` property:
      * `"name"` is set to `"schedule"` to target the property.
      * `"selectorType"` is set to `"Cron"` to use the Cron UI selector for this field.

### Final Steps
* **Place the JSON File**: Save the `jnt_cronTest.json` file in the `jahia-content-editor-forms/fieldsets` directory
of your module.
* **Redeploy Your Module**: After adding the JSON override, redeploy your module to apply the changes.
* **Test in Content Editor**: Open the content editor for `jnt:cronTest`. You should now see the Cron selector
interface for the `schedule` property.

[jsonOverride]: https://academy.jahia.com/documentation/jahia-cms/jahia-8.2/developer/extending-and-customizing-jahia-ui/customizing-content-editor-forms/customizing-content-editor-forms
