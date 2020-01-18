import React from 'react';
import PropTypes from 'prop-types';

import { Heading, Subheading } from '@contentful/forma-36-react-components';
import { displayCamelCaseName } from '../../../../shared/utilities/elementUtils';

class ComponentBuilder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="component-builder">
        <Heading>Component Properties</Heading>
        {Object.keys(this.props.templateConfig.properties).map(propertyKey => {
          return <Subheading>{displayCamelCaseName(propertyKey)}</Subheading>;
        })}
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
