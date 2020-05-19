import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { EntryCard, TextLink } from '@contentful/forma-36-react-components';

import { createEntry } from '../../../../shared/utilities/index.js';

import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';

const MultiComponentField = props => {
  const handleCreate = async () => {
    const pageName = props.sdk.entry.fields.internalName.getValue();
    const newEntry = await createEntry(props.sdk.space, c.CONTENT_TYPE_VIEW_COMPONENT, {
      name: {
        'en-US': `${pageName} - Component`
      }
    });

    props.sdk.navigator.openEntry(newEntry.sys.id, {
      slideIn: { waitForClose: true }
    });

    const newValue = [...props.value, constructLink(newEntry)];
    props.onChange(newValue);
  };

  const handleLink = () => {
    return;
  };

  console.log(props.value);
  return (
    <div className="multi-component-field">
      <div className="action-row">
        <TextLink className="f36-margin-right--xs" onClick={handleCreate}>
          Create new
        </TextLink>
        <TextLink onClick={handleLink}>Link existing</TextLink>
      </div>
      <div data-test-id="multi-component-field--links">
        {props.hydratedEntries.map(entry => {
          console.log(entry);
          return (
            <EntryCard
              title={entry.fields.name['en-US'] || 'Loading...'}
              loading={false}
              size="small"
            />
          );
        })}
      </div>
    </div>
  );
};

MultiComponentField.propTypes = {
  sdk: PropTypes.object,
  hydratedEntries: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.array
};
MultiComponentField.defaultProps = {
  sdk: {},
  hydratedEntries: [],
  value: []
};

export default MultiComponentField;
