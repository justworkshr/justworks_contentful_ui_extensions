import { constructRole, constructFieldConfig, defaultStyleTypes } from "../utils";
import * as c from "../constants";

const markdownDefaultStyle = {
  // textAlignment
  [c.STYLE_PROPERTY_TEXT_ALIGNMENT.key]:
    c.STYLE_PROPERTY_TEXT_ALIGNMENT.values[0].value, // left
  // headerColor
  [c.STYLE_PROPERTY_HEADER_TEXT_COLOR.key]:
    c.STYLE_PROPERTY_HEADER_TEXT_COLOR.values[0].value, // black
  //subheaderColor
  [c.STYLE_PROPERTY_SUBHEADER_TEXT_COLOR.key]:
    c.STYLE_PROPERTY_SUBHEADER_TEXT_COLOR.values[0].value, // black
  // bodyColor
  [c.STYLE_PROPERTY_BODY_TEXT_COLOR.key]:
    c.STYLE_PROPERTY_BODY_TEXT_COLOR.values[0].value // black
};

export const textMedia = {
  [c.TEXT_MEDIA_MODULE]: {
    meta: {
      description: "copy pending",
      imageUrl:
        "https://images.ctfassets.net/mnc2gcng0j8q/3xn8AvsyundHautmUuOKhJ/b7f3bd11eb55910ca7b3e34920099f39/Screenshot_from_2019-10-30_12-49-03.png"
    },
    style: {
      ...defaultStyleTypes()
    },
    fieldRoles: {
      title: constructRole({
        fieldConfigs: [
          constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            styleView: c.STYLE_VIEW_MARKDOWN,
            contentType: c.CONTENT_TYPE_GENERIC_TEXT
          }),
          constructFieldConfig({
            type: c.FIELD_TYPE_TITLE,
            styleView: c.STYLE_VIEW_TITLE,
            defaultStyle: {
              // titleSize
              [c.STYLE_PROPERTY_TITLE_SIZE.key]:
                c.STYLE_PROPERTY_TITLE_SIZE.values[0].value, // Display
              // textColor
              [c.STYLE_PROPERTY_TEXT_COLOR
                .key]: c.STYLE_PROPERTY_TEXT_COLOR.values.find(
                v => v.value === "navy"
              ).value, // navy
              // textAlignment
              [c.STYLE_PROPERTY_TEXT_ALIGNMENT.key]:
                c.STYLE_PROPERTY_TEXT_ALIGNMENT.values[1].value // center
            }
          })
        ],
        required: false
      }),
      left_content: constructRole({
        fieldConfigs: [
          constructFieldConfig({
            type: c.FIELD_TYPE_ASSET,
            assetTypes: [c.ASSET_TYPE_IMAGE]
          }),
          constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentType: c.CONTENT_TYPE_MEDIA
          }),
          constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentType: c.CONTENT_TYPE_GENERIC_MARKDOWN,
            styleView: c.STYLE_VIEW_MARKDOWN,
            defaultStyle: markdownDefaultStyle
          }),
          constructFieldConfig({
            type: c.FIELD_TYPE_MARKDOWN,
            styleView: c.STYLE_VIEW_MARKDOWN,
            defaultStyle: markdownDefaultStyle
          })
        ],

        description: `Text Field, Image Asset, Text Entry, or Media Entry.`,
        required: true
      }),
      right_content: constructRole({
        fieldConfigs: [
          constructFieldConfig({
            type: c.FIELD_TYPE_ASSET,
            assetTypes: [c.ASSET_TYPE_IMAGE]
          }),
          constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentType: c.CONTENT_TYPE_MEDIA
          }),
          constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentType: c.CONTENT_TYPE_GENERIC_MARKDOWN,
            styleView: c.STYLE_VIEW_MARKDOWN,
            defaultStyle: markdownDefaultStyle
          }),
          constructFieldConfig({
            type: c.FIELD_TYPE_MARKDOWN,
            styleView: c.STYLE_VIEW_MARKDOWN,
            defaultStyle: markdownDefaultStyle
          })
        ],
        description: `Text Field, Image Asset, Text Entry, or Media Entry.`,
        required: true
      })
    }
  }
};
