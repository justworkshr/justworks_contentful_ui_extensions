import {
  constructRole,
  allowAsset,
  defaultStyleTypes,
  fieldObject
} from "../utils";
import * as c from "../constants";

export const textMediaModule = {
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
      left_content: constructRole({
        ...allowAsset({
          type: c.ASSET_TYPE_IMAGE,
          allowFormatting: false,
          maxWidth: "800"
        }),
        contentType: [c.CONTENT_TYPE_TEXT, c.CONTENT_TYPE_MEDIA], // TODO - contantize these and create a component which displays the allowed configurations based on this role.
        field: fieldObject({ type: c.FIELD_TYPE_MARKDOWN }),
        defaultClasses: "text-left text-black",
        description: `Text Field, Image Asset, Text Entry, or Media Entry.`,
        required: true
        // style: {
        //   default: {
        //     types: [c.STYLE_TYPE_CUSTOM, c.STYLE_TYPE_ENTRY]
        //   }
        // }
      }),
      right_content: constructRole({
        ...allowAsset({
          type: c.ASSET_TYPE_IMAGE,
          allowFormatting: false,
          maxWidth: "800"
        }),
        contentType: [c.CONTENT_TYPE_TEXT, c.CONTENT_TYPE_MEDIA],
        field: fieldObject({ type: c.FIELD_TYPE_MARKDOWN }),
        defaultClasses: "text-left text-black",
        description: `Text Field, Image Asset, Text Entry, or Media Entry.`,
        required: true
      })
    }
  }
};
