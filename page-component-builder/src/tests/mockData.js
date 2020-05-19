export const mockSchemas = {
  data: {
    tokens: {
      submit_events: ['grant_resource_gate_cookie', 'set_lead_storage'],
      input_names: [
        'blog_default_hubspot_blog_subscription',
        'company',
        'current_payroll_provider',
        'email',
        'email_the_article_cta',
        'firstname',
        'lastname',
        'learn_about_justworks',
        'lifecyclestage',
        'most_recent_guide_download_name',
        'most_recent_guide_download_url',
        'numemployees',
        'pageURL',
        'phone',
        'wantshealthcare'
      ],
      submit_action_types: ['redirect', 'event']
    },
    tags: {
      component: [
        'uncategorized',
        'form',
        'media',
        'text',
        'action',
        'card',
        'collection',
        'nav',
        'hero',
        'modular'
      ],
      content: ['guide', 'resource-wrapper', 'blog-post', 'video', 'image', 'event'],
      location: ['landing-page', 'resource-center', 'marketing-site', 'guidepost', 'events-page']
    },
    components: [
      {
        meta: {
          id: 'components/adaptive_carousel',
          styleguide_path: '/styleguide/components%2Fadaptive_carousel',
          title: 'Carousel',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          provide_grid: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: true,
            description:
              'Includes a single-column grid structure by default. Disable this in order to render as a gridless component.',
            related_to: null,
            editor_category: 'style',
            hidden: true
          },
          loop: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: 'Should the carousel loop back to start when it reaches the end?',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          autoplay: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: 'Should the carousel autoplay without a user clicking the arrows?',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          mouse_drag: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description:
              'Should the carousel be draggable with the mouse or require arrow clicks only?',
            related_to: null,
            editor_category: 'advanced',
            hidden: true
          },
          slide_by: {
            type: 'text',
            required: true,
            default: 'single',
            options: ['single', 'page'],
            description:
              'The scrolling behavior -- single scrolls by 1, page scrolls by all the items on the page.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
            hidden: false
          },
          sm_max: {
            type: 'number',
            required: true,
            default: 1,
            options: null,
            description: 'The number of items to show at the SM (mobile) breakpoint',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          md_max: {
            type: 'number',
            required: true,
            default: 2,
            options: null,
            description: 'The number of items to show at the MD (portrait tablet) breakpoint',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          lg_max: {
            type: 'number',
            required: true,
            default: 3,
            options: null,
            description:
              'The number of items to show at the LG (landscape tablet / desktop) breakpoint',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          xl_max: {
            type: 'number',
            required: true,
            default: 3,
            options: null,
            description: 'The number of items to show at the XL (desktop) breakpoint',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          items: {
            type: 'multi-component',
            required: false,
            hidden: false,
            default: [],
            options: ['components/basic_text_nav_card'],
            presets: [],
            description: 'The carousel item components.',
            related_to: null,
            editor_category: null
          }
        }
      },
      {
        meta: {
          id: 'components/adaptive_column_grid',
          styleguide_path: '/styleguide/components%2Fadaptive_column_grid',
          title: 'Column Grid',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          sm_max: {
            type: 'number',
            required: true,
            default: 1,
            options: [1, 2],
            description: 'The number of items to show at the SM (mobile) breakpoint',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          md_max: {
            type: 'number',
            required: true,
            default: 2,
            options: [1, 2],
            description: 'The number of items to show at the MD (portrait tablet) breakpoint',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          lg_max: {
            type: 'number',
            required: true,
            default: 4,
            options: [1, 2, 3, 4],
            description:
              'The number of items to show at the LG (landscape tablet / desktop) breakpoint',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          xl_max: {
            type: 'number',
            required: true,
            default: 4,
            options: [1, 2, 3, 4],
            description: 'The number of items to show at the XL (desktop) breakpoint',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          items: {
            type: 'multi-component',
            required: false,
            hidden: false,
            default: [],
            options: [
              'components/basic_text_nav_card',
              'components/celebrated_list_item',
              'components/headed_list',
              'components/heading_body_text'
            ],
            presets: [],
            description: 'The column components.',
            related_to: null,
            editor_category: null
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          in_results_pattern: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: 'Is this part of the search results pattern?',
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/author_headshot_meta',
          styleguide_path: '/styleguide/components%2Fauthor_headshot_meta',
          title: 'Author Headshot',
          description:
            'Specialized component to display a static circled image next to muted text containing an author name and 2 meta items.',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          image_asset: {
            type: 'link',
            required: false,
            asset_types: ['image'],
            content_types: [],
            description: 'Author photo',
            related_to: null,
            editor_category: null,
            hidden: false
          },
          author_name: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: "The author's name",
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          meta_1_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The first meta text before the dot.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          meta_2_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The second meta text after the dor.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/basic_lead_form',
          styleguide_path: '/styleguide/components%2Fbasic_lead_form',
          title: 'Basic Lead Form',
          description: 'A single page lead form which can support multiple input pages and groups.',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          surface_color_token: {
            type: 'text',
            required: true,
            default: 'variant',
            options: ['default', 'variant'],
            description:
              'Select the surface color token to use. All surface colors remain fixed regardless of the current light/dark variant.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            editor_category: 'style',
            hidden: false
          },
          amp_page: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description:
              'Internal toggle for amp forms rendered via iframe to let the form know its intended for an AMP page.',
            related_to: null,
            editor_category: 'advanced',
            hidden: true
          },
          form_location: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description:
              'Put a specific page location (footer, body, hero, etc) here for Google Analytics tracking dimensions.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
            hidden: false
          },
          submit_actions: {
            editor_category: 'advanced',
            type: 'submit-action',
            default: '[]',
            required: false,
            description:
              'Conditional actions (such as redirects, special events) to perform after the user submits the form.'
          },
          top_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The title above the entire form.',
            related_to: 'elements/heading',
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          submit_button_text: {
            type: 'text',
            required: true,
            default: 'Submit',
            options: null,
            description: 'What the submit button should say.',
            related_to: 'components/cta_button',
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          hidden_fields: {
            type: 'multi-config',
            required: false,
            default: [],
            description: 'Hidden fields for passing essential pardot data.',
            related_to: 'elements/text_input',
            editor_category: null,
            hidden: false
          },
          form_pages: {
            type: 'multi-component',
            required: false,
            hidden: false,
            default: [],
            options: ['components/form_page'],
            presets: [],
            description: 'Collection of form pages.',
            related_to: null,
            editor_category: null
          },
          footer_content: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'Content beneath the form such as a privacy policy link or fine print.',
            related_to: null,
            editor_type: 'markdown-editor',
            editor_category: null,
            hidden: false
          },
          post_submit_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/headed_list'],
            description:
              'The component that replaces the form after its submitted. If none provided, a default "Thank you" message will appear.',
            related_to: null,
            editor_category: null,
            hidden: false
          },
          form_config: {
            type: 'config',
            required: false,
            default: {},
            description: 'Data object for configuring a form element.',
            related_to: 'elements/form',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/basic_text_nav_card',
          styleguide_path: '/styleguide/components%2Fbasic_text_nav_card',
          title: 'Basic Text Nav Card',
          description: 'A card which acts as a nav link and has a color override property.',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          color_override: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'Hex value -- color value overrides card cap color.',
            related_to: null,
            editor_type: 'color-editor',
            editor_category: 'style',
            hidden: false
          },
          overline_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Text for the overline.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          title_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Title text',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          body_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Body text',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          href: {
            type: 'text',
            required: false,
            default: '',
            options: [
              '{{ about-company }}',
              '{{ about-team }}',
              '{{ about-values }}',
              '{{ blog }}',
              '{{ careers }}',
              '{{ customer-success-phone }}',
              '{{ features-benefits }}',
              '{{ features-compliance }}',
              '{{ features-hr }}',
              '{{ features-overview }}',
              '{{ features-payroll }}',
              '{{ features-support }}',
              '{{ get-started }}',
              '{{ help-center }}',
              '{{ homepage }}',
              '{{ justwomen }}',
              '{{ login }}',
              '{{ our-customers }}',
              '{{ partners }}',
              '{{ press }}',
              '{{ pricing }}',
              '{{ privacy-policy }}',
              '{{ product-updates }}',
              '{{ referrals }}',
              '{{ resource-center }}',
              '{{ sales-phone }}',
              '{{ terms-of-use }}'
            ],
            description:
              "If the link is external, provide a full URL (https://example.com). If internal, only provide the path ('/internal/link')",
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            editor_category: null,
            hidden: false
          },
          cta_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'What the bottom CTA should say.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/breadcrumb_text',
          styleguide_path: '/styleguide/components%2Fbreadcrumb_text',
          title: 'Breadcrumbs',
          description: 'A collection of inline links styled with a / between them.',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          stack_size: {
            type: 'text',
            required: false,
            default: null,
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Additional spacing beneath the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          links: {
            type: 'multi-config',
            required: false,
            default: [],
            description: 'The link components.',
            related_to: 'components/text_link',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/button_modal',
          styleguide_path: '/styleguide/components%2Fbutton_modal',
          title: 'Button Modal',
          description: 'A button component which pops open a modal component when clicked.',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          modal_align_top: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: 'Whether or not the modal should align to the top rather than center.',
            related_to: null,
            editor_category: 'style',
            hidden: false
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
            editor_category: 'advanced',
            hidden: true
          },
          include_close_button: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: true,
            description:
              'Whether or not the default close icon should appear on the top right of the container. This may be necessary because modal components come with their own close button.',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          modal_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/basic_lead_form'],
            description: 'The component which will appear in the modal.',
            related_to: null,
            editor_category: null,
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
            description: 'The button component',
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/card_resource_showcase_section',
          styleguide_path: '/styleguide/components%2Fcard_resource_showcase_section',
          title: 'Resource Showcase Section',
          description:
            'A page content section for resources with an opinionated layout. The "large-single" preset displays a maximum of 4 items and the "inline-all" displays a maximum of 6.',
          editor_role: 'component',
          tags: ['collection', 'resource-wrapper', 'blog-post', 'video', 'e-book']
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          preset_config: {
            type: 'text',
            required: false,
            default: 'large-single',
            options: ['large-single', 'inline-all'],
            description:
              "The configuration of the cards. 'Large single' will display a single large card on the left and the remaining 3 are inline on the right (this pattern repeats). 'Inline-all' will display small inline cards for each entry.",
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
            hidden: false
          },
          max_items: {
            type: 'number',
            required: false,
            default: 4,
            options: null,
            description: 'The max number of cards to show. Excess cards will remain hidden.',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          items: {
            type: 'multi-link',
            required: false,
            default: [],
            asset_types: [],
            content_types: ['resourceWrapper', 'blogPost', 'video', '1pI1DjDAXusMmIIU2u8UwI'],
            description:
              'The resource entries which will supply the cards. Please ensure each resource has an entry with a meta entry attached.',
            related_to: null,
            editor_category: null
          },
          action_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/cta_button', 'components/button_modal'],
            description: 'Optional CTA component at the bottom.',
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/celebrated_list_item',
          styleguide_path: '/styleguide/components%2Fcelebrated_list_item',
          title: 'Celebrated List Item',
          description:
            'A text group with a static circled image asset on top to be used with within 3 or 4 columns.',
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
            editor_category: null,
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          title_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The title text',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          body_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The body text',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          icon_asset: {
            type: 'link',
            required: false,
            asset_types: ['image'],
            content_types: [],
            description: 'The image asset to display as a static circled image',
            related_to: null,
            editor_category: null,
            hidden: false
          },
          item_components: {
            type: 'multi-component',
            required: false,
            hidden: false,
            default: [],
            options: [
              'components/cta_button',
              'components/button_modal',
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
                  alignment: 'left',
                  size: 'xxs',
                  stack_size: 'md',
                  color_token: 'default',
                  text: 'Overline Text',
                  element: 'p'
                }
              },
              {
                name: 'Title (heading)',
                component_id: 'elements/heading',
                properties: {
                  max_width: 'default',
                  alignment: 'left',
                  size: 'md',
                  stack_size: 'md',
                  color_token: 'variant',
                  text: 'Title Text'
                }
              },
              {
                name: 'Body (paragraph)',
                component_id: 'elements/paragraph_text',
                properties: {
                  max_width: 'default',
                  alignment: 'left',
                  size: 'sm',
                  stack_size: null,
                  color_token: 'default',
                  text: 'Body Text'
                }
              },
              {
                name: 'CTA Button (secondary)',
                component_id: 'components/cta_button',
                properties: { cta_intent: 'secondary', button_text: 'Click' }
              }
            ],
            description: 'Composable section for the elements you wish to add.',
            related_to: null,
            editor_category: null
          }
        }
      },
      {
        meta: {
          id: 'components/company_logo',
          styleguide_path: '/styleguide/components%2Fcompany_logo',
          title: 'Company Brand Logo',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          color_token: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['variant', 'accent-1', 'accent-2'],
            description: 'The theme token to apply to the logo.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            editor_category: 'style',
            hidden: false
          },
          stack_size: {
            type: 'text',
            required: false,
            default: null,
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Additional spacing beneath the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          href: {
            type: 'text',
            required: false,
            default: '',
            options: [
              '{{ about-company }}',
              '{{ about-team }}',
              '{{ about-values }}',
              '{{ blog }}',
              '{{ careers }}',
              '{{ customer-success-phone }}',
              '{{ features-benefits }}',
              '{{ features-compliance }}',
              '{{ features-hr }}',
              '{{ features-overview }}',
              '{{ features-payroll }}',
              '{{ features-support }}',
              '{{ get-started }}',
              '{{ help-center }}',
              '{{ homepage }}',
              '{{ justwomen }}',
              '{{ login }}',
              '{{ our-customers }}',
              '{{ partners }}',
              '{{ press }}',
              '{{ pricing }}',
              '{{ privacy-policy }}',
              '{{ product-updates }}',
              '{{ referrals }}',
              '{{ resource-center }}',
              '{{ sales-phone }}',
              '{{ terms-of-use }}'
            ],
            description:
              "If the link is external, provide a full URL (https://example.com). If internal, only provide the path ('/internal/link')",
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            editor_category: null,
            hidden: false
          },
          logo_name: {
            type: 'text',
            required: true,
            default: 'justworks-logo',
            options: ['justworks-logo', 'justworks-x-connect-your-care'],
            description:
              'Select from the predefined list of logos we have (new logos need to be passed to development for processing w/ theme system).',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/composable_text',
          styleguide_path: '/styleguide/components%2Fcomposable_text',
          title: 'Composable Text',
          description:
            'A component which allows the author to fully control which text elements and styles they wish to add. Text elements stack.',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          text_components: {
            type: 'multi-component',
            required: false,
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
            related_to: null,
            editor_category: null
          }
        }
      },
      {
        meta: {
          id: 'components/configurable_card',
          styleguide_path: '/styleguide/components%2Fconfigurable_card',
          title: 'Configurable Card',
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
            editor_category: null,
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
            editor_category: null,
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
            description: 'The card style at this the SM (mobile) breakpoint.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
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
            description: 'The card style at this the MD (portrait tablet) breakpoint.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
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
            description: 'The card style at this the LG (landscape tablet / desktop) breakpoint.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
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
            description: 'The card style at this the XL (desktop) breakpoint.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
            hidden: false
          },
          href: {
            type: 'text',
            required: false,
            default: '',
            options: [
              '{{ about-company }}',
              '{{ about-team }}',
              '{{ about-values }}',
              '{{ blog }}',
              '{{ careers }}',
              '{{ customer-success-phone }}',
              '{{ features-benefits }}',
              '{{ features-compliance }}',
              '{{ features-hr }}',
              '{{ features-overview }}',
              '{{ features-payroll }}',
              '{{ features-support }}',
              '{{ get-started }}',
              '{{ help-center }}',
              '{{ homepage }}',
              '{{ justwomen }}',
              '{{ login }}',
              '{{ our-customers }}',
              '{{ partners }}',
              '{{ press }}',
              '{{ pricing }}',
              '{{ privacy-policy }}',
              '{{ product-updates }}',
              '{{ referrals }}',
              '{{ resource-center }}',
              '{{ sales-phone }}',
              '{{ terms-of-use }}'
            ],
            description:
              "If the link is external, provide a full URL (https://example.com). If internal, only provide the path ('/internal/link')",
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            editor_category: null,
            hidden: false
          },
          label_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The text for the overline',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          title_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The title text',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          description_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The description / body text.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          meta_1_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The text for the first meta item.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          meta_2_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The text for the second meta item (after the dot).',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          image_url: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Optional image url to instead of a contentful asset.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: true
          },
          image_asset: {
            type: 'link',
            required: false,
            asset_types: ['image'],
            content_types: [],
            description: 'Image asset for the card image.',
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/configurable_resource_card',
          styleguide_path: '/styleguide/components%2Fconfigurable_resource_card',
          title: 'Configurable Resource Card',
          description:
            'A module which transforms contentful resource wrappers OR entries into a configurable card component.',
          editor_role: 'component',
          extension_of: 'components/configurable_card',
          tags: ['card', 'resource-wrapper', 'blog-post', 'video', 'e-book']
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
            editor_category: null,
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
            editor_category: null,
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
            description: 'The card style at this the SM (mobile) breakpoint.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
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
            description: 'The card style at this the MD (portrait tablet) breakpoint.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
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
            description: 'The card style at this the LG (landscape tablet / desktop) breakpoint.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
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
            description: 'The card style at this the XL (desktop) breakpoint.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
            hidden: false
          },
          resource: {
            type: 'link',
            required: false,
            asset_types: [],
            content_types: ['resourceWrapper', 'blogPost', 'video', '1pI1DjDAXusMmIIU2u8UwI'],
            description: 'Please ensure the resource is linked to an entry with a meta object.',
            related_to: null,
            editor_category: null,
            hidden: false
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          surface_color_token: {
            type: 'text',
            required: true,
            default: 'variant',
            options: ['default', 'variant'],
            description:
              'Select the surface color token to use. All surface colors remain fixed regardless of the current light/dark variant.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          heading_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: "The title above the box's content.",
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
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
            editor_category: null,
            hidden: false
          },
          contact_links: {
            type: 'multi-config',
            required: false,
            default: [],
            description: 'The link components for each contact.',
            related_to: 'components/text_link',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/conversion_modal_content',
          styleguide_path: '/styleguide/components%2Fconversion_modal_content',
          title: 'Conversion Modal Content',
          description: 'A component with text content and a cta button with popup modal.',
          editor_role: 'component',
          tags: ['action', 'action'],
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          cta_intent: {
            type: 'text',
            required: false,
            default: '',
            options: ['primary', 'secondary', 'tertiary'],
            description: 'The CTA intent color.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            editor_category: 'style',
            hidden: false
          },
          overline_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Overline text',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          heading_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Title text',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          body_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Body text',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          cta_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'CTA text',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
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
            description: 'CTA icon (if any)',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          modal_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/basic_lead_form'],
            description: 'The component which will appear in the modal.',
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/cta_button',
          styleguide_path: '/styleguide/components%2Fcta_button',
          title: 'CTA Button',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          cta_intent: {
            type: 'text',
            required: true,
            default: 'primary',
            options: ['primary', 'secondary', 'tertiary'],
            description: 'Button intent color.',
            related_to: 'foundations/theme_colors',
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          size: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'sm', 'legacy-nav'],
            description: 'Button size (default or small)',
            related_to: 'foundations/inset_shapes',
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            editor_category: 'style',
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
            editor_category: 'style',
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
            editor_category: 'advanced',
            hidden: true
          },
          type: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'HTML input type',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
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
            editor_category: 'advanced',
            hidden: true
          },
          disabled: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: "Manually set the button's disabled state.",
            related_to: null,
            editor_category: 'advanced',
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
            description:
              'List of icons - please submit new icons to development for theme integration.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          href: {
            type: 'text',
            required: false,
            default: '',
            options: [
              '{{ about-company }}',
              '{{ about-team }}',
              '{{ about-values }}',
              '{{ blog }}',
              '{{ careers }}',
              '{{ customer-success-phone }}',
              '{{ features-benefits }}',
              '{{ features-compliance }}',
              '{{ features-hr }}',
              '{{ features-overview }}',
              '{{ features-payroll }}',
              '{{ features-support }}',
              '{{ get-started }}',
              '{{ help-center }}',
              '{{ homepage }}',
              '{{ justwomen }}',
              '{{ login }}',
              '{{ our-customers }}',
              '{{ partners }}',
              '{{ press }}',
              '{{ pricing }}',
              '{{ privacy-policy }}',
              '{{ product-updates }}',
              '{{ referrals }}',
              '{{ resource-center }}',
              '{{ sales-phone }}',
              '{{ terms-of-use }}'
            ],
            description:
              "If the link is external, provide a full URL (https://example.com). If internal, only provide the path ('/internal/link')",
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            editor_category: null,
            hidden: false
          },
          button_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: "The button's text.",
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/dropdown_curated_guide_lists',
          styleguide_path: '/styleguide/components%2Fdropdown_curated_guide_lists',
          title: 'Dropdown Guide List',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          cta_intent: {
            type: 'text',
            required: true,
            default: 'primary',
            options: ['primary', 'secondary', 'tertiary'],
            description: 'Button intent color.',
            related_to: 'foundations/theme_colors',
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          preview_type: {
            type: 'text',
            required: true,
            default: 'most-recent',
            options: ['most-recent', 'first-list', 'second-list'],
            description:
              "Configures which entries to display from each guide. 'Most recent' displays the most recent entries.",
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
            hidden: false
          },
          max_items: {
            type: 'number',
            required: false,
            default: 4,
            options: null,
            description:
              'The max number of entries from each guide to show. Excess will be hidden.',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          cta_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The CTA text that each guide CTA shoud have.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          guides: {
            type: 'multi-link',
            required: false,
            default: [],
            asset_types: [],
            content_types: ['guide'],
            description:
              'Each guide will display a list of its associated entries. Please ensure each guide has a meta object.',
            related_to: null,
            editor_category: null
          }
        }
      },
      {
        meta: {
          id: 'components/dropdown_selectables/component',
          styleguide_path: '/styleguide/components%2Fdropdown_selectables%2Fcomponent',
          title: 'Dropdown Component Display',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          dropdown_options: {
            type: 'multi-text',
            required: true,
            default: [],
            options: null,
            description: 'The list of text options for the dropdown.',
            related_to: null,
            editor_category: null,
            hidden: false
          },
          components: {
            type: 'multi-component',
            required: true,
            hidden: false,
            default: [],
            options: [],
            presets: [],
            description:
              'The components associated with each text option. Should match the length and order of options manually.',
            related_to: null,
            editor_category: null
          }
        }
      },
      {
        meta: {
          id: 'components/featured_video_resource_showcase',
          styleguide_path: '/styleguide/components%2Ffeatured_video_resource_showcase',
          title: 'Featured Video Showcase',
          description:
            'A presentation of videos which shows a "current" and a "next" video. Auto-scrolls when video completes.',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          video_entries: {
            type: 'multi-link',
            required: false,
            default: [],
            asset_types: [],
            content_types: ['video', 'resourceWrapper'],
            description:
              'The video entries to populate this showcase with. Please ensure each video has a meta object.',
            related_to: null,
            editor_category: null
          }
        }
      },
      {
        meta: {
          id: 'components/footer_link_collection',
          styleguide_path: '/styleguide/components%2Ffooter_link_collection',
          title: 'Footer Link Collection',
          description:
            'A footer section which renders a column of vertical links and optional fine print markdown.',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          alignment: {
            type: 'text',
            required: false,
            default: 'left',
            options: ['left', 'center'],
            description: 'Text or component alignment. Blank defaults to left.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          link_stack_size: {
            type: 'text',
            required: true,
            default: 'sm',
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'The vertical spacing for the links.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          link_theme_token: {
            type: 'text',
            required: true,
            default: 'variant',
            options: ['variant', 'accent-1'],
            description: 'The color token for the links.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          title_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Title text',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          markdown: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description:
              'Optional free-text section for adding fine print or other text beneath the links.',
            related_to: null,
            editor_type: 'markdown-editor',
            editor_category: null,
            hidden: false
          },
          links: {
            type: 'multi-config',
            required: false,
            default: [],
            description: 'The list of links to include, stacks vertically.',
            related_to: 'components/text_link',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/footer_three_column_section',
          styleguide_path: '/styleguide/components%2Ffooter_three_column_section',
          title: 'Footer Three Column Section',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          left_column: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/footer_link_collection'],
            description: 'Component for the left.',
            related_to: null,
            editor_category: null,
            hidden: false
          },
          center_column: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/single_text_inline_form'],
            description: 'Component forx the center.',
            related_to: null,
            editor_category: null,
            hidden: false
          },
          right_column: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/social_icon_row'],
            description: 'Component for the right.',
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/form_input_group',
          styleguide_path: '/styleguide/components%2Fform_input_group',
          title: 'Input Group',
          description:
            'Input groups provide optional lead text above a group of labeled inputs. They allow you to group input sections together by category.',
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
            editor_category: null,
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
            editor_category: null,
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
            editor_category: null,
            hidden: false
          },
          input_fields: {
            type: 'multi-component',
            required: true,
            hidden: false,
            default: [],
            options: ['components/labeled_text_input', 'components/labeled_select_input'],
            presets: [],
            description: 'A collection of labeled form inputs',
            related_to: null,
            editor_category: null
          }
        }
      },
      {
        meta: {
          id: 'components/form_page',
          styleguide_path: '/styleguide/components%2Fform_page',
          title: 'Form Page',
          description:
            'When multiple form pages are present in a form, the form will allow users to fill out 1 page at a time.',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          form_page_title: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The (optional) title for this form page.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          form_input_groups: {
            type: 'multi-component',
            required: false,
            hidden: false,
            default: [],
            options: ['components/form_input_group'],
            presets: [],
            description: 'Collection of form input components.',
            related_to: null,
            editor_category: null
          }
        }
      },
      {
        meta: {
          id: 'components/full_background_image',
          styleguide_path: '/styleguide/components%2Ffull_background_image',
          title: 'Full Background Image',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          include_overlay: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description:
              'Should a translucent color be placed over the image to provide better contrast?',
            related_to: null,
            editor_category: 'style',
            hidden: false
          },
          overlay_color: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: "The overlay's base color. The color is transposed to 0.5 opacity.",
            related_to: null,
            editor_type: 'color-editor',
            editor_category: 'style',
            hidden: false
          },
          format: {
            type: 'text',
            required: false,
            default: 'png',
            options: null,
            description: 'Format request for the contentful image API',
            related_to: 'elements/image',
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
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
            editor_category: 'advanced',
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
            editor_category: 'advanced',
            hidden: true
          },
          load_width: {
            type: 'number',
            required: false,
            default: 2400,
            options: null,
            description:
              'The max-width of the image when requesting from the image api. For load-speed optimization, please use a page / module-specific width.',
            related_to: 'elements/image',
            editor_category: 'advanced',
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
            editor_category: 'advanced',
            hidden: true
          },
          image_asset: {
            type: 'link',
            required: false,
            asset_types: ['image'],
            content_types: [],
            description: null,
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/guide_carousel',
          styleguide_path: '/styleguide/components%2Fguide_carousel',
          title: 'Guide Carousel',
          description: 'An adaptive carousel specifically for guide entries to populate.',
          editor_role: 'component',
          tags: ['collection'],
          extension_of: 'components/adaptive_carousel'
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          guides: {
            type: 'multi-link',
            required: false,
            default: [],
            asset_types: [],
            content_types: ['guide'],
            description: 'Please ensure each guide has a meta object.',
            related_to: null,
            editor_category: null
          }
        }
      },
      {
        meta: {
          id: 'components/guide_list_grid',
          styleguide_path: '/styleguide/components%2Fguide_list_grid',
          title: 'Guide List Grid',
          description:
            'A direct interface for loading a guide list into the split resource grid. Associated by defualt to a CTA button link to the guide page. Otherwise, a custom action component can be passed in and replace it.',
          editor_role: 'hidden',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          cta_intent: {
            type: 'text',
            required: true,
            default: 'primary',
            options: ['primary', 'secondary', 'tertiary'],
            description: 'Button intent color.',
            related_to: 'foundations/theme_colors',
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          max_items: {
            type: 'number',
            required: false,
            default: 4,
            options: null,
            description: 'The max entries from each guide to show. Excess will be hidden.',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          list_type: {
            type: 'text',
            required: false,
            default: '',
            options: ['mock', 'most-recent', 'first-list', 'second-list'],
            description:
              "The type of entries to use from each guide. 'Most recent' will display all the most recent entries.",
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
            hidden: false
          },
          guide: {
            type: 'link',
            required: false,
            asset_types: [],
            content_types: ['guide'],
            description: null,
            related_to: null,
            editor_category: null,
            hidden: false
          },
          cta_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The CTA button text to display for each guide CTA.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
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
            description:
              'An optional, custom action component which overrides the default guide CTA button.',
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/headed_list',
          styleguide_path: '/styleguide/components%2Fheaded_list',
          title: 'Headed List',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          size: {
            type: 'text',
            required: true,
            default: 'lg',
            options: ['lg', 'sm'],
            description: 'Body text size.',
            related_to: 'elements/paragraph_text',
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          bullet_style: {
            type: 'text',
            required: true,
            default: 'disc',
            options: ['disc', 'square', 'circle', 'checkmark', 'checkmark-circle-filled'],
            description: 'Select the bullet style.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          heading_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Title text',
            related_to: 'elements/heading',
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          list_markdown: {
            type: 'text',
            required: true,
            default: null,
            options: null,
            description: 'Markdown for the list items. (Use a dash - for each item)',
            related_to: 'elements/markdown_list',
            editor_type: 'markdown-editor',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/heading_body_text',
          styleguide_path: '/styleguide/components%2Fheading_body_text',
          title: 'Headed Body Text',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
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
            description: 'Typography element for the title.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          heading_stack_size: {
            type: 'text',
            required: false,
            default: 'md',
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Spacing beneath the title.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          body_typography_style: {
            type: 'text',
            required: false,
            default: 'paragraph--lg',
            options: ['lead--lg', 'lead--md', 'paragraph--lg', 'paragraph--sm'],
            description: 'Typography style for the body.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          body_stack_size: {
            type: 'text',
            required: false,
            default: 'md',
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Spacing beneath the body.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          heading_element: {
            type: 'text',
            required: false,
            default: 'h2',
            options: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'],
            description: 'Title HTML element.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
            hidden: true
          },
          body_element: {
            type: 'text',
            required: false,
            default: 'p',
            options: ['p', 'markdown'],
            description: 'Body HTML element.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
            hidden: true
          },
          heading_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Title text',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          body_text: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: 'Body text',
            related_to: null,
            editor_type: 'markdown-editor',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/icon_button',
          styleguide_path: '/styleguide/components%2Ficon_button',
          title: 'Icon Button',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          icon_size: {
            type: 'text',
            required: false,
            default: 'md',
            options: ['xxl', 'xl', 'lg', 'md', 'sm'],
            description: "Icon's size.",
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          color_token: {
            type: 'text',
            required: true,
            default: null,
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
            description: 'The color token to use.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            editor_category: 'advanced',
            hidden: true
          },
          icon_name: {
            type: 'text',
            required: true,
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
            description:
              'List of icons - please submit new icons to development for theme integration.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          href: {
            type: 'text',
            required: false,
            default: '',
            options: [
              '{{ about-company }}',
              '{{ about-team }}',
              '{{ about-values }}',
              '{{ blog }}',
              '{{ careers }}',
              '{{ customer-success-phone }}',
              '{{ features-benefits }}',
              '{{ features-compliance }}',
              '{{ features-hr }}',
              '{{ features-overview }}',
              '{{ features-payroll }}',
              '{{ features-support }}',
              '{{ get-started }}',
              '{{ help-center }}',
              '{{ homepage }}',
              '{{ justwomen }}',
              '{{ login }}',
              '{{ our-customers }}',
              '{{ partners }}',
              '{{ press }}',
              '{{ pricing }}',
              '{{ privacy-policy }}',
              '{{ product-updates }}',
              '{{ referrals }}',
              '{{ resource-center }}',
              '{{ sales-phone }}',
              '{{ terms-of-use }}'
            ],
            description:
              "If the link is external, provide a full URL (https://example.com). If internal, only provide the path ('/internal/link')",
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/iframe_reader',
          styleguide_path: '/styleguide/components%2Fiframe_reader',
          title: 'Iframe Reader Component',
          description: 'An iframe for downloadable PDF assets to be displayed on-page.',
          editor_role: 'hidden',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          src: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The iframe source url. Should be a fully qualified URL (https://...)',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/key_term_cta',
          styleguide_path: '/styleguide/components%2Fkey_term_cta',
          title: 'Key Term CTA',
          description: 'Description of component.',
          editor_role: 'hidden',
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
            editor_category: null,
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
            editor_category: null,
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
            editor_category: null,
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
            editor_category: null,
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
            editor_category: null,
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
            editor_category: null,
            hidden: false
          },
          action_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/cta_button'],
            description: null,
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/labeled_checkbox',
          styleguide_path: '/styleguide/components%2Flabeled_checkbox',
          title: 'Labeled Checkbox Component',
          description: 'A checkbox with a label.',
          editor_role: 'component',
          tags: ['form'],
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
            editor_category: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsLabeledCheckboxComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: true
          },
          stack_size: {
            type: 'text',
            required: false,
            default: 'md',
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Additional spacing beneath the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          required: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: 'Whether this input should be marked as required or not.',
            related_to: 'elements/form_label',
            editor_category: 'advanced',
            hidden: false
          },
          input_id: {
            type: 'text',
            required: false,
            default: '50caeedb-1af9-4b2b-ac88-f78fbc6a34ff',
            options: null,
            description: 'Randomly generated uuid for a form input to associate it with a label.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
            hidden: true
          },
          label_text: {
            type: 'text',
            required: false,
            default: 'Checkbox Label',
            options: null,
            description: 'The label to the right of the checkbox.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          input_config: {
            type: 'config',
            required: false,
            default: {},
            description: 'The input configuration for this styled component.',
            related_to: 'elements/text_input',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/labeled_select_input',
          styleguide_path: '/styleguide/components%2Flabeled_select_input',
          title: 'Labeled Select Dropdown',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          stack_size: {
            type: 'text',
            required: false,
            default: 'md',
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Additional spacing beneath the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          size: {
            type: 'text',
            required: false,
            default: 'default',
            options: ['default', 'sm'],
            description: 'Input size (default or small)',
            related_to: 'elements/select',
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          input_id: {
            type: 'text',
            required: false,
            default: 'debb41f5-e82a-4454-9101-8cd9eb660826',
            options: null,
            description: 'Randomly generated uuid for a form input to associate it with a label.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
            hidden: true
          },
          required: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: 'Whether this input should be marked as required or not.',
            related_to: 'elements/form_label',
            editor_category: 'advanced',
            hidden: false
          },
          label_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Label text',
            related_to: 'elements/form_label',
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          input_config: {
            type: 'config',
            required: false,
            default: {},
            description: 'The input configuration for this styled component.',
            related_to: 'elements/select',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/labeled_text_input',
          styleguide_path: '/styleguide/components%2Flabeled_text_input',
          title: 'Labeled Text Input',
          description: 'The styled elements of a form input (label, placeholder, etc)',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          stack_size: {
            type: 'text',
            required: false,
            default: 'md',
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Additional spacing beneath the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          size: {
            type: 'text',
            required: false,
            default: 'default',
            options: ['default', 'sm'],
            description: 'The input size (default or small)',
            related_to: 'elements/text_input',
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            editor_category: 'style',
            hidden: false
          },
          input_id: {
            type: 'text',
            required: false,
            default: '75799124-7395-4ab1-9c71-7ece7fe6be11',
            options: null,
            description: 'Randomly generated uuid for a form input to associate it with a label.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
            hidden: true
          },
          required: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: 'Whether this input should be marked as required or not.',
            related_to: 'elements/form_label',
            editor_category: 'advanced',
            hidden: false
          },
          label_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The label text',
            related_to: 'elements/form_label',
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          placeholder: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The placeholder text',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          input_config: {
            type: 'config',
            required: false,
            default: {},
            description: 'The input configuration for this styled component.',
            related_to: 'elements/text_input',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/limiting_small_item_row',
          styleguide_path: '/styleguide/components%2Flimiting_small_item_row',
          title: 'Small Item Limiting Row',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          sm_max: {
            type: 'number',
            required: true,
            default: 3,
            options: null,
            description: 'The number of items to show at the SM (mobile) breakpoint',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          md_max: {
            type: 'number',
            required: true,
            default: 8,
            options: null,
            description: 'The number of items to show at the MD (portrait tablet) breakpoint',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          lg_max: {
            type: 'number',
            required: true,
            default: 10,
            options: null,
            description:
              'The number of items to show at the LG (landscape tablet / desktop) breakpoint',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          xl_max: {
            type: 'number',
            required: true,
            default: 12,
            options: null,
            description: 'The number of items to show at the XL (desktop) breakpoint',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          items: {
            type: 'multi-component',
            required: false,
            hidden: false,
            default: [],
            options: ['components/pill', 'components/search_term_pill'],
            presets: [],
            description: 'The components to display.',
            related_to: null,
            editor_category: null
          }
        }
      },
      {
        meta: {
          id: 'components/mobile_nav_link_section',
          styleguide_path: '/styleguide/components%2Fmobile_nav_link_section',
          title: 'Mobile Nav Link Section',
          description: 'A collection of links specifically for the mobile nav popup modal.',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          title_link: {
            type: 'config',
            required: false,
            default: {},
            description: 'Title text',
            related_to: 'components/text_link',
            editor_category: null,
            hidden: false
          },
          links: {
            type: 'multi-config',
            required: false,
            default: [],
            description: 'Collection of links',
            related_to: 'components/text_link',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/mobile_nav_modal',
          styleguide_path: '/styleguide/components%2Fmobile_nav_modal',
          title: 'Mobile Nav Modal',
          description: 'Component for the mobile navigation menu popup',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          sections: {
            type: 'multi-component',
            required: false,
            hidden: false,
            default: [],
            options: ['components/mobile_nav_link_section'],
            presets: [],
            description: 'Collection of link sections for the modal.',
            related_to: null,
            editor_category: null
          },
          bottom_ctas: {
            type: 'multi-component',
            required: false,
            hidden: false,
            default: [],
            options: ['components/text_link', 'components/cta_button'],
            presets: [],
            description: 'Collection of CTAs for the bottom of the modal.',
            related_to: null,
            editor_category: null
          }
        }
      },
      {
        meta: {
          id: 'components/nav_dropdown',
          styleguide_path: '/styleguide/components%2Fnav_dropdown',
          title: 'Desktop Nav Dropdown',
          description:
            'The navigation dropdown menu for desktop navs. Opens on hover. If any of the links or the title link paths match the current url path, the title gets highlighted.',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          title_link: {
            type: 'config',
            required: false,
            default: {},
            description: 'The title link.',
            related_to: 'components/text_link',
            editor_category: null,
            hidden: false
          },
          links: {
            type: 'multi-config',
            required: false,
            default: [],
            description: 'The collection of links inside the menu.',
            related_to: 'components/text_link',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/pill',
          styleguide_path: '/styleguide/components%2Fpill',
          title: 'Pill',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          icon_variant: {
            type: 'text',
            required: true,
            default: 'variant',
            options: ['variant', 'accent-1', 'accent-2'],
            description: null,
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            editor_category: 'style',
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
            editor_category: 'style',
            hidden: false
          },
          href: {
            type: 'text',
            required: false,
            default: '',
            options: [
              '{{ about-company }}',
              '{{ about-team }}',
              '{{ about-values }}',
              '{{ blog }}',
              '{{ careers }}',
              '{{ customer-success-phone }}',
              '{{ features-benefits }}',
              '{{ features-compliance }}',
              '{{ features-hr }}',
              '{{ features-overview }}',
              '{{ features-payroll }}',
              '{{ features-support }}',
              '{{ get-started }}',
              '{{ help-center }}',
              '{{ homepage }}',
              '{{ justwomen }}',
              '{{ login }}',
              '{{ our-customers }}',
              '{{ partners }}',
              '{{ press }}',
              '{{ pricing }}',
              '{{ privacy-policy }}',
              '{{ product-updates }}',
              '{{ referrals }}',
              '{{ resource-center }}',
              '{{ sales-phone }}',
              '{{ terms-of-use }}'
            ],
            description:
              "If the link is external, provide a full URL (https://example.com). If internal, only provide the path ('/internal/link')",
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            editor_category: null,
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
            description:
              'List of icons - please submit new icons to development for theme integration.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
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
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/resource_search_result',
          styleguide_path: '/styleguide/components%2Fresource_search_result',
          title: 'Resource Search Result',
          description: 'Description of component.',
          editor_role: 'hidden',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          resource: {
            type: 'link',
            required: false,
            asset_types: [],
            content_types: ['blogPost'],
            description: 'The entry to display. Please ensure it has a meta object.',
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/responsive_image',
          styleguide_path: '/styleguide/components%2Fresponsive_image',
          title: 'Responsive Image',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          image_url: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'An external image URL to use.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: true
          },
          format: {
            type: 'text',
            required: false,
            default: 'png',
            options: null,
            description: 'Format request for the contentful image API',
            related_to: 'elements/image',
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
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
            editor_category: 'advanced',
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
            editor_category: 'advanced',
            hidden: true
          },
          load_width: {
            type: 'number',
            required: false,
            default: 1200,
            options: null,
            description:
              'The max-width of the image when requesting from the image api. For load-speed optimization, please use a page / module-specific width.',
            related_to: 'elements/image',
            editor_category: 'advanced',
            hidden: true
          },
          image_asset: {
            type: 'link',
            required: false,
            asset_types: ['image'],
            content_types: [],
            description:
              'The contentful asset containing the image. Please ensure the image has a description for accessibility purposes.',
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/responsive_video',
          styleguide_path: '/styleguide/components%2Fresponsive_video',
          title: 'Responsive Video',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          controlled_youtube: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description:
              'Whether or not to load this video using the controlled YouTube API wrapper. This is usually only necessary when the video is in an autoplaying carousel of other videos.',
            related_to: null,
            editor_category: 'advanced',
            hidden: true
          },
          icon_name: {
            type: 'text',
            required: true,
            default: 'play-circle-filled',
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
            description: 'The play button icon.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          image_asset: {
            type: 'link',
            required: false,
            asset_types: ['image'],
            content_types: [],
            description:
              'Alternate field for image. Overrides the image pulled from a video entry.',
            related_to: null,
            editor_category: null,
            hidden: true
          },
          video_entry: {
            type: 'link',
            required: false,
            asset_types: ['video'],
            content_types: ['video', 'resourceWrapper'],
            description:
              'The video asset to display in this component. Please ensure the video has a meta entry w/ meta_image.',
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/search_bar',
          styleguide_path: '/styleguide/components%2Fsearch_bar',
          title: 'Search Bar',
          description: 'A text input with a search icon element.',
          editor_role: 'hidden',
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
            editor_category: null,
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
            editor_category: null,
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
            editor_category: null,
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
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/search_term_grid',
          styleguide_path: '/styleguide/components%2Fsearch_term_grid',
          title: 'Search Term Grid',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          sm_max: {
            type: 'number',
            required: true,
            default: 4,
            options: null,
            description: 'The number of items to show at the SM (mobile) breakpoint',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          md_max: {
            type: 'number',
            required: true,
            default: 7,
            options: null,
            description: 'The number of items to show at the MD (portrait tablet) breakpoint',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          lg_max: {
            type: 'number',
            required: true,
            default: 8,
            options: null,
            description:
              'The number of items to show at the LG (landscape tablet / desktop) breakpoint',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          xl_max: {
            type: 'number',
            required: true,
            default: 10,
            options: null,
            description: 'The number of items to show at the XL (desktop) breakpoint',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          heading_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Title text',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          search_terms: {
            type: 'multi-component',
            required: false,
            hidden: false,
            default: [],
            options: ['components/search_term_pill'],
            presets: [],
            description: 'Collection of search pills.',
            related_to: 'components/limiting_small_item_row',
            editor_category: null
          }
        }
      },
      {
        meta: {
          id: 'components/search_term_pill',
          styleguide_path: '/styleguide/components%2Fsearch_term_pill',
          title: 'Search Term Pill',
          description:
            "A pill specifically configured for presenting search-term styles. The search-term is automatically converted into a link for our site's search page.",
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          search_type: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'seasonal'],
            description: 'Seasonal styles use a different icon and color.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
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
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/single_grid_column',
          styleguide_path: '/styleguide/components%2Fsingle_grid_column',
          title: 'Single Grid Column',
          description: 'A single column within a grid row + container.',
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
            editor_category: null,
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
            editor_category: null,
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
            editor_category: 'style',
            hidden: false
          },
          disabled: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: 'Disables the grid and instead renders the gridless content.',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/single_text_inline_form',
          styleguide_path: '/styleguide/components%2Fsingle_text_inline_form',
          title: 'Single Text Inline Form',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          cta_intent: {
            type: 'text',
            required: true,
            default: 'primary',
            options: ['primary', 'secondary', 'tertiary'],
            description: 'Button intent color.',
            related_to: 'foundations/theme_colors',
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          connected_inline: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description:
              'Whether to stylistically connect the submit button to the text input inline or not. Otherwise, elements will stack.',
            related_to: null,
            editor_category: 'style',
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
            editor_category: 'style',
            hidden: false
          },
          size: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'sm'],
            description: 'The size of the buttons and inputs (default / small)',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          form_location: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description:
              'Put a specific page location (footer, body, hero, etc) here for Google Analytics tracking dimensions.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
            hidden: false
          },
          submit_actions: {
            editor_category: 'advanced',
            type: 'submit-action',
            default: '[]',
            required: false,
            description:
              'Conditional actions (such as redirects, special events) to perform after the user submits the form.'
          },
          input_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/labeled_text_input'],
            description: null,
            related_to: null,
            editor_category: null,
            hidden: false
          },
          button_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Submit button text.',
            related_to: 'components/cta_button',
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          hidden_fields: {
            type: 'multi-config',
            required: false,
            default: [],
            description: 'Hidden fields for passing essential pardot data.',
            related_to: 'elements/text_input',
            editor_category: null,
            hidden: false
          },
          form_config: {
            type: 'config',
            required: false,
            default: {},
            description: 'Data object for configuring a form element.',
            related_to: 'elements/form',
            editor_category: null,
            hidden: false
          },
          post_submit_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/headed_list'],
            description:
              'The component that replaces the form after its submitted. If none provided, a default "Thank you" message will appear.',
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/social_icon_row',
          styleguide_path: '/styleguide/components%2Fsocial_icon_row',
          title: 'Social Icon Row',
          description: 'A row of social icons and links.',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          icon_size: {
            type: 'text',
            required: false,
            default: 'md',
            options: ['xxl', 'xl', 'lg', 'md', 'sm'],
            description: 'Icon size',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          theme_token: {
            type: 'text',
            required: true,
            default: 'variant',
            options: ['variant'],
            description: 'Color token for the icons.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            description: 'The name of each icon.',
            related_to: null,
            editor_category: null,
            hidden: false
          },
          icon_urls: {
            type: 'multi-text',
            required: false,
            default: [],
            options: null,
            description: 'The corresponding URL for each icon.',
            related_to: null,
            editor_category: null,
            hidden: false
          },
          action_icons: {
            type: 'multi-component',
            required: false,
            hidden: false,
            default: [],
            options: ['components/icon_button', 'components/button_modal'],
            presets: [
              {
                name: 'Icon Link',
                component_id: 'components/icon_button',
                properties: {
                  href: '/',
                  icon_size: 'md',
                  icon_name: 'mail',
                  color_token: 'variant'
                }
              }
            ],
            description:
              'Link an icon component to appear in the row. Icons can perform different actions such as link, open modals, etc.',
            related_to: null,
            editor_category: null
          }
        }
      },
      {
        meta: {
          id: 'components/split_form_inputs',
          styleguide_path: '/styleguide/components%2Fsplit_form_inputs',
          title: 'Split Form Inputs',
          description: 'Two text input fields split onto the same line. Ex: First Name / Last Name',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          stack_size: {
            type: 'text',
            required: false,
            default: 'md',
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Additional spacing beneath the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          left_input: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/labeled_text_input'],
            description: 'The left input.',
            related_to: null,
            editor_category: null,
            hidden: false
          },
          right_input: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/labeled_text_input'],
            description: 'The right input.',
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/stacked_hero_text',
          styleguide_path: '/styleguide/components%2Fstacked_hero_text',
          title: 'Stacked Hero Text',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          alignment: {
            type: 'text',
            required: false,
            default: 'left',
            options: ['left', 'center'],
            description: 'Text or component alignment. Blank defaults to left.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          label_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Text for the label at the very top.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
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
            editor_category: null,
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
            editor_category: null,
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
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/static_image_thumbnail',
          styleguide_path: '/styleguide/components%2Fstatic_image_thumbnail',
          title: 'Static Image Thumbnail Component',
          description:
            'A small image thumbnail w/ a circular (or rectangular) frame. Best if used with square images.',
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
            editor_category: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'ComponentsStaticImageThumbnailComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: true
          },
          image_url: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'An external image URL to use.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: true
          },
          format: {
            type: 'text',
            required: false,
            default: 'png',
            options: null,
            description: 'Format request for the contentful image API',
            related_to: 'elements/image',
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
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
            editor_category: 'advanced',
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
            editor_category: 'advanced',
            hidden: true
          },
          load_width: {
            type: 'number',
            required: false,
            default: 120,
            options: null,
            description:
              'The max-width of the image when requesting from the image api. For load-speed optimization, please use a page / module-specific width.',
            related_to: 'elements/image',
            editor_category: 'advanced',
            hidden: true
          },
          size: {
            type: 'text',
            required: true,
            default: 'xxl',
            options: ['lg', 'xl', 'xxl'],
            description: 'The size (height/width) of the thumbnail',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          frame_style: {
            type: 'text',
            required: true,
            default: 'circular',
            options: ['circular', 'soft'],
            description: 'The border radius style -- circular or rectangular w/ soft edges.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          stack_size: {
            type: 'text',
            required: false,
            default: null,
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Additional spacing beneath the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          image_asset: {
            type: 'link',
            required: false,
            asset_types: ['image'],
            content_types: [],
            description:
              'The contentful asset containing the image. Please ensure the image has a description for accessibility purposes. Please use a square image.',
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/text_link',
          styleguide_path: '/styleguide/components%2Ftext_link',
          title: 'Text Link',
          description: 'An HTML text link with configurable properties.',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          stack_size: {
            type: 'text',
            required: false,
            default: null,
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Additional spacing beneath the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          color_token: {
            type: 'text',
            required: true,
            default: 'text-link',
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
            description: 'The color token to use.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            description: 'The typography type of the link.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          style: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Custom CSS',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: true
          },
          data: {
            type: 'json',
            required: false,
            default: {},
            description: 'HTML dataset info applied to content_tag',
            related_to: null,
            editor_category: 'advanced',
            hidden: true
          },
          href: {
            type: 'text',
            required: false,
            default: '',
            options: [
              '{{ about-company }}',
              '{{ about-team }}',
              '{{ about-values }}',
              '{{ blog }}',
              '{{ careers }}',
              '{{ customer-success-phone }}',
              '{{ features-benefits }}',
              '{{ features-compliance }}',
              '{{ features-hr }}',
              '{{ features-overview }}',
              '{{ features-payroll }}',
              '{{ features-support }}',
              '{{ get-started }}',
              '{{ help-center }}',
              '{{ homepage }}',
              '{{ justwomen }}',
              '{{ login }}',
              '{{ our-customers }}',
              '{{ partners }}',
              '{{ press }}',
              '{{ pricing }}',
              '{{ privacy-policy }}',
              '{{ product-updates }}',
              '{{ referrals }}',
              '{{ resource-center }}',
              '{{ sales-phone }}',
              '{{ terms-of-use }}'
            ],
            description:
              "If the link is external, provide a full URL (https://example.com). If internal, only provide the path ('/internal/link')",
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            editor_category: null,
            hidden: false
          },
          link_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The text for this link. Supports raw HTML for rare use-cases.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          link_config: {
            type: 'config',
            required: false,
            default: {},
            description: 'Use a config object to provide data.',
            related_to: 'components/text_link',
            editor_category: null,
            hidden: true
          }
        }
      },
      {
        meta: {
          id: 'components/utility_button',
          styleguide_path: '/styleguide/components%2Futility_button',
          title: 'Utility Button',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          icon_side: {
            type: 'text',
            required: true,
            default: 'left',
            options: ['left', 'right'],
            description: 'Which side of the button the icon should appear on.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          size: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'sm'],
            description: "The button's size (default or small)",
            related_to: 'foundations/inset_shapes',
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          color_token: {
            type: 'text',
            required: true,
            default: 'variant',
            options: ['variant', 'text-link'],
            description: 'The color token to use.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          href: {
            type: 'text',
            required: false,
            default: '',
            options: [
              '{{ about-company }}',
              '{{ about-team }}',
              '{{ about-values }}',
              '{{ blog }}',
              '{{ careers }}',
              '{{ customer-success-phone }}',
              '{{ features-benefits }}',
              '{{ features-compliance }}',
              '{{ features-hr }}',
              '{{ features-overview }}',
              '{{ features-payroll }}',
              '{{ features-support }}',
              '{{ get-started }}',
              '{{ help-center }}',
              '{{ homepage }}',
              '{{ justwomen }}',
              '{{ login }}',
              '{{ our-customers }}',
              '{{ partners }}',
              '{{ press }}',
              '{{ pricing }}',
              '{{ privacy-policy }}',
              '{{ product-updates }}',
              '{{ referrals }}',
              '{{ resource-center }}',
              '{{ sales-phone }}',
              '{{ terms-of-use }}'
            ],
            description:
              "If the link is external, provide a full URL (https://example.com). If internal, only provide the path ('/internal/link')",
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            editor_category: null,
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
            description:
              'List of icons - please submit new icons to development for theme integration.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          button_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: "The button's text",
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'components/webinar_event_list_item',
          styleguide_path: '/styleguide/components%2Fwebinar_event_list_item',
          title: 'Webinar Event List Item',
          description:
            'List item for a webinar event, including a link to the webinar recording video when the date is passed.',
          editor_role: 'component',
          tags: ['collection', 'event', 'events-page'],
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          event: {
            type: 'link',
            required: false,
            asset_types: [],
            content_types: ['event'],
            description:
              'The event contentful entry. The event status will determine the CTA text. The component will automatically render the date or any passed-event notifications.',
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'elements/display_text',
          styleguide_path: '/styleguide/elements%2Fdisplay_text',
          title: 'Display Text',
          description: 'Typography element.',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          alignment: {
            type: 'text',
            required: false,
            default: null,
            options: ['left', 'center'],
            description: 'Text or component alignment. Blank defaults to left.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          stack_size: {
            type: 'text',
            required: false,
            default: 'lg',
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Additional spacing beneath the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            editor_category: 'style',
            hidden: false
          },
          color_token: {
            type: 'text',
            required: true,
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
            description: 'The color token to use.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          max_width: {
            type: 'text',
            required: false,
            default: null,
            options: ['narrow', 'default', 'jumbo'],
            description: 'The max width of the container.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            editor_category: 'advanced',
            hidden: false
          },
          editable: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            editor_category: 'advanced',
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
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'elements/form',
          styleguide_path: '/styleguide/elements%2Fform',
          title: 'Base Form',
          description: 'A base form element which can be configured to submit to any endpoint.',
          editor_role: 'config-object',
          tags: ['form'],
          config_template: [
            'form_endpoint',
            'pardot_endpoint',
            'form_name',
            'open_new_tab',
            'redirect_url'
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          open_new_tab: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: 'Whether or not the redirect_url should open in a new tab.',
            related_to: null,
            editor_category: 'advanced',
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
            editor_category: 'advanced',
            hidden: true
          },
          submit_actions: {
            editor_category: 'advanced',
            type: 'submit-action',
            default: '[]',
            required: false,
            description:
              'Conditional actions (such as redirects, special events) to perform after the user submits the form.'
          },
          post_submit_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/headed_list'],
            description:
              'The component that should replace the form once a successful submission is made. Recommended if opening a redirect in a new tab or not providing any redirect.',
            related_to: null,
            editor_category: null,
            hidden: false
          },
          form_name: {
            type: 'text',
            required: false,
            default: '',
            options: ['Blog Resource Download', 'Get The Guide', 'Newsletter Subscribe', 'test'],
            description: 'The name to use for tracking subissions in google analytics.',
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            editor_category: null,
            hidden: false
          },
          form_location: {
            type: 'text',
            required: false,
            default: '',
            options: ['footer', 'hero', 'page body'],
            description:
              'Put a specific page location (footer, body, hero, etc) here for Google Analytics tracking dimensions.',
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            editor_category: null,
            hidden: false
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
            editor_category: null,
            hidden: false
          },
          pardot_endpoint: {
            type: 'text',
            required: false,
            default: '',
            options: [
              '{{ Email The Article }}',
              '{{ Get Started }}',
              '{{ Get The Guide }}',
              '{{ Lead Form }}',
              '{{ Newsletter Subscribe }}',
              '{{ Resource Download }}'
            ],
            description:
              'The form handler url if this form submits to pardot. If form_endpoint present, submits here last.',
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            editor_category: null,
            hidden: false
          },
          redirect_url: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description:
              'The link (such as a thank-you page) to redirect after form submission. Add the token {{ form_fields }} to the end of the url to include the form fields in the redirect. (ex: "/thank-you {{ form_fields }}" will transform into /thank-you?email=..." ',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'elements/heading',
          styleguide_path: '/styleguide/elements%2Fheading',
          title: 'Heading Text',
          description: 'Typography element.',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          alignment: {
            type: 'text',
            required: false,
            default: null,
            options: ['left', 'center'],
            description: 'Text or component alignment. Blank defaults to left.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          stack_size: {
            type: 'text',
            required: false,
            default: null,
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Additional spacing beneath the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            editor_category: 'style',
            hidden: false
          },
          color_token: {
            type: 'text',
            required: true,
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
            description: 'The color token to use.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          max_width: {
            type: 'text',
            required: false,
            default: null,
            options: ['narrow', 'default', 'jumbo'],
            description: 'The max width of the container.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            editor_category: 'advanced',
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
            editor_category: 'advanced',
            hidden: false
          },
          editable: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            editor_category: 'advanced',
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
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'elements/lead_text',
          styleguide_path: '/styleguide/elements%2Flead_text',
          title: 'Lead Text',
          description: 'Typography element.',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          alignment: {
            type: 'text',
            required: false,
            default: null,
            options: ['left', 'center'],
            description: 'Text or component alignment. Blank defaults to left.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          stack_size: {
            type: 'text',
            required: false,
            default: 'lg',
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Additional spacing beneath the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            editor_category: 'style',
            hidden: false
          },
          color_token: {
            type: 'text',
            required: true,
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
            description: 'The color token to use.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          max_width: {
            type: 'text',
            required: false,
            default: null,
            options: ['narrow', 'default', 'jumbo'],
            description: 'The max width of the container.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            editor_category: 'advanced',
            hidden: false
          },
          editable: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            editor_category: 'advanced',
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
            editor_category: null,
            hidden: false
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          style: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Inline style',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            editor_category: 'advanced',
            hidden: false
          },
          data: {
            type: 'json',
            required: false,
            default: {},
            description: 'HTML dataset info applied to content_tag',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          href: {
            type: 'text',
            required: false,
            default: '',
            options: [
              '{{ about-company }}',
              '{{ about-team }}',
              '{{ about-values }}',
              '{{ blog }}',
              '{{ careers }}',
              '{{ customer-success-phone }}',
              '{{ features-benefits }}',
              '{{ features-compliance }}',
              '{{ features-hr }}',
              '{{ features-overview }}',
              '{{ features-payroll }}',
              '{{ features-support }}',
              '{{ get-started }}',
              '{{ help-center }}',
              '{{ homepage }}',
              '{{ justwomen }}',
              '{{ login }}',
              '{{ our-customers }}',
              '{{ partners }}',
              '{{ press }}',
              '{{ pricing }}',
              '{{ privacy-policy }}',
              '{{ product-updates }}',
              '{{ referrals }}',
              '{{ resource-center }}',
              '{{ sales-phone }}',
              '{{ terms-of-use }}'
            ],
            description:
              "If the link is external, provide a full URL (https://example.com). If internal, only provide the path ('/internal/link')",
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            editor_category: null,
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          align_top: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description:
              'Whether the modal content should be aligned to the top instead of center.',
            related_to: null,
            editor_category: 'style',
            hidden: false
          },
          id: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'ID attribute if needed for targeting.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
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
            editor_category: 'advanced',
            hidden: false
          },
          modal_component: {
            type: 'component',
            required: false,
            default: null,
            options: [],
            description: 'Renders any component inside the modal.',
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'elements/paragraph_text',
          styleguide_path: '/styleguide/elements%2Fparagraph_text',
          title: 'Paragraph Text',
          description: 'Typography element.',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          stack_size: {
            type: 'text',
            required: false,
            default: null,
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Additional spacing beneath the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          alignment: {
            type: 'text',
            required: false,
            default: null,
            options: ['left', 'center'],
            description: 'Text or component alignment. Blank defaults to left.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            editor_category: 'style',
            hidden: false
          },
          color_token: {
            type: 'text',
            required: true,
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
            description: 'The color token to use.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          max_width: {
            type: 'text',
            required: false,
            default: null,
            options: ['narrow', 'default', 'jumbo'],
            description: 'The max width of the container.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            editor_category: 'advanced',
            hidden: false
          },
          editable: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            editor_category: 'advanced',
            hidden: true
          },
          text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The copy (text or markdown)',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          component_class: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description:
              'The Javascript class name of the react component. All react components should be located in frontend/javascripts/components/...',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          props: {
            type: 'json',
            required: false,
            default: {},
            description:
              'Pass in a ruby hash of props which will then be accessible within the react component.',
            hidden: true,
            editor_category: null
          }
        }
      },
      {
        meta: {
          id: 'elements/select',
          styleguide_path: '/styleguide/elements%2Fselect',
          editor_role: 'singleton',
          title: 'Select Dropdown',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          size: {
            type: 'text',
            required: false,
            default: 'default',
            options: ['default', 'sm'],
            description: 'The input size (default, small)',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          input_id: {
            type: 'text',
            required: false,
            default: 'b0f19bfe-b7dc-48a7-8467-ba3e0316dc0d',
            options: null,
            description: 'Randomly generated uuid for a form input to associate it with a label.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
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
            editor_category: 'advanced',
            hidden: true
          },
          name: {
            type: 'text',
            required: false,
            default: '',
            options: [
              'blog_default_hubspot_blog_subscription',
              'company',
              'current_payroll_provider',
              'email',
              'email_the_article_cta',
              'firstname',
              'lastname',
              'learn_about_justworks',
              'lifecyclestage',
              'most_recent_guide_download_name',
              'most_recent_guide_download_url',
              'numemployees',
              'pageURL',
              'phone',
              'wantshealthcare'
            ],
            description: "The input name (must match pardot's 'External Field' ID.",
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            editor_category: 'advanced',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          }
        }
      },
      {
        meta: {
          id: 'elements/system_text',
          styleguide_path: '/styleguide/elements%2Fsystem_text',
          title: 'System Text',
          description: 'Typography element.',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          stack_size: {
            type: 'text',
            required: false,
            default: null,
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Additional spacing beneath the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          size: {
            type: 'text',
            required: true,
            default: 'lg',
            options: ['lg', 'md', 'sm'],
            description: null,
            related_to: 'foundations/typography_base',
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          color_token: {
            type: 'text',
            required: true,
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
            description: 'The color token to use.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            editor_category: 'advanced',
            hidden: false
          },
          editable: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            editor_category: 'advanced',
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
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'elements/text_input',
          styleguide_path: '/styleguide/elements%2Ftext_input',
          editor_role: 'singleton',
          title: 'Text Input',
          tags: ['form'],
          config_template: ['type', 'validation_type', 'name', 'default_value']
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
            editor_category: null,
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
            editor_category: null,
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
            editor_category: 'style',
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
            editor_category: 'style',
            hidden: false
          },
          input_id: {
            type: 'text',
            required: false,
            default: 'e91a625c-1bf4-4b8d-bccb-86b67342d74b',
            options: null,
            description: 'Randomly generated uuid for a form input to associate it with a label.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
            hidden: true
          },
          required: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: 'Whether or not this input is required before submission.',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          type: {
            type: 'text',
            required: true,
            default: 'text',
            options: ['text', 'date', 'tel', 'email', 'password', 'checkbox', 'hidden'],
            description: 'Text input type.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
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
            editor_category: 'advanced',
            hidden: false
          },
          name: {
            type: 'text',
            required: false,
            default: '',
            options: [
              'blog_default_hubspot_blog_subscription',
              'company',
              'current_payroll_provider',
              'email',
              'email_the_article_cta',
              'firstname',
              'lastname',
              'learn_about_justworks',
              'lifecyclestage',
              'most_recent_guide_download_name',
              'most_recent_guide_download_url',
              'numemployees',
              'pageURL',
              'phone',
              'wantshealthcare'
            ],
            description: "The input name (must match pardot's 'External Field' ID.",
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            editor_category: 'advanced',
            hidden: false
          },
          autofocus: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: null,
            related_to: null,
            editor_category: 'advanced',
            hidden: true
          },
          placeholder: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Input placeholder text',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          input_config: {
            type: 'config',
            required: false,
            default: {},
            description: 'Use a config object to provide data.',
            related_to: 'elements/text_input',
            editor_category: null,
            hidden: false
          },
          default_value: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description:
              'The default input value which is prefilled when the page loads. Use {{ page_url }} to use the page url as a value.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/algolia_search_results',
          styleguide_path: '/styleguide/patterns%2Falgolia_search_results',
          title: 'Algolia Search Results Pattern',
          description: 'The search filterable search results container.',
          editor_role: 'hidden',
          tags: ['collection', 'resource-center'],
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          }
        }
      },
      {
        meta: {
          id: 'patterns/article_content',
          styleguide_path: '/styleguide/patterns%2Farticle_content',
          title: 'Article Content Pattern',
          description:
            'Shared pattern for article content including fine print. Can be configured for various widths and has an optional grid layout provided to provide usage flexibility.',
          editor_role: 'hidden',
          tags: ['text', 'blog-post', 'resource-center'],
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
            editor_category: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsArticleContentComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: true
          },
          provide_grid: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: true,
            description:
              'Includes a single-column grid structure by default. Disable this in order to render as a gridless component.',
            related_to: null,
            editor_category: 'style',
            hidden: true
          },
          width: {
            type: 'text',
            required: false,
            default: '',
            options: ['default', 'video-page'],
            description: 'Custom content width. Default takes the width of its container.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          content: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: null,
            related_to: null,
            editor_type: 'markdown-editor',
            editor_category: null,
            hidden: false
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description:
              "Select 'Page' if this pattern should match the page's light/dark mode setting. Otherwise, override with 'light' or 'dark' specifically for this component.",
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description:
              'Select the amount of spacing to apply to the top and bottom of this page section.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/background_image_single_split',
          styleguide_path: '/styleguide/patterns%2Fbackground_image_single_split',
          title: 'Background Image Single Content Section',
          description:
            'Page content containing a full background image and a single left or right slot for a marketing component.',
          editor_role: 'pattern',
          tags: ['media', 'image', 'landing-page']
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description:
              "Select 'Page' if this pattern should match the page's light/dark mode setting. Otherwise, override with 'light' or 'dark' specifically for this component.",
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xxxxl',
            options: ['xl', 'xxxxl'],
            description:
              'Select the amount of spacing to apply to the top and bottom of this page section.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          split_alignment: {
            type: 'text',
            required: true,
            default: 'right',
            options: ['left', 'right'],
            description:
              'Whether the single content section should align to the left or the right of this section.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          include_overlay: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description:
              'Should a translucent color be placed over the image to provide better contrast?',
            related_to: null,
            editor_category: 'style',
            hidden: false
          },
          overlay_color: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description: "The overlay's base color. The color is transposed to 0.5 opacity.",
            related_to: null,
            editor_type: 'color-editor',
            editor_category: 'style',
            hidden: false
          },
          background_image: {
            type: 'link',
            required: true,
            asset_types: ['image'],
            content_types: [],
            description: 'The background image asset',
            related_to: 'components/full_background_image',
            editor_category: null,
            hidden: false
          },
          split_component: {
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
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/bordered_content_cta_box',
          styleguide_path: '/styleguide/patterns%2Fbordered_content_cta_box',
          title: 'Bordered CTA Box',
          description:
            'A bordered box containing a text component on the left and a button or form on the right.',
          editor_role: 'pattern',
          tags: ['action', 'form'],
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description:
              "Select 'Page' if this pattern should match the page's light/dark mode setting. Otherwise, override with 'light' or 'dark' specifically for this component.",
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description:
              'Select the amount of spacing to apply to the top and bottom of this page section.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          provide_grid: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: true,
            description:
              'Includes a single-column grid structure by default. Disable this in order to render as a gridless component.',
            related_to: null,
            editor_category: 'style',
            hidden: true
          },
          content_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/heading_body_text', 'components/key_term_cta'],
            description: 'The text content on the left side of this box.',
            related_to: null,
            editor_category: null,
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
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/bordered_cta_entry_box',
          styleguide_path: '/styleguide/patterns%2Fbordered_cta_entry_box',
          title: 'Bordered CTA Box (BlogCTA)',
          description:
            'A Bordered CTA Content Box specifically for the BlogCTA Content Type. When gated, a pre-built form pops up for the user to submit their information before downloading. Gated currently only works for BlogCTAs with Files, not URLS.',
          editor_role: 'hidden',
          tags: ['action', 'cta-module', 'resource-center'],
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description:
              'Select the amount of spacing to apply to the top and bottom of this page section.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          provide_grid: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: true,
            description:
              'Includes a single-column grid structure by default. Disable this in order to render as a gridless component.',
            related_to: null,
            editor_category: 'style',
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
            editor_category: 'advanced',
            hidden: false
          },
          cta_entry: {
            type: 'link',
            required: true,
            asset_types: [],
            content_types: ['blogCta'],
            description:
              "Requires a BlogCta entry with a file attachment. The 'Text' field in this entry will determine the CTA text.",
            related_to: null,
            editor_category: null,
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
            editor_category: null,
            hidden: true
          }
        }
      },
      {
        meta: {
          id: 'patterns/composable_lp_hero',
          styleguide_path: '/styleguide/patterns%2Fcomposable_lp_hero',
          title: 'Composable Lp Hero Pattern',
          description: 'A centered hero containing text elements only.',
          editor_role: 'pattern',
          tags: ['hero', 'modular', 'landing-page'],
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description:
              "Select 'Page' if this pattern should match the page's light/dark mode setting. Otherwise, override with 'light' or 'dark' specifically for this component.",
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          background_color_token: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'variant'],
            description: 'Select the background color token to use within the light/dark modes.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description:
              'Select the amount of spacing to apply to the top and bottom of this page section.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          stack_size: {
            type: 'text',
            required: false,
            default: null,
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            description: 'Additional spacing beneath the component.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          max_width: {
            type: 'text',
            required: false,
            default: null,
            options: ['narrow', 'default', 'jumbo'],
            description: 'The max width of the container.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          hero_components: {
            type: 'multi-component',
            required: false,
            hidden: false,
            default: [],
            options: [
              'components/single_text_inline_form',
              'components/cta_button',
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
                  max_width: 'default',
                  alignment: 'center',
                  size: 'xxs',
                  stack_size: 'lg',
                  color_token: 'default',
                  text: 'Overline Text',
                  element: 'p'
                }
              },
              {
                name: 'Title (display)',
                component_id: 'elements/display_text',
                properties: {
                  max_width: 'default',
                  alignment: 'center',
                  size: 'secondary',
                  stack_size: 'md',
                  color_token: 'variant',
                  text: 'Title Text'
                }
              },
              {
                name: 'Title (heading)',
                component_id: 'elements/heading',
                properties: {
                  max_width: 'default',
                  alignment: 'center',
                  size: 'xl',
                  stack_size: 'md',
                  color_token: 'variant',
                  text: 'Title Text'
                }
              },
              {
                name: 'Body (lead)',
                component_id: 'elements/lead_text',
                properties: {
                  max_width: 'jumbo',
                  alignment: 'center',
                  size: 'md',
                  stack_size: null,
                  color_token: 'default',
                  text: 'Body Text'
                }
              },
              {
                name: 'Short Form',
                component_id: 'components/single_text_inline_form',
                properties: {
                  connected_inline: true,
                  cta_intent: 'tertiary',
                  button_text: 'Submit',
                  size: 'default'
                }
              }
            ],
            description: 'Composable section for the hero elements you wish to add.',
            related_to: null,
            editor_category: null
          }
        }
      },
      {
        meta: {
          id: 'patterns/content_split',
          styleguide_path: '/styleguide/patterns%2Fcontent_split',
          title: 'Split Content Section',
          description:
            'A pattern containing 2 components side by side. If an image is on the right side, it wraps to the top on mobile.',
          editor_role: 'pattern',
          tags: ['modular', 'image', 'video', 'text', 'form'],
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description:
              "Select 'Page' if this pattern should match the page's light/dark mode setting. Otherwise, override with 'light' or 'dark' specifically for this component.",
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          background_color_token: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'variant'],
            description: 'Select the background color token to use within the light/dark modes.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description:
              'Select the amount of spacing to apply to the top and bottom of this page section.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          title_section_alignment: {
            type: 'text',
            required: true,
            default: 'center',
            options: ['left', 'center'],
            description:
              'Aligns the title section to the left or center of the page. Individual text elements may still need to be aligned correctly.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          vertical_alignment: {
            type: 'text',
            required: false,
            default: 'center',
            options: ['center', 'top', 'stretch'],
            description:
              'Whether the vertical alignment of the content should be centered, top, or stretched.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          title_components: {
            type: 'multi-component',
            required: false,
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
            related_to: null,
            editor_category: null
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
            editor_category: null,
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
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/filterable_search_results',
          styleguide_path: '/styleguide/patterns%2Ffilterable_search_results',
          title: 'Filterable Search Results',
          description: 'A list of resources returned from a search.',
          editor_role: 'hidden',
          tags: ['collection', 'resource-center', 'resource-wrapper'],
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
            editor_category: null,
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
            editor_category: null,
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
            editor_category: null,
            hidden: false
          },
          resources: {
            type: 'multi-link',
            required: false,
            default: [],
            asset_types: [],
            content_types: ['blogPost'],
            description: null,
            related_to: null,
            editor_category: null
          }
        }
      },
      {
        meta: {
          id: 'patterns/grid_presentation',
          styleguide_path: '/styleguide/patterns%2Fgrid_presentation',
          title: 'Presentation Section',
          description:
            'A section for repeating-item components such as logos, short text collections, etc. Supports multiple layouts such as carousels and grids. Optional CTA at the bottom.',
          editor_role: 'pattern',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description:
              "Select 'Page' if this pattern should match the page's light/dark mode setting. Otherwise, override with 'light' or 'dark' specifically for this component.",
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          background_color_token: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'variant'],
            description: 'Select the background color token to use within the light/dark modes.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description:
              'Select the amount of spacing to apply to the top and bottom of this page section.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          title_section_alignment: {
            type: 'text',
            required: true,
            default: 'left',
            options: ['left', 'center'],
            description:
              'Aligns the title section to the left or center of the page. Individual text elements may still need to be aligned correctly.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          divider: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: 'Should a dividing line be added at the bottom?',
            related_to: null,
            editor_category: null,
            hidden: false
          },
          title_components: {
            type: 'multi-component',
            required: false,
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
                  alignment: 'left',
                  size: 'xxs',
                  stack_size: 'lg',
                  color_token: 'default',
                  text: 'Overline Text',
                  element: 'p'
                }
              },
              {
                name: 'Title',
                component_id: 'elements/heading',
                properties: {
                  max_width: 'default',
                  alignment: 'left',
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
                  max_width: 'jumbo',
                  alignment: 'left',
                  size: 'md',
                  stack_size: 'xl',
                  color_token: 'default',
                  text: 'Body Text'
                }
              }
            ],
            description: 'Optional, composable section for the title elements you wish to add.',
            related_to: null,
            editor_category: null
          },
          content_component: {
            type: 'component',
            required: true,
            default: null,
            options: [
              'components/guide_carousel',
              'components/adaptive_carousel',
              'components/dropdown_curated_guide_lists',
              'components/featured_video_resource_showcase',
              'components/card_resource_showcase_section',
              'components/adaptive_column_grid'
            ],
            description: 'The presentation layout \u0026 style for this pattern.',
            related_to: null,
            editor_category: null,
            hidden: false
          },
          cta_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/cta_button', 'components/button_modal'],
            description: 'CTA button component for the bottom of the section.',
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/hero_double_stack',
          styleguide_path: '/styleguide/patterns%2Fhero_double_stack',
          title: 'Double Stack hero',
          description:
            'A hero pattern comprised of a text stack and a configurable zone for another pattern beneath it.',
          editor_role: 'hidden',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description:
              "Select 'Page' if this pattern should match the page's light/dark mode setting. Otherwise, override with 'light' or 'dark' specifically for this component.",
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            editor_category: 'style',
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
            editor_category: null,
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
            editor_category: null,
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
            editor_category: null,
            hidden: false
          },
          bottom_pattern: {
            type: 'component',
            required: true,
            default: null,
            options: ['patterns/background_image_single_split', 'patterns/content_split'],
            description: null,
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/navigation_bar',
          styleguide_path: '/styleguide/patterns%2Fnavigation_bar',
          title: 'Navigation Bar',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description:
              "Select 'Page' if this pattern should match the page's light/dark mode setting. Otherwise, override with 'light' or 'dark' specifically for this component.",
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          sticky: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description:
              'Whether or not the nav should stick to the top of the screen when scrolling.',
            related_to: null,
            editor_category: 'style',
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
            editor_category: 'advanced',
            hidden: false
          },
          center_logo: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/company_logo'],
            description: 'Specific field for a centered logo.',
            related_to: null,
            editor_category: null,
            hidden: false
          },
          left_items: {
            type: 'multi-component',
            required: false,
            hidden: false,
            default: [],
            options: [
              'components/mobile_nav_modal',
              'components/nav_dropdown',
              'components/text_link',
              'components/cta_button'
            ],
            presets: [],
            description: 'For components on the left side of the navbar.',
            related_to: null,
            editor_category: null
          },
          right_items: {
            type: 'multi-component',
            required: false,
            hidden: false,
            default: [],
            options: [
              'components/text_link',
              'components/cta_button',
              'components/nav_dropdown',
              'components/algolia_search_bar'
            ],
            presets: [],
            description: 'For components on the right side of the navbar.',
            related_to: null,
            editor_category: null
          },
          right_items_mobile: {
            type: 'multi-component',
            required: false,
            hidden: true,
            default: [],
            options: ['components/text_link', 'components/cta_button', 'components/nav_dropdown'],
            presets: [],
            description:
              "Only use this in a mobile navbar for swapping a different element in at mobile view, such as the very specific 'Get Started' button changing to 'Start' at the SM breakpoint. Items appearing at MD breakpoint go into regular 'right items' property.",
            related_to: null,
            editor_category: null
          },
          top_items: {
            type: 'multi-config',
            required: false,
            default: [],
            description:
              'List of nav links to appear in the mobile top bar. Only use this if this is a mobile nav.',
            related_to: 'components/text_link',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/navigation_footer',
          styleguide_path: '/styleguide/patterns%2Fnavigation_footer',
          title: 'Navigation Footer',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          is_mobile: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description:
              'Whether or not this entry appears on mobile (SM, MD) breakpoints or otherwise appears on desktop (LG, XL).',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          column_components: {
            type: 'multi-component',
            required: false,
            hidden: false,
            default: [],
            options: ['components/footer_link_collection'],
            presets: [],
            description: 'Collection of components for the top of the footer.',
            related_to: null,
            editor_category: null
          },
          bottom_section: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/footer_three_column_section'],
            description: 'Section above the fine print. Usually for newletter subscribe form.',
            related_to: null,
            editor_category: null,
            hidden: false
          },
          fine_print: {
            type: 'text',
            required: false,
            default: null,
            options: null,
            description:
              'Markdown formatted text at the very bottom of the footer. Use {{ current_year }} token to automatically insert the current year.',
            related_to: null,
            editor_type: 'markdown-editor',
            editor_category: null,
            hidden: false
          },
          social_icons_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/social_icon_row'],
            description:
              'These go inside the fine print section on desktop footers. Otherwise, they go at the top of the footer on mobile footers.',
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/resource_article',
          styleguide_path: '/styleguide/patterns%2Fresource_article',
          title: 'Resource Article',
          description:
            'The full article experience composed from a resource content type. Includes the hero, table of contents, content, and progress bar.',
          editor_role: 'hidden',
          tags: ['text', 'resource-center', 'resource-wrapper'],
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          resource: {
            type: 'link',
            required: false,
            asset_types: [],
            content_types: ['resourceWrapper'],
            description:
              'Add the resource to include category \u0026 glossary information into the hero and table of contents. Optional.',
            related_to: null,
            editor_category: null,
            hidden: false
          },
          article: {
            type: 'link',
            required: true,
            asset_types: [],
            content_types: ['blogPost'],
            description: 'Should work with any blog article entry.',
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/resource_hero',
          styleguide_path: '/styleguide/patterns%2Fresource_hero',
          title: 'Resource Hero',
          description: 'A left aligned hero with breadcrumbs and social icons.',
          editor_role: 'hidden',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description:
              "Select 'Page' if this pattern should match the page's light/dark mode setting. Otherwise, override with 'light' or 'dark' specifically for this component.",
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          background_color_token: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'variant'],
            description: 'Select the background color token to use within the light/dark modes.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description:
              'Select the amount of spacing to apply to the top and bottom of this page section.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            editor_category: 'style',
            hidden: false
          },
          include_social: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: true,
            description:
              'Whether social links should be included or not. Please add a resource when including social links to correctly generate the links.',
            related_to: null,
            editor_category: null,
            hidden: false
          },
          divider: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: 'Should a dividing line be added at the bottom?',
            related_to: null,
            editor_category: null,
            hidden: false
          },
          breadcrumb_links: {
            type: 'multi-config',
            required: false,
            default: [],
            description: null,
            related_to: 'components/text_link',
            editor_category: null,
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
            editor_category: null,
            hidden: false
          },
          resource: {
            type: 'link',
            required: false,
            asset_types: [],
            content_types: ['resourceWrapper', 'guide'],
            description: 'Only required when this hero needs social icons to be available.',
            related_to: null,
            editor_category: null,
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
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/search_dropdown',
          styleguide_path: '/styleguide/patterns%2Fsearch_dropdown',
          title: 'Search Dropdown Pattern',
          description: 'Description of component.',
          editor_role: 'hidden',
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
            editor_category: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsSearchDropdownComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: true
          }
        }
      },
      {
        meta: {
          id: 'patterns/search_hero',
          styleguide_path: '/styleguide/patterns%2Fsearch_hero',
          title: 'Search Hero',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description:
              "Select 'Page' if this pattern should match the page's light/dark mode setting. Otherwise, override with 'light' or 'dark' specifically for this component.",
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          background_color_token: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'variant'],
            description: 'Select the background color token to use within the light/dark modes.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description:
              'Select the amount of spacing to apply to the top and bottom of this page section.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          display_size: {
            type: 'text',
            required: true,
            default: 'primary',
            options: ['primary', 'secondary'],
            description: 'The font size of the title',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          overline_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Text for the overline',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          display_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Text for the title',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          search_component: {
            type: 'component',
            required: true,
            default: null,
            options: ['components/search_bar'],
            description: 'The search bar component.',
            related_to: null,
            editor_category: null,
            hidden: false
          },
          bottom_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/search_term_grid'],
            description: 'The component at the bottom.',
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/short_landing_page_hero',
          styleguide_path: '/styleguide/patterns%2Fshort_landing_page_hero',
          title: 'Split Landing Page Hero',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description:
              "Select 'Page' if this pattern should match the page's light/dark mode setting. Otherwise, override with 'light' or 'dark' specifically for this component.",
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description:
              'Select the amount of spacing to apply to the top and bottom of this page section.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          left_components: {
            type: 'multi-component',
            required: false,
            hidden: false,
            default: [],
            options: [
              'components/single_text_inline_form',
              'components/cta_button',
              'components/button_modal',
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
                  text: 'Overline Text',
                  element: 'p'
                }
              },
              {
                name: 'Title (display)',
                component_id: 'elements/display_text',
                properties: {
                  max_width: 'default',
                  size: 'secondary',
                  stack_size: 'md',
                  color_token: 'variant',
                  text: 'Title Text'
                }
              },
              {
                name: 'Title (heading)',
                component_id: 'elements/heading',
                properties: {
                  max_width: 'default',
                  size: 'xl',
                  stack_size: 'md',
                  color_token: 'variant',
                  text: 'Title Text'
                }
              },
              {
                name: 'Body (lead)',
                component_id: 'elements/lead_text',
                properties: {
                  max_width: 'jumbo',
                  size: 'md',
                  stack_size: null,
                  color_token: 'default',
                  text: 'Body Text'
                }
              }
            ],
            description: 'Fully composable elements for the left side of this hero.',
            related_to: null,
            editor_category: null
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
            editor_category: null,
            hidden: false
          },
          background_image: {
            type: 'component',
            required: false,
            default: null,
            options: ['components/full_background_image'],
            description: null,
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/variant_container',
          styleguide_path: '/styleguide/patterns%2Fvariant_container',
          title: 'A/B Variant Container',
          description:
            'A component for setting up a/b tests on a single specific pattern on a single page. Accepts condition checks for the justworks cookie, lead-storage, url params, or url hash.',
          editor_role: 'pattern',
          tags: ['uncategorized'],
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
            editor_category: null,
            hidden: true
          },
          c_id: {
            type: 'text',
            required: false,
            default: 'PatternsVariantContainerComponent',
            options: null,
            description: 'Internal testing ID.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: true
          },
          a_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['{{ patterns }}'],
            description:
              'The default component which always renders unless B or C conditions are met.',
            related_to: null,
            editor_category: null,
            hidden: false
          },
          b_condition: {
            type: 'experiment-condition',
            default: '{"object":"","attribute":"","condition":"","value":""}',
            required: false,
            description: 'The conditions which result in the B component replacing A.'
          },
          b_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['{{ patterns }}'],
            description: 'The component which replaces A when the B condition is true.',
            related_to: null,
            editor_category: null,
            hidden: false
          },
          c_condition: {
            type: 'experiment-condition',
            default: '{"object":"","attribute":"","condition":"","value":""}',
            required: false,
            description: 'The conditions which result in the C component replacing A.'
          },
          c_component: {
            type: 'component',
            required: false,
            default: null,
            options: ['{{ patterns }}'],
            description:
              'The component which replaces A when the C condition is true. If both B and C are true, B will render.',
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/video_theatre',
          styleguide_path: '/styleguide/patterns%2Fvideo_theatre',
          title: 'Video Theatre',
          description: 'A standalone page section for displaying a centered video.',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description:
              "Select 'Page' if this pattern should match the page's light/dark mode setting. Otherwise, override with 'light' or 'dark' specifically for this component.",
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          background_color_token: {
            type: 'text',
            required: true,
            default: 'default',
            options: ['default', 'variant'],
            description: 'Select the background color token to use within the light/dark modes.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description:
              'Select the amount of spacing to apply to the top and bottom of this page section.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          video_entry: {
            type: 'link',
            required: false,
            asset_types: [],
            content_types: ['video'],
            description: null,
            related_to: null,
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'patterns/webinar_event_list',
          styleguide_path: '/styleguide/patterns%2Fwebinar_event_list',
          title: 'Webinar Event List',
          description:
            'A list of events which can be configured to load events by category and display all, current, or past events only.',
          editor_role: 'pattern',
          tags: ['collection', 'event', 'events-page'],
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          },
          theme_variant: {
            type: 'text',
            required: true,
            default: 'page',
            options: ['page', 'light', 'dark'],
            description:
              "Select 'Page' if this pattern should match the page's light/dark mode setting. Otherwise, override with 'light' or 'dark' specifically for this component.",
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
            hidden: false
          },
          content_spacing_size: {
            type: 'text',
            required: true,
            default: 'xl',
            options: ['xl', 'xxxxl'],
            description:
              'Select the amount of spacing to apply to the top and bottom of this page section.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'style',
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
            editor_category: 'advanced',
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
            editor_category: 'advanced',
            hidden: false
          },
          title_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Text for the title of the section.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          },
          body_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'Lead text beneath the title.',
            related_to: null,
            editor_type: 'long-text-editor',
            editor_category: null,
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
            related_to: null,
            editor_category: null
          },
          cta_link: {
            type: 'config',
            required: false,
            default: {},
            description:
              "Add this to override the 'show more' default cta with a persistant cta link.",
            related_to: 'components/text_link',
            editor_category: null,
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
          title: 'Text Link',
          description: 'An HTML text link with configurable properties.',
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
              '{{ about-company }}',
              '{{ about-team }}',
              '{{ about-values }}',
              '{{ blog }}',
              '{{ careers }}',
              '{{ customer-success-phone }}',
              '{{ features-benefits }}',
              '{{ features-compliance }}',
              '{{ features-hr }}',
              '{{ features-overview }}',
              '{{ features-payroll }}',
              '{{ features-support }}',
              '{{ get-started }}',
              '{{ help-center }}',
              '{{ homepage }}',
              '{{ justwomen }}',
              '{{ login }}',
              '{{ our-customers }}',
              '{{ partners }}',
              '{{ press }}',
              '{{ pricing }}',
              '{{ privacy-policy }}',
              '{{ product-updates }}',
              '{{ referrals }}',
              '{{ resource-center }}',
              '{{ sales-phone }}',
              '{{ terms-of-use }}'
            ],
            description:
              "If the link is external, provide a full URL (https://example.com). If internal, only provide the path ('/internal/link')",
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            editor_category: null,
            hidden: false
          },
          link_text: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description: 'The text for this link. Supports raw HTML for rare use-cases.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'elements/form',
          styleguide_path: '/styleguide/elements%2Fform',
          title: 'Base Form',
          description: 'A base form element which can be configured to submit to any endpoint.',
          editor_role: 'config-object',
          tags: ['form'],
          config_template: [
            'form_endpoint',
            'pardot_endpoint',
            'form_name',
            'open_new_tab',
            'redirect_url'
          ]
        },
        properties: {
          open_new_tab: {
            type: 'bool',
            required: true,
            options: [true, false],
            default: false,
            description: 'Whether or not the redirect_url should open in a new tab.',
            related_to: null,
            editor_category: 'advanced',
            hidden: false
          },
          form_name: {
            type: 'text',
            required: false,
            default: '',
            options: ['Blog Resource Download', 'Get The Guide', 'Newsletter Subscribe', 'test'],
            description: 'The name to use for tracking subissions in google analytics.',
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            editor_category: null,
            hidden: false
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
            editor_category: null,
            hidden: false
          },
          pardot_endpoint: {
            type: 'text',
            required: false,
            default: '',
            options: [
              '{{ Email The Article }}',
              '{{ Get Started }}',
              '{{ Get The Guide }}',
              '{{ Lead Form }}',
              '{{ Newsletter Subscribe }}',
              '{{ Resource Download }}'
            ],
            description:
              'The form handler url if this form submits to pardot. If form_endpoint present, submits here last.',
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            editor_category: null,
            hidden: false
          },
          redirect_url: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description:
              'The link (such as a thank-you page) to redirect after form submission. Add the token {{ form_fields }} to the end of the url to include the form fields in the redirect. (ex: "/thank-you {{ form_fields }}" will transform into /thank-you?email=..." ',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          }
        }
      },
      {
        meta: {
          id: 'elements/select',
          styleguide_path: '/styleguide/elements%2Fselect',
          editor_role: 'singleton',
          title: 'Select Dropdown',
          tags: ['form'],
          config_template: ['name', 'options', 'default_option']
        },
        properties: {
          name: {
            type: 'text',
            required: false,
            default: '',
            options: [
              'blog_default_hubspot_blog_subscription',
              'company',
              'current_payroll_provider',
              'email',
              'email_the_article_cta',
              'firstname',
              'lastname',
              'learn_about_justworks',
              'lifecyclestage',
              'most_recent_guide_download_name',
              'most_recent_guide_download_url',
              'numemployees',
              'pageURL',
              'phone',
              'wantshealthcare'
            ],
            description: "The input name (must match pardot's 'External Field' ID.",
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            editor_category: 'advanced',
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
            editor_category: null,
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
            editor_category: null,
            hidden: true
          }
        }
      },
      {
        meta: {
          id: 'elements/text_input',
          styleguide_path: '/styleguide/elements%2Ftext_input',
          editor_role: 'singleton',
          title: 'Text Input',
          tags: ['form'],
          config_template: ['type', 'validation_type', 'name', 'default_value']
        },
        properties: {
          type: {
            type: 'text',
            required: true,
            default: 'text',
            options: ['text', 'date', 'tel', 'email', 'password', 'checkbox', 'hidden'],
            description: 'Text input type.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: 'advanced',
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
            editor_category: 'advanced',
            hidden: false
          },
          name: {
            type: 'text',
            required: false,
            default: '',
            options: [
              'blog_default_hubspot_blog_subscription',
              'company',
              'current_payroll_provider',
              'email',
              'email_the_article_cta',
              'firstname',
              'lastname',
              'learn_about_justworks',
              'lifecyclestage',
              'most_recent_guide_download_name',
              'most_recent_guide_download_url',
              'numemployees',
              'pageURL',
              'phone',
              'wantshealthcare'
            ],
            description: "The input name (must match pardot's 'External Field' ID.",
            related_to: null,
            editor_type: 'dropdown-with-custom-editor',
            editor_category: 'advanced',
            hidden: false
          },
          default_value: {
            type: 'text',
            required: false,
            default: '',
            options: null,
            description:
              'The default input value which is prefilled when the page loads. Use {{ page_url }} to use the page url as a value.',
            related_to: null,
            editor_type: 'short-text-editor',
            editor_category: null,
            hidden: false
          }
        }
      }
    ]
  }
};
