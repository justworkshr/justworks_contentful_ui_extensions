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

export const mockEntryResponse = ({ id = 0 } = {}) => {
  return {
    sys: {
      id: id,
      type: 'Entry'
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
      updateEntry: sinon.spy()
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
          getValue: () => getValue(mockCustomTemplateEntry, 'internalMapping')
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
          getValue: () => getValue(mockCustomTemplateEntry, 'entries')
        }
      }
    },
    dialogs: {
      selectMultipleAssets: () => {
        return [mockAssetResponse({ id: 'newAsset1a' }), mockAssetResponse({ id: 'newAsset2a' })];
      },
      selectSingleAsset: () => {
        return mockAssetResponse({ id: 'newAsset1b' });
      },
      selectMultipleEntries: () => {
        return [mockEntryResponse({ id: 'newEntry1a' }), mockEntryResponse({ id: 'newEntry2a' })];
      },
      selectSingleEntry: () => {
        return mockEntryResponse({ id: 'newEntry1b' });
      }
    },
    field: {
      getValue: jest.fn(),
      onValueChanged: jest.fn(),
      setValue: jest.fn(),
      removeValue: jest.fn(),
      setInvalid: jest.fn()
    },
    window: {
      startAutoResizer: jest.fn()
    }
  };
};
