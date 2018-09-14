import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import '../../styles/modals/styles.baseModal.css';
class Modal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: props.isOpen,
      width: null
    };
  }

  open = () => {
    const { onOpened } = this.props;
    this.setState(
      {
        show: true
      },
      () => {
        if (typeof onOpened === 'function') {
          onOpened();
        }
      }
    );
  };

  close = () => {
    const { onClosed } = this.props;
    this.setState(
      {
        show: false
      },
      () => {
        if (typeof onClosed === 'function') {
          onClosed();
        }
      }
    );
  };

  render() {
    const { children, showCloseBtn, shareMobile, autoWidth } = this.props;
    const { show } = this.state;
    const displayCloseBtn = showCloseBtn ? 'block' : 'none';

    const modalStyle = {
      width: shareMobile ? null : 596
    };
    if (autoWidth) {
      modalStyle.width = 'auto';
    }

    if (!show) {
      return null;
    }

    return (
      <div id="modal">
        <div
          className="overplay"
          onMouseDown={event => {
            event.preventDefault();
            this.close();
          }}
        />
        <div className="Modal" style={modalStyle}>
          <div className="Modal-shadow">
            <div
              className="Modal-close"
              style={{
                display: displayCloseBtn
              }}
            >
              <i
                className="cv-icon cv-close"
                data-dismiss="modal"
                onMouseDown={event => {
                  event.preventDefault();
                  this.close();
                }}
              />
            </div>

            <div className="Modal-content" ref={ref => (this.refContent = ref)}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;

Modal.propTypes = {
  style: PropTypes.object,
  isOpen: PropTypes.bool,
  onOpened: PropTypes.func,
  onClosed: PropTypes.func,
  showCloseBtn: PropTypes.bool
};

Modal.defaultProps = {
  isOpen: false,
  showCloseBtn: true
};
