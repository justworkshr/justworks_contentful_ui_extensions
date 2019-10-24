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

  onButtonClick = async e => {
    const confirm = await this.props.sdk.dialogs.openConfirm({
      width: 800,
      title: 'This cannot be undone',
      message:
        'Deep delete will this entry and all entries linked to this one, but only if that entry is NOT linked to any other entries.',
      intent: 'negative'
    });

    if (confirm) {
      try {
        this.setState({
          loading: true
        });
        await this.deleteAllLinkedEntriesBeforeSelf(this.props.sdk.entry);
        this.props.sdk.notifier.success('Entry and all exclusively linked entries deleted!');
      } catch (err) {
        console.log(err);
        await this.props.sdk.dialogs.openAlert({
          title: 'An error occured!',
          message: `${err.message || err}`
        });
      }
    }

    this.setState({
      loading: false
    });
  };

  getEntry = async id => {
    return await this.props.sdk.space.getEntry(id);
  };

  deleteEntry = async entry => {
    const entrySys = entry.sys || entry.getSys();
    console.log('deleting: ', entry);
    return await this.props.sdk.space.deleteEntry(entrySys.id);
  };

  deleteAllLinkedEntriesBeforeSelf = async entry => {
    await Promise.all(
      Object.entries(entry.fields).map(async ([key, value]) => {
        let parsedValue = value['en-US'] || value._fieldLocales['en-US']._value;

        if (
          parsedValue.sys &&
          parsedValue.sys.type === 'Link' &&
          parsedValue.sys.linkType === 'Entry'
        ) {
          // Single reference
          const linkEntry = await this.getEntry(parsedValue.sys.id);
          const entrySys = linkEntry.sys || linkEntry.getSys();
          const linkedEntries = await this.props.sdk.space.getEntries({
            links_to_entry: entrySys.id
          });

          if (linkedEntries.items && linkedEntries.items.length <= 1) {
            await this.deleteAllLinkedEntriesBeforeSelf(linkEntry);
          }
        } else if (
          (value.type === 'Array' && value.items && value.items.type === 'Link') ||
          Array.isArray(value['en-US'])
        ) {
          // Multi Reference
          await parsedValue.map(async link => {
            const linkEntry = await this.getEntry(link.sys.id);
            const entrySys = linkEntry.sys || linkEntry.getSys();
            const linkedEntries = await this.props.sdk.space.getEntries({
              links_to_entry: entrySys.id
            });

            if (linkedEntries.items && linkedEntries.items.length <= 1) {
              await this.deleteAllLinkedEntriesBeforeSelf(linkEntry);
            }
          });
        }
      })
    );

    const entrySys = entry.sys || entry.getSys();
    const linkedEntries = await this.props.sdk.space.getEntries({
      links_to_entry: entrySys.id
    });

    console.log('LINKS: ', linkedEntries);
    if (linkedEntries.items && linkedEntries.items.length <= 1) {
      return await this.deleteEntry(entry);
    } else {
      return entry;
    }
  };

  render() {
    return (
      <Button
        buttonType="negative"
        isFullWidth={true}
        testId="open-dialog"
        loading={this.state.loading}
        disabled={this.state.loading}
        onClick={this.onButtonClick}>
        Deep Delete
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
