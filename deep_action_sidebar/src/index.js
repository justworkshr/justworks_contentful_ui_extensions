import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {
  Button,
  Dropdown,
  DropdownList,
  DropdownListItem
} from '@contentful/forma-36-react-components';
import { init, locations } from 'contentful-ui-extensions-sdk';
import tokens from '@contentful/forma-36-tokens';

import { archiveAllLinkedEntriesBeforeSelf } from './utils/deepArchive';
import { cloneEntry } from './utils/deepCopy';
import { publishAllEntries } from './utils/deepPublish';
import { unpublishAllEntries } from './utils/deepUnpublish';
import { getResolvedEntries } from './utils/shared';

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
      loading: false,
      isOpen: false,
      dropdownText: 'Select a deep action'
    };
  }
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();
  }

  setOpen(bool) {
    this.setState({
      isOpen: bool
    });
  }

  resetState() {
    this.setState({
      loading: false,
      isOpen: false,
      dropdownText: 'Select a deep action'
    });
  }

  onPublishButtonClick = async e => {
    const confirm = await this.props.sdk.dialogs.openConfirm({
      width: 800,
      title: 'Preparing to Deep Publish...',
      message:
        'Will publish all linked entries, even if linked elsewhere. Will NOT publish entries with errors in them. Will NOT publish this entry. Please reload the page when the deep action is finished.'
    });

    if (confirm) {
      try {
        this.setState({
          loading: true,
          isOpen: false,
          dropdownText: 'Deep Publishing...'
        });

        const resolvedEntries = await getResolvedEntries({
          space: this.props.sdk.space,
          entry: this.props.sdk.entry,
          includeRoot: false,
          checkExlusive: false
        });

        const results = await publishAllEntries(this.props.sdk.space, resolvedEntries);
        if (!results.errors.length) {
          this.props.sdk.notifier.success('All entries published! Please reload the page.');
          this.props.sdk.navigator.openEntry(this.props.sdk.entry.getSys().id);
          this.resetState();
        } else {
          const message = 'Some linked entries were not published.';
          this.displayErrorDialog(message, results);
        }
      } catch (err) {
        await this.handleError(err);
      }
    }

    this.resetState();
  };

  onUnpublishButtonClick = async e => {
    const confirm = await this.props.sdk.dialogs.openConfirm({
      width: 800,
      title: 'Preparing to Deep Unpublish...',
      message:
        'Will unpublish this entry and all linked entries, unless they are linked elsewhere. Please reload the page when the deep action is finished.'
    });

    if (confirm) {
      try {
        this.setState({
          loading: true,
          isOpen: false,
          dropdownText: 'Deep Unpublishing...'
        });

        const resolvedEntries = await getResolvedEntries({
          space: this.props.sdk.space,
          entry: this.props.sdk.entry,
          includeRoot: true,
          checkExlusive: true
        });

        const results = await unpublishAllEntries(this.props.sdk.space, resolvedEntries);
        if (!results.errors.length) {
          this.props.sdk.notifier.success('All entries unpublished! Please reload the page.');
          this.props.sdk.navigator.openEntry(this.props.sdk.entry.getSys().id);
          this.resetState();
        } else {
          const message = 'Some linked entries were not unpublished.';
          this.displayErrorDialog(message, results);
        }
      } catch (err) {
        await this.handleError(err);
      }
    }

    this.resetState();
  };

  onCopyButtonClick = async (e, options = {}) => {
    const name = await this.props.sdk.dialogs.openPrompt({
      width: 800,
      title: 'Preparing to Deep Copy...',
      message: 'Please enter a unique name for this entry',
      intent: 'positive',
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
          this.setState({ loading: true, isOpen: false, dropdownText: 'Deep Copying...' });
          const clonedEntry = await cloneEntry(
            this.props.sdk.space,
            this.props.sdk.entry,
            name.trim()
          );
          this.props.sdk.navigator.openEntry(clonedEntry.sys.id, {
            slideIn: false
          });
        } catch (err) {
          await this.handleError(err);
        }
      } else {
        this.onCopyButtonClick(e, {
          intent: 'negative',
          confirmLabel: `A ${contentType} with that name exists. Try Again`,
          defaultValue: name.trim()
        });
      }

      this.resetState();
    }
  };

  onArchiveButtonClick = async e => {
    const confirm = await this.props.sdk.dialogs.openConfirm({
      width: 800,
      title: 'Preparing to Deep Archive...',
      message:
        'Deep archive will archive this entry and all linked entries, unless that entry is linked to other entries. Please reload the page when the deep action is finished.',
      intent: 'positive'
    });

    if (confirm) {
      try {
        this.setState({
          loading: true,
          isOpen: false,
          dropdownText: 'Deep Archiving...'
        });

        const resolvedEntries = await getResolvedEntries({
          space: this.props.sdk.space,
          entry: this.props.sdk.entry,
          includeRoot: true,
          checkExlusive: true
        });
        const results = await archiveAllLinkedEntriesBeforeSelf(
          this.props.sdk.space,
          resolvedEntries
        );

        if (!results.errors.length) {
          this.props.sdk.notifier.success('All entries archived! Please reload the page.');
          this.props.sdk.navigator.openEntry(this.props.sdk.entry.getSys().id);
          this.resetState();
        } else {
          const message = 'Some linked entries were not archived.';
          this.displayErrorDialog(message, results);
        }
      } catch (err) {
        await this.handleError(err);
      }
    }

    this.resetState();
  };

  displayErrorDialog = async (message, results) => {
    this.props.sdk.notifier.error('Completed with errors. Please reload the page.');
    await this.props.sdk.dialogs.openAlert({
      title: 'Errors Found',
      message: `${message} Errors found:${results.errors.map((error, index) => {
        return ` ---- ${index + 1}) ${error.message} ---- `;
      })}`
    });
  };

  handleError = async err => {
    console.error(err);
    this.resetState();
    await this.props.sdk.dialogs.openAlert({
      title: 'An error occured!',
      message: `${err.message || err}`
    });
  };

  render() {
    return (
      <Dropdown
        isOpen={this.state.isOpen}
        onClose={() => this.setOpen(false)}
        position="bottom-left"
        toggleElement={
          <Button
            size="small"
            buttonType="muted"
            loading={this.state.loading}
            disabled={this.state.loading}
            indicateDropdown
            isFullWidth={true}
            onClick={() => this.setOpen(!this.state.isOpen)}>
            {this.state.dropdownText}
          </Button>
        }>
        <DropdownList>
          <DropdownListItem isTitle>Deep Actions</DropdownListItem>
          <DropdownListItem onClick={this.onPublishButtonClick}>
            Mostly-Deep Publish
          </DropdownListItem>
          <DropdownListItem onClick={this.onUnpublishButtonClick}>Deep Unpublish</DropdownListItem>
          <DropdownListItem onClick={this.onCopyButtonClick}>Deep Copy</DropdownListItem>
          <DropdownListItem onClick={this.onArchiveButtonClick}>Deep Archive</DropdownListItem>
        </DropdownList>
      </Dropdown>
    );
    // return (
    //   <Button
    //     buttonType="muted"
    //     isFullWidth={true}
    //     testId="open-dialog"
    //     loading={this.state.loading}
    //     disabled={this.state.loading}
    //     onClick={this.onArchiveButtonClick}>
    //     Deep Archive
    //   </Button>
    // );
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
