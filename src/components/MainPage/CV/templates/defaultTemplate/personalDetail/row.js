import React from 'react';
import classNames from 'classnames';

import BaseRow from '../../Base/row.base';
import RowTool from '../../../rowTool';
import Label from './label';
import Value from './value';

class Row extends BaseRow {
  componentDidMount() {
    super.componentDidMount();
  }

  componentDidUpdate() {
    super.componentDidUpdate();
  }

  render() {
    const { data, rowNum, rowCount, thisBase } = this.props;
    const { rowActive } = this.state;
    const classes = classNames({
      row: true,
      rowActive: rowActive === rowNum
    });

    const rowId = data.get('id');

    return (
      <div
        ref={ref => (this.refRow = ref)}
        key={rowId}
        id={rowId}
        className={classes}
      >
        <div className="label">
          <Label
            ref={ref => (this.refLabel = ref)}
            onChange={this.labelOnChange}
            data={data}
            onFocus={this.onLabelFocus}
            onBlur={this.onLabelBlur}
          />
        </div>

        <div className="value colonChar">
          <Value
            ref={ref => (this.refValue = ref)}
            onChange={this.valueOnChange}
            data={data}
            onFocus={this.onValueFocus}
            onBlur={this.onValueBlur}
          />
        </div>

        <RowTool
          onPlusTop={() => {
            this.blur();
            thisBase.onPlusTopRow({ rowNum });
          }}
          onPlusBottom={() => {
            this.blur();
            thisBase.onPlusBottomRow({ rowNum });
          }}
          onDelete={() => {
            this.blur();
            thisBase.onDeleteRow({ rowNum });
          }}
          onUp={() => {
            this.blur();
            thisBase.onUpRow({ rowNum });
          }}
          onDown={() => {
            this.blur();
            thisBase.onDownRow({ rowNum });
          }}
          upDisable={rowNum === 0}
          downDisable={rowNum === rowCount - 1}
        />
      </div>
    );
  }
}

export default Row;
