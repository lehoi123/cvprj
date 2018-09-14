import UIDHelper from './uid.helper';

class LanguageHelper {
  gContinent(name, countries) {
    return {
      id: UIDHelper.guid(),
      name: name,
      countries: countries
    };
  }

  gCountry(name, icon, selected = false) {
    return {
      id: UIDHelper.guid(),
      name: name,
      icon: icon,
      selected: selected
    };
  }
}

export default new LanguageHelper();
