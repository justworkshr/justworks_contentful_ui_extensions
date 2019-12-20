import * as u from "../utilities";
import * as c from "../constants";

import {
  constructStyleView,
  constructStyleSection
} from "../constants/styleViews";

const markdownDefaultStyle = {
  ...u.constructStyleKeyValue({
    styleProperty: c.STYLE_PROPERTY_TEXT_ALIGNMENT,
    value: "left"
  }),
  ...u.constructStyleKeyValue({
    styleProperty: c.STYLE_PROPERTY_HEADER_TEXT_COLOR,
    value: "navy"
  }),
  ...u.constructStyleKeyValue({
    styleProperty: c.STYLE_PROPERTY_SUBHEADER_TEXT_COLOR,
    value: "black"
  }),
  ...u.constructStyleKeyValue({
    styleProperty: c.STYLE_PROPERTY_BODY_TEXT_COLOR,
    value: "black"
  })
};

export const cardBlock = {
  [c.CARD_BLOCK]: {
    meta: {
      description: "copy pending",
      imageUrl:
        "https://images.ctfassets.net/mnc2gcng0j8q/5pdJcFDuIBnItoXMFz1Uan/cb0e4626cfce261f21529a0d622110cd/Screenshot_from_2019-10-30_12-49-17.png"
    },
    style: {
      ...u.defaultStyleTypes(),
      tag_style: {
        ...u.templateStyleProperty({
          styleView: constructStyleView({
            styleSections: [
              constructStyleSection({
                componentType: c.STYLE_VIEW_COMPONENT_COLOR,
                styleProperty: c.STYLE_PROPERTY_BACKGROUND_COLOR,
                helpText: "The color for the top-right tag on this template."
              })
            ]
          })
        })
      }
    },
    fieldRoles: {
      left_text: u.constructRoleConfig({
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_MARKDOWN,
            styleView: c.STYLE_VIEW_MARKDOWN,
            defaultStyle: markdownDefaultStyle
          }),
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            styleView: c.STYLE_VIEW_MARKDOWN,
            contentTypes: [c.CONTENT_TYPE_GENERIC_MARKDOWN],
            defaultStyle: markdownDefaultStyle
          })
        ],
        required: true,
        description: `Primary markdown text to display on the left half section.`
      }),
      right_media: u.constructRoleConfig({
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ASSET,
            assetType: c.ASSET_TYPE_IMAGE
          })
        ],
        required: true,
        description: "Media to display on the right half section."
      }),
      card_link: u.constructRoleConfig({
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_TEXT
          }),
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentTypes: [c.CONTENT_TYPE_GENERIC_TEXT]
          })
        ],
        required: false,
        description: "Link url for the card."
      }),
      cta_text: u.constructRoleConfig({
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_TEXT
          }),
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentTypes: [c.CONTENT_TYPE_GENERIC_TEXT]
          })
        ],
        required: false,
        description: "Text for the optional CTA"
      }),
      tag_text: u.constructRoleConfig({
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_TEXT,
            defaultStyle: {
              ...u.constructStyleKeyValue({
                styleProperty: c.STYLE_PROPERTY_TEXT_COLOR,
                value: "white"
              }),
              ...u.constructStyleKeyValue({
                styleProperty: c.STYLE_PROPERTY_TEXT_TRANSFORM,
                value: "uppercase"
              })
            }
          }),
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentTypes: [c.CONTENT_TYPE_GENERIC_TEXT],
            defaultStyle: {
              ...u.constructStyleKeyValue({
                styleProperty: c.STYLE_PROPERTY_TEXT_COLOR,
                value: "white"
              }),
              ...u.constructStyleKeyValue({
                styleProperty: c.STYLE_PROPERTY_TEXT_TRANSFORM,
                value: "uppercase"
              })
            }
          })
        ],
        required: false,
        description:
          "Text for the optional tag on the upper right corner of the card."
      }),
      background_media: u.constructRoleConfig({
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ASSET,
            assetType: c.ASSET_TYPE_IMAGE
          })
        ],
        required: false,
        description:
          "Specific triangular SVG background for the right half of the card."
      })
    }
  }
};
