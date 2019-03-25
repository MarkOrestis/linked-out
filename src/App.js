import React, { Component } from 'react';
import './App.css';
import ButtonAppBar from './Components/ButtonAppBar';
import SignIn from './Components/SignIn';
import RegistrationForm from './Components/RegistrationForm';

class App extends Component {
  render() {
    return (
      <RegistrationForm></RegistrationForm>
    );
  }
}

export default App;
