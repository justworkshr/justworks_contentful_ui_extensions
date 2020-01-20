import * as u from "../utilities";
import * as c from "../constants";

export const titledList = {
  [c.COMPONENT_TITLED_LIST]: {
    meta: {
      componentName: c.COMPONENT_TITLED_LIST,
      componentTypes: [
        c.LINK_TYPE_SINGLETON,
        c.LINK_TYPE_ENTRY,
        c.LINK_TYPE_FIELD
      ],
      contentTypes: [c.CONTENT_TYPE_COMPONENT_MODULE],
      description: "",
      imageUrl: ""
    },
    properties: {
      titleText: u.constructComponentProperty({
        description: "Text for the title.",
        propertyType: c.PROPERTY_TYPE_TEXT
      }),
      listMarkdown: u.constructComponentProperty({
        description: "Markdown formatted list.",
        propertyType: c.PROPERTY_TYPE_MARKDOWN
      })
    }
  }
};
