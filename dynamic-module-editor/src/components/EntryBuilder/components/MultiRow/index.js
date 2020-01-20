import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EntryField from '../EntryField';

const MultiRow = props => {
  const [dragged, setDragged] = useState(undefined);
  const [draggedOver, setDraggedOver] = useState(undefined);

  const onDragStart = entry => {
    setDragged(entry);
  };

  const onDragOver = entry => {
    setDraggedOver(entry);
  };

  const onDragEnd = e => {
    e.preventDefault();
    if ((dragged !== 0 && !dragged) || (draggedOver !== 0 && !draggedOver)) return;
    if (dragged === draggedOver) return;
    props.onMultiReferenceDragEnd(props.roleKey, dragged, draggedOver);
    setDragged(undefined);
    setDraggedOver(undefined);
  };

  return (
    <div className="asset-row">
      {props.roleMappingObject.value.map((entry, index) => {
        const e =
          props.hydratedEntries.find(he => he.sys.id === entry.value) ||
          props.hydratedAssets.find(a => a.sys.id === entry.value);

        return (
          <EntryField
            key={`entryfield-${props.roleKey}-${index}`}
            className="max-width-600"
            entry={e}
            entryIndex={index}
            propertyType={entry.type}
            isLoading={e && !!props.loadingEntries.includes((e.sys || {}).id)}
            roleKey={props.roleKey}
            roleConfig={props.roleConfigObject}
            onEditClick={props.onEditClick}
            onDeepCopyClick={props.onDeepCopyClick}
            onDuplicateClick={props.onDuplicateClick}
            onRemoveClick={props.onRemoveClick}
            onFieldChange={props.onFieldChange}
            roleMappingObject={props.roleMappingObject}
            onDragStart={() => onDragStart(index)}
            onDragOver={() => onDragOver(index)}
            onDragEnd={onDragEnd}
            isDragActive={index === dragged || index === draggedOver}
          />
        );
      })}
    </div>
  );
};

MultiRow.propTypes = {
  roleKey: PropTypes.string,
  hydratedEntries: PropTypes.array,
  hydratedAssets: PropTypes.array,
  loadingEntries: PropTypes.array,
  roleConfigObject: PropTypes.object,
  roleMappingObject: PropTypes.object,
  onEditClick: PropTypes.func,
  onDeepCopyClick: PropTypes.func,
  onDuplicateClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  onFieldChange: PropTypes.func,
  onMultiReferenceDragEnd: PropTypes.func
};
MultiRow.defaultProps = {};

export default MultiRow;
