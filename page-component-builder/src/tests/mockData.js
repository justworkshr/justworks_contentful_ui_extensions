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
        'hero',
        'mixed-media',
        'content',
        'list'
      ],
      content: ['guide', 'resource-wrapper', 'blog-post', 'video', 'image', 'event'],
      location: ['landing-page', 'resource-center', 'marketing-site', 'guidepost', 'events-page']
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsAdaptiveCarouselComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          loop: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            hidden: false
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
            type: 'text',
            required: true,
            default: 'single',
            options: ['single', 'page'],
            description: 'number of items to scroll by each time',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          items: {
            type: 'multi-component',
            required: true,
            hidden: false,
            default: [],
            options: ['components/basic_text_nav_card'],
            presets: [],
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsAdaptiveColumnGridComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
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
            hidden: false,
            default: [],
            options: [
              'components/basic_text_nav_card',
              'components/celebrated_list_item',
              'components/headed_list',
              'components/heading_body_text'
            ],
            presets: [],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/algolia_search_bar',
          styleguide_path: '/styleguide/components%2Falgolia_search_bar',
          title: 'Algolia Search Bar Component',
          description: 'Description of component.',
          editor_role: 'component',
          tags: [],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsAlgoliaSearchBarComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          }
        }
      },
      {
        meta: {
          id: 'components/author_headshot_meta',
          styleguide_path: '/styleguide/components%2Fauthor_headshot_meta',
          description: 'Description of component.',
          editor_role: 'component',
          tags: ['media'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsAuthorHeadshotMetaComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          image_asset: {
            type: 'link',
            required: false,
            asset_types: ['image'],
            content_types: [],
            description: 'Author photo',
            related_to: null
          },
          author_name: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          meta_1_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          meta_2_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/basic_lead_form',
          styleguide_path: '/styleguide/components%2Fbasic_lead_form',
          description: 'A single page lead form which can support multiple input groups.',
          editor_role: 'component',
          tags: ['form'],
          snapshot: true
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsBasicLeadFormComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          background_color_token: {
            type: 'text',
            required: false,
            default: 'surface-variant',
            options: ['surface', 'surface-variant'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          top_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Text above the form.',
            related_to: 'elements/heading',
            editor_type: 'short-text-editor',
            hidden: false
          },
          submit_button_text: {
            type: 'text',
            required: true,
            default: 'Submit',
            options: null,
            description: null,
            related_to: 'components/cta_button',
            editor_type: 'short-text-editor',
            hidden: false
          },
          footer_content: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            editor_type: 'markdown-editor',
            hidden: false
          },
          post_submit_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/headed_list'],
            description: null,
            related_to: null,
            hidden: false
          },
          form_pages: {
            type: 'multi-component',
            required: true,
            hidden: false,
            default: [],
            options: ['components/form_page'],
            presets: [],
            description: 'Collection of form pages.',
            related_to: null
          },
          amp_page: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description:
              'Internal toggle for amp forms rendered via iframe to let the form know its intended for an AMP page.',
            related_to: null,
            hidden: true
          },
          form_config: {
            type: 'config',
            required: false,
            default: {},
            description: 'Data object for configuring a form element.',
            related_to: 'elements/form',
            hidden: false
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsBasicTextNavCardComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          heading_label_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          heading_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          paragraph_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          href: {
            type: 'text',
            required: false,
            default: '',
            options: [
              '{{ homepage }}',
              '{{ features-overview }}',
              '{{ features-benefits }}',
              '{{ features-payroll }}',
              '{{ features-hr }}',
              '{{ features-compliance }}',
              '{{ features-support }}',
              '{{ pricing }}',
              '{{ about-company }}',
              '{{ about-team }}',
              '{{ about-values }}',
              '{{ careers }}',
              '{{ press }}',
              '{{ our-customers }}',
              '{{ resource-center }}',
              '{{ blog }}',
              '{{ partners }}',
              '{{ referrals }}',
              '{{ help-center }}',
              '{{ login }}',
              '{{ get-started }}',
              '{{ terms-of-use }}',
              '{{ privacy-policy }}'
            ],
            description: null,
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            hidden: false
          },
          cta_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          color_override: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'Hex value -- color value overrides card cap color.',
            related_to: null,
            editor_type: 'color-editor',
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsBreadcrumbTextComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          stack_size: {
            type: 'text',
            required: false,
            default: null,
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          links: {
            type: 'multi-config',
            required: false,
            default: [],
            description: null,
            related_to: 'components/text_link',
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsButtonModalComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          id: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description:
              'ID attribute if required for targetting between modal and button (like w/ AMP).',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          modal_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/basic_lead_form'],
            description: 'The component which will appear in the modal.',
            related_to: null,
            hidden: false
          },
          button_component: {
            type: 'component',
            required: false,
            default: null,
            options: [
              'components/cta_button',
              'components/icon_button',
              'components/utility_button'
            ],
            description: null,
            related_to: null,
            hidden: false
          },
          modal_align_top: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: 'Whether or not the modal should align to the top rather than center.',
            related_to: null,
            hidden: false
          },
          include_close_button: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: true,
            description:
              'Whether or not the default close icon should appear on the top right of the container.',
            related_to: null,
            hidden: false
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsCardResourceShowcaseSectionComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          preset_config: {
            type: 'text',
            required: false,
            default: 'large-single',
            options: ['large-single', 'inline-all'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          max_items: {
            type: 'number',
            required: false,
            default: 4,
            description: null,
            related_to: null,
            hidden: false
          },
          items: {
            type: 'multi-link',
            required: false,
            default: [],
            asset_types: [],
            content_types: ['resourceWrapper'],
            description: null,
            related_to: null
          },
          action_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/cta_button', 'components/button_modal'],
            description: null,
            related_to: null,
            hidden: false
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsCelebratedListItemComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          icon_url: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Optional in place of using actual contentful asset.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          heading_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          paragraph_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
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
          id: 'components/company_logo',
          styleguide_path: '/styleguide/components%2Fcompany_logo',
          description: 'A component for the property logo.',
          editor_role: 'component',
          tags: ['media']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsCompanyLogoComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          href: {
            type: 'text',
            required: false,
            default: '',
            options: [
              '{{ homepage }}',
              '{{ features-overview }}',
              '{{ features-benefits }}',
              '{{ features-payroll }}',
              '{{ features-hr }}',
              '{{ features-compliance }}',
              '{{ features-support }}',
              '{{ pricing }}',
              '{{ about-company }}',
              '{{ about-team }}',
              '{{ about-values }}',
              '{{ careers }}',
              '{{ press }}',
              '{{ our-customers }}',
              '{{ resource-center }}',
              '{{ blog }}',
              '{{ partners }}',
              '{{ referrals }}',
              '{{ help-center }}',
              '{{ login }}',
              '{{ get-started }}',
              '{{ terms-of-use }}',
              '{{ privacy-policy }}'
            ],
            description: 'Optional url to turn the logo into a link.',
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            hidden: false
          },
          logo_name: {
            type: 'text',
            required: true,
            default: 'justworks-logo',
            options: ['justworks-logo', 'justworks-x-connect-your-care'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          color_token: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['variant', 'accent-1', 'accent-2'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          height: {
            type: 'text',
            required: false,
            default: '',
            options: ['lg', 'xl', 'xxl'],
            description:
              'Setting the individual logo height will result in the width automatically scaling to preserve its aspect ratio. This is recommended for non-grid based logos.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          stack_size: {
            type: 'text',
            required: true,
            default: null,
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Spacing token for the amount of spacing beneath the element.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/composable_text',
          styleguide_path: '/styleguide/components%2Fcomposable_text',
          title: 'Composable Text Component',
          description:
            'A component which allows the author to fully control which text elements and styles they wish to add.',
          editor_role: 'component',
          tags: ['text'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsComposableTextComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          text_components: {
            type: 'multi-component',
            required: true,
            hidden: false,
            default: [],
            options: [
              'elements/display_text',
              'elements/heading',
              'elements/lead_text',
              'elements/paragraph_text',
              'elements/system_text',
              'components/text_link'
            ],
            presets: [],
            description: 'Composable section for any text elements you wish to add.',
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsConfigurableCardComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
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
            editor_type: 'short-text-editor',
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
            editor_type: 'short-text-editor',
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
            editor_type: 'short-text-editor',
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
            editor_type: 'short-text-editor',
            hidden: false
          },
          label_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          title_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          description_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          meta_1_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          meta_2_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          href: {
            type: 'text',
            required: false,
            default: '',
            options: [
              '{{ homepage }}',
              '{{ features-overview }}',
              '{{ features-benefits }}',
              '{{ features-payroll }}',
              '{{ features-hr }}',
              '{{ features-compliance }}',
              '{{ features-support }}',
              '{{ pricing }}',
              '{{ about-company }}',
              '{{ about-team }}',
              '{{ about-values }}',
              '{{ careers }}',
              '{{ press }}',
              '{{ our-customers }}',
              '{{ resource-center }}',
              '{{ blog }}',
              '{{ partners }}',
              '{{ referrals }}',
              '{{ help-center }}',
              '{{ login }}',
              '{{ get-started }}',
              '{{ terms-of-use }}',
              '{{ privacy-policy }}'
            ],
            description: null,
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            hidden: false
          },
          image_url: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsConfigurableResourceCardComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
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
            editor_type: 'short-text-editor',
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
            editor_type: 'short-text-editor',
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
            editor_type: 'short-text-editor',
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
            editor_type: 'short-text-editor',
            hidden: false
          },
          resource: {
            type: 'link',
            required: false,
            asset_types: [],
            content_types: ['resourceWrapper'],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/contact_box',
          styleguide_path: '/styleguide/components%2Fcontact_box',
          title: 'Contact Box Component',
          description:
            'A box for listing various contact numbers \u0026 links (email, SMS, slack, etc).',
          editor_role: 'component',
          tags: ['media'],
          extension_of: null,
          snapshot: false
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsContactBoxComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          surface_color_token: {
            type: 'text',
            required: true,
            default: 'variant',
            options: ['default', 'variant'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          heading_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          contact_icons: {
            type: 'multi-text',
            required: false,
            default: [],
            options: ['mail', 'mail-outline', 'phone', 'sms', 'speech-bubble-outline'],
            description:
              'Each option adds a row. Add a link in the "contact links field to finish the row.',
            related_to: null,
            hidden: false
          },
          contact_links: {
            type: 'multi-config',
            required: false,
            default: [],
            description: null,
            related_to: 'components/text_link',
            hidden: false
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsConversionModalContentComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          overline_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          heading_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          body_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          cta_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          cta_intent: {
            type: 'text',
            required: false,
            default: '',
            options: ['primary', 'secondary', 'tertiary'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          cta_icon: {
            type: 'text',
            required: false,
            default: '',
            options: [
              'arrow-right',
              'calendar-circle-filled',
              'caret-left-circle-filled',
              'caret-right-circle-filled',
              'checkmark',
              'checkmark-circle-filled',
              'chevron-down',
              'close-circle-outline',
              'download',
              'facebook',
              'globe-circle-filled',
              'hamburger-menu',
              'hashtag-circle-filled',
              'instagram',
              'linked-in',
              'mail',
              'mail-outline',
              'menu-close',
              'minus',
              'phone',
              'play',
              'play-circle-filled',
              'play-circle-outline',
              'play-youtube-circle-filled',
              'plus',
              'search-circle-filled',
              'sms',
              'speech-bubble-outline',
              'twitter',
              'youtube'
            ],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          modal_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/basic_lead_form'],
            description: 'The component which will appear in the modal.',
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsCtaButtonComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          intent: {
            type: 'text',
            required: true,
            default: 'primary',
            options: ['primary', 'secondary', 'tertiary'],
            description: null,
            related_to: 'foundations/theme_colors',
            editor_type: 'short-text-editor',
            hidden: false
          },
          size: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'sm', 'legacy-nav'],
            description: null,
            related_to: 'foundations/inset_shapes',
            editor_type: 'short-text-editor',
            hidden: false
          },
          button_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
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
              'checkmark-circle-filled',
              'chevron-down',
              'close-circle-outline',
              'download',
              'facebook',
              'globe-circle-filled',
              'hamburger-menu',
              'hashtag-circle-filled',
              'instagram',
              'linked-in',
              'mail',
              'mail-outline',
              'menu-close',
              'minus',
              'phone',
              'play',
              'play-circle-filled',
              'play-circle-outline',
              'play-youtube-circle-filled',
              'plus',
              'search-circle-filled',
              'sms',
              'speech-bubble-outline',
              'twitter',
              'youtube'
            ],
            description: 'May select any available icon.',
            related_to: 'elements/icon',
            editor_type: 'short-text-editor',
            hidden: false
          },
          href: {
            type: 'text',
            required: false,
            default: '',
            options: [
              '{{ homepage }}',
              '{{ features-overview }}',
              '{{ features-benefits }}',
              '{{ features-payroll }}',
              '{{ features-hr }}',
              '{{ features-compliance }}',
              '{{ features-support }}',
              '{{ pricing }}',
              '{{ about-company }}',
              '{{ about-team }}',
              '{{ about-values }}',
              '{{ careers }}',
              '{{ press }}',
              '{{ our-customers }}',
              '{{ resource-center }}',
              '{{ blog }}',
              '{{ partners }}',
              '{{ referrals }}',
              '{{ help-center }}',
              '{{ login }}',
              '{{ get-started }}',
              '{{ terms-of-use }}',
              '{{ privacy-policy }}'
            ],
            description: 'Only needed if the button is a link to somewhere.',
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            hidden: false
          },
          target: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description:
              'If button is a link, overrides default external/internal new-tab behavior',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          animated_shadows: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description:
              'Whether this button should include stylstic shadows and animated hover effects.',
            related_to: null,
            hidden: false
          },
          connect_left: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description:
              'Whether to style this button as if it were connected to something at the left.',
            related_to: null,
            hidden: false
          },
          type: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'HTML input type',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          on: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description:
              'AMP directive if serving as an action component to other components like lightboxes.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          disabled: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: "Manually set the button's disabled state.",
            related_to: null,
            hidden: true
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsDropdownCuratedGuideListsComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
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
          guides: {
            type: 'multi-link',
            required: false,
            default: [],
            asset_types: [],
            content_types: ['guide'],
            description: null,
            related_to: null
          },
          preview_type: {
            type: 'text',
            required: false,
            default: '',
            options: ['mock', 'most-recent', 'first-list', 'second-list'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          cta_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          cta_intent: {
            type: 'text',
            required: false,
            default: '',
            options: ['primary', 'secondary', 'tertiary'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/dropdown_selectables/component',
          styleguide_path: '/styleguide/components%2Fdropdown_selectables%2Fcomponent',
          description:
            'A component which takes a list of options and a list of components and allows the user to select the component via dropdown.',
          editor_role: 'component',
          tags: ['collection'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsDropdownSelectableComponentsComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          dropdown_options: {
            type: 'multi-text',
            required: false,
            default: [],
            options: null,
            description: null,
            related_to: null,
            hidden: false
          },
          components: {
            type: 'multi-component',
            required: true,
            hidden: false,
            default: [],
            options: [],
            presets: [],
            description: null,
            related_to: null
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsFeaturedVideoResourceShowcaseComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          video_entries: {
            type: 'multi-link',
            required: false,
            default: [],
            asset_types: [],
            content_types: ['video', 'resourceWrapper'],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/footer_link_collection',
          styleguide_path: '/styleguide/components%2Ffooter_link_collection',
          description: 'Description of component.',
          editor_role: 'component',
          tags: ['nav'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsFooterLinkCollectionComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          alignment: {
            type: 'text',
            required: false,
            default: 'left',
            options: ['left', 'center'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          title_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          markdown: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            editor_type: 'markdown-editor',
            hidden: false
          },
          links: {
            type: 'multi-config',
            required: false,
            default: [],
            description: null,
            related_to: 'components/text_link',
            hidden: false
          },
          link_theme_token: {
            type: 'text',
            required: false,
            default: '',
            options: ['variant', 'accent-1'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          link_stack_size: {
            type: 'text',
            required: false,
            default: 'sm',
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/footer_three_column_section',
          styleguide_path: '/styleguide/components%2Ffooter_three_column_section',
          title: 'Footer Three Column Section Component',
          description:
            'A footer section built specifically for the newsletter subscribe form from legacy pages.',
          editor_role: 'component',
          tags: ['nav'],
          extension_of: null,
          snapshot: false
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsFooterThreeColumnSectionComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          left_column: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/footer_link_collection'],
            description: null,
            related_to: null,
            hidden: false
          },
          center_column: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/single_text_inline_form'],
            description: null,
            related_to: null,
            hidden: false
          },
          right_column: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/social_icon_row'],
            description: null,
            related_to: null,
            hidden: false
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsFormInputGroupComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          group_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Text above the form group',
            related_to: 'elements/lead_text',
            editor_type: 'short-text-editor',
            hidden: false
          },
          input_fields: {
            type: 'multi-component',
            required: true,
            hidden: false,
            default: [],
            options: ['components/labeled_text_input', 'components/labeled_select_input'],
            presets: [],
            description: 'A collection of input groups',
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'components/form_page',
          styleguide_path: '/styleguide/components%2Fform_page',
          description: 'Description of component.',
          editor_role: 'component',
          tags: ['form'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsFormPageComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          form_input_groups: {
            type: 'multi-component',
            required: true,
            hidden: false,
            default: [],
            options: ['components/form_input_group'],
            presets: [],
            description: 'Collection of form input components.',
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsFullBackgroundImageComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          image_url: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: 'elements/image',
            editor_type: 'short-text-editor',
            hidden: true
          },
          alt: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description:
              "Text for accessibility \u0026 screen-readers. When using contentful, use the 'description' property of the asset for this.",
            related_to: 'elements/image',
            editor_type: 'short-text-editor',
            hidden: true
          },
          format: {
            type: 'text',
            required: false,
            default: 'png',
            options: null,
            description: null,
            related_to: 'elements/image',
            editor_type: 'short-text-editor',
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsGuideCarouselComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          action_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/cta_button', 'components/button_modal'],
            description: null,
            related_to: null,
            hidden: false
          },
          guides: {
            type: 'multi-link',
            required: false,
            default: [],
            asset_types: [],
            content_types: ['guide'],
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
          extension_of: 'components/card_resource_showcase_section'
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsGuideListGridComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
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
          guide: {
            type: 'link',
            required: false,
            asset_types: [],
            content_types: ['guide'],
            description: null,
            related_to: null
          },
          cta_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Default CTA button text',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          cta_intent: {
            type: 'text',
            required: false,
            default: '',
            options: ['primary', 'secondary', 'tertiary'],
            description: 'Default CTA button intent style.',
            related_to: null,
            editor_type: 'short-text-editor',
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
            related_to: null,
            hidden: false
          },
          list_type: {
            type: 'text',
            required: false,
            default: '',
            options: ['mock', 'most-recent', 'first-list', 'second-list'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsHeadedListComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          heading_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: 'elements/heading',
            editor_type: 'short-text-editor',
            hidden: false
          },
          size: {
            type: 'text',
            required: true,
            default: 'lg',
            options: ['lg', 'sm'],
            description: null,
            related_to: 'elements/paragraph_text',
            editor_type: 'short-text-editor',
            hidden: false
          },
          bullet_style: {
            type: 'text',
            required: true,
            default: 'disc',
            options: ['disc', 'square', 'circle', 'checkmark', 'checkmark-circle-filled'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          list_markdown: {
            type: 'text',
            required: true,
            default: null,
            options: null,
            description: null,
            related_to: 'elements/markdown_list',
            editor_type: 'markdown-editor',
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/heading_body_text',
          styleguide_path: '/styleguide/components%2Fheading_body_text',
          description: 'A heading element above a body text element. Can support markdown.',
          editor_role: 'component',
          tags: ['text']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsHeadingBodyTextComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          heading_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          heading_typography_style: {
            type: 'text',
            required: false,
            default: 'heading--md',
            options: [
              'display--primary',
              'display--secondary',
              'heading--xl',
              'heading--lg',
              'heading--md',
              'heading--sm',
              'heading--xxs'
            ],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          heading_stack_size: {
            type: 'text',
            required: false,
            default: 'md',
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          heading_element: {
            type: 'text',
            required: false,
            default: 'h2',
            options: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          body_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            editor_type: 'markdown-editor',
            hidden: false
          },
          body_typography_style: {
            type: 'text',
            required: false,
            default: 'paragraph--lg',
            options: ['lead--lg', 'lead--md', 'paragraph--lg', 'paragraph--sm'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          body_stack_size: {
            type: 'text',
            required: false,
            default: 'md',
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          body_element: {
            type: 'text',
            required: false,
            default: 'p',
            options: ['p', 'markdown'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsIconButtonComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          icon_name: {
            type: 'text',
            required: false,
            default: 'plus',
            options: [
              'arrow-right',
              'calendar-circle-filled',
              'caret-left-circle-filled',
              'caret-right-circle-filled',
              'checkmark',
              'checkmark-circle-filled',
              'chevron-down',
              'close-circle-outline',
              'download',
              'facebook',
              'globe-circle-filled',
              'hamburger-menu',
              'hashtag-circle-filled',
              'instagram',
              'linked-in',
              'mail',
              'mail-outline',
              'menu-close',
              'minus',
              'phone',
              'play',
              'play-circle-filled',
              'play-circle-outline',
              'play-youtube-circle-filled',
              'plus',
              'search-circle-filled',
              'sms',
              'speech-bubble-outline',
              'twitter',
              'youtube'
            ],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          icon_size: {
            type: 'text',
            required: false,
            default: 'md',
            options: ['xxl', 'xl', 'lg', 'md', 'sm'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          on: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description:
              'AMP directive if serving as an action component to other components like lightboxes.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          href: {
            type: 'text',
            required: false,
            default: '',
            options: [
              '{{ homepage }}',
              '{{ features-overview }}',
              '{{ features-benefits }}',
              '{{ features-payroll }}',
              '{{ features-hr }}',
              '{{ features-compliance }}',
              '{{ features-support }}',
              '{{ pricing }}',
              '{{ about-company }}',
              '{{ about-team }}',
              '{{ about-values }}',
              '{{ careers }}',
              '{{ press }}',
              '{{ our-customers }}',
              '{{ resource-center }}',
              '{{ blog }}',
              '{{ partners }}',
              '{{ referrals }}',
              '{{ help-center }}',
              '{{ login }}',
              '{{ get-started }}',
              '{{ terms-of-use }}',
              '{{ privacy-policy }}'
            ],
            description: null,
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/iframe_reader',
          styleguide_path: '/styleguide/components%2Fiframe_reader',
          title: 'Iframe Reader Component',
          description: 'Description of component.',
          editor_role: 'component',
          tags: [],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsIframeReaderComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          src: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The iframe source url',
            related_to: null,
            editor_type: 'short-text-editor',
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsKeyTermCtaComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          overline_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          heading_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          meta_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          lead_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          action_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/cta_button'],
            description: null,
            related_to: null,
            hidden: false
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsLabeledSelectInputComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          label_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: 'elements/form_label',
            editor_type: 'short-text-editor',
            hidden: false
          },
          size: {
            type: 'text',
            required: false,
            default: 'default',
            options: ['default', 'sm'],
            description: null,
            related_to: 'elements/select',
            editor_type: 'short-text-editor',
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
            editor_type: 'short-text-editor',
            hidden: false
          },
          input_config: {
            type: 'config',
            required: false,
            default: {},
            description: null,
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsLabeledTextInputComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          label_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: 'elements/form_label',
            editor_type: 'short-text-editor',
            hidden: false
          },
          size: {
            type: 'text',
            required: false,
            default: 'default',
            options: ['default', 'sm'],
            description: null,
            related_to: 'elements/text_input',
            editor_type: 'short-text-editor',
            hidden: false
          },
          value: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Value of the input, if preset',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          stack_size: {
            type: 'text',
            required: false,
            default: null,
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          input_config: {
            type: 'config',
            required: false,
            default: {},
            description: null,
            related_to: 'elements/text_input',
            hidden: false
          },
          connect_right: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description:
              'Whether or not to style this input as if connected to something (probably a button) to the right.',
            related_to: null,
            hidden: false
          },
          validation_type: {
            type: 'text',
            required: false,
            default: '',
            options: ['email', 'phone', 'password'],
            description: null,
            related_to: 'elements/text_input',
            editor_type: 'short-text-editor',
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsLimitingSmallItemRowComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          items: {
            type: 'multi-component',
            required: true,
            hidden: false,
            default: [],
            options: ['components/pill', 'components/search_term_pill'],
            presets: [],
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
          id: 'components/mobile_nav_link_section',
          styleguide_path: '/styleguide/components%2Fmobile_nav_link_section',
          description: 'Description of component.',
          editor_role: 'component',
          tags: ['nav'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsMobileNavLinkSectionComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          title_link: {
            type: 'config',
            required: false,
            default: {},
            description: null,
            related_to: 'components/text_link',
            hidden: false
          },
          links: {
            type: 'multi-config',
            required: false,
            default: [],
            description: null,
            related_to: 'components/text_link',
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/mobile_nav_modal',
          styleguide_path: '/styleguide/components%2Fmobile_nav_modal',
          description: 'Description of component.',
          editor_role: 'component',
          tags: ['nav'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsMobileNavModalComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          sections: {
            type: 'multi-component',
            required: true,
            hidden: false,
            default: [],
            options: ['components/mobile_nav_link_section'],
            presets: [],
            description: null,
            related_to: null
          },
          bottom_ctas: {
            type: 'multi-component',
            required: true,
            hidden: false,
            default: [],
            options: ['components/text_link', 'components/cta_button'],
            presets: [],
            description: null,
            related_to: null
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsNavDropdownComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          title_link: {
            type: 'config',
            required: false,
            default: {},
            description: null,
            related_to: 'components/text_link',
            hidden: false
          },
          links: {
            type: 'multi-config',
            required: false,
            default: [],
            description: null,
            related_to: 'components/text_link',
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsPillComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
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
              'checkmark-circle-filled',
              'chevron-down',
              'close-circle-outline',
              'download',
              'facebook',
              'globe-circle-filled',
              'hamburger-menu',
              'hashtag-circle-filled',
              'instagram',
              'linked-in',
              'mail',
              'mail-outline',
              'menu-close',
              'minus',
              'phone',
              'play',
              'play-circle-filled',
              'play-circle-outline',
              'play-youtube-circle-filled',
              'plus',
              'search-circle-filled',
              'sms',
              'speech-bubble-outline',
              'twitter',
              'youtube'
            ],
            description: null,
            related_to: 'elements/icon',
            editor_type: 'short-text-editor',
            hidden: false
          },
          pill_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: 'elements/system_text',
            editor_type: 'short-text-editor',
            hidden: false
          },
          href: {
            type: 'text',
            required: false,
            default: '',
            options: [
              '{{ homepage }}',
              '{{ features-overview }}',
              '{{ features-benefits }}',
              '{{ features-payroll }}',
              '{{ features-hr }}',
              '{{ features-compliance }}',
              '{{ features-support }}',
              '{{ pricing }}',
              '{{ about-company }}',
              '{{ about-team }}',
              '{{ about-values }}',
              '{{ careers }}',
              '{{ press }}',
              '{{ our-customers }}',
              '{{ resource-center }}',
              '{{ blog }}',
              '{{ partners }}',
              '{{ referrals }}',
              '{{ help-center }}',
              '{{ login }}',
              '{{ get-started }}',
              '{{ terms-of-use }}',
              '{{ privacy-policy }}'
            ],
            description: null,
            related_to: 'elements/link',
            editor_type: 'dropdown-with-custom-editor',
            hidden: false
          },
          icon_variant: {
            type: 'text',
            required: true,
            default: 'variant',
            options: ['variant', 'accent-1', 'accent-2'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          pill_variant: {
            type: 'text',
            required: true,
            default: 'surface-variant',
            options: ['outlined', 'surface-variant'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          size: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'sm'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsResourceSearchResultComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          resource: {
            type: 'link',
            required: false,
            asset_types: [],
            content_types: ['blogPost'],
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsResponsiveImageComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          image_url: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          alt: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description:
              "Text for accessibility \u0026 screen-readers. When using contentful, use the 'description' property of the asset for this.",
            related_to: 'elements/image',
            editor_type: 'short-text-editor',
            hidden: true
          },
          format: {
            type: 'text',
            required: false,
            default: 'png',
            options: null,
            description: null,
            related_to: 'elements/image',
            editor_type: 'short-text-editor',
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsResponsiveVideoComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          icon_name: {
            type: 'text',
            required: false,
            default: 'play-circle-filled',
            options: ['play', 'play-circle-outline', 'play-circle-filled'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          controlled_youtube: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description:
              'Whether or not to load this video using the controlled YouTube API wrapper. This is usually only necessary when the video is in an autoplaying carousel of other videos.',
            related_to: null,
            hidden: false
          },
          video_entry: {
            type: 'link',
            required: false,
            asset_types: ['video'],
            content_types: ['video', 'resourceWrapper'],
            description: 'Overrides video_url.',
            related_to: null
          },
          image_asset: {
            type: 'link',
            required: false,
            asset_types: ['image'],
            content_types: [],
            description:
              'Alternate field for image. Overrides the image pulled from a video entry.',
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsSearchBarComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          placeholder: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'Input placeholder',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          value: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsSearchTermGridComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          heading_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
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
            hidden: false,
            default: [],
            options: ['components/search_term_pill'],
            presets: [],
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsSearchTermPillComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          search_type: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'seasonal'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          search_term: {
            type: 'text',
            required: true,
            default: '',
            options: null,
            description:
              'Enter a natural language search term and this component will display it on the pill and produce the correct search page link for it.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsSingleColumnCarouselComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
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
          loop: {
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
            type: 'text',
            required: false,
            default: 'single',
            options: ['single', 'page'],
            description: 'number of items to scroll by each time',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          items: {
            type: 'multi-component',
            required: true,
            hidden: false,
            default: [],
            options: ['components/basic_text_nav_card'],
            presets: [],
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsSingleGridColumnComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          content_spacing_size: {
            type: 'text',
            required: false,
            default: '',
            options: ['xl', 'xxxxl'],
            description: 'optional content vertical spacing.',
            related_to: null,
            editor_type: 'short-text-editor',
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsSingleTextInlineFormComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          size: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'sm'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          input_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/labeled_text_input'],
            description: null,
            related_to: null,
            hidden: false
          },
          button_intent: {
            type: 'text',
            required: true,
            default: 'primary',
            options: ['primary', 'secondary', 'tertiary'],
            description: null,
            related_to: 'components/cta_button',
            editor_type: 'short-text-editor',
            hidden: false
          },
          button_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: 'components/cta_button',
            editor_type: 'short-text-editor',
            hidden: false
          },
          hidden_fields: {
            type: 'multi-component',
            required: true,
            hidden: false,
            default: [],
            options: ['elements/text_input'],
            presets: [],
            description: null,
            related_to: null
          },
          post_submit_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/headed_list'],
            description: null,
            related_to: null,
            hidden: false
          },
          form_config: {
            type: 'config',
            required: false,
            default: {},
            description: 'Data object for configuring a form element.',
            related_to: 'elements/form',
            hidden: false
          },
          connected_button: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description:
              'Whether to connect the submit button to the text input inline or not. Otherwise, elements will stack.',
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
          tags: ['action', 'collection'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsSocialIconRowComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          icon_size: {
            type: 'text',
            required: false,
            default: 'md',
            options: ['xxl', 'xl', 'lg', 'md', 'sm'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          theme_token: {
            type: 'text',
            required: false,
            default: '',
            options: ['variant'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
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
              'checkmark-circle-filled',
              'chevron-down',
              'close-circle-outline',
              'download',
              'facebook',
              'globe-circle-filled',
              'hamburger-menu',
              'hashtag-circle-filled',
              'instagram',
              'linked-in',
              'mail',
              'mail-outline',
              'menu-close',
              'minus',
              'phone',
              'play',
              'play-circle-filled',
              'play-circle-outline',
              'play-youtube-circle-filled',
              'plus',
              'search-circle-filled',
              'sms',
              'speech-bubble-outline',
              'twitter',
              'youtube'
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
          id: 'components/split_form_inputs',
          styleguide_path: '/styleguide/components%2Fsplit_form_inputs',
          title: 'Split Form Inputs Component',
          description: 'Description of component.',
          editor_role: 'component',
          tags: [],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsSplitFormInputsComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          left_input: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/labeled_text_input'],
            description: null,
            related_to: null,
            hidden: false
          },
          right_input: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/labeled_text_input'],
            description: null,
            related_to: null,
            hidden: false
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsStackedHeroTextComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          label_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Text for the label at the very top.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          display_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Primary display text',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          display_size: {
            type: 'text',
            required: true,
            default: 'secondary',
            options: ['primary', 'secondary'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          alignment: {
            type: 'text',
            required: true,
            default: 'left',
            options: ['left', 'center'],
            description: 'Text alignment for all elements.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          lead_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Lead text copy.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/text_link',
          styleguide_path: '/styleguide/components%2Ftext_link',
          description: 'A base link.',
          editor_role: 'component',
          tags: ['action'],
          config_template: ['href', 'link_text']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsTextLinkComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          href: {
            type: 'text',
            required: false,
            default: '',
            options: [
              '{{ homepage }}',
              '{{ features-overview }}',
              '{{ features-benefits }}',
              '{{ features-payroll }}',
              '{{ features-hr }}',
              '{{ features-compliance }}',
              '{{ features-support }}',
              '{{ pricing }}',
              '{{ about-company }}',
              '{{ about-team }}',
              '{{ about-values }}',
              '{{ careers }}',
              '{{ press }}',
              '{{ our-customers }}',
              '{{ resource-center }}',
              '{{ blog }}',
              '{{ partners }}',
              '{{ referrals }}',
              '{{ help-center }}',
              '{{ login }}',
              '{{ get-started }}',
              '{{ terms-of-use }}',
              '{{ privacy-policy }}'
            ],
            description:
              'The link path. If internal, starts with `/`. If external, starts with `https://`',
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            hidden: false
          },
          link_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Pass configure as a text link. Overrides blocks.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          style: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Inline style',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          data: {
            type: 'json',
            required: false,
            default: {},
            description: 'HTML dataset info applied to content_tag',
            related_to: null,
            hidden: true
          },
          link_config: {
            type: 'config',
            required: false,
            default: {},
            description: 'Use a config object to provide data.',
            related_to: 'components/text_link',
            hidden: false
          },
          color_token: {
            type: 'text',
            required: false,
            default: 'text-link',
            options: ['text-link', 'variant', 'accent-1', 'accent-2'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          typography_style: {
            type: 'text',
            required: false,
            default: '',
            options: [
              'system--sm',
              'system--md',
              'system--lg',
              'paragraph--sm',
              'paragraph--lg',
              'lead--md'
            ],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          stack_size: {
            type: 'text',
            required: false,
            default: null,
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsUtilityButtonComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          size: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'sm'],
            description: null,
            related_to: 'foundations/inset_shapes',
            editor_type: 'short-text-editor',
            hidden: false
          },
          icon_name: {
            type: 'text',
            required: false,
            default: '',
            options: [
              'arrow-right',
              'calendar-circle-filled',
              'caret-left-circle-filled',
              'caret-right-circle-filled',
              'checkmark',
              'checkmark-circle-filled',
              'chevron-down',
              'close-circle-outline',
              'download',
              'facebook',
              'globe-circle-filled',
              'hamburger-menu',
              'hashtag-circle-filled',
              'instagram',
              'linked-in',
              'mail',
              'mail-outline',
              'menu-close',
              'minus',
              'phone',
              'play',
              'play-circle-filled',
              'play-circle-outline',
              'play-youtube-circle-filled',
              'plus',
              'search-circle-filled',
              'sms',
              'speech-bubble-outline',
              'twitter',
              'youtube'
            ],
            description: 'May select any available icon.',
            related_to: 'elements/icon',
            editor_type: 'short-text-editor',
            hidden: false
          },
          icon_side: {
            type: 'text',
            required: true,
            default: 'left',
            options: ['left', 'right'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          color_token: {
            type: 'text',
            required: true,
            default: 'variant',
            options: ['variant', 'text-link'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          href: {
            type: 'text',
            required: false,
            default: '',
            options: [
              '{{ homepage }}',
              '{{ features-overview }}',
              '{{ features-benefits }}',
              '{{ features-payroll }}',
              '{{ features-hr }}',
              '{{ features-compliance }}',
              '{{ features-support }}',
              '{{ pricing }}',
              '{{ about-company }}',
              '{{ about-team }}',
              '{{ about-values }}',
              '{{ careers }}',
              '{{ press }}',
              '{{ our-customers }}',
              '{{ resource-center }}',
              '{{ blog }}',
              '{{ partners }}',
              '{{ referrals }}',
              '{{ help-center }}',
              '{{ login }}',
              '{{ get-started }}',
              '{{ terms-of-use }}',
              '{{ privacy-policy }}'
            ],
            description: null,
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            hidden: false
          },
          button_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/webinar_event_list_item',
          styleguide_path: '/styleguide/components%2Fwebinar_event_list_item',
          title: 'Webinar Event List Item Component',
          description:
            'List item for a webinar event, including a link to the webinar recording video when the date is passed.',
          editor_role: 'component',
          tags: ['list', 'event', 'events-page'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsWebinarEventListItemComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          event: {
            type: 'link',
            required: false,
            asset_types: [],
            content_types: ['event'],
            description: null,
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'elements/display_text',
          styleguide_path: '/styleguide/elements%2Fdisplay_text',
          tags: ['text'],
          editor_role: 'component'
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ElementsDisplayTextComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The copy.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          size: {
            type: 'text',
            required: true,
            default: 'primary',
            options: ['primary', 'secondary'],
            description: null,
            related_to: 'foundations/typography_base',
            editor_type: 'short-text-editor',
            hidden: false
          },
          color_token: {
            type: 'text',
            required: false,
            default: 'default',
            options: [
              'default',
              'variant',
              'accent-1',
              'accent-2',
              'muted',
              'default--light',
              'variant--light',
              'accent-1--light',
              'accent-2--light',
              'muted--light'
            ],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          stack_size: {
            type: 'text',
            required: true,
            default: 'lg',
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Spacing token for the amount of spacing beneath the element.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          alignment: {
            type: 'text',
            required: false,
            default: 'left',
            options: ['left', 'center'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          element: {
            type: 'text',
            required: true,
            default: 'h1',
            options: ['h1', 'h2', 'h3', 'h4', 'h4', 'h5', 'h6', 'p'],
            description: 'Specifies the HTML element used.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          editable: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            hidden: true
          }
        }
      },
      {
        meta: {
          id: 'elements/form',
          styleguide_path: '/styleguide/elements%2Fform',
          description: 'A base form element which can be configured to submit to any endpoint.',
          editor_role: 'config-object',
          tags: ['form'],
          config_template: [
            'form_endpoint',
            'pardot_endpoint',
            'submit_actions',
            'redirect_url',
            'open_new_tab'
          ]
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ElementsFormComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          form_endpoint: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description:
              'The (non-pardot) URL endpoint for where form submission should go. If pardot_endpoint present, submits here first then to pardot.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          pardot_endpoint: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description:
              'The form handler url if this form submits to pardot. If form_endpoint present, submits here last.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          submit_actions: {
            type: 'text',
            required: false,
            default: '',
            options: ['grant_resource_gate_cookie'],
            description: 'Please select if this is a specific lead form.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          redirect_url: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description:
              'The link (such as a thank-you page) to redirect after form submission. Takes precedence over post-submit component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          open_new_tab: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: 'Whether or not the redirect_url should open in a new tab.',
            related_to: null,
            hidden: false
          },
          post_submit_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/headed_list'],
            description:
              'The component that should replace the form once a successful submission is made. Recommended if opening a redirect in a new tab or not providing any redirect.',
            related_to: null,
            hidden: false
          },
          amp_page: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description:
              'Internal toggle for amp forms rendered via iframe to let the form javascript know its intended for an AMP page, which effects its behavior slightly.',
            related_to: null,
            hidden: true
          }
        }
      },
      {
        meta: {
          id: 'elements/heading',
          styleguide_path: '/styleguide/elements%2Fheading',
          tags: ['text'],
          editor_role: 'component'
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ElementsHeadingComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The copy',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'lg', 'md', 'sm', 'xxs'],
            description: 'Defines font size',
            related_to: 'foundations/typography_base',
            editor_type: 'short-text-editor',
            hidden: false
          },
          color_token: {
            type: 'text',
            required: false,
            default: 'default',
            options: [
              'default',
              'variant',
              'accent-1',
              'accent-2',
              'muted',
              'default--light',
              'variant--light',
              'accent-1--light',
              'accent-2--light',
              'muted--light'
            ],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          stack_size: {
            type: 'text',
            required: true,
            default: null,
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Spacing token for the amount of spacing beneath the element.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          alignment: {
            type: 'text',
            required: false,
            default: 'left',
            options: ['left', 'center'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          element: {
            type: 'text',
            required: true,
            default: 'h2',
            options: ['h1', 'h2', 'h3', 'h4', 'h4', 'h5', 'h6', 'p'],
            description: 'Specifies the HTML element used.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          anchor_id: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description:
              'The #anchor tag which can allow a user to jump scroll to this heading or section. (Do not include the #).',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          editable: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            hidden: true
          }
        }
      },
      {
        meta: {
          id: 'elements/lead_text',
          styleguide_path: '/styleguide/elements%2Flead_text',
          tags: ['text'],
          editor_role: 'component'
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ElementsLeadTextComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          size: {
            type: 'text',
            required: true,
            default: 'lg',
            options: ['lg', 'md'],
            description: null,
            related_to: 'foundations/typography_base',
            editor_type: 'short-text-editor',
            hidden: false
          },
          color_token: {
            type: 'text',
            required: false,
            default: 'default',
            options: [
              'default',
              'variant',
              'accent-1',
              'accent-2',
              'muted',
              'default--light',
              'variant--light',
              'accent-1--light',
              'accent-2--light',
              'muted--light'
            ],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          alignment: {
            type: 'text',
            required: false,
            default: 'left',
            options: ['left', 'center'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          stack_size: {
            type: 'text',
            required: true,
            default: 'lg',
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Spacing token for the amount of spacing beneath the element.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          element: {
            type: 'text',
            required: true,
            default: 'p',
            options: ['p', 'markdown'],
            description: 'Specifies the HTML element used.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          editable: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            hidden: true
          }
        }
      },
      {
        meta: {
          id: 'elements/link',
          styleguide_path: '/styleguide/elements%2Flink',
          description: 'Base link component with attribute automation. ',
          editor_role: 'component',
          tags: [],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ElementsLinkComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          href: {
            type: 'text',
            required: false,
            default: '',
            options: [
              '{{ homepage }}',
              '{{ features-overview }}',
              '{{ features-benefits }}',
              '{{ features-payroll }}',
              '{{ features-hr }}',
              '{{ features-compliance }}',
              '{{ features-support }}',
              '{{ pricing }}',
              '{{ about-company }}',
              '{{ about-team }}',
              '{{ about-values }}',
              '{{ careers }}',
              '{{ press }}',
              '{{ our-customers }}',
              '{{ resource-center }}',
              '{{ blog }}',
              '{{ partners }}',
              '{{ referrals }}',
              '{{ help-center }}',
              '{{ login }}',
              '{{ get-started }}',
              '{{ terms-of-use }}',
              '{{ privacy-policy }}'
            ],
            description:
              'The link path. If internal, starts with `/`. If external, starts with `https://`',
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            hidden: false
          },
          target: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Overrides default external/internal new-tab behavior',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          data: {
            type: 'json',
            required: false,
            default: {},
            description: 'HTML dataset info applied to content_tag',
            related_to: null,
            hidden: false
          },
          style: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Inline style',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'elements/modal',
          styleguide_path: '/styleguide/elements%2Fmodal',
          description: 'Base modal with component container + with escape-key closing.',
          editor_role: 'component',
          tags: ['action'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ElementsModalComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          id: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'ID attribute if needed for targeting.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          modal_component: {
            type: 'component',
            required: false,
            default: null,
            options: [],
            description: 'Renders any component inside the modal.',
            related_to: null,
            hidden: false
          },
          include_close_button: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: true,
            description:
              'Whether or not the default close icon should appear on the top right of the container.',
            related_to: null,
            hidden: false
          },
          align_top: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description:
              'Whether the modal content should be aligned to the top instead of center.',
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'elements/paragraph_text',
          styleguide_path: '/styleguide/elements%2Fparagraph_text',
          tags: ['text'],
          editor_role: 'component'
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ElementsParagraphTextComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Will parse strings or markdown.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          size: {
            type: 'text',
            required: true,
            default: 'lg',
            options: ['lg', 'sm'],
            description: null,
            related_to: 'foundations/typography_base',
            editor_type: 'short-text-editor',
            hidden: false
          },
          color_token: {
            type: 'text',
            required: false,
            default: 'default',
            options: [
              'default',
              'variant',
              'accent-1',
              'accent-2',
              'muted',
              'default--light',
              'variant--light',
              'accent-1--light',
              'accent-2--light',
              'muted--light'
            ],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          stack_size: {
            type: 'text',
            required: false,
            default: '',
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Spacing token for the amount of spacing beneath the element.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          alignment: {
            type: 'text',
            required: false,
            default: 'left',
            options: ['left', 'center'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          element: {
            type: 'text',
            required: true,
            default: 'p',
            options: ['p', 'li', 'markdown'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          editable: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            hidden: true
          }
        }
      },
      {
        meta: {
          id: 'elements/react_container',
          styleguide_path: '/styleguide/elements%2Freact_container',
          description:
            'Provides the container for any react component contained in Frontend/javascripts/components',
          editor_role: 'component',
          tags: [],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ElementsReactContainerComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          component_class: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          props: {
            type: 'json',
            required: false,
            default: {},
            description:
              'Pass in a ruby hash of props which will then be accessible within the react component.',
            hidden: true
          }
        }
      },
      {
        meta: {
          id: 'elements/select',
          styleguide_path: '/styleguide/elements%2Fselect',
          editor_role: 'singleton',
          tags: ['form'],
          config_template: ['name', 'options', 'default_option']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          select_classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the select element.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ElementsSelectComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          size: {
            type: 'text',
            required: false,
            default: 'default',
            options: ['default', 'sm'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          name: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          default_option: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Which option to select by default when this element loads.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          options: {
            type: 'multi-text',
            required: false,
            default: [],
            options: null,
            description:
              "Select options in hash format: {label: 'label', value: 'value', selected: false}",
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'elements/system_text',
          styleguide_path: '/styleguide/elements%2Fsystem_text',
          tags: ['text'],
          editor_role: 'component'
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ElementsSystemTextComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          size: {
            type: 'text',
            required: true,
            default: 'lg',
            options: ['lg', 'md', 'sm'],
            description: null,
            related_to: 'foundations/typography_base',
            editor_type: 'short-text-editor',
            hidden: false
          },
          stack_size: {
            type: 'text',
            required: true,
            default: null,
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Spacing token for the amount of spacing beneath the element.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          element: {
            type: 'text',
            required: true,
            default: 'span',
            options: ['span', 'label', 'div', 'markdown'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The copy',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          color_token: {
            type: 'text',
            required: false,
            default: 'default',
            options: [
              'default',
              'variant',
              'accent-1',
              'accent-2',
              'muted',
              'default--light',
              'variant--light',
              'accent-1--light',
              'accent-2--light',
              'muted--light'
            ],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          editable: {
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
          id: 'elements/text_input',
          styleguide_path: '/styleguide/elements%2Ftext_input',
          editor_role: 'singleton',
          tags: ['form'],
          config_template: ['placeholder', 'type', 'name', 'required', 'validation_type']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ElementsTextInputComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          size: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'sm'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          input_config: {
            type: 'config',
            required: false,
            default: {},
            description: 'Use a config object to provide data.',
            related_to: 'elements/text_input',
            hidden: false
          },
          type: {
            type: 'text',
            required: true,
            default: 'text',
            options: ['text', 'date', 'tel', 'email', 'password'],
            description: 'Text input type.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          name: {
            type: 'text',
            required: true,
            default: '',
            options: null,
            description:
              'The form element named. Required for accessibility and form endpoint integrations.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          placeholder: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Input placeholder text',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          value: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The input value, if preset.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          required: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            hidden: false
          },
          validation_type: {
            type: 'text',
            required: false,
            default: '',
            options: ['email', 'phone', 'password'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          connect_right: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description:
              'Whether or not to style this input as if connected to something (probably a button) to the right.',
            related_to: null,
            hidden: false
          },
          autofocus: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            hidden: true
          }
        }
      },
      {
        meta: {
          id: 'patterns/algolia_search_results',
          styleguide_path: '/styleguide/patterns%2Falgolia_search_results',
          title: 'Algolia Search Results Pattern',
          description: 'Description of component.',
          editor_role: 'component',
          tags: [],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsAlgoliaSearchResultsComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsBackgroundImageSingleSplitComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          split_alignment: {
            type: 'text',
            required: true,
            default: 'right',
            options: ['left', 'right'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
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
              'components/heading_body_text',
              'components/basic_lead_form'
            ],
            description: null,
            related_to: null,
            hidden: false
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsBorderedContentCtaBoxComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          provide_grid: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: true,
            description:
              'Includes a single-column grid structure by default. Disable that in order to render as a gridless component.',
            related_to: null,
            hidden: true
          },
          content_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/heading_body_text', 'components/key_term_cta'],
            description: 'The text content on the left side of this box.',
            related_to: null,
            hidden: false
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
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/bordered_cta_entry_box',
          styleguide_path: '/styleguide/patterns%2Fbordered_cta_entry_box',
          description:
            'A direct interface for the BlogCta content type with a bordered content cta box.',
          editor_role: 'pattern',
          tags: ['cta', 'cta-module'],
          extension_of: 'patterns/bordered_content_cta_box'
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsBorderedCtaEntryBoxComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          cta_entry: {
            type: 'link',
            required: false,
            asset_types: [],
            content_types: ['blogCta'],
            description: null,
            related_to: null
          },
          provide_grid: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: true,
            description: null,
            related_to: null,
            hidden: true
          },
          resource_gated: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description:
              "Enables the lead form popup when CTA clicked. If already submitted, lead form won't appear again for the same user.",
            related_to: null,
            hidden: false
          },
          modal_component: {
            type: 'component',
            required: false,
            default: null,
            options: [],
            description:
              'Optional - overrides default modal component. Used for AMP only currently.',
            related_to: null,
            hidden: true
          }
        }
      },
      {
        meta: {
          id: 'patterns/composable_lp_hero',
          styleguide_path: '/styleguide/patterns%2Fcomposable_lp_hero',
          title: 'Composable Lp Hero Pattern',
          description: 'Description of component.',
          editor_role: 'component',
          tags: [],
          extension_of: null,
          snapshot: false
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsComposableLpHeroComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          background_color_token: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'variant'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          hero_components: {
            type: 'multi-component',
            required: true,
            hidden: false,
            default: [],
            options: [
              'elements/display_text',
              'elements/heading',
              'elements/lead_text',
              'elements/paragraph_text',
              'components/company_logo'
            ],
            presets: [
              {
                name: 'Overline',
                component_id: 'elements/heading',
                properties: {
                  alignment: 'center',
                  size: 'xxs',
                  stack_size: 'lg',
                  color_token: 'default',
                  text: 'Overline Text'
                }
              },
              {
                name: 'Title',
                component_id: 'elements/display_text',
                properties: {
                  alignment: 'center',
                  size: 'secondary',
                  stack_size: 'md',
                  color_token: 'variant',
                  text: 'Title Text'
                }
              },
              {
                name: 'Body',
                component_id: 'elements/lead_text',
                properties: {
                  alignment: 'center',
                  size: 'md',
                  stack_size: null,
                  color_token: 'default',
                  text: 'Body Text'
                }
              }
            ],
            description: 'Composable section for the hero elements you wish to add.',
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsContentSplitComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          content_alignment: {
            type: 'text',
            required: false,
            default: 'center',
            options: ['center', 'top', 'stretch'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          title_components: {
            type: 'multi-component',
            required: true,
            hidden: false,
            default: [],
            options: [
              'elements/display_text',
              'elements/heading',
              'elements/lead_text',
              'elements/paragraph_text'
            ],
            presets: [
              {
                name: 'Title',
                component_id: 'elements/heading',
                properties: {
                  alignment: 'center',
                  size: 'xl',
                  stack_size: 'md',
                  color_token: 'variant',
                  text: 'Title Text'
                }
              },
              {
                name: 'Body',
                component_id: 'elements/lead_text',
                properties: {
                  alignment: 'center',
                  size: 'md',
                  stack_size: 'xl',
                  color_token: 'default',
                  text: 'Body Text'
                }
              }
            ],
            description: 'Optional, composable section for the title elements you wish to add.',
            related_to: null
          },
          left_content: {
            type: 'component',
            required: true,
            default: null,
            options: [
              'components/contact_box',
              'components/headed_list',
              'components/responsive_image',
              'components/heading_body_text',
              'components/basic_lead_form',
              'components/responsive_video',
              'components/conversion_modal_content'
            ],
            description: null,
            related_to: null,
            hidden: false
          },
          right_content: {
            type: 'component',
            required: true,
            default: null,
            options: [
              'components/contact_box',
              'components/headed_list',
              'components/responsive_image',
              'components/heading_body_text',
              'components/basic_lead_form',
              'components/responsive_video',
              'components/conversion_modal_content'
            ],
            description: null,
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/filterable_search_results',
          styleguide_path: '/styleguide/patterns%2Ffilterable_search_results',
          description: 'Description of component.',
          editor_role: 'hidden',
          tags: ['card', 'resource-center', 'resource-wrapper'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsFilterableSearchResultsComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          query: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The search query that the results correspond with.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          resources: {
            type: 'multi-link',
            required: false,
            default: [],
            asset_types: [],
            content_types: ['blogPost'],
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsGridPresentationComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          overline_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          heading_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          body_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'long-text-editor',
            hidden: false
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          cta_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/cta_button', 'components/button_modal'],
            description: null,
            related_to: null,
            hidden: false
          },
          grid_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/adaptive_column_grid', 'components/single_column_carousel'],
            description: null,
            related_to: null,
            hidden: false
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
          tags: ['hero', 'landing-page']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsHeroDoubleStackComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: false,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          heading_label_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: 'elements/heading',
            editor_type: 'short-text-editor',
            hidden: false
          },
          display_text: {
            type: 'text',
            required: true,
            default: '',
            options: null,
            description: null,
            related_to: 'elements/display_text',
            editor_type: 'short-text-editor',
            hidden: false
          },
          display_size: {
            type: 'text',
            required: true,
            default: 'secondary',
            options: ['primary', 'secondary'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          lead_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: 'elements/lead_text',
            editor_type: 'long-text-editor',
            hidden: false
          },
          bottom_pattern: {
            type: 'component',
            required: true,
            default: null,
            options: ['patterns/background_image_single_split', 'patterns/content_split'],
            description: null,
            related_to: null,
            hidden: false
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsNavigationBarComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: false,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
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
          is_mobile: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description:
              "Select 'true' if this navbar should only appear on mobile + tablet (sm \u0026 md) sizes. Otherwise this navbar will only appear on landscape tablet + desktop (lg + xl) sizes.",
            related_to: null,
            hidden: false
          },
          center_logo: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/company_logo'],
            description: null,
            related_to: null,
            hidden: false
          },
          left_items: {
            type: 'multi-component',
            required: true,
            hidden: false,
            default: [],
            options: [
              'components/mobile_nav_modal',
              'components/nav_dropdown',
              'components/text_link',
              'components/cta_button'
            ],
            presets: [],
            description: null,
            related_to: null
          },
          right_items: {
            type: 'multi-component',
            required: true,
            hidden: false,
            default: [],
            options: [
              'components/text_link',
              'components/cta_button',
              'components/nav_dropdown',
              'components/algolia_search_bar'
            ],
            presets: [],
            description: null,
            related_to: null
          },
          right_items_mobile: {
            type: 'multi-component',
            required: true,
            hidden: true,
            default: [],
            options: ['components/text_link', 'components/cta_button', 'components/nav_dropdown'],
            presets: [],
            description:
              "Only use this for swapping a different element in at mobile view, such as the very specific 'Get Started' button changing to 'Start' in the mobile nav.",
            related_to: null
          },
          top_items: {
            type: 'multi-config',
            required: false,
            default: [],
            description:
              'List of nav links to appear in the mobile top bar. Only use this if this is a mobile nav.',
            related_to: 'components/text_link',
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/navigation_footer',
          styleguide_path: '/styleguide/patterns%2Fnavigation_footer',
          description: 'Description of component.',
          editor_role: 'pattern',
          tags: ['nav'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsNavigationFooterComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          is_mobile: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            hidden: false
          },
          column_components: {
            type: 'multi-component',
            required: true,
            hidden: false,
            default: [],
            options: ['components/footer_link_collection'],
            presets: [],
            description: 'All of the link collections at the top of the footer.',
            related_to: null
          },
          bottom_section: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/footer_three_column_section'],
            description: 'Section above the fine print. Usually for newletter subscribe form.',
            related_to: null,
            hidden: false
          },
          fine_print: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            editor_type: 'markdown-editor',
            hidden: false
          },
          social_icons_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/social_icon_row'],
            description: 'These go inside the fine print section only.',
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/resource_article',
          styleguide_path: '/styleguide/patterns%2Fresource_article',
          description:
            'The full article experience composed from a resource content type. Includes the hero, table of contents, content, and progress bar.',
          editor_role: 'pattern',
          tags: ['mixed-media', 'resource-center', 'resource-wrapper'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsResourceArticleComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          resource: {
            type: 'link',
            required: false,
            asset_types: [],
            content_types: ['resourceWrapper'],
            description:
              'Add the resource to include category \u0026 glossary information into the hero and table of contents. Optional.',
            related_to: null
          },
          article: {
            type: 'link',
            required: true,
            asset_types: [],
            content_types: ['blogPost'],
            description: 'Should work with any blog article entry.',
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
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsResourceContentSectionComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          heading_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          lead_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'long-text-editor',
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
              'components/guide_carousel',
              'components/dropdown_curated_guide_lists',
              'components/featured_video_resource_showcase',
              'components/card_resource_showcase_section',
              'components/adaptive_column_grid'
            ],
            description: null,
            related_to: null,
            hidden: false
          },
          action_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/cta_button', 'components/button_modal'],
            description: null,
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/resource_hero',
          styleguide_path: '/styleguide/patterns%2Fresource_hero',
          description: 'Description of component.',
          editor_role: 'pattern',
          tags: ['hero', 'resource-center'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsResourceHeroComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          breadcrumb_links: {
            type: 'multi-config',
            required: false,
            default: [],
            description: null,
            related_to: 'components/text_link',
            hidden: false
          },
          include_social: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: true,
            description: 'Whether social links should be included or not?',
            related_to: null,
            hidden: false
          },
          title_typography_style: {
            type: 'text',
            required: false,
            default: 'display--primary',
            options: ['display--primary', 'display--secondary', 'heading--xl', 'heading--lg'],
            description: 'Which typography style to use for the title.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          title_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          lead_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'long-text-editor',
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
          tags: ['hero', 'resource-center']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsSearchHeroComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          label_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          display_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          display_size: {
            type: 'text',
            required: true,
            default: 'primary',
            options: ['primary', 'secondary'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          search_component: {
            type: 'component',
            required: true,
            default: null,
            options: ['components/search_bar'],
            description: null,
            related_to: null,
            hidden: false
          },
          stack_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/search_term_grid'],
            description: null,
            related_to: null,
            hidden: false
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
          tags: ['hero', 'landing-page']
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsShortLandingPageHeroComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          text_components: {
            type: 'multi-component',
            required: true,
            hidden: false,
            default: [],
            options: [
              'elements/display_text',
              'elements/heading',
              'elements/lead_text',
              'elements/paragraph_text'
            ],
            presets: [
              {
                name: 'Overline',
                component_id: 'elements/heading',
                properties: {
                  size: 'xxs',
                  stack_size: 'lg',
                  color_token: 'default',
                  text: 'Overline Text'
                }
              },
              {
                name: 'Title',
                component_id: 'elements/display_text',
                properties: {
                  size: 'secondary',
                  stack_size: 'md',
                  color_token: 'variant',
                  text: 'Title Text'
                }
              },
              {
                name: 'Body',
                component_id: 'elements/lead_text',
                properties: {
                  size: 'md',
                  stack_size: null,
                  color_token: 'default',
                  text: 'Body Text'
                }
              }
            ],
            description: 'Fully composable text elements for the left side of this hero.',
            related_to: null
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
            related_to: null,
            hidden: false
          },
          background_image: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/full_background_image'],
            description: null,
            related_to: null,
            hidden: false
          },
          action_items: {
            type: 'multi-component',
            required: true,
            hidden: false,
            default: [],
            options: [
              'components/single_text_inline_form',
              'components/utility_button',
              'components/cta_button'
            ],
            presets: [],
            description: 'Composable action items (forms, buttons, etc) below the main hero text.',
            related_to: null
          }
        }
      },
      {
        meta: {
          id: 'patterns/video_theatre',
          styleguide_path: '/styleguide/patterns%2Fvideo_theatre',
          title: 'Video Theatre Pattern',
          description: 'A standalone page section for displaying a video.',
          editor_role: 'pattern',
          tags: ['media'],
          extension_of: null
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsVideoTheatreComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          video_entry: {
            type: 'link',
            required: false,
            asset_types: [],
            content_types: ['video'],
            description: null,
            related_to: null
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/webinar_event_list',
          styleguide_path: '/styleguide/patterns%2Fwebinar_event_list',
          title: 'Webinar Event List Pattern',
          description:
            'A list of events which can be configured to load events by category and display all, current, or past events only.',
          editor_role: 'component',
          tags: ['list', 'content', 'event', 'events-page'],
          extension_of: null,
          snapshot: true
        },
        properties: {
          classname: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CSS class name(s) for the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsWebinarEventListComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          title_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          body_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'long-text-editor',
            hidden: false
          },
          show_events: {
            type: 'text',
            required: true,
            default: 'upcoming',
            options: ['upcoming', 'past'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          event_category: {
            type: 'text',
            required: false,
            default: '',
            options: ['la', 'nyc', 'chicago', 'boston', 'webinar'],
            description:
              "When selected, the component automatically fills with the category of your choosing. Otherwise, you can manually insert events within the 'events' property.",
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          events: {
            type: 'multi-link',
            required: false,
            default: [],
            asset_types: [],
            content_types: ['event'],
            description:
              'Only used if custom events are to be used instead of automatically configured lists.',
            related_to: null
          },
          cta_link: {
            type: 'config',
            required: false,
            default: {},
            description:
              "Add this to override the 'show more' default cta with a persistant cta link.",
            related_to: 'components/text_link',
            hidden: false
          }
        }
      }
    ],
    config_templates: [
      {
        meta: {
          id: 'components/text_link',
          styleguide_path: '/styleguide/components%2Ftext_link',
          description: 'A base link.',
          editor_role: 'component',
          tags: ['action'],
          config_template: ['href', 'link_text']
        },
        properties: {
          href: {
            type: 'text',
            required: false,
            default: '',
            options: [
              '{{ homepage }}',
              '{{ features-overview }}',
              '{{ features-benefits }}',
              '{{ features-payroll }}',
              '{{ features-hr }}',
              '{{ features-compliance }}',
              '{{ features-support }}',
              '{{ pricing }}',
              '{{ about-company }}',
              '{{ about-team }}',
              '{{ about-values }}',
              '{{ careers }}',
              '{{ press }}',
              '{{ our-customers }}',
              '{{ resource-center }}',
              '{{ blog }}',
              '{{ partners }}',
              '{{ referrals }}',
              '{{ help-center }}',
              '{{ login }}',
              '{{ get-started }}',
              '{{ terms-of-use }}',
              '{{ privacy-policy }}'
            ],
            description:
              'The link path. If internal, starts with `/`. If external, starts with `https://`',
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            hidden: false
          },
          link_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Pass configure as a text link. Overrides blocks.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'elements/form',
          styleguide_path: '/styleguide/elements%2Fform',
          description: 'A base form element which can be configured to submit to any endpoint.',
          editor_role: 'config-object',
          tags: ['form'],
          config_template: [
            'form_endpoint',
            'pardot_endpoint',
            'submit_actions',
            'redirect_url',
            'open_new_tab'
          ]
        },
        properties: {
          form_endpoint: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description:
              'The (non-pardot) URL endpoint for where form submission should go. If pardot_endpoint present, submits here first then to pardot.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          pardot_endpoint: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description:
              'The form handler url if this form submits to pardot. If form_endpoint present, submits here last.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          submit_actions: {
            type: 'text',
            required: false,
            default: '',
            options: ['grant_resource_gate_cookie'],
            description: 'Please select if this is a specific lead form.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          redirect_url: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description:
              'The link (such as a thank-you page) to redirect after form submission. Takes precedence over post-submit component.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          open_new_tab: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: 'Whether or not the redirect_url should open in a new tab.',
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'elements/select',
          styleguide_path: '/styleguide/elements%2Fselect',
          editor_role: 'singleton',
          tags: ['form'],
          config_template: ['name', 'options', 'default_option']
        },
        properties: {
          name: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          default_option: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Which option to select by default when this element loads.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          options: {
            type: 'multi-text',
            required: false,
            default: [],
            options: null,
            description:
              "Select options in hash format: {label: 'label', value: 'value', selected: false}",
            related_to: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'elements/text_input',
          styleguide_path: '/styleguide/elements%2Ftext_input',
          editor_role: 'singleton',
          tags: ['form'],
          config_template: ['placeholder', 'type', 'name', 'required', 'validation_type']
        },
        properties: {
          type: {
            type: 'text',
            required: true,
            default: 'text',
            options: ['text', 'date', 'tel', 'email', 'password'],
            description: 'Text input type.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          name: {
            type: 'text',
            required: true,
            default: '',
            options: null,
            description:
              'The form element named. Required for accessibility and form endpoint integrations.',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          placeholder: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Input placeholder text',
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          },
          required: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            hidden: false
          },
          validation_type: {
            type: 'text',
            required: false,
            default: '',
            options: ['email', 'phone', 'password'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            hidden: false
          }
        }
      }
    ]
  }
};
