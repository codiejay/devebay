import React from 'react';
import {
  Box,
  Image,
  Flex,
  Spacer,
  Button,
  Avatar,
} from '@chakra-ui/react';
import Logo from '../Assets/devebayLogo.svg';
import {ChevronDownIcon} from '@chakra-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import {firestore} from '../firebase';

const NavBar = ({userData, userAvatar}) => {
  let history = useHistory();
  let [githubUserName, setGithubUserName] = React.useState('')

  React.useEffect(() => {
    let mounted = true
    firestore.collection('users')
    .doc(userData.email)
    .get()
    .then((d) => {
      if(mounted) { 
        setGithubUserName(d.data())
      }
    })
    return () => {mounted=false}
  }, [userData])

  return ( 
    <Box px='4' my='10' bg='primary.100' borderRadius='10px'> 
      <Flex align='center'>
        <Link to='/'>
          <Image 
            aria-label='Devebay official logo'
            src={Logo}
          />
        </Link>
        { 
          userData ? 
          <React.Fragment>
            <Spacer />
            <Flex mr={8} align='center' cursor='pointer'>
              <Link>
                <Avatar
                  onClick={() =>  {history.push(`/u/${githubUserName.username}`)}}
                  cursor='pointer' 
                  display= {userData ? 'block': 'none'}
                  src={userData ? userData.photoURL : ''}
                  name={userData ? userData.displayName.split(' ')[0] : ''}
                  bg='secondary.200'
                  border='3px solid #4B65BA'
                  color='#fff'
                  fontWeight='bold'
                />
              </Link>
            </Flex>
            <Flex>
              <Link onClick={() => {history.push('/upload')}}>
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
