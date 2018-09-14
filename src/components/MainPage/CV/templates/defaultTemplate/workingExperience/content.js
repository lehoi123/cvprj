import React from 'react';
import Immutable from 'immutable';

import Row from './row';

const Content = props => {
  const { datas, thisBase } = props;
  const rowsData = datas.get('rowsData');
  const rowCount = rowsData.count();

  return (
    <div className="rows">
      {rowsData.map((data, index) => {
        if (Immutable.Iterable.isIterable(data)) {
          return (
            <Row
              key={index}
              data={data}
              rowNum={index}
              rowCount={rowCount}
              thisBase={thisBase}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default Content;
