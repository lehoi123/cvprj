import React, { Component } from 'react';
import TemplateData from '../../../json/modals/templateData';
import '../../../styles/modals/templates/styles.templateModal.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import {
  initializeModal,
  handleSelectTemplate
} from '../../../modules/modals/templateModal.module';
import Constant from '../../../config/constant';

class TemplateModal extends Component {
  componentDidMount() {
    const { initializeModal } = this.props;
    initializeModal(Constant.templateModal.storageKey);
  }

  /* RENDER CLASSIC BLOCK */
  _renderClassic = () => {
    const { templateId } = this.props.template;
    const classicRow = TemplateData.classic.map((classic, _index) => (
      <div
        key={classic.id}
        className="TemplateModal-block-row"
        onClick={() => this.props.handleSelectTemplate(classic.id)}
      >
        <img
          src={classic.url}
          className={classNames('TemplateModal-block-img', {
            'TemplateModal-block-highlight': classic.id == templateId
          })}
        />
      </div>
    ));

    return classicRow;
  };

  /* RENDER PROFESSIONAL BLOCK */
  _renderProfessional = () => {
    const { templateId } = this.props.template;
    const professionalRow = TemplateData.professional.map(
      (professional, _index) => (
        <div
          key={professional.id}
          className="TemplateModal-block-row"
          onClick={() => this.props.handleSelectTemplate(professional.id)}
        >
          <img
            src={professional.url}
            className={classNames('TemplateModal-block-img', {
              'TemplateModal-block-highlight': professional.id == templateId
            })}
          />
        </div>
      )
    );

    return professionalRow;
  };

  submitOnHandle = () => {
    const { onCloseModal } = this.props;

    onCloseModal();
  };

  render() {
    return (
      <div className="TemplateModal">
        <div className="TemplateModal-container">
          <div className="TemplateModal-header">
            <span>CLASSIC & RESUME</span>
          </div>
          <div className="TemplateModal-container-classic Template-content">
            {this._renderClassic()}
          </div>

          <div className="TemplateModal-header">
            <span>MODERN & PROFESSIONAL</span>
          </div>

          <div className="TemplateModal-container-professional Template-content">
            {this._renderProfessional()}
          </div>
        </div>

        <div className="TemplateModal-footer">
          <button
            className="TemplateModal-footer-cancel"
            onClick={this.props.onCloseModal}
          >
            CANCEL
          </button>
          <button
            className="TemplateModal-footer-submit"
            onClick={this.submitOnHandle}
          >
            SUBMIT
          </button>
        </div>
      </div>
    );
  }
}

/**
|--------------------------------------------------
| CONFIGURE TO CONNECT TO REDUX STORE
|--------------------------------------------------
*/
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      initializeModal,
      handleSelectTemplate
    },
    dispatch
  );
};

const mapStateToProps = state => ({
  template: state.get('template')
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateModal);
