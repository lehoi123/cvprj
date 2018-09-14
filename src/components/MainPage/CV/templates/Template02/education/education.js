import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import RowTool from '../../../rowTool';
import BaseTemplate, {
  mapDispatchToProps,
  mapStateToProps
} from '../../Base/template.base';

import Heading from './heading';
import Content from './content';

/**
 * Main of this compoent
 */
class Education extends BaseTemplate {
  componentDidMount() {
    super.componentDidMount();
  }

  componentDidUpdate() {
    super.componentDidUpdate();
  }

  render() {
    const { headingPartActive, rowPartActive } = this.state;
    const {
      showBaseLine,
      pageNum,
      pagesLength,
      partNum,
      partsLength,
      passDatas,
      datas
    } = this.props;

    const classes = classNames({
      part: true,
      education: true,
      baseLine: showBaseLine,
      headingPartActive,
      rowPartActive
    });

    const bottomLineStyles = {
      borderColor: passDatas.get('primaryColor')
    };

    // disable up button when..
    const isFirstPage = pageNum === 0;
    const isSecondPart = partNum === 1;

    // disable down button when..
    const isLastPage = pageNum === pagesLength - 1;
    const isLastPart = partNum === partsLength - 1;

    return (
      <div className={classes} ref={ref => (this.refPart = ref)}>
        <div className="partContent">
          <div className="heading">
            <Heading datas={datas} thisBase={this} />
            <RowTool
              onPlusTop={this.onPlusTopPart}
              onPlusBottom={this.onPlusBottomPart}
              onDelete={this.onDeletePart}
              onUp={this.onUpPart}
              onDown={this.onDownPart}
              upDisable={isFirstPage && isSecondPart}
              downDisable={isLastPage && isLastPart}
            />
          </div>

          <div className="contents">
            <Content datas={datas} thisBase={this} />
          </div>
        </div>

        <div className="bottomLine" style={bottomLineStyles} />
      </div>
    );
  }
}

Education.defaultProps = {
  rowsData: [],
  showBaseLine: true
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Education);
