import React from 'react';
import PropTypes from 'prop-types';
import { HelpText, TextLink, FormLabel, Tooltip } from '@contentful/forma-36-react-components';
import ErrorList from '../ErrorList';
import * as c from '../../constants';
import './style.scss';



const ColorField = props => {
  const COLOR_TOKENS = c[`${props.theme.toUpperCase()}_COLORS`]


  return (
    <div className="color-field" data-test-id="color-field">
      <HelpText>Theme: {props.theme.toUpperCase()}</HelpText>
      <div className="color-field__swatches f36-margin-bottom--s">
        {COLOR_TOKENS.map(color => {
          const id = `color-swatch--${props.propKey}-${color.name.replace(/\s/g, "")}`;
          return (
            <div key={id} className="color-field__swatch-container">
              <Tooltip id={id} content={color.name} >
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
        <FormLabel htmlFor={`color-field--${props.propKey}`}>{props.value || '(blank)'}</FormLabel>
        {COLOR_TOKENS.find(c => props.value === c.hex) && (
          <HelpText className="f36-margin-left--xs d-inline-block">
            {COLOR_TOKENS.find(c => props.value === c.hex).name}
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
  errors: PropTypes.array,
  theme: PropTypes.string
};
ColorField.defaultProps = {
  errors: [],
  theme: "jms__tlc"
};

export default ColorField;
