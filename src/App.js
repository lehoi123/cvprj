import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showToast } from './modules/body.module';

import './App.css';
import Body from './views/Body/body';
import Header from './views/Header/header.js';
import Footer from './views/Footer/footer';
import Toast from './components/Toast';

const App = props => {
  const { body } = props;

  const showToast = body.get('showToast');
  const toastMessage = body.get('toastMessage');

  return (
    <div className="App">
      <Header />
      <Body />
      <Footer />

      <Toast message={toastMessage} show={showToast} />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      showToast
    },
    dispatch
  );
};

const mapStateToProps = state => ({
  body: state.get('body')
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
