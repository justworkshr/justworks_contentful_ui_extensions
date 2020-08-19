# Changelog

## Usage

The changelog is automatically parsed by the react component `ChangelogReader`.
All changelog entries must be placed under the `## Changes` header with the following format:

```
### Month/Day/Year

- Change item 1
- Change item 2
- Change item 3

```

## Changes

### 8/18/2020

- Added Custom Validation to all form input fields. This allows content editors to set custom validation rules on a specific input, such as requiring an input to have a value >= 1.
- Reworked the "Title Component" fields in multiple patterns - now these are direct text fields instead of singletons.
- Added "Statistic Section" to the pattern library
- Reworked the "Testimonial Section" to provide easier editing (less singletons, more direct fields)
- Added "Statistic Item" and "Testimonial Item" to provide more direct fields instead of singletons.
- Exposed the "load_width" property to the "advanced" tab of all image components to allow editors to optimize image sizes from the extension.
- Reworked the "composable LP Hero" pattern spacing properties. Now in the "style" tab, editors can separately configure the top and bottom spacing of this hero.

### 8/4/2020

- Created Changelog
