import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LanguageCountry from './languageCountry';
import '../../../styles/modals/languages/styles.languageContinent.css';

class LanguageContinent extends PureComponent {
  renderSeparator = () => {
    if (this.props.continentIndex < 4) {
      return <hr className="LanguageContinent-separator" />;
    }
  };

  render() {
    const { continent, onLanguageSelect, countryId, continentId } = this.props;

    const languageList = continent.countries.map((country, index) => (
      <LanguageCountry
        key={country.id.toString()}
        countryId={country.id}
        continentId={continentId}
        label={country.name}
        iconClass={country.icon}
        isHighlight={countryId === country.id}
        handleOnClick={onLanguageSelect}
      />
    ));

    return (
      <div className="LanguageContinent">
        <div>
          <h3 className="LanguageContinent-name">{continent.name}</h3>
        </div>
        <div className="LanguageContinent-list-country">{languageList}</div>
        {this.renderSeparator()}
      </div>
    );
  }
}

export default LanguageContinent;
