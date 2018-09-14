import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LanguageContinent from './languageContinent';
import LanguageData from '../../../json/modals/languageData';
import '../../../styles/modals/languages/styles.languageModal.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  handleSelectLanguage,
  initializeModal
} from '../../../modules/modals/languageModal.module';

class LanguageModal extends Component {
  componentDidMount() {
    this.props.initializeModal();
  }

  onHandleSelectLanguage = (countryId, continentId) => {
    const { handleSelectLanguage, onCloseModal } = this.props;
    handleSelectLanguage(countryId, continentId);
    onCloseModal();
  };

  _renderBody = () => {
    const { continents } = this.props;
    const { countryId } = this.props.language;
    const listItems = continents.map((continent, index) => (
      <LanguageContinent
        continentIndex={index}
        key={continent.id.toString()}
        continent={continent}
        onLanguageSelect={this.onHandleSelectLanguage}
        countryId={countryId}
        continentId={continent.id - 1}
      />
    ));

    return <div className="LanguageModal-body">{listItems}</div>;
  };

  render() {
    return (
      <div className="LanguageModal">
        <div className="LanguageModal-header">
          <h3 className="LanguageModal-header-title">NATIONAL SELECTION</h3>
        </div>
        {this._renderBody()}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleSelectLanguage,
      initializeModal
    },
    dispatch
  );
};

const mapStateToProps = state => ({
  language: state.get('language')
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageModal);

LanguageModal.defaultProps = {
  continents: LanguageData
};

LanguageModal.propTypes = {
  continents: PropTypes.array,
  onCloseModal: PropTypes.func.isRequired
};
