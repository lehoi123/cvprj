import React, { Component } from 'react';
import AddBtn from '../../../components/MainPage/addBtn';

export default class AddAttachment extends Component {
  render() {
    return (
      <AddBtn
        onClickChooseFile={() => console.log('Add attachment')}
        title="Add attachment"
        description="Drag your attachment here, or click to upload"
      />
    );
  }
}
