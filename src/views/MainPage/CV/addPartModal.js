import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Parts from '../../../json/cv/parts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icon from '@fortawesome/free-solid-svg-icons';

export default class AddPartModal extends PureComponent {
  static get defaultProps() {
    return {
      onChange: () => {}
    };
  }

  static get propTypes() {
    return {
      onChange: PropTypes.func
    };
  }

  onChange(value) {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(value);
    }
  }

  renderPart = () => {
    var partsView = [];
    Object.keys(Parts).forEach((partName, partIndex) => {
      let partData = Parts[partName];
      if (partData.display === true) {
        partsView.push(
          <div
            className="item"
            key={partIndex}
            onMouseDown={event => {
              event.preventDefault();
              this.onChange(partData);
            }}
          >
            <div className="itemBody">
              <div className="iconBox">
                <FontAwesomeIcon icon={Icon[partData.icon]} />
              </div>
            </div>
            <div className="itemName">
              <p>{partData.name}</p>
            </div>
          </div>
        );
      }
    });
    return partsView;
  };

  render() {
    return (
      <div className="addPartModal">
        <div className="heading">
          <h3>Add a new section</h3>
        </div>
        <div className="content">{this.renderPart()}</div>
      </div>
    );
  }
}
