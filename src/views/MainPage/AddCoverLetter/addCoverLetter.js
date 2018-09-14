import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddBtn from '../../../components/MainPage/addBtn';
import { fetchCoverLetterDefault } from '../../../modules/mainPage/coverLetter.module';

class AddCoverLetter extends PureComponent {
  render() {
    //const { fetchCoverLetterDefault } = this.props;

    return (
      <AddBtn
        //onClick={fetchCoverLetterDefault}
        title="Add cover letter"
        description="Add a cover letter to your application"
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCoverLetterDefault
    },
    dispatch
  );
};

const mapStateToProps = state => ({
  coverLetter: state.get('coverLetter')
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCoverLetter);
