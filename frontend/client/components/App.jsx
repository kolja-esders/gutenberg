/*
    ./client/components/App.jsx
*/
import React from 'react'
import Main from './Main.jsx'
import Header from './Header.jsx'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Main/>
      </div>);
  }
}
