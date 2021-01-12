import Page from '../Components/Page';
import { 
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Tooltip,
  Image,
  Tag,
} from '@chakra-ui/react';
import {AiOutlineGithub} from 'react-icons/ai';
import {BiCrown} from 'react-icons/bi';
import DetailCard from '../Components/DetailCard';
import helpIcon from '../Assets/helpp.svg';
import {firestore, auth} from '../firebase';
import rockHand from '../Assets/rockhand.png';


const LoggedIn = ({userData}) => { 
  console.log(userData ? userData.displayName : 'userData.displayName')
  const regularSignUp = () => { 
    let provider = new auth
    .GithubAuthProvider();
    
    provider.addScope('repo');

    auth().signInWithPopup(provider).then((res) => { 
      firestore.collection('users')
      .doc(res.user.uid)
      .set({ 
        userName: res.additionalUserInfo.username,
        avatar: res.user.photoURL,
        email: res.user.email,
        isEarlyAdopter: false
      })
      .then(() => {
        
      })
      .catch(() => {alert('please try again')})
    })

  }

  const earlyAdopterSignUp = () => { 

  }
  return ( 
    <Page>
      <Flex p='8' bg='primary.100' borderRadius='13px'>
        <Box w='80%'>
          <Tag 
            fontWeight='bold' 
            bg='#B3C4F9' 
            color='#fff'
            p='2'
            mb='10'
            textTransform='capitalize'
          >
            Hey {`${userData ? userData.displayName : 'user'}`}
          </Tag>
          <Heading mb='10' fontSize='60px' color='#fff'>
            What would you buy <br/> from  a Developer today?
          </Heading>
          <Button 
            color='#fff' 
            bg='secondary.200'  
            leftIcon={<BiCrown size='26'/>} 
            variant='hugeButton'
          >
            Scroll to find out
          </Button>
        </Box>
        <Box>
          <Image w='170px' mt='-110%' src={rockHand} />
        </Box>
      </Flex>
    </Page>
  )
}

export default LoggedIn;