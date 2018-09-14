import React, { PureComponent } from 'react';
import classnames from 'classnames';

import '../styles/Toast/styles.toast.css';

class Toast extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: props.show
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.props.show) {
      this.setState({
        show: nextProps.show
      });
    }
  }

  render() {
    const { message } = this.props;

    const classes = classnames({
      down: this.state.show === false,
      up: this.state.show === true
    });

    return (
      <div id="Toast" className={classes}>
        <div className="toastContent">
          <p className="message">{message}</p>
        </div>
      </div>
    );
  }
}

export default Toast;
