import { 
  Box
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Page from './Components/Page';
import NLoggedIn from './Pages/NLoggedin';
import LoggedIn from './Pages/LoggedIn';
import {auth} from './firebase';
import Upload from './Pages/Upload';
import IndividualItem from './Pages/IndividualItem';

const App = () => {

  const [userLoggedIn, setUserLoggedIn] = React.useState(false);
  auth().onAuthStateChanged((user) => {
    if(user) { 
      setUserLoggedIn(true);
      setUserData(user)
    }
  });
  let [userData, setUserData] = useState();
  return (
    userLoggedIn ? 
    <BrowserRouter>
      <Switch> 
        <Route exact path='/' component={() => { 
          return ( 
            <LoggedIn />
          )
        }} /> 
        <Route 
          path='/upload'
          component={() => {
            return ( 
              <Upload userData={userData}/>
            )
          }}
        />
        <Route 
          path='/i/:productId'
          component={() => {
            return ( 
              <IndividualItem userData={userData}/>
            )
          }}
        />
      </Switch>
    </BrowserRouter>
    : 
    <BrowserRouter> 
      <Switch> 
        <Route path='/' component={() => {
          return (
            <NLoggedIn />
          )
        }} /> 
      </Switch>
    </BrowserRouter>
  );
}

export default App;
