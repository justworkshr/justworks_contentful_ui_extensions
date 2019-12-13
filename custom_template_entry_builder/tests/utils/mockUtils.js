import sinon from 'sinon';
import * as c from '../../../custom_templates/constants';

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
      template: {
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

export const mockSdk = mockCustomTemplateEntry => {
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
          getValue: () => getValue(mockCustomTemplateEntry, 'name')
        },
        template: {
          getValue: () => getValue(mockCustomTemplateEntry, 'template'),
          onValueChanged: jest.fn()
        },
        internalMapping: {
          getValue: () => getValue(mockCustomTemplateEntry, 'internalMapping')
        },
        entries: {
          getValue: () => getValue(mockCustomTemplateEntry, 'entries')
        },
        assets: {
          getValue: () => getValue(mockCustomTemplateEntry, 'assets')
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