/*
    ./client/components/App.jsx
*/
import React from 'react'
import BookTable from './BookTable.jsx'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <BookTable/>
        <div style={{textAlign: 'center'}}>
          <h1>Hello World</h1>
        </div>
      </div>);
  }
}
