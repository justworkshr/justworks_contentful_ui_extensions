import React from 'react';
import PropTypes from 'prop-types';

import { Heading } from '@contentful/forma-36-react-components';

class ComponentBuilder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="component-builder">
        <Heading>Component Properties</Heading>
      </div>
    );
  }
}

ComponentBuilder.propTypes = {
  sdk: PropTypes.object.isRequired,
  type: PropTypes.string,
  entryInternalMapping: PropTypes.object,
  internalMappingJson: PropTypes.string,
  loadingEntries: PropTypes.array,
  hydratedEntries: PropTypes.array,
  hydratedAssets: PropTypes.array,
  updateEntry: PropTypes.func,
  setInternalMappingValue: PropTypes.func,
  templateConfig: PropTypes.object
};
ComponentBuilder.defaultProps = {};

export default ComponentBuilder;
