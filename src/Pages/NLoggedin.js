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
  Grid,
  GridItem
} from '@chakra-ui/react';
import {AiOutlineGithub} from 'react-icons/ai';
import {BiCrown} from 'react-icons/bi';
import DetailCard from '../Components/DetailCard';
import helpIcon from '../Assets/helpp.svg';
import {firestore, auth} from '../firebase';
import {useCookies} from 'react-cookie';


const NLoggedIn = ({setLoggedIn}) => { 

  const earlyAdopterSignUp = () => { 
    let provider = new auth
    .GithubAuthProvider();
    
    provider.addScope('repo');

    auth().signInWithPopup(provider)
    .then((res) => { 
      if(res.additionalUserInfo.isNewUser) { 
        firestore.collection('users')
        .doc(res.user.email)
        .set({ 
          email: res.user.email,
          uid: res.user.uid,
          username: res.additionalUserInfo.username,
          followers: res.additionalUserInfo.profile.followers,
          earlyAdopter: true,
          orderPlaced: []
        })
        .then(() => {window.location.reload()})
      }
    })
  }

  return ( 
    <Page>
      <Flex transition='ease-in-out' h={{base: '80vh', lg: '85vh', md: '80vh'}} justify='center' align='center'>
        <Box>
          <Heading 
            textTransform='capitalize' 
            size='h1'
            color='secondary.200'
            textAlign={{base: 'left', lg: 'center', md: 'center'}}
            mb='10'
            mx='auto'
          >
            An open online thrift store for Developers
          </Heading>
          <Text 
            color='neutral.200' 
            fontSize={{base: 'xl', lg: 'xl', md: '2xl'}}
            textAlign={{base: 'left', lg: 'center', md: 'center'}}
          > 
            Safely sell and buy items from developers anywhere around the world. 
          </Text>
          <Flex mt='12' w='fit-content' mx={{base: '0', lg: 'auto', md: 'autp'}} justify='center' align='center'>
            {/* <Tooltip 
              mr='6' 
              hasArrow 
              label='We use github to authenticate just to make sure that every user on Devebay is actually a developer. '
            >
              <Button onClick={regularSignUp} leftIcon={<AiOutlineGithub size='26'/>} variant='hugeButton'>Join with Github</Button>
            </Tooltip> */}
            <Tooltip 
              hasArrow
              label='Clicking on this button to join Devebay would allow us recongnize you as an early adopter.'
            > 
              <Button 
                py={{base: '33px', md: '38px', lg: '25px'}}
                color='#fff' 
                bg='secondary.200' 
                leftIcon={<BiCrown   />} variant='hugeButton'
                onClick={earlyAdopterSignUp}
                fontSize={{base: 'xl', lg: 'xl', md: '3xl'}}
              >
                Become an early adopter
              </Button>
            </Tooltip>
          </Flex>
        </Box>
      </Flex>
      <Box h='auto' p='5' mb='10'> 
        <Flex>
          <Tag mr='3' p='4' bg='secondary.200' fontSize='lg'>✨</Tag>
          <Tag bg='secondary.200' color='#fff' >Selling with Devebay</Tag>
        </Flex>
        <Text fontSize='sm' w={{base: '100%', lg: '50%', md: '50%'}} my='4'>
          Setting up your item to be sold on Devebay will happen faster than setting up a React.js Application. Let’s show you how
        </Text>
        <Grid 
          columnGap='1rem'
          templateColumns={{
            base: '100%', 
            lg: 'repeat(3, 33.3%)', 
            md: '90%'
          }}
          gridAutoRows='1fr'
          gridRowGap='1rem'
        > 
          <GridItem>
            <DetailCard 
              tag='Say Chess'
              heading='Take an okay Picture of your Item'
              body='Other devs would be viewing your item you put up for sale- so uploading a having a picture that would depict your item to be sold would help your potential buyers make better decisions-'
            />
          </GridItem>
          <GridItem>
            <DetailCard 
              tag='Pew Peww'
              heading='Upload Your Item'
              body='After having the okay image of your item, sign into your Devebay Account, click on the upload button, upload your image and other needed and optional details-'
            />
          </GridItem>
          <GridItem>
            <DetailCard 
              tag='Cha-Ching'
              heading='Receive Orders- $$'
              body='Other devs would be viewing your item you put up for sale and can place an order for it. You can look through these order(s) and select which you would love to sell to. The contact details of your potential buyer would be available upon acceptance of order and you can contact them directly- easy right?'
            />
          </GridItem>
        </Grid > 
      </Box>

      <Box h='auto' p='5' mb='10'> 
        <Flex>
          <Tag mr='3' p='4' bg='secondary.100' fontSize='lg'>🔥</Tag>
          <Tag bg='secondary.100' color='#fff' >Buying on Devebay</Tag>
        </Flex>
        <Text fontSize='sm' w={{base: '100%', lg: '50%', md: '50%'}} my='4'>
          Buying items on Devebay is easier that trying to understand a stackoverflow answer. 
        </Text>
        <Grid
          columnGap='1rem'
          templateColumns={{
            base: '100%', 
            lg: 'repeat(2, 50%)', 
            md: '90%'
          }}
          gridRowGap='1rem'
          
        >
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
        </Grid>
      </Box>

      <Box bg='primary.100' p='6' borderRadius='16px'>
        <Flex align='center' justify='center'> 
          <Box>
            <Heading 
              size='h1' 
              mb='8' 
              color='#fff'
              textAlign='left'
            >
              Help,
            </Heading>
            <Text 
              lineHeight='taller' 
              fontSize='md' 
              color='#fff' 
              w={{base: '90%', md: '90%', lg:'80%'}}
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
          <Box w='90%' display={{base: 'none', lg: 'block', md: 'none'}}>
            <Image src={helpIcon} />
          </Box>
        </Flex>
      </Box>
    </Page>
  )
}

export default NLoggedIn;