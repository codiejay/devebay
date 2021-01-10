import { 
  Box
} from '@chakra-ui/react';
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Page from './Components/Page';
import NLoggedIn from './Pages/NLoggedin';
import LoggedIn from './Pages/LoggedIn';
import {useCookies} from 'react-cookie';

const App = () => {

  let [cookie, setCookie, removeCookie] = useCookies();
  const [userLoggedIn, setUserLoggedIn] = React.useState(false);
  if(cookie.loggedIn === undefined || cookie.loggedIn == 'false') { 
    setCookie('loggedIn', false);
  }
  console.log(!cookie.loggedIn === false)
  return (
    !cookie.loggedIn === false ? 
    <BrowserRouter>
      <Switch> 
        <Route path='/' component={LoggedIn} /> 
      </Switch>
    </BrowserRouter>
    : 
    <BrowserRouter> 
      <Switch> 
        <Route path='/' component={NLoggedIn} /> 
      </Switch>
    </BrowserRouter>
  );
}

export default App;
