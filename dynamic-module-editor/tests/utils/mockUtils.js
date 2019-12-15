import React from 'react';

import sinon from 'sinon';
import * as c from '../../../custom_templates/constants';
import * as tm from '../../../custom_templates/mocks/templateMocks';
import { templatePlaceholder } from '../../../custom_templates';

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

export const mockComponent = ({ Component, sdk = mockSdk(mockPrimaryEntry()) } = {}) => {
  return mount(
    <Component
      customTemplates={tm.mockCustomTemplates}
      templatePlaceholder={templatePlaceholder}
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
  contentType = 'customTemplate',
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

export const mockMapping = ({ type, value = '', styleClasses = '' } = {}) => {
  return {
    type,
    value,
    styleClasses
  };
};

export const mockAssetMapping = ({
  type = c.FIELD_TYPE_ASSET,
  value = '',
  styleClasses = '',
  assetUrl = 'localhost',
  formatting = {}
} = {}) => {
  return {
    type,
    value,
    styleClasses,
    assetUrl,
    formatting
  };
};

export const mockSdk = (mockEntry = mockPrimaryEntry()) => {
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
        return ids.map(id => {
          mockEntryResponse({ id });
        });
      },
      getAssets: query => {
        const ids = query['sys.id[in]'].split(',');
        return ids.map(id => {
          mockAssetResponse({ id });
        });
      }
    },
    navigator: {
      openEntry: jest.fn()
    },
    entry: {
      getSys: () => {
        return {
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
