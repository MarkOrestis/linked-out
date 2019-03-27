import React, { Component } from 'react';
import './App.css';
import ButtonAppBar from './Components/ButtonAppBar';
import Profile from './Components/Profile';
import Dashboard from './Components/Dashboard';
import SignIn from './Components/SignIn';
import RegistrationForm from './Components/RegistrationForm';

class App extends Component {
  render() {
    return (
      <Profile></Profile>
    );
  }
}

export default App;
