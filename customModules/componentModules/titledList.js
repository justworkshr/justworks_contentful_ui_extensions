import * as u from "../utilities";
import * as c from "../constants";

export const titledList = {
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
        type: c.FIELD_TYPE_TEXT
      }),
      u.constructFieldConfig({
        type: c.FIELD_TYPE_ENTRY,
        contentType: c.CONTENT_TYPE_GENERIC_MARKDOWN
      })
    ]
  })
};
