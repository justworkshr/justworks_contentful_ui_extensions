import {
  constructRole,
  allowAsset,
  fieldObject,
  allowMultipleReferences
} from "../utils";
import * as c from "../constants";

export const logoGrid = {
  [c.LOGO_GRID]: {
    meta: {
      hidden: true,
      description: "copy pending",
      imageUrl: ""
    },
    fieldRoles: {
      title: constructRole({
        description: "Template title.",
        required: false,
        field: fieldObject({ type: c.FIELD_TYPE_MARKDOWN }),
        defaultClasses: "text-center text-black"
      }),
      items: constructRole({
        description: "Grid items.",
        required: false,
        allowedCustomTemplates: [c.LOGO_ITEM],
        ...allowAsset({
          type: c.ASSET_TYPE_IMAGE,
          subType: c.ASSET_SUBTYPE_LOGO,
          allowFormatting: false,
          maxWidth: "200",
          defaultClasses: "icon-small icon-center"
        }),
        ...allowMultipleReferences({
          allow: true,
          styleType: c.MULTI_REFERENCE_STYLE_FLEX,
          allowStyle: true,
          contentTypes: ["customTemplate"]
        }),
        defaultClasses:
          "flex-row flex-align-start flex-justify-center flex-items-per-1 small-flex-items-per-2 large-flex-items-per-4"
      })
    }
  }
};
