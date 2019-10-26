/////////////////
// Instructions
////////////////
// Add all new template internal mappings here.
// Ensure all template names are downcased.
// Warning 1) NEVER change a role name without changing the corresponding mapping in the template.
// Warning 2) NEVER change a content type name without changing the name here too.
////////////////

const constructRole = ({ contentType = '', description = '', required = true } = {}) => {
  return {
    contentType,
    required,
    description
  };
};

export const internal_mappings = {
  'card block': {
    text: constructRole({
      contentType: 'text',
      required: true,
      description: 'Primary markdown text to display on the left half section.'
    }),
    link: constructRole({
      contentType: 'link',
      required: false,
      description: 'Optional link to supply for when a user clicks on the card.'
    }),
    cta_text: constructRole({
      contentType: 'text',
      required: false,
      description: 'Text for the optional CTA'
    }),
    tag_text: constructRole({
      contentType: 'text',
      required: false,
      description: 'Text for the optional tag on the upper right corner of the card.'
    }),
    media: constructRole({
      contentType: 'media',
      required: false,
      description: 'Optional media (image or video) to display on the right half section.'
    }),
    background_media: constructRole({
      contentType: 'media',
      required: false,
      description:
        'Optional media to display in the background of the right half of the card. Optimized for a specific image type.'
    }),
    tag_text_style: constructRole({
      contentType: 'style',
      required: false,
      description: 'Optional style to apply to the optional tag.'
    }),
    media_fallback_style: constructRole({
      contentType: 'style',
      required: false,
      description:
        "Use 'background color' to define a solid color which should display if a Media entry is not used."
    })
  }
};
