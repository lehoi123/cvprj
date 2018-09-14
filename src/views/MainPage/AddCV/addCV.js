import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddBtn from '../../../components/MainPage/addBtn';

import { fetchDefaultCV } from '../../../modules/mainPage/cv.module';

class AddCV extends Component {
  render() {
    const { fetchDefaultCV } = this.props;
    return (
      <AddBtn
        onClick={fetchDefaultCV}
        title="Add a CV"
        description="Add a CV to your application"
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchDefaultCV
    },
    dispatch
  );
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCV);
