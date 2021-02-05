import {useState} from 'react';
import {
  Box
} from '@chakra-ui/react';
import Footer from '../Components/Footer';
import NavBar from '../Components/Navbar';
import {auth} from '../firebase';

const Page = ({children}) => {

  auth().onAuthStateChanged((user) => {
    if(user) { 
      setUser(user)
    }
  });

  let [user, setUser] = useState();
  return ( 
    <Box maxWidth='1200px' mx='auto'>
      <NavBar 
        userData={user}
      />
      <Box > 
        {children}
      </Box>
      <Footer />
    </Box>
  )
};

export default Page;