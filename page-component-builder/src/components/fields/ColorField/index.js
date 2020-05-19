import React from 'react';
import PropTypes from 'prop-types';
import { HelpText, TextLink, FormLabel, Tooltip } from '@contentful/forma-36-react-components';
import ErrorList from '../ErrorList';
import * as c from '@shared/constants';
import './style.scss';

const ColorField = props => {
  return (
    <div className="color-field" data-test-id="color-field">
      <div className="color-field__swatches f36-margin-bottom--s">
        {c.BRAND_COLORS.map(color => {
          const id = `color-swatch--${props.propKey}-${color.name}`;
          return (
            <div key={id} className="color-field__swatch-container">
              <Tooltip place="top" id={id} content={color.name}>
                <TextLink
                  id={id}
                  className="color-field__swatch"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => props.onChange(color.hex)}
                />
              </Tooltip>
            </div>
          );
        })}
      </div>
      <div>
        <FormLabel htmlFor={`color-field--${props.propKey}`}>{props.value}</FormLabel>
        {c.BRAND_COLORS.find(c => props.value === c.hex) && (
          <HelpText className="f36-margin-left--xs d-inline-block">
            {c.BRAND_COLORS.find(c => props.value === c.hex).name}
          </HelpText>
        )}
      </div>
      <input
        className="color-field__swatch"
        data-test-id="color-field__input"
        type="color"
        id={`color-field--${props.propKey}`}
        onChange={e => props.onChange(e.target.value)}
        value={props.value || ''}
      />

      <ErrorList errors={props.errors} />
    </div>
  );
};

ColorField.propTypes = {
  propKey: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  errors: PropTypes.array
};
ColorField.defaultProps = {
  errors: []
};

export default ColorField;
