import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// import './radiobutton-field.scss';

function RadiobuttonField({children, ...props}) {
  return (
    <div className={classnames('radiobutton-field', props.className, { active: props.checked })}>
      <input
        {...props}
        className="radiobutton-field__input"
        type="radio"
      />
      <label className="radiobutton-field__label" htmlFor={props.id}>
        {children}
      </label>
    </div>
  );
}

RadiobuttonField.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.object]).isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  checked: PropTypes.bool.isRequired
};

RadiobuttonField.defaultProps = {
  className: ''
};

export default RadiobuttonField;
