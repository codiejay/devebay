import {
  Box
} from '@chakra-ui/react';
import Footer from '../Components/Footer';
import NavBar from '../Components/Navbar';

const Page = ({children}) => {
  return ( 
    <Box maxWidth='1200px' mx='auto'>
      <NavBar />
      <Box > 
        {children}
      </Box>
      <Footer />
    </Box>
  )
};

export default Page;