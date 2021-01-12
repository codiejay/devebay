import {
  Box,
  Image,
  Grid,
  Flex,
  Spacer,
  Button,
  Avatar,
  Icon
} from '@chakra-ui/react';
import Logo from '../Assets/devebayLogo.svg';
import {ChevronDownIcon} from '@chakra-ui/icons';

const NavBar = ({userData, userAvatar}) => {
  console.log(userData)
  return ( 
    <Box px='4' my='10' bg='primary.100' borderRadius='10px'> 
      <Flex align='center'>
        <Image 
          aria-label='Devebay official logo'
          src={Logo}
        />
        <Spacer />
        <Flex mr={8} align='center' cursor='pointer'>
          <Avatar
            cursor='pointer' 
            display= {userData ? 'block': 'none'}
            src={userData ? userData.photoURL : ''}
            name={userData ? userData.displayName : ''}
            bg='secondary.200'
            border='3px solid #4B65BA'
          />
          <Icon w={8} h={6} color='#fff' as={ChevronDownIcon}/>
        </Flex>
        <Flex>
            <Button variant='dashedColored' mr='8px'>+</Button>
            
            <Button variant='dashedColored'>UPLOAD</Button>
        </Flex>
      </Flex>
    </Box>
  )
};

export default NavBar;
