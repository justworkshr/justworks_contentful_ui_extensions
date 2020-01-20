import * as u from "../utilities";
import * as c from "../constants";

export const titledList = {
  [c.COMPONENT_TITLED_LIST]: {
    meta: {
      componentName: c.COMPONENT_TITLED_LIST,
      componentTypes: [c.FIELD_TYPE_ENTRY, c.FIELD_TYPE_FIELD],
      contentTypes: [c.CONTENT_TYPE_COMPONENT_MODULE],
      description: "",
      imageUrl: ""
    },
    properties: {
      titleText: u.constructComponentProperty({
        description: "Text for the title.",
        propertyType: c.FIELD_TYPE_TEXT
      }),
      listMarkdown: u.constructComponentProperty({
        description: "Markdown formatted list.",
        propertyType: c.FIELD_TYPE_MARKDOWN
      })
    }
  }
};
