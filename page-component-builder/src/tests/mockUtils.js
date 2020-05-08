import React from 'react';
import * as c from '../constants';

import { mount } from 'enzyme';

export const mockSchema = (id = 'components/mock') => {
  return {
    meta: {
      id,
      styleguide_path: '',
      description: '',
      editor_role: '',
      tags: []
    },
    properties: {
      classname: {
        type: 'text',
        required: false,
        default: null,
        options: null,
        description: '',
        related_to: null,
        hidden: true
      },
      prop1: {
        type: c.TEXT_PROPERTY,
        editor_type: c.SHORT_TEXT_EDITOR,
        required: true,
        default: 'prop1Value',
        options: null,
        description: '',
        related_to: null,
        hidden: false
      },
      componentProp: {
        type: c.COMPONENT_PROPERTY,
        required: true,
        options: ['components/a', 'components/b', 'components/c'],
        description: '',
        related_to: null,
        hidden: false,
        presets: [{ name: 'preset', component_id: 'components/preset', properties: { hi: 1 } }]
      }
    }
  };
};

export const mockSchemas = (tags = {}, components = []) => {
  return {
    tags,
    components
  };
};

export const mockComponentSchema = (
  id,
  properties = {},
  tags = [],
  editor_role = c.PATTERN_ROLE
) => {
  return {
    meta: {
      id,
      tags,
      editor_role
    },
    properties
  };
};

export const mockComponentSchemaProperty = ({
  propKey,
  type,
  required,
  defaultProperty,
  options,
  related_to,
  description,
  editor_type,
  assetTypes = [],
  contentTypes = [],
  hidden
} = {}) => {
  return {
    [propKey]: {
      type,
      editor_type,
      defaultProperty,
      description,
      related_to,
      options,
      required,
      asset_types: assetTypes,
      content_types: contentTypes,
      hidden
    }
  };
};

export const mockInternalMapping = (componentId = 'mockComponentId', properties = {}) => {
  return JSON.stringify({
    componentId,
    properties
  });
};

export const mockLinkProperty = (key, link) => {
  return {
    [key]: {
      type: c.LINK_PROPERTY,
      value: link
    }
  };
};

export const mockAssetProperty = (key, id) => {
  return {
    [key]: {
      type: c.LINK_PROPERTY,
      value: mockLink({ type: 'Asset', id })
    }
  };
};

export const mockEntryProperty = (key, id) => {
  return {
    [key]: {
      type: c.LINK_PROPERTY,
      value: mockLink({ type: 'Entry', id })
    }
  };
};

export const mockMultiLinkProperty = (key, ids = []) => {
  return {
    [key]: {
      type: c.LINK_PROPERTY,
      value: ids.map(id => mockLink({ type: 'Entry', id }))
    }
  };
};

export const mockComponentEntryProperty = (key, id) => {
  return {
    [key]: {
      type: c.COMPONENT_PROPERTY,
      value: mockLink({ type: 'Entry', id })
    }
  };
};

export const mockMultiComponentProperty = (key, ids = []) => {
  return {
    [key]: {
      type: c.MULTI_COMPONENT_PROPERTY,
      value: ids.map(id => mockLink({ type: 'Entry', id }))
    }
  };
};

export const mockConfigProperty = (key, id) => {
  return {
    [key]: {
      type: c.CONFIG_PROPERTY,
      value: mockLink({ type: 'Entry', id })
    }
  };
};

export const mockMultiConfigProperty = (key, ids = []) => {
  return {
    [key]: {
      type: c.MULTI_CONFIG_PROPERTY,
      value: ids.map(id => mockLink({ type: 'Entry', id }))
    }
  };
};

export const mockSingletonProperty = (key, componentId, properties = {}) => {
  return {
    [key]: {
      type: c.COMPONENT_PROPERTY,
      value: {
        componentId,
        properties
      }
    }
  };
};

export const mockTextProperty = (key, value) => {
  return {
    [key]: {
      type: c.TEXT_PROPERTY,
      value
    }
  };
};

export const mockPrimaryEntry = ({
  name = undefined,
  componentId = undefined,
  configObject = false,
  entries = undefined,
  assets = undefined,
  internalMapping = undefined,
  isValid = undefined,
  style = undefined
} = {}) => {
  return {
    name,
    componentId,
    configObject,
    entries,
    assets,
    internalMapping,
    isValid,
    style
  };
};

export const mockComponent = ({ Component, sdk = mockSdk(mockPrimaryEntry()) } = {}) => {
  return mount(<Component sdk={sdk} />);
};

export const mockLink = ({ id = 0, type = 'Entry' } = {}) => {
  return {
    sys: {
      id: id,
      linkType: type,
      type: 'Link'
    }
  };
};

export const mockAssetResponse = ({ id = 0, url = 'localhost', assetType = 'image/png' } = {}) => {
  return {
    sys: {
      id: id,
      type: 'Asset'
    },
    fields: {
      title: {
        'en-US': 'Asset Title.'
      },
      file: {
        'en-US': {
          url,
          contentType: assetType
        }
      }
    }
  };
};

export const mockCustomTemplateEntryResponse = ({
  id = 0,
  contentType = c.CONTENT_TYPE_COLLECTION_MODULE,
  template = undefined
} = {}) => {
  return {
    sys: {
      id,
      type: 'Entry',
      contentType: {
        sys: {
          id: contentType
        }
      }
    },
    fields: {
      name: {
        'en-US': 'Entry Title.'
      },
      componentId: {
        'en-US': 'componentIdField'
      },
      f1: {
        'en-US': 'text!!!'
      },
      entries: {
        'en-US': undefined
      },
      type: {
        'en-US': template
      },
      internalMapping: {
        'en-US': undefined
      }
    }
  };
};

export const mockEntryResponse = ({ id = 0, contentType = 'test-content-type' } = {}) => {
  return {
    sys: {
      id,
      type: 'Entry',
      contentType: {
        sys: {
          id: contentType
        }
      }
    },
    fields: {
      name: {
        'en-US': 'Entry Title.'
      },
      componentId: {
        'en-US': 'componentIdField'
      },
      f1: {
        'en-US': 'text!!!'
      }
    }
  };
};

export const mockMapping = ({ type, value = '', contentType = '' } = {}) => {
  return {
    type,
    value,
    contentType
  };
};

export const mockZoneMapping = ({ componentName = '', type = '', value } = {}) => {
  return {
    componentName,
    type,
    value
  };
};

export const mockComponentConfig = ({
  meta = { componentName: 'MockComponentConfig', contentTypes: [] },
  properties = { title: 'hi', body: 'hello there' }
} = {}) => {
  return {
    meta,
    properties
  };
};

export const mockComponentMapping = ({
  properties = { title: 'hi', body: 'hello there' },
  componentName = 'MockComponentConfig'
} = {}) => {
  return {
    componentName,
    properties
  };
};

export const mockComponentEntry = () => {
  return {
    ...constructComponentZone({
      componentOptions: [mockComponentConfig]
    }),
    type: 'entry'
  };
};

export const mockAssetMapping = ({
  type = c.FIELD_TYPE_ASSET,
  value = '',
  style = {},
  assetUrl = 'localhost',
  formatting = {}
} = {}) => {
  return {
    type,
    value,
    style,
    assetUrl,
    formatting
  };
};

export const mockSdk = (
  mockEntry = mockPrimaryEntry(),
  contentType = c.CONTENT_TYPE_VIEW_COMPONENT
) => {
  const getValue = (entry, field) => {
    return entry[field];
  };

  return {
    space: {
      getEntry: id => mockEntryResponse({ id }),
      getAsset: id => mockAssetResponse({ id }),
      updateEntry: jest.fn(),
      createEntry: jest.fn((contentType, {}) => {
        return mockEntryResponse({ id: 'createdEntry1a' });
      }),
      createAsset: jest.fn(({}) => {
        return mockEntryResponse({ id: 'createdEntry1a' });
      }),
      getEntries: jest.fn(query => {
        let ids;
        if (query['sys.id[in]']) {
          ids = query['sys.id[in]'].split(',');
        } else if (query['fields.componentId[in]']) {
          ids = query['fields.componentId[in]'].split(',');
        }

        return {
          items: ids.map(id => {
            return mockEntryResponse({ id });
          })
        };
      }),
      getAssets: query => {
        const ids = query['sys.id[in]'].split(',');
        return ids.map(id => {
          return mockAssetResponse({ id });
        });
      }
    },
    navigator: {
      openEntry: jest.fn((id, options = {}) => {
        return {
          navigated: true,
          entity: mockEntryResponse({ id: 'mockNavigatedEntry1' })
        };
      }),
      openAsset: jest.fn((id, options = {}) => {
        return {
          navigated: true,
          entity: mockEntryResponse({ id: 'mockNavigatedAsset1' })
        };
      })
    },
    entry: {
      getSys: () => {
        return {
          contentType: {
            sys: {
              id: contentType
            }
          },
          version: 1
        };
      },
      onSysChanged: jest.fn(),
      fields: {
        name: {
          getValue: jest.fn(),
          setValue: jest.fn(),
          onValueChanged: jest.fn()
        },
        componentId: {
          getValue: jest.fn(),
          setValue: jest.fn(),
          onValueChanged: jest.fn()
        },
        configObject: {
          getValue: jest.fn(),
          setValue: jest.fn(),
          onValueChanged: jest.fn()
        },
        internalMapping: {
          getValue: jest.fn(),
          setValue: jest.fn(),
          onValueChanged: jest.fn()
        },
        entries: {
          getValue: jest.fn(),
          setValue: jest.fn(),
          onValueChanged: jest.fn()
        },
        assets: {
          getValue: jest.fn(),
          setValue: jest.fn(),
          onValueChanged: jest.fn()
        },
        isValid: {
          getValue: jest.fn(),
          setValue: jest.fn(),
          onValueChanged: jest.fn()
        }
      }
    },
    dialogs: {
      selectMultipleAssets: jest.fn((options = {}) => {
        return [
          mockAssetResponse({ id: 'newLinkedAsset1a' }),
          mockAssetResponse({ id: 'newLinkedAsset2a' })
        ];
      }),
      selectSingleAsset: jest.fn((options = {}) => {
        return mockAssetResponse({ id: 'newLinkedAsset1b' });
      }),
      selectMultipleEntries: jest.fn((options = {}) => {
        return [
          mockEntryResponse({ id: 'newLinkedEntry1a' }),
          mockEntryResponse({ id: 'newLinkedEntry2a' })
        ];
      }),
      selectSingleEntry: jest.fn((options = {}) => {
        return mockEntryResponse({ id: 'newLinkedEntry1b' });
      })
    },
    field: {
      getValue: jest.fn(),
      onValueChanged: jest.fn(),
      setValue: jest.fn(),
      removeValue: jest.fn(),
      setInvalid: jest.fn()
    },
    notifier: {
      success: jest.fn(),
      error: jest.fn()
    },
    window: {
      startAutoResizer: jest.fn()
    }
  };
};

export const selectComponentZone = (wrapper, radioId, value) => {
  wrapper.find(`#${radioId} input`).simulate('change', { target: value });
};

export const openCreateDropdown = (wrapper, mappingKey) => {
  const parent = wrapper.find('PropertySection').exists()
    ? wrapper.find('PropertySection').find({ roleKey: mappingKey })
    : wrapper.find('ComponentZone').find({ componentZoneKey: mappingKey });

  parent.find('CreateNewLink').simulate('click');
};

export const hoverLinkExistingDropdown = (wrapper, mappingKey) => {
  const parent = wrapper.find('PropertySection').exists()
    ? wrapper.find('PropertySection').find({ roleKey: mappingKey })
    : wrapper.find('ComponentZone').find({ componentZoneKey: mappingKey });

  parent
    .find('LinkExisting')
    .find('DropdownListItem')
    .find({ testId: 'link-entries-row__dropdown--link-entry-dropdown' })
    .find('button')
    .simulate('mouseenter');
};

export const openLinkExistingDropdown = (wrapper, mappingKey) => {
  const parent = wrapper.find('PropertySection').exists()
    ? wrapper.find('PropertySection').find({ roleKey: mappingKey })
    : wrapper.find('ComponentZone').find({ componentZoneKey: mappingKey });

  parent.find('LinkExisting').simulate('click');
};

export const hoverDeepCopyDropdown = (wrapper, mappingKey) => {
  const parent = wrapper.find('PropertySection').exists()
    ? wrapper.find('PropertySection').find({ roleKey: mappingKey })
    : wrapper.find('ComponentZone').find({ componentZoneKey: mappingKey });
  parent
    .find('LinkExisting')
    .find('DropdownListItem')
    .find({ testId: 'link-entries-row__dropdown--deep-copy-dropdown' })
    .find('button')
    .simulate('mouseenter');
};

export const hoverCreateCustomTemplateDropdown = (wrapper, roleKey) => {
  wrapper
    .find('PropertySection')
    .find({ roleKey })
    .find('CreateNewLink')
    .find({ testId: 'create-new-link__dropdown-custom-type' })
    .find('button')
    .simulate('mouseenter');
};

export const setupComponentZones = (wrapper, templateConfig, componentOptionIndex) => {
  // setup zones
  wrapper.find('ComponentZone').forEach((node, index) => {
    const zoneKey = node.props().componentZoneKey;
    const firstComponentName = Object.keys(templateConfig.componentZones[zoneKey].componentOptions)[
      componentOptionIndex
    ];

    selectComponentZone(wrapper, `${zoneKey}-${firstComponentName}`, firstComponentName);
  });
};
