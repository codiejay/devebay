import React from 'react';
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
  Spacer,
  Grid
} from '@chakra-ui/react';
import {AiOutlineGithub} from 'react-icons/ai';
import {BiCrown} from 'react-icons/bi';
import DetailCard from '../Components/DetailCard';
import helpIcon from '../Assets/helpp.svg';
import {firestore, auth} from '../firebase';
import rockHand from '../Assets/rockhand.png';
import {CgScrollV} from 'react-icons/cg';
import ItemCard from '../Components/ItemCard';


const LoggedIn = () => { 

  let fakeData = [
    { 
      view: 19,
      itemImg: 'https://images.unsplash.com/flagged/photo-1560854350-13c0b47a3180?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDN8fGxhcHRvcHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      itemPrice: 1200,
      itemName: `Macbook 13' 2012`,
      itemDesc: 'This is a sample sale. please do not order it you would be wasting your',
      itemOwner: 'James Akpan'
    },
    { 
      view: 200,
      itemImg: 'https://pbs.twimg.com/media/Dl62GnqXoAAki7z.jpg',
      itemPrice: 0,
      itemName: `YDKJS 2019 edition`,
      itemDesc: 'This is a sample sale. please do not order it you would be wasting your',
      itemOwner: 'Shane Neubauer'
    },
    { 
      view: 20,
      itemImg: 'https://i.pinimg.com/originals/ca/c6/41/cac641407a4cbd7df2e12410bb1eff1e.jpg',
      itemPrice: 40,
      itemName: `coding  shirt`,
      itemDesc: 'This is a sample sale. please do not order it you would be wasting your',
      itemOwner: 'Shane Neubauer'
    },
    { 
      view: 20,
      itemImg: 'https://i.pinimg.com/originals/ca/c6/41/cac641407a4cbd7df2e12410bb1eff1e.jpg',
      itemPrice: 40,
      itemName: `coding  shirt`,
      itemDesc: 'This is a sample sale. please do not order it you would be wasting your',
      itemOwner: 'Shane Neubauer'
    },
    { 
      view: 20,
      itemImg: 'https://i.pinimg.com/originals/ca/c6/41/cac641407a4cbd7df2e12410bb1eff1e.jpg',
      itemPrice: 40,
      itemName: `coding  shirt`,
      itemDesc: 'This is a sample sale. please do not order it you would be wasting your',
      itemOwner: 'Shane Neubauer'
    },
  ];

  let [userData, setUserData] = React.useState();
  
  auth().onAuthStateChanged(user => {
    let userEmail = '';
    if(user) { 
      setUserData(user)
      userEmail = user.email;
      firestore.collection('earlyAdopter')
      .get()
      .then((res) => {
        res.docs.forEach((item) => {
          if(userEmail ===  item.data().email) { 
            setIsEa(true);
          }
        })
      })
    }
  })

  let [isEa,setIsEa] = React.useState(false);
  return ( 
    <Page>
      <Flex p='8' bg='primary.100' borderRadius='13px'>
        <Box w='80%'>
          <Flex w='fit-content'>
            <Tag 
              fontWeight='bold' 
              bg='primary.300' 
              color='#fff'
              p='2'
              mb='10'
              textTransform='capitalize'
              mr='4'
            >
              Hey {`${userData ? userData.displayName.split(' ')[0] : 'user'}`}
            </Tag>
            <Spacer />
            <Tag
              fontWeight='bold' 
              bg='primary.300' 
              color='#fff'
              p='2'
              fontSize='1.7rem'
              mb='10'
              textTransform='capitalize'
              display={isEa ? 'inline-block' : 'none'}
            >
              👑
            </Tag>
          </Flex>
          <Heading mb='10' fontSize='60px' color='#fff'>
            What would you buy <br/> from  a Developer today?
          </Heading>
          <Button 
            color='#fff' 
            bg='secondary.200'  
            leftIcon={<CgScrollV size='26'/>} 
            variant='hugeButton'
          >
            Scroll to find out
          </Button>
        </Box>
        <Box>
          <Image w='170px' mt='-110%' src={rockHand} />
        </Box>
      </Flex>

      <Flex 
        borderRadius='14px' 
        p='4' 
        align='center' 
        bg='secondary.200'
        mt='8'
        display={isEa ? 'flex' : 'none'}
      >
        <Tag
          fontWeight='bold' 
          bg='secondary.300' 
          color='#fff'
          p='2'
          fontSize='1.7rem'
          textTransform='capitalize'
          mr='5'
        >
          ✨
        </Tag>
        <Text fontWeight='bold' color='#fff'>
          Welcome Early Adopter- Please upload an item to help us grow.
        </Text>
        <Spacer />
        <Button variant='dashedColored' bg='secondary.300'>UPLOAD</Button>
      </Flex>

      <Box 
        p='6'
        borderRadius='14px'  
        bg='primary.500' 
        border='2px dashed #5168B4'
        mt='10'
        position='relative'
      > 
        <Flex 
          border='5px solid #F3F6FE'
          position='absolute'
          top='0'
          p='2' 
          align='center' 
          bg='primary.100' 
          w='fit-content'
          borderRadius='13px'
          transform='translateY(-50%)'
        >
          <Tag mr='4' p='2'>🔥</Tag> 
          <Text 
            fontSize='lg' 
            color='#fff' 
            fontWeight='bold'
          >
            Most Viewed
          </Text>
        </Flex>
        <Grid mt='10' templateColumns='repeat(3, auto)' rowGap={10} columnGap={3}>
          { 
            fakeData.map((item, index) => {
              return ( 
                <ItemCard 
                  key={index}
                  views={item.view}
                  imageSrc={item.itemImg}
                  itemName={item.itemName}
                  itemDesc={item.itemDesc}
                  id={index}
                />
              )
            })
          }
        </Grid>
      </Box>
    </Page>
  )
}

export default LoggedIn;