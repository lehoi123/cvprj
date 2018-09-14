import React, { PureComponent } from 'react';
import TextEditor from '../../../textEditor/textEditor';

class Label extends PureComponent {
  focus() {
    this.refInput.focus();
  }

  blur() {
    this.refInput.blur();
  }

  render() {
    const { onChange, data, onFocus, onBlur } = this.props;
    return (
      <TextEditor
        ref={ref => (this.refInput = ref)}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={data.get('label')}
      />
    );
  }
}

export default Label;
