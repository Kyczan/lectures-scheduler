import React from 'react';
import ReactDOM from 'react-dom';

export class MyPage extends React.Component{
  render(){
    return(
      <div>
        test3
      </div>
    );
  }
}

ReactDOM.render(
  <MyPage />,
  document.getElementById('app')
);