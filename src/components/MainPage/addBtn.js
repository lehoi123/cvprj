import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import '../../styles/mainPage/addCoverLetter/styles.addCoverLetter.css';

class AddBtn extends PureComponent {
  onClickChooseFile = () => {
    this.chooseFile.click();
    this.props.onClickChooseFile();
  };

  render() {
    const { onClick, onClickChooseFile, title, description } = this.props;
    return (
      <div className="coverLetter">
        <input
          className="hide"
          type="file"
          ref={ref => (this.chooseFile = ref)}
        />
        <div
          onMouseDown={onClickChooseFile ? this.onClickChooseFile : onClick}
          className="addCoverLetter"
        >
          <i className="cv-icon cv-add" />
          <p className="title">{title}</p>
          <p className="description">{description}</p>
        </div>
      </div>
    );
  }
}

AddBtn.propTypes = {
  onClick: PropTypes.func,
  onClickChooseFile: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string
};

export default AddBtn;
