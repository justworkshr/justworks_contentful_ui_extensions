import React from 'react';

import sinon from 'sinon';
import * as c from '../../../customModules/constants';
import * as tm from '../../../customModules/mocks/templateMocks';
import { componentTemplatePlaceholder } from '../../../customModules';
import { constructComponentZone } from '../../../customModules/utilities/constructUtils';
import { mount } from 'enzyme';

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

export const mockComponent = ({
  Component,
  sdk = mockSdk(mockPrimaryEntry()),
  customTemplates = tm.mockComponentModuleTemplates,
  mocktemplatePlaceholder = componentTemplatePlaceholder
} = {}) => {
  return mount(
    <Component
      customTemplates={customTemplates}
      templatePlaceholder={mocktemplatePlaceholder}
      sdk={sdk}
    />
  );
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
  contentType = c.CONTENT_TYPE_PAGE_MODULE
) => {
  const getValue = (entry, field) => {
    return entry[field];
  };

  return {
    space: {
      getEntry: id => mockEntryResponse({ id }),
      getAsset: id => mockAssetResponse({ id }),
      updateEntry: sinon.spy(),
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
          getValue: () => getValue(mockEntry, 'name'),
          setValue: jest.fn()
        },
        type: {
          getValue: () => getValue(mockEntry, 'type'),
          setValue: jest.fn()
        },
        internalMapping: {
          getValue: () => getValue(mockEntry, 'internalMapping'),
          setValue: sinon.spy()
        },
        entries: {
          getValue: () => getValue(mockEntry, 'entries'),
          setValue: jest.fn()
        },
        assets: {
          getValue: () => getValue(mockEntry, 'assets'),
          setValue: jest.fn()
        },
        isValid: {
          getValue: jest.fn(),
          setValue: jest.fn()
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
