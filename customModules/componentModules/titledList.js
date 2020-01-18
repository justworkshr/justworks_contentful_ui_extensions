import * as u from "../utilities";
import * as c from "../constants";

export const titledList = {
  [c.COMPONENT_TITLED_LIST]: {
    meta: {
      componentName: c.COMPONENT_TITLED_LIST,
      description: "",
      imageUrl: ""
    },
    properties: {
      titleText: u.constructComponentProperty({
        description: "Text for the title.",
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_TEXT
          }),
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentType: c.CONTENT_TYPE_GENERIC_TEXT
          })
        ]
      }),
      listMarkdown: u.constructComponentProperty({
        description: "Markdown formatted list.",
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_MARKDOWN
          }),
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentType: c.CONTENT_TYPE_GENERIC_MARKDOWN
          })
        ]
      })
    }
  }
};
