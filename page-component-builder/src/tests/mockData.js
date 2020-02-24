export const mockSchemas = {
  data: {
    tags: {
      component: [
        'uncategorized',
        'form',
        'grid',
        'media',
        'spacing',
        'text',
        'action',
        'card',
        'collection',
        'nav',
        'cta',
        'mixed-media',
        'hero'
      ],
      content: ['curated-guide-list', 'guide', 'resource', 'blog-post', 'video', 'image'],
      location: ['landing-page', 'resource-center', 'marketing-site', 'guidepost']
    },
    components: [
      {
        meta: {
          id: 'components/adaptive_carousel',
          styleguide_path: '/styleguide/components%2Fadaptive_carousel',
          description:
            'A carousel which is configurable to display any number of elements at each breakpoint.',
          editor_role: 'component',
          tags: ['collection']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsAdaptiveCarouselComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          autoplay: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            hidden: false
          },
          mouse_drag: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            hidden: false
          },
          sm_max: {
            type: 'number',
            required: false,
            default: 1,
            description: null,
            related_to: null,
            hidden: false
          },
          md_max: {
            type: 'number',
            required: false,
            default: 2,
            description: null,
            related_to: null,
            hidden: false
          },
          lg_max: {
            type: 'number',
            required: false,
            default: 3,
            description: null,
            related_to: null,
            hidden: false
          },
          xl_max: {
            type: 'number',
            required: false,
            default: 3,
            description: null,
            related_to: null,
            hidden: false
          },
          slide_by: {
            type: 'number',
            required: false,
            default: 1,
            description: 'number of items to scroll by each time',
            related_to: null,
            hidden: false
          },
          items: {
            type: 'multi-component',
            required: true,
            default: [],
            options: ['components/basic_text_nav_card'],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/adaptive_column_grid',
          styleguide_path: '/styleguide/components%2Fadaptive_column_grid',
          description:
            'An adaptive grid that automatically wraps its items. Maximum columns per row can set to 2, 3, or 4. Supports wrapping rows by filling the entire row with any leftovers evenly. Wraps align to the left and top of the row.',
          editor_role: 'component',
          tags: ['collection']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsAdaptiveColumnGridComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          xl_max: {
            type: 'number',
            required: false,
            default: 4,
            description: 'The max number of columns per row before triggering a wrap.',
            related_to: null,
            hidden: false
          },
          lg_max: {
            type: 'number',
            required: false,
            default: 4,
            description: 'The max number of columns per row before triggering a wrap.',
            related_to: null,
            hidden: false
          },
          md_max: {
            type: 'number',
            required: false,
            default: 2,
            description: 'The max number of columns per row before triggering a wrap.',
            related_to: null,
            hidden: false
          },
          sm_max: {
            type: 'number',
            required: false,
            default: 1,
            description: 'The max number of columns per row before triggering a wrap.',
            related_to: null,
            hidden: false
          },
          items: {
            type: 'multi-component',
            required: true,
            default: [],
            options: [
              'components/basic_text_nav_card',
              'components/celebrated_list_item',
              'components/headed_list',
              'components/headed_paragraph'
            ],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/basic_lead_form',
          styleguide_path: '/styleguide/components%2Fbasic_lead_form',
          description: 'A single page lead form which can support multiple input groups.',
          editor_role: 'component',
          tags: ['form']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsBasicLeadFormComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          top_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'Text above the form.',
            related_to: 'elements/heading',
            hidden: false
          },
          submit_button_text: {
            type: 'text',
            required: true,
            default: 'Submit',
            options: null,
            description: null,
            related_to: 'components/cta_button',
            hidden: false
          },
          form_endpoint: {
            type: 'text',
            required: true,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          form_input_groups: {
            type: 'multi-component',
            required: true,
            default: [],
            options: ['components/form_input_group'],
            description: 'Collection of form input components.',
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/basic_text_nav_card',
          styleguide_path: '/styleguide/components%2Fbasic_text_nav_card',
          description:
            'A surface card with hover state which acts as a nav link and has a color override property.',
          editor_role: 'component',
          tags: ['card']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsBasicTextNavCardComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          heading_label_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          heading_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          paragraph_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          href: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          cta_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          color_override: {
            type: 'color',
            required: false,
            default: null,
            options: null,
            description: 'Hex value -- color value overrides card cap color.',
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/breadcrumb_text',
          styleguide_path: '/styleguide/components%2Fbreadcrumb_text',
          description: 'Description of component.',
          editor_role: 'component',
          tags: ['text', 'collection'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsBreadcrumbTextComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          stack_size: {
            type: 'text',
            required: false,
            default: null,
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: null,
            related_to: null,
            hidden: false
          },
          link_texts: {
            type: 'multi-text',
            required: false,
            default: [],
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          link_urls: {
            type: 'multi-text',
            required: false,
            default: [],
            options: null,
            description: null,
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/button_modal',
          styleguide_path: '/styleguide/components%2Fbutton_modal',
          description: 'A button component connected to a generic modal component.',
          editor_role: 'component',
          tags: ['action'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsButtonModalComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          modal_component: {
            type: 'component',
            required: false,
            default: null,
            options: [],
            description: null,
            related_to: null
          },
          button_component: {
            type: 'component',
            required: false,
            default: null,
            options: [],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/card_resource_showcase_section',
          styleguide_path: '/styleguide/components%2Fcard_resource_showcase_section',
          description:
            'A page content section for resources with an opinionated layout. The "large-single" preset displays a maximum of 4 items and the "inline-all" displays a maximum of 6.',
          editor_role: 'component',
          tags: ['collection']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsCardResourceShowcaseSectionComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: false,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            hidden: false
          },
          heading_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          lead_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          preset_config: {
            type: 'text',
            required: false,
            default: 'large-single',
            options: ['large-single', 'inline-all'],
            description: null,
            related_to: null,
            hidden: false
          },
          items: {
            type: 'multi-link',
            required: false,
            default: [],
            asset_types: [],
            content_types: ['Content::BlogPost'],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/celebrated_list_item',
          styleguide_path: '/styleguide/components%2Fcelebrated_list_item',
          description:
            'A text group with an icon to be used with within 3 or 4 columns. Currently uses decorative icon assets.',
          editor_role: 'component',
          tags: ['text', 'media']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsCelebratedListItemComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          icon_url: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'Optional in place of using actual contentful asset.',
            related_to: null,
            hidden: false
          },
          heading_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          paragraph_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          icon_asset: {
            type: 'link',
            required: false,
            asset_types: ['image'],
            content_types: [],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/configurable_card',
          styleguide_path: '/styleguide/components%2Fconfigurable_card',
          description:
            'A card component which can be configured to hide certain elements or rearrange itself across breakpoints.',
          editor_role: 'component',
          tags: ['card']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsConfigurableCardComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          xl_config: {
            type: 'text',
            required: false,
            default: 'card',
            options: [
              'card',
              'card-no-description',
              'inline',
              'inline-no-description',
              'text-only'
            ],
            description: null,
            related_to: null,
            hidden: false
          },
          lg_config: {
            type: 'text',
            required: false,
            default: 'card',
            options: [
              'card',
              'card-no-description',
              'inline',
              'inline-no-description',
              'text-only'
            ],
            description: null,
            related_to: null,
            hidden: false
          },
          md_config: {
            type: 'text',
            required: false,
            default: 'card',
            options: [
              'card',
              'card-no-description',
              'inline',
              'inline-no-description',
              'text-only'
            ],
            description: null,
            related_to: null,
            hidden: false
          },
          sm_config: {
            type: 'text',
            required: false,
            default: 'card',
            options: [
              'card',
              'card-no-description',
              'inline',
              'inline-no-description',
              'text-only'
            ],
            description: null,
            related_to: null,
            hidden: false
          },
          label_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          title_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          description_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          meta_1_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          meta_2_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          href: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          image_url: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          image_asset: {
            type: 'link',
            required: false,
            asset_types: ['image'],
            content_types: [],
            description: 'Overrides image_url and provides other essential metadata like "alt".',
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/configurable_resource_card',
          styleguide_path: '/styleguide/components%2Fconfigurable_resource_card',
          description:
            'A module which transforms contentful entries into a configurable card component.',
          editor_role: 'component',
          extension_of: 'components/configurable_card',
          tags: ['card']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsConfigurableResourceCardComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          xl_config: {
            type: 'text',
            required: false,
            default: 'card',
            options: [
              'card',
              'card-no-description',
              'inline',
              'inline-no-description',
              'text-only'
            ],
            description: null,
            related_to: null,
            hidden: false
          },
          lg_config: {
            type: 'text',
            required: false,
            default: 'card',
            options: [
              'card',
              'card-no-description',
              'inline',
              'inline-no-description',
              'text-only'
            ],
            description: null,
            related_to: null,
            hidden: false
          },
          md_config: {
            type: 'text',
            required: false,
            default: 'card',
            options: [
              'card',
              'card-no-description',
              'inline',
              'inline-no-description',
              'text-only'
            ],
            description: null,
            related_to: null,
            hidden: false
          },
          sm_config: {
            type: 'text',
            required: false,
            default: 'card',
            options: [
              'card',
              'card-no-description',
              'inline',
              'inline-no-description',
              'text-only'
            ],
            description: null,
            related_to: null,
            hidden: false
          },
          resource: {
            type: 'link',
            required: false,
            asset_types: [],
            content_types: ['Content::BlogPost'],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/conversion_modal_content',
          styleguide_path: '/styleguide/components%2Fconversion_modal_content',
          description: 'A component with text content and a cta button with popup modal.',
          editor_role: 'component',
          tags: ['cta', 'action'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsConversionModalContentComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          overline_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          heading_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          body_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          cta_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          cta_intent: {
            type: 'text',
            required: false,
            default: null,
            options: ['primary', 'secondary', 'tertiary'],
            description: null,
            related_to: null,
            hidden: false
          },
          cta_icon: {
            type: 'text',
            required: false,
            default: null,
            options: [
              'arrow-right',
              'calendar-circle-filled',
              'caret-left-circle-filled',
              'caret-right-circle-filled',
              'checkmark',
              'chevron-down',
              'download',
              'facebook',
              'hamburger-menu',
              'hashtag-circle-filled',
              'linked-in',
              'mail',
              'menu-close',
              'minus',
              'play',
              'play-circle-filled',
              'play-circle-outline',
              'plus',
              'search-circle-filled',
              'twitter'
            ],
            description: null,
            related_to: null,
            hidden: false
          },
          modal_component: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/cta_button',
          styleguide_path: '/styleguide/components%2Fcta_button',
          description:
            'A themed CTA button with 3 intent level options. Each button can be adapted with an icon and sized.',
          editor_role: 'component',
          tags: ['action']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsCtaButtonComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          intent: {
            type: 'text',
            required: true,
            default: 'primary',
            options: ['primary', 'secondary', 'tertiary'],
            description: null,
            related_to: 'foundations/theme_colors',
            hidden: false
          },
          size: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'sm'],
            description: null,
            related_to: 'foundations/inset_shapes',
            hidden: false
          },
          button_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          icon_name: {
            type: 'text',
            required: false,
            default: null,
            options: [
              'arrow-right',
              'calendar-circle-filled',
              'caret-left-circle-filled',
              'caret-right-circle-filled',
              'checkmark',
              'chevron-down',
              'download',
              'facebook',
              'hamburger-menu',
              'hashtag-circle-filled',
              'linked-in',
              'mail',
              'menu-close',
              'minus',
              'play',
              'play-circle-filled',
              'play-circle-outline',
              'plus',
              'search-circle-filled',
              'twitter'
            ],
            description: 'May select any available icon.',
            related_to: 'elements/icon',
            hidden: false
          },
          href: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          onclick: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          disabled: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/dropdown_curated_guide_lists',
          styleguide_path: '/styleguide/components%2Fdropdown_curated_guide_lists',
          description:
            'A specific interface to add multiple CuratedGuideList into a selectable dropdown component.',
          editor_role: 'component',
          tags: ['collection'],
          extension_of: 'components/dropdown_selectable_components'
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsDropdownCuratedGuideListsComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          max_items: {
            type: 'number',
            required: false,
            default: 4,
            description: null,
            related_to: null,
            hidden: false
          },
          curated_guide_lists: {
            type: 'multi-link',
            required: false,
            default: [],
            asset_types: [],
            content_types: ['Content::CuratedGuideList'],
            description: null,
            related_to: null
          },
          cta_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          cta_intent: {
            type: 'text',
            required: false,
            default: null,
            options: ['primary', 'secondary', 'tertiary'],
            description: null,
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/featured_video_resource_showcase',
          styleguide_path: '/styleguide/components%2Ffeatured_video_resource_showcase',
          description: 'Description of component.',
          editor_role: 'component',
          tags: ['collection'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsFeaturedVideoResourceShowcaseComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          video_entries: {
            type: 'multi-link',
            required: false,
            default: [],
            asset_types: [],
            content_types: ['Content::Video', 'Content::Resource'],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/form_input_group',
          styleguide_path: '/styleguide/components%2Fform_input_group',
          description:
            'Input groups provide optional lead text above a variable set of labeled inputs. They allow you to group input sections together by category.',
          editor_role: 'component',
          tags: ['form']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsFormInputGroupComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          group_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'Text above the form group',
            related_to: 'elements/lead_text',
            hidden: false
          },
          input_groups: {
            type: 'multi-component',
            required: true,
            default: [],
            options: ['components/labeled_text_input', 'components/labeled_select_input'],
            description: 'A collection of input groups',
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/full_background_image',
          styleguide_path: '/styleguide/components%2Ffull_background_image',
          description:
            'The background image component attaches itself to its parent container and grows with the height of the container. It maintains its original aspect ratio as the container grows and remains focused on the center of the image.',
          editor_role: 'singleton',
          tags: ['media']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsFullBackgroundImageComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          image_url: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: 'elements/image',
            hidden: true
          },
          alt: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description:
              "Text for accessibility & screen-readers. When using contentful, use the 'description' property of the asset for this.",
            related_to: 'elements/image',
            hidden: true
          },
          format: {
            type: 'text',
            required: false,
            default: 'png',
            options: null,
            description: null,
            related_to: 'elements/image',
            hidden: true
          },
          lazy: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: true,
            description:
              'Whether the image should load when the user scrolls over it. Set to true for page-speed. Set to false for above-fold images like heroes.',
            related_to: 'elements/image',
            hidden: true
          },
          load_width: {
            type: 'number',
            required: false,
            default: 2400,
            description:
              'The max-width of the image when requesting from the image api. For load-speed optimization, please use a module-optimized width.',
            related_to: 'elements/image',
            hidden: true
          },
          image_asset: {
            type: 'link',
            required: false,
            asset_types: ['image'],
            content_types: [],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/guide_carousel',
          styleguide_path: '/styleguide/components%2Fguide_carousel',
          description: 'Description of component.',
          editor_role: 'component',
          tags: ['collection'],
          extension_of: 'components/single_column_carousel'
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsGuideCarouselComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          action_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/cta_button', 'components/button_modal'],
            description: null,
            related_to: null
          },
          guides: {
            type: 'multi-link',
            required: false,
            default: [],
            asset_types: [],
            content_types: ['Content::Guide'],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/guide_list_grid',
          styleguide_path: '/styleguide/components%2Fguide_list_grid',
          description:
            'A direct interface for loading a CuratedGuideList into the split resource grid. Associated by defualt to a CTA button link to the guide page. Otherwise, a custom action component can be passed in and replace it.',
          editor_role: 'component',
          tags: ['collection'],
          extension_of: 'components/split_resource_grid'
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsGuideListGridComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          max_items: {
            type: 'number',
            required: false,
            default: 4,
            description: null,
            related_to: null,
            hidden: false
          },
          guide_list: {
            type: 'link',
            required: false,
            asset_types: [],
            content_types: ['Content::CuratedGuideList'],
            description: null,
            related_to: null
          },
          cta_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'Default CTA button text',
            related_to: null,
            hidden: false
          },
          cta_intent: {
            type: 'text',
            required: false,
            default: null,
            options: ['primary', 'secondary', 'tertiary'],
            description: 'Default CTA button intent style.',
            related_to: null,
            hidden: false
          },
          action_component: {
            type: 'component',
            required: false,
            default: null,
            options: [
              'components/button_modal',
              'components/cta_button',
              'components/utility_button'
            ],
            description: 'A completely custom action component which overrides default CTA button.',
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/headed_list',
          styleguide_path: '/styleguide/components%2Fheaded_list',
          description:
            'A heading element above a paragraph list. Can support markdown and custom list bullets.',
          editor_role: 'component',
          tags: ['text']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsHeadedListComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          heading_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: 'elements/heading',
            hidden: false
          },
          list_markdown: {
            type: 'markdown',
            required: true,
            default: null,
            description: null,
            related_to: 'elements/markdown_list',
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/headed_paragraph',
          styleguide_path: '/styleguide/components%2Fheaded_paragraph',
          description: 'A heading element above a paragraph. Can support markdown.',
          editor_role: 'component',
          tags: ['text']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsHeadedParagraphComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          heading_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          heading_size: {
            type: 'text',
            required: false,
            default: 'md',
            options: ['xl', 'lg', 'md', 'xxs'],
            description: null,
            related_to: null,
            hidden: false
          },
          paragraph_text: {
            type: 'markdown',
            required: false,
            default: null,
            description: null,
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/icon_button',
          styleguide_path: '/styleguide/components%2Ficon_button',
          description: 'A button element without text, only a large icon.',
          editor_role: 'component',
          tags: ['media', 'action']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsIconButtonComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          name: {
            type: 'text',
            required: false,
            default: 'plus',
            options: [
              'arrow-right',
              'calendar-circle-filled',
              'caret-left-circle-filled',
              'caret-right-circle-filled',
              'checkmark',
              'chevron-down',
              'download',
              'facebook',
              'hamburger-menu',
              'hashtag-circle-filled',
              'linked-in',
              'mail',
              'menu-close',
              'minus',
              'play',
              'play-circle-filled',
              'play-circle-outline',
              'plus',
              'search-circle-filled',
              'twitter'
            ],
            description: null,
            related_to: null,
            hidden: false
          },
          size: {
            type: 'text',
            required: false,
            default: 'md',
            options: ['xl', 'lg', 'md', 'sm'],
            description: null,
            related_to: null,
            hidden: false
          },
          href: {
            type: 'text',
            required: false,
            default: '#',
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          onclick: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/key_term_cta',
          styleguide_path: '/styleguide/components%2Fkey_term_cta',
          description: 'Description of component.',
          editor_role: 'component',
          tags: ['text', 'action'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsKeyTermCtaComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          overline_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          heading_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          meta_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          lead_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          action_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/cta_button'],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/labeled_select_input',
          styleguide_path: '/styleguide/components%2Flabeled_select_input',
          description: 'A dropdown element beneath a system label.',
          editor_role: 'component',
          tags: ['form']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsLabeledSelectInputComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          label_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: 'elements/form_label',
            hidden: false
          },
          name: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: 'elements/select',
            hidden: false
          },
          size: {
            type: 'text',
            required: false,
            default: 'default',
            options: ['default', 'sm'],
            description: null,
            related_to: 'elements/select',
            hidden: false
          },
          default_option: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'Which option to select by default when this element loads.',
            related_to: null,
            hidden: false
          },
          required: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: 'elements/form_label',
            hidden: false
          },
          stack_size: {
            type: 'text',
            required: false,
            default: null,
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: null,
            related_to: null,
            hidden: false
          },
          options: {
            type: 'multi-text',
            required: false,
            default: [],
            options: null,
            description:
              "Select options in list format: ['option1', 'option2', 'option3']. Label gets titleized.",
            related_to: 'elements/select',
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/labeled_text_input',
          styleguide_path: '/styleguide/components%2Flabeled_text_input',
          description: 'A text input element beneath a system label.',
          editor_role: 'component',
          tags: ['form']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsLabeledTextInputComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          label_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: 'elements/form_label',
            hidden: false
          },
          name: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: 'elements/text_input',
            hidden: false
          },
          type: {
            type: 'text',
            required: false,
            default: 'text',
            options: ['text', 'date', 'tel', 'email', 'password'],
            description: null,
            related_to: 'elements/text_input',
            hidden: false
          },
          size: {
            type: 'text',
            required: false,
            default: 'default',
            options: ['default', 'sm'],
            description: null,
            related_to: 'elements/text_input',
            hidden: false
          },
          placeholder: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'Input placeholder text',
            related_to: 'elements/text_input',
            hidden: false
          },
          value: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'Value of the input, if preset',
            related_to: null,
            hidden: false
          },
          stack_size: {
            type: 'text',
            required: false,
            default: null,
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: null,
            related_to: null,
            hidden: false
          },
          required: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: 'elements/form_label',
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/limiting_small_item_row',
          styleguide_path: '/styleguide/components%2Flimiting_small_item_row',
          description:
            'A grid of small items which can be configured to only show a specific number of items per breakpoint. All items are centered.',
          editor_role: 'component',
          tags: ['collection']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsLimitingSmallItemRowComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          items: {
            type: 'multi-component',
            required: true,
            default: [],
            options: ['components/pill', 'components/search_term_pill'],
            description: null,
            related_to: null
          },
          xl_max: {
            type: 'number',
            required: false,
            default: 12,
            description: null,
            related_to: null,
            hidden: false
          },
          lg_max: {
            type: 'number',
            required: false,
            default: 10,
            description: null,
            related_to: null,
            hidden: false
          },
          md_max: {
            type: 'number',
            required: false,
            default: 8,
            description: null,
            related_to: null,
            hidden: false
          },
          sm_max: {
            type: 'number',
            required: false,
            default: 3,
            description: null,
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/link',
          styleguide_path: '/styleguide/components%2Flink',
          description: 'A base link.',
          editor_role: 'singleton',
          tags: ['action']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsLinkComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          style: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'Inline style',
            related_to: null,
            hidden: false
          },
          href: {
            type: 'text',
            required: true,
            default: '#',
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          link_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'Pass configure as a text link. Overrides blocks.',
            related_to: null,
            hidden: false
          },
          onclick: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          data: {
            type: 'json',
            required: false,
            default: '{}',
            description: 'HTML dataset info applied to content_tag',
            related_to: null,
            hiddenn: false
          },
          disabled: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/nav_dropdown',
          styleguide_path: '/styleguide/components%2Fnav_dropdown',
          description:
            'A themed navigation dropdown for desktop navs. If any of the links or the title link paths match the current url path, the title gets highlighted.',
          editor_role: 'component',
          tags: ['nav']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsNavDropdownComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          title_link: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/nav_link'],
            description: null,
            related_to: null
          },
          links: {
            type: 'multi-component',
            required: true,
            default: [],
            options: ['components/nav_link'],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/nav_link',
          styleguide_path: '/styleguide/components%2Fnav_link',
          description: 'A themed navigation link for desktop navs.',
          editor_role: 'component',
          tags: ['nav']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsNavLinkComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          href: {
            type: 'text',
            required: false,
            default: '#',
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          link_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/pill',
          styleguide_path: '/styleguide/components%2Fpill',
          description: 'A configurable link pill with optional icon and color variants.',
          editor_role: 'component',
          tags: ['action']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsPillComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          icon_name: {
            type: 'text',
            required: false,
            default: null,
            options: [
              'arrow-right',
              'calendar-circle-filled',
              'caret-left-circle-filled',
              'caret-right-circle-filled',
              'checkmark',
              'chevron-down',
              'download',
              'facebook',
              'hamburger-menu',
              'hashtag-circle-filled',
              'linked-in',
              'mail',
              'menu-close',
              'minus',
              'play',
              'play-circle-filled',
              'play-circle-outline',
              'plus',
              'search-circle-filled',
              'twitter'
            ],
            description: null,
            related_to: 'elements/icon',
            hidden: false
          },
          pill_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: 'elements/system_text',
            hidden: false
          },
          href: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: 'components/link',
            hidden: false
          },
          icon_variant: {
            type: 'text',
            required: true,
            default: 'variant',
            options: ['variant', 'accent-1', 'accent-2'],
            description: null,
            related_to: null,
            hidden: false
          },
          pill_variant: {
            type: 'text',
            required: true,
            default: 'surface-variant',
            options: ['outlined', 'surface-variant'],
            description: null,
            related_to: null,
            hidden: false
          },
          size: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'sm'],
            description: null,
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/resource_search_result',
          styleguide_path: '/styleguide/components%2Fresource_search_result',
          description: 'Description of component.',
          editor_role: 'component',
          tags: ['card'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsResourceSearchResultComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          resource: {
            type: 'link',
            required: false,
            asset_types: [],
            content_types: ['Content::BlogPost'],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/responsive_image',
          styleguide_path: '/styleguide/components%2Fresponsive_image',
          description:
            'An image element inside of a responsive container which preserves the original aspect ratio of the image when resized.',
          editor_role: 'singleton',
          tags: ['media']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsResponsiveImageComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          image_url: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: true
          },
          alt: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description:
              "Text for accessibility & screen-readers. When using contentful, use the 'description' property of the asset for this.",
            related_to: 'elements/image',
            hidden: true
          },
          format: {
            type: 'text',
            required: false,
            default: 'png',
            options: null,
            description: null,
            related_to: 'elements/image',
            hidden: true
          },
          lazy: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: true,
            description:
              'Whether the image should load when the user scrolls over it. Set to true for page-speed. Set to false for above-fold images like heroes.',
            related_to: 'elements/image',
            hidden: true
          },
          load_width: {
            type: 'number',
            required: false,
            default: 1600,
            description:
              'The max-width of the image when requesting from the image api. For load-speed optimization, please use a module-optimized width.',
            related_to: 'elements/image',
            hidden: true
          },
          image_asset: {
            type: 'link',
            required: false,
            asset_types: ['image'],
            content_types: [],
            description: 'Overrides image_url and alt properties.',
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/responsive_video',
          styleguide_path: '/styleguide/components%2Fresponsive_video',
          description: 'A responsive container for a video + placeholder image combo..',
          editor_role: 'component',
          tags: ['media']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsResponsiveVideoComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          icon_name: {
            type: 'text',
            required: false,
            default: 'play-circle-filled',
            options: ['play', 'play-circle-outline', 'play-circle-filled'],
            description: null,
            related_to: null,
            hidden: false
          },
          video_entry: {
            type: 'link',
            required: false,
            asset_types: ['video'],
            content_types: ['Content::Video', 'Content::Resource'],
            description: 'Overrides video_url.',
            related_to: null
          },
          image_asset: {
            type: 'link',
            required: false,
            asset_types: ['image'],
            content_types: [],
            description: 'Alternate field for image. Overrides entry video.',
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/search_bar',
          styleguide_path: '/styleguide/components%2Fsearch_bar',
          description: 'A text input with a search icon element.',
          editor_role: 'component',
          tags: ['form']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsSearchBarComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          placeholder: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'Input placeholder',
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/search_term_grid',
          styleguide_path: '/styleguide/components%2Fsearch_term_grid',
          description:
            'A centered grid exclusively for search-term pills. Uses a pre-configured limiting grid.',
          editor_role: 'component',
          tags: ['collection']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsSearchTermGridComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          heading_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          xl_max: {
            type: 'number',
            required: false,
            default: 10,
            description: 'The number of terms to show at the XL breakpoint.',
            related_to: null,
            hidden: false
          },
          lg_max: {
            type: 'number',
            required: false,
            default: 8,
            description: 'The number of terms to show at the LG breakpoint.',
            related_to: null,
            hidden: false
          },
          md_max: {
            type: 'number',
            required: false,
            default: 7,
            description: 'The number of terms to show at the MD breakpoint.',
            related_to: null,
            hidden: false
          },
          sm_max: {
            type: 'number',
            required: false,
            default: 4,
            description: 'The number of terms to show at the SM breakpoint.',
            related_to: null,
            hidden: false
          },
          search_terms: {
            type: 'multi-component',
            required: true,
            default: [],
            options: ['components/search_term_pill'],
            description: null,
            related_to: 'components/limiting_small_item_row'
          }
        }
      },
      {
        meta: {
          id: 'components/search_term_pill',
          styleguide_path: '/styleguide/components%2Fsearch_term_pill',
          description:
            'A pill specifically configured for presenting search-term styles. The search-term is automatically converted into a link on our site.',
          editor_role: 'component',
          extension_of: 'components/pill',
          tags: ['action']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsSearchTermPillComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          search_type: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'seasonal'],
            description: null,
            related_to: null,
            hidden: false
          },
          search_term: {
            type: 'text',
            required: true,
            default: null,
            options: null,
            description:
              'Enter a natural language search term and this component will display it on the pill and produce the correct search page link for it.',
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/selectable_split_resource_grids',
          styleguide_path: '/styleguide/components%2Fselectable_split_resource_grids',
          description:
            'A component which takes a list of options and a list of components and allows the user to select the component via dropdown.',
          editor_role: 'component',
          tags: ['collection']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsSelectableSplitResourceGridsComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          grid_titles: {
            type: 'multi-text',
            required: false,
            default: [],
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          collection_grids: {
            type: 'multi-component',
            required: true,
            default: [],
            options: ['components/split_resource_grid'],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/single_column_carousel',
          styleguide_path: '/styleguide/components%2Fsingle_column_carousel',
          description: 'Extension of Adaptive Carousel with a single grid column wrapper.',
          editor_role: 'component',
          extension_of: 'components/adaptive_carousel',
          tags: ['collection']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsSingleColumnCarouselComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          autoplay: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            hidden: false
          },
          mouse_drag: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            hidden: false
          },
          sm_max: {
            type: 'number',
            required: false,
            default: 1,
            description: null,
            related_to: null,
            hidden: false
          },
          md_max: {
            type: 'number',
            required: false,
            default: 2,
            description: null,
            related_to: null,
            hidden: false
          },
          lg_max: {
            type: 'number',
            required: false,
            default: 3,
            description: null,
            related_to: null,
            hidden: false
          },
          xl_max: {
            type: 'number',
            required: false,
            default: 3,
            description: null,
            related_to: null,
            hidden: false
          },
          slide_by: {
            type: 'number',
            required: false,
            default: 1,
            description: 'number of items to scroll by each time',
            related_to: null,
            hidden: false
          },
          items: {
            type: 'multi-component',
            required: true,
            default: [],
            options: ['components/basic_text_nav_card'],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/single_grid_column',
          styleguide_path: '/styleguide/components%2Fsingle_grid_column',
          description: 'Description of component.',
          editor_role: 'component',
          extension_of: null,
          tags: ['grid']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsSingleGridColumnComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          disabled: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/single_text_inline_form',
          styleguide_path: '/styleguide/components%2Fsingle_text_inline_form',
          description:
            'A single text form element with a button inlined side by side. Best used in split columns.',
          editor_role: 'component',
          tags: ['form']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsSingleTextInlineFormComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          size: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'sm'],
            description: null,
            related_to: null,
            hidden: false
          },
          input_name: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: 'elements/text_input',
            hidden: false
          },
          input_type: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: 'elements/text_input',
            hidden: false
          },
          input_placeholder: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: 'elements/text_input',
            hidden: false
          },
          button_intent: {
            type: 'text',
            required: true,
            default: 'primary',
            options: ['primary', 'secondary', 'tertiary'],
            description: null,
            related_to: 'components/cta_button',
            hidden: false
          },
          button_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: 'components/cta_button',
            hidden: false
          },
          form_endpoint: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: 'elements/form',
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/site_logo',
          styleguide_path: '/styleguide/components%2Fsite_logo',
          description: 'A component for the property logo.',
          editor_role: 'component',
          tags: ['media']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsSiteLogoComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          href: {
            type: 'text',
            required: false,
            default: '/',
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          logo_name: {
            type: 'text',
            required: true,
            default: 'justworks',
            options: ['justworks'],
            description: null,
            related_to: null,
            hidden: false
          },
          variant: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'accent-1'],
            description: null,
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/social_icon_row',
          styleguide_path: '/styleguide/components%2Fsocial_icon_row',
          description: 'Description of component.',
          editor_role: 'component',
          tags: ['collection'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsSocialIconRowComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          icon_size: {
            type: 'text',
            required: false,
            default: 'sm',
            options: ['xl', 'lg', 'md', 'sm'],
            description: null,
            related_to: null,
            hidden: false
          },
          icon_names: {
            type: 'multi-text',
            required: false,
            default: [],
            options: [
              'arrow-right',
              'calendar-circle-filled',
              'caret-left-circle-filled',
              'caret-right-circle-filled',
              'checkmark',
              'chevron-down',
              'download',
              'facebook',
              'hamburger-menu',
              'hashtag-circle-filled',
              'linked-in',
              'mail',
              'menu-close',
              'minus',
              'play',
              'play-circle-filled',
              'play-circle-outline',
              'plus',
              'search-circle-filled',
              'twitter'
            ],
            description: null,
            related_to: null,
            hidden: false
          },
          icon_urls: {
            type: 'multi-text',
            required: false,
            default: [],
            options: null,
            description: null,
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/split_resource_grid',
          styleguide_path: '/styleguide/components%2Fsplit_resource_grid',
          description:
            'A 2-col wide grid which converts resources into configurable resource cards.',
          editor_role: 'component',
          tags: ['collection']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsSplitResourceGridComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          resources: {
            type: 'multi-link',
            required: false,
            default: [],
            asset_types: [],
            content_types: ['Content::BlogPost'],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/stacked_hero_text',
          styleguide_path: '/styleguide/components%2Fstacked_hero_text',
          description:
            'A common hero text pattern with a heading label, display text, and lead text. Configurable alignment.',
          editor_role: 'singleton',
          tags: ['text']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsStackedHeroTextComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          label_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'Text for the label at the very top.',
            related_to: null,
            hidden: false
          },
          display_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'Primary display text',
            related_to: null,
            hidden: false
          },
          display_size: {
            type: 'text',
            required: true,
            default: 'secondary',
            options: ['primary', 'secondary'],
            description: null,
            related_to: null,
            hidden: false
          },
          alignment: {
            type: 'text',
            required: true,
            default: 'left',
            options: ['left', 'center'],
            description: 'Text alignment for all elements.',
            related_to: null,
            hidden: false
          },
          lead_text: {
            type: 'markdown',
            required: false,
            default: null,
            description: 'Lead text copy.',
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/utility_button',
          styleguide_path: '/styleguide/components%2Futility_button',
          description:
            'A frameless button with themed color behavior and an icon on either the left or right side.',
          editor_role: 'component',
          tags: ['action']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsUtilityButtonComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          size: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'sm'],
            description: null,
            related_to: 'foundations/inset_shapes',
            hidden: false
          },
          icon_name: {
            type: 'text',
            required: false,
            default: null,
            options: [
              'arrow-right',
              'calendar-circle-filled',
              'caret-left-circle-filled',
              'caret-right-circle-filled',
              'checkmark',
              'chevron-down',
              'download',
              'facebook',
              'hamburger-menu',
              'hashtag-circle-filled',
              'linked-in',
              'mail',
              'menu-close',
              'minus',
              'play',
              'play-circle-filled',
              'play-circle-outline',
              'plus',
              'search-circle-filled',
              'twitter'
            ],
            description: 'May select any available icon.',
            related_to: 'elements/icon',
            hidden: false
          },
          icon_side: {
            type: 'text',
            required: true,
            default: 'left',
            options: ['left', 'right'],
            description: null,
            related_to: null,
            hidden: false
          },
          color_variant: {
            type: 'text',
            required: true,
            default: 'variant',
            options: ['variant', 'text-link'],
            description: null,
            related_to: null,
            hidden: false
          },
          href: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          button_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          onclick: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/background_image_single_split',
          styleguide_path: '/styleguide/patterns%2Fbackground_image_single_split',
          description:
            'Page content containing a full background image and a single left or right slot for a marketing component.',
          editor_role: 'pattern',
          tags: ['media', 'image']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsBackgroundImageSingleSplitComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description: null,
            related_to: null,
            hidden: false
          },
          split_alignment: {
            type: 'text',
            required: true,
            default: 'right',
            options: ['left', 'right'],
            description: null,
            related_to: null,
            hidden: false
          },
          background_image: {
            type: 'link',
            required: true,
            asset_types: ['image'],
            content_types: [],
            description: 'Background image',
            related_to: 'components/full_background_image'
          },
          split_component: {
            type: 'component',
            required: true,
            default: null,
            options: [
              'components/headed_list',
              'components/headed_paragraph',
              'components/basic_lead_form'
            ],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'patterns/bordered_content_cta_box',
          styleguide_path: '/styleguide/patterns%2Fbordered_content_cta_box',
          description: 'Description of component.',
          editor_role: 'pattern',
          tags: ['cta', 'form', 'action'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsBorderedContentCtaBoxComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description: null,
            related_to: null,
            hidden: false
          },
          content_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/headed_paragraph', 'components/key_term_cta'],
            description: 'The text content on the left side of this box.',
            related_to: null
          },
          cta_component: {
            type: 'component',
            required: false,
            default: null,
            options: [
              'components/button_modal',
              'components/single_text_inline_form',
              'components/cta_button'
            ],
            description: 'The button or form on the right side of this box.',
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'patterns/content_split',
          styleguide_path: '/styleguide/patterns%2Fcontent_split',
          description:
            'A pattern containing 2 components side by side. If an image is on the right side, it wraps to the top on mobile.',
          editor_role: 'pattern',
          tags: ['mixed-media', 'image', 'video', 'text', 'form']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsContentSplitComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description: null,
            related_to: null,
            hidden: false
          },
          left_content: {
            type: 'component',
            required: true,
            default: null,
            options: [
              'components/headed_list',
              'components/responsive_image',
              'components/headed_paragraph',
              'components/basic_lead_form',
              'components/responsive_video',
              'components/conversion_modal_content'
            ],
            description: null,
            related_to: null
          },
          right_content: {
            type: 'component',
            required: true,
            default: null,
            options: [
              'components/headed_list',
              'components/responsive_image',
              'components/headed_paragraph',
              'components/basic_lead_form',
              'components/responsive_video',
              'components/conversion_modal_content'
            ],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'patterns/filterable_search_results',
          styleguide_path: '/styleguide/patterns%2Ffilterable_search_results',
          description: 'Description of component.',
          editor_role: 'pattern',
          tags: ['card', 'resource-center', 'resource'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsFilterableSearchResultsComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          query: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'The search query that the results correspond with.',
            related_to: null,
            hidden: false
          },
          resources: {
            type: 'multi-link',
            required: false,
            default: [],
            asset_types: [],
            content_types: ['Content::BlogPost'],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'patterns/grid_presentation',
          styleguide_path: '/styleguide/patterns%2Fgrid_presentation',
          description: 'Description of component.',
          editor_role: 'pattern',
          tags: ['collection', 'mixed-media'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsGridPresentationComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          overline_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          heading_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          body_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description: null,
            related_to: null,
            hidden: false
          },
          cta_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/cta_button', 'components/button_modal'],
            description: null,
            related_to: null
          },
          grid_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/adaptive_column_grid', 'components/single_column_carousel'],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'patterns/hero_double_stack',
          styleguide_path: '/styleguide/patterns%2Fhero_double_stack',
          description:
            'A hero pattern comprised of a text stack and a configurable zone for another pattern beneath it.',
          editor_role: 'pattern',
          tags: ['mixed-media', 'landing-page']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsHeroDoubleStackComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: false,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            hidden: false
          },
          heading_label_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: 'elements/heading',
            hidden: false
          },
          display_text: {
            type: 'text',
            required: true,
            default: null,
            options: null,
            description: null,
            related_to: 'elements/display_text',
            hidden: false
          },
          display_size: {
            type: 'text',
            required: true,
            default: 'secondary',
            options: ['primary', 'secondary'],
            description: null,
            related_to: null,
            hidden: false
          },
          lead_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: 'elements/lead_text',
            hidden: false
          },
          bottom_pattern: {
            type: 'component',
            required: true,
            default: null,
            options: ['patterns/background_image_single_split', 'patterns/content_split'],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'patterns/navigation_bar',
          styleguide_path: '/styleguide/patterns%2Fnavigation_bar',
          description:
            'A navigation bar with zones on the left and right for any number and configuration of nav components.',
          editor_role: 'pattern',
          tags: ['nav']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsNavigationBarComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: false,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            hidden: false
          },
          sticky: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            hidden: false
          },
          center_logo: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/site_logo'],
            description: null,
            related_to: null
          },
          left_items: {
            type: 'multi-component',
            required: true,
            default: [],
            options: ['components/nav_dropdown', 'components/nav_link', 'components/cta_button'],
            description: null,
            related_to: null
          },
          right_items: {
            type: 'multi-component',
            required: true,
            default: [],
            options: ['components/nav_link', 'components/cta_button', 'components/nav_dropdown'],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'patterns/resource_content_section',
          styleguide_path: '/styleguide/patterns%2Fresource_content_section',
          description:
            'A page content section with a left-aligned heading section and a component zone beneath it with optional CTA button.',
          editor_role: 'pattern',
          tags: ['mixed-media', 'resource-center']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsResourceContentSectionComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description: null,
            related_to: null,
            hidden: false
          },
          heading_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          lead_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          divider: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: 'Should a dividing line be added at the bottom?',
            related_to: null,
            hidden: false
          },
          content_module: {
            type: 'component',
            required: true,
            default: null,
            options: [
              'components/single_column_carousel',
              'components/selectable_split_resource_grids',
              'components/featured_video_resource_showcase',
              'components/card_resource_showcase_section'
            ],
            description: null,
            related_to: null
          },
          cta_button: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/cta_button'],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'patterns/resource_hero',
          styleguide_path: '/styleguide/patterns%2Fresource_hero',
          description: 'Description of component.',
          editor_role: 'pattern',
          tags: ['mixed-media', 'resource-center'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsResourceHeroComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          breadcrumb_texts: {
            type: 'multi-text',
            required: false,
            default: [],
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          breadcrumb_urls: {
            type: 'multi-text',
            required: false,
            default: [],
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          display_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          lead_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/search_hero',
          styleguide_path: '/styleguide/patterns%2Fsearch_hero',
          description:
            'A hero section which contains text, a search bar, and a search-term grid. When the search bar is the only component selected, it adds extra spacing for a standalone variation of this pattern.',
          editor_role: 'pattern',
          tags: ['mixed-media', 'resource-center']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsSearchHeroComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: false,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            hidden: false
          },
          label_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          display_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          display_size: {
            type: 'text',
            required: true,
            default: 'primary',
            options: ['primary', 'secondary'],
            description: null,
            related_to: null,
            hidden: false
          },
          search_component: {
            type: 'component',
            required: true,
            default: null,
            options: ['components/search_bar'],
            description: null,
            related_to: null
          },
          stack_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/search_term_grid'],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'patterns/short_landing_page_hero',
          styleguide_path: '/styleguide/patterns%2Fshort_landing_page_hero',
          description:
            'A hero section with several configuration options including a short form, button, background image, and a marketing component.',
          editor_role: 'pattern',
          tags: ['mixed-media', 'landing-page']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsShortLandingPageHeroComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: false,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            hidden: false
          },
          heading_label_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'Text for the label at the very top.',
            related_to: null,
            hidden: false
          },
          label_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          display_text: {
            type: 'text',
            required: true,
            default: null,
            options: null,
            description: 'Primary display text',
            related_to: null,
            hidden: false
          },
          display_size: {
            type: 'text',
            required: true,
            default: 'secondary',
            options: ['primary', 'secondary'],
            description: null,
            related_to: null,
            hidden: false
          },
          lead_text: {
            type: 'markdown',
            required: false,
            default: null,
            description: 'Lead text copy.',
            related_to: null,
            hidden: false
          },
          right_content: {
            type: 'component',
            required: false,
            default: null,
            options: [
              'components/responsive_image',
              'components/basic_lead_form',
              'components/responsive_video'
            ],
            description: null,
            related_to: null
          },
          background_image: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/full_background_image'],
            description: null,
            related_to: null
          },
          action_button: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/utility_button', 'components/cta_button'],
            description: null,
            related_to: null
          },
          short_form: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/single_text_inline_form'],
            description: null,
            related_to: null
          }
        }
      }
    ]
  }
};
