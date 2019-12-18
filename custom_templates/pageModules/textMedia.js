import {
  constructRole,
  allowAsset,
  defaultStyleTypes,
  fieldObject
} from "../utils";
import * as c from "../constants";

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
        fieldTypes: [c.FIELD_TYPE_ENTRY, c.FIELD_TYPE_TITLE],
        contentTypes: [c.CONTENT_TYPE_TEXT],
        defaultClasses: {
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
        },
        required: false
      }),
      left_content: constructRole({
        fieldTypes: [
          c.FIELD_TYPE_ASSET,
          c.FIELD_TYPE_MARKDOWN,
          c.FIELD_TYPE_ENTRY
        ],
        assetTypes: [c.ASSET_TYPE_IMAGE],
        ...allowAsset({
          type: c.ASSET_TYPE_IMAGE,
          allowFormatting: false,
          maxWidth: "800"
        }),
        contentTypes: [c.CONTENT_TYPE_MEDIA], // TODO - contantize these and create a component which displays the allowed configurations based on this role.
        defaultClasses: {
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
        },
        description: `Text Field, Image Asset, Text Entry, or Media Entry.`,
        required: true
      }),
      right_content: constructRole({
        fieldTypes: [
          c.FIELD_TYPE_ASSET,
          c.FIELD_TYPE_MARKDOWN,
          c.FIELD_TYPE_ENTRY
        ],
        assetTypes: [c.ASSET_TYPE_IMAGE, c.ASSET_TYPE_VIDEO, c.ASSET_TYPE_PDF],
        ...allowAsset({
          type: c.ASSET_TYPE_IMAGE,
          allowFormatting: false,
          maxWidth: "800"
        }),
        contentTypes: [c.CONTENT_TYPE_MEDIA],
        defaultClasses: {
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
        },
        description: `Text Field, Image Asset, Text Entry, or Media Entry.`,
        required: true
      })
    }
  }
};
