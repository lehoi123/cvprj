import React from 'react';

import TextEditor from '../../../textEditor/textEditor';
import BaseHeading from '../../Base/heading.base';

class Heading extends BaseHeading {
  render() {
    const { datas } = this.props;
    const heading = datas.get('heading');

    return (
      <h3 ref={ref => (this.refHeading = ref)}>
        <TextEditor
          ref={ref => (this.refInput = ref)}
          onFocus={this.onHeadingFocus}
          onBlur={this.onHeadingBlur}
          onChange={this.headingOnChange}
          value={heading}
        />
      </h3>
    );
  }
}

export default Heading;
