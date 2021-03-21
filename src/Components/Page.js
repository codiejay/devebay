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
    <Box maxWidth={{base: '95%', md: '90%', lg: '1200px'}} mx='auto'>
      <NavBar 
        userData={user ? user : ''}
      />
      <Box> 
        {children}
      </Box>
      <Footer />
    </Box>
  )
};

export default Page;