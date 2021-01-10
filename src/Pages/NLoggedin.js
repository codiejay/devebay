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
import {useCookies} from 'react-cookie';


const NLoggedIn = ({}) => { 
  //cookies setting 
  let [cookie, setCookies, deleteCookies] = useCookies();
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
        setCookies('loggedIn', true)
      })
      .catch(() => {alert('please try again')})
    })

  }

  const earlyAdopterSignUp = () => { 

  }

  // let [loggedIn, setLoggedIn] = useState(false);
  return ( 
    <Page>
      <Flex h='80vh' justify='center' align='center'>
        <Box>
          <Heading 
            textTransform='capitalize' 
            size='h1' 
            color='secondary.200'
            textAlign='center'
            mb='10'
            mx='auto'
            w='98%'
          >
            An open online thrift store for Developers
          </Heading>
          <Text color='neutral.200' fontSize='xl' textAlign='center'>Safely sell and buy items from developers anywhere around the world. </Text>
          <Flex mt='12' w='fit-content' mx='auto' justify='center' align='center'>
            <Tooltip 
              mr='6' 
              hasArrow 
              label='We use github to authenticate just to make sure that every user on Devebay is actually a developer. '
            >
              <Button onClick={regularSignUp} leftIcon={<AiOutlineGithub size='26'/>} variant='hugeButton'>Join with Github</Button>
            </Tooltip>
            <Tooltip 
              hasArrow
              label='Clicking on this button to join Devebay would allow us recongnize you as an early adopter.'
            > 
              <Button color='#fff' bg='secondary.200' ml='8' leftIcon={<BiCrown size='26'/>} variant='hugeButton'>Become an early adopter</Button>
            </Tooltip>
          </Flex>
        </Box>
      </Flex>
      <Box h='auto' p='5' mb='10'> 
        <Flex>
          <Tag mr='3' p='4' bg='secondary.200' fontSize='lg'>✨</Tag>
          <Tag bg='secondary.200' color='#fff' >Selling with Devebay</Tag>
        </Flex>
        <Text fontSize='sm' w='50%' my='4'>
          Setting up your item to be sold on Devebay will happen faster than setting up a React.js Application. Let’s show you how
        </Text>
        <Flex>
          <DetailCard 
            tag='Say Chess'
            heading='Take an okay Picture of your Item'
            body='Other devs would be viewing your item you put up for sale- so uploading a having a picture that would depict your item to be sold would help your potential buyers make better decisions-'
          />
          <DetailCard 
            tag='Pew Peww'
            heading='Upload Your Item'
            body='After having the okay image of your item, sign into your Devebay Account, click on the upload button, upload your image and other needed and optional details-'
          />
          <DetailCard 
            tag='Cha-Ching'
            heading='Receive Orders- $$'
            body='Other devs would be viewing your item you put up for sale and can place an order for it. You can look through these order(s) and select which you would love to sell to. The contact details of your potential buyer would be available upon acceptance of order and you can contact them directly- easy right?'
          />
        </Flex>
      </Box>

      <Box h='auto' p='5' mb='10'> 
        <Flex>
          <Tag mr='3' p='4' bg='secondary.100' fontSize='lg'>🔥</Tag>
          <Tag bg='secondary.100' color='#fff' >Buying on Devebay</Tag>
        </Flex>
        <Text fontSize='sm' w='50%' my='4'>
          Buying items on Devebay is easier that trying to understand a stackoverflow answer. 
        </Text>
        <Flex>
          <DetailCard 
            tag='Swosh'
            heading='Scroll through items'
            body='One you sucessfully login with Devebay, you would be able to see the list of items that other Developers have listed for sale. You can scroll through and find whatever you want'
          />
          <DetailCard 
            tag='Din-Dong'
            heading='Place your order'
            body='Placing an order for an item notifies the developer who is selling the item. You would be asked to provide an email you comfortable giving out- and the seller would only have access to email you once they are willing to sell to you. '
          />
        </Flex>
      </Box>

      <Box bg='primary.100' p='6' borderRadius='16px'>
        <Flex align='center' justify='center'> 
          <Box>
            <Heading size='h1' mb='8' color='#fff'>Help,</Heading>
            <Text 
              lineHeight='taller' 
              fontSize='md' 
              color='#fff' 
              w='80%'
            >
              We (Team Devebay) are in our early days of bringing Devebay to life and we can’t do this without some help. if your truly believe in out idea of an online throift store exclusively for developers-  we urge you to please upload some items you TRULY would love to sell to that you think other developers would find useful. We  would appreciate your upload and we will always remember when you helped us grow.
            </Text>
            <Tooltip 
              hasArrow
              label='Clicking on this button to join Devebay would allow us recongnize you as an early adopter.'
              placement='right'
            > 
              <Button color='#fff' bg='secondary.200' mt='8' leftIcon={<BiCrown size='26'/>} variant='hugeButton'>Lend us a hand</Button>
            </Tooltip>
          </Box>
          <Box w='90%'>
            <Image src={helpIcon} />
          </Box>
        </Flex>
      </Box>
    </Page>
  )
}

export default NLoggedIn;