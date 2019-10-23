import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Button } from '@contentful/forma-36-react-components';
import { init, locations } from 'contentful-ui-extensions-sdk';
import tokens from '@contentful/forma-36-tokens';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

export class DialogExtension extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  render() {
    return (
      <div style={{ margin: tokens.spacingM }}>
        <Button
          testId="close-dialog"
          buttonType="muted"
          onClick={() => {
            this.props.sdk.close('data from modal dialog');
          }}>
          Close modal
        </Button>
      </div>
    );
  }
}

export class SidebarExtension extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();
  }

  onButtonClick = async (e, options = {}) => {
    const name = await this.props.sdk.dialogs.openPrompt({
      width: 800,
      title: 'Deep clone setup',
      message: 'Please enter a unique name for this entry',
      ...options
    });

    if (name && name.trim()) {
      const contentType = this.props.sdk.entry.getSys().contentType.sys.id;
      const entriesWithName = await this.props.sdk.space.getEntries({
        content_type: contentType,
        'fields.internalName': name.trim()
      });

      if (entriesWithName.items && !entriesWithName.items.length) {
        try {
          this.setState({ loading: true });
          const clonedEntry = await this.cloneEntry(this.props.sdk.entry, name.trim());
          this.props.sdk.navigator.openEntry(clonedEntry.sys.id, {
            slideIn: false
          });
        } catch (err) {
          this.props.sdk.dialogs.openAlert({
            title: 'An error occured!',
            message: `${err}`
          });
          this.setState({ loading: false });
        }
      } else {
        this.onButtonClick(e, {
          intent: 'negative',
          confirmLabel: `A ${contentType} with that name exists. Try Again`,
          defaultValue: name.trim()
        });
      }

      this.setState({ loading: false });
    }
  };

  getEntry = async id => {
    return await this.props.sdk.space.getEntry(id);
  };

  cloneEntry = async (entry, name) => {
    const entrySys = entry.sys || entry.getSys();
    const contentType = entrySys.contentType.sys.id;
    const clonedEntry = await this.props.sdk.space.createEntry(contentType, {
      fields: await this.constructFields(entry, contentType, name)
    });
    return clonedEntry;
  };

  constructFields = async (entry, contentType, name) => {
    console.log('hi');
    const fields = {};
    let multiReferenceCount = {};
    for (let [key, value] of Object.entries(entry.fields)) {
      let parsedValue =
        key === 'name' || key === 'internalName'
          ? name
          : value['en-US'] || value._fieldLocales['en-US']._value;

      if (
        parsedValue.sys &&
        parsedValue.sys.type === 'Link' &&
        parsedValue.sys.linkType === 'Entry'
      ) {
        // Single reference
        const linkEntry = await this.getEntry(parsedValue.sys.id);
        const linkEntryContentType = linkEntry.sys.contentType.sys.id;
        const clonedEntry = await this.cloneEntry(linkEntry, `${name} ${linkEntryContentType}`);
        fields[key] = {
          ['en-US']: this.constructLink(clonedEntry)
        };
      } else if (value.type === 'Array' && value.items && value.items.type === 'Link') {
        // Multi Reference
        const references = await Promise.all(
          parsedValue.map(async link => {
            const linkEntry = await this.getEntry(link.sys.id);
            const linkEntryContentType = linkEntry.sys.contentType.sys.id;
            multiReferenceCount[linkEntryContentType] = multiReferenceCount[linkEntryContentType]
              ? (multiReferenceCount[linkEntryContentType] += 1)
              : 1;
            const clonedEntry = await this.cloneEntry(
              linkEntry,
              `${name} ${linkEntryContentType} ${multiReferenceCount[linkEntryContentType]}`
            );

            return this.constructLink(clonedEntry);
          })
        );

        fields[key] = {
          ['en-US']: references
        };
      } else {
        fields[key] = {
          ['en-US']: parsedValue
        };
      }
    }

    return fields;
  };

  constructLink = entry => {
    return {
      sys: {
        id: entry.sys.id,
        linkType: entry.sys.type,
        type: 'Link'
      }
    };
  };

  render() {
    return (
      <Button
        buttonType="primary"
        isFullWidth={true}
        testId="open-dialog"
        loading={this.state.loading}
        disabled={this.state.loading}
        onClick={this.onButtonClick}>
        Deep Copy
      </Button>
    );
  }
}

export const initialize = sdk => {
  if (sdk.location.is(locations.LOCATION_DIALOG)) {
    ReactDOM.render(<DialogExtension sdk={sdk} />, document.getElementById('root'));
  } else {
    ReactDOM.render(<SidebarExtension sdk={sdk} />, document.getElementById('root'));
  }
};

init(initialize);

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
