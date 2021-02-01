import React from 'react';
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
import { Link } from 'react-router-dom';

const NavBar = ({userData, userAvatar}) => {
  return ( 
    <Box px='4' my='10' bg='primary.100' borderRadius='10px'> 
      <Flex align='center'>
        <Image 
          aria-label='Devebay official logo'
          src={Logo}
        />
        { 
          userData ? 
          <React.Fragment>
            <Spacer />
            <Flex mr={8} align='center' cursor='pointer'>
              <Avatar
                cursor='pointer' 
                display= {userData ? 'block': 'none'}
                src={userData ? userData.photoURL : ''}
                name={userData ? userData.displayName.split(' ')[0] : ''}
                bg='secondary.200'
                border='3px solid #4B65BA'
                color='#fff'
                fontWeight='bold'
              />
              <Icon w={8} h={6} color='#fff' as={ChevronDownIcon}/>
            </Flex>
            <Flex>
              <Link to='/upload'>
                <Button variant='dashedColored' mr='8px'>+</Button> 
                <Button variant='dashedColored'>UPLOAD</Button>
              </Link>
            </Flex>
          </React.Fragment>
          : 
          <br/>
        }
      </Flex>
    </Box>
  )
};

export default NavBar;
