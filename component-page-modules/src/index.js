import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { TextInput, HelpText } from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';

import MultiComponentField from './components/MultiComponentField';

import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  detachExternalChangeHandler = null;

  constructor(props) {
    super(props);
    this.state = {
      hydratedEntries: [],
      value: props.sdk.field.getValue() || []
    };

    this.hydrateEntries = this.hydrateEntries.bind(this);
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);
    this.hydrateEntries();
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  hydrateEntries = async () => {
    const entries = await this.props.sdk.space.getEntries({
      'sys.id[in]': this.state.value.map(l => l.sys.id).join(',')
    });

    this.setState({
      hydratedEntries: entries.items
    });
  };

  onExternalChange = value => {
    this.setState({ value });
  };

  onChange = (value = []) => {
    this.setState({ value }, () => {
      if (value.length) {
        this.props.sdk.field.setValue(value);
      } else {
        this.props.sdk.field.removeValue();
      }

      this.hydrateEntries();
    });
  };

  render() {
    return (
      <div>
        <MultiComponentField
          hydratedEntries={this.state.hydratedEntries}
          sdk={this.props.sdk}
          onChange={this.onChange}
          value={this.state.value}
        />
        <HelpText>The page content</HelpText>
      </div>
    );
  }
}

init(sdk => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
