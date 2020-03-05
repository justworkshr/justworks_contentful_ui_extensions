import React from 'react';
import * as c from '../constants';

import sinon from 'sinon';

import { mount } from 'enzyme';

export const mockInternalMapping = (componentId, properties = {}) => {
  return {
    componentId,
    properties
  };
};

export const mockLinkProperty = (key, id) => {
  return {
    [key]: {
      type: 'link',
      value: id
    }
  };
};

export const mockPrimaryEntry = ({
  name = undefined,
  type = undefined,
  entries = undefined,
  assets = undefined,
  internalMapping = undefined,
  isValid = undefined,
  style = undefined
} = {}) => {
  return {
    name,
    type,
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

export const mockEntryResponse = ({ id = 0, contentType = 'text' } = {}) => {
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
      createEntry: () => {
        return mockEntryResponse({ id: 'newCreatedEntry1a' });
      },
      getEntries: query => {
        const ids = query['sys.id[in]'].split(',');
        return {
          items: ids.map(id => {
            return mockEntryResponse({ id });
          })
        };
      },
      getAssets: query => {
        const ids = query['sys.id[in]'].split(',');
        return ids.map(id => {
          return mockAssetResponse({ id });
        });
      }
    },
    navigator: {
      openEntry: jest.fn()
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
      selectMultipleAssets: () => {
        return [
          mockAssetResponse({ id: 'newLinkedAsset1a' }),
          mockAssetResponse({ id: 'newLinkedAsset2a' })
        ];
      },
      selectSingleAsset: () => {
        return mockAssetResponse({ id: 'newLinkedAsset1b' });
      },
      selectMultipleEntries: () => {
        return [
          mockEntryResponse({ id: 'newLinkedEntry1a' }),
          mockEntryResponse({ id: 'newLinkedEntry2a' })
        ];
      },
      selectSingleEntry: () => {
        return mockEntryResponse({ id: 'newLinkedEntry1b' });
      }
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