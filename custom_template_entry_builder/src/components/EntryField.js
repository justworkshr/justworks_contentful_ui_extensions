import React from 'react';
import PropTypes from 'prop-types';

import {
  TextInput,
  DropdownList,
  DropdownListItem,
  EntryCard
} from '@contentful/forma-36-react-components';

import { getStatus, getEntryContentTypeId } from '../utils';
import classnames from 'classnames';

class EntryField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const renderEntryCard = () => {
      return (
        <EntryCard
          draggable
          loading={this.props.isLoading}
          className={classnames('role-section__entity')}
          size="small"
          title={this.props.entry ? this.props.entry.fields.name['en-US'] : 'Loading...'}
          contentType={
            this.props.entry.sys.contentType ? getEntryContentTypeId(this.props.entry) : null
          }
          status={getStatus(this.props.entry)}
          withDragHandle={true}
          isDragActive={this.props.isDragActive}
          onDragStart={e => this.onDragStart(e, this.props.roleKey, this.props.entry.sys.id)}
          onDragEnd={e => this.onDragEnd(e)}
          onDragEnter={e => this.onDragEnter(e, this.props.roleKey, this.props.entry.sys.id)}
          onDragOver={e => this.onDragEnter(e, this.props.roleKey, this.props.entry.sys.id)}
          onDragLeave={e => this.onDragLeave(e, this.props.entry.sys.id)}
          onDrop={e => this.onDrop(e)}
          onClick={() => this.props.onEditClick(this.props.entry)}
          dropdownListElements={
            <DropdownList>
              <DropdownListItem isTitle>Actions</DropdownListItem>
              <DropdownListItem onClick={() => this.props.onEditClick(this.props.entry)}>
                Edit
              </DropdownListItem>
              <DropdownListItem onClick={() => this.props.onRemoveClick(this.props.roleKey)}>
                Remove
              </DropdownListItem>
            </DropdownList>
          }
        />
      );
    };

    const renderTextField = value => {
      return (
        <TextInput onChange={e => this.props.onFieldChange(e, this.props.roleKey)} value={value} />
      );
    };

    return (
      <div className="custom-template-entry-field">
        {this.props.entry.sys.type === 'Entry' && renderEntryCard()}
        {this.props.entry.sys.type === 'Field' &&
          this.props.entry.fields.type === 'text' &&
          renderTextField(this.props.entry.fields.value)}
      </div>
    );
  }
}
EntryField.defaultProps = {
  entry: {
    sys: {}
  },
  roleKey: '',
  isLoading: false,
  isDragActive: false,
  onEditClick: () => {},
  onRemoveClick: () => {}
};

EntryField.propTypes = {
  entry: PropTypes.object,
  roleKey: PropTypes.string,
  isDragActive: PropTypes.bool,
  isLoading: PropTypes.bool,
  onEditClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  onFieldChange: PropTypes.func
};

export default EntryField;
