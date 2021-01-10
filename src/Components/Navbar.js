import {
  Box,
  Image,
  Grid
} from '@chakra-ui/react';
import Logo from '../Assets/devebayLogo.svg';

const NavBar = () => {
  return ( 
    <Box my='10' bg='primary.100' borderRadius='10px'> 
      <Grid templateColumns={'20% 80%'}>
        <Image 
          aria-label='Devebay official logo'
          src={Logo}
        />
        <Box>
        
        </Box>
      </Grid>
    </Box>
  )
};

export default NavBar;
