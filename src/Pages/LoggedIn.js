import React, { useEffect } from 'react';
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

  //hooks 
  let [lastFetched, setLastFetched] = React.useState('');
  let [topThreeItems, setTopThreeItems] = React.useState([]);
  let [allItems, setAllItems] = React.useState([]);
  let [allowGetMore, setAllowGetMore] = React.useState(false);
  let [userData, setUserData] = React.useState();
  let [isEa,setIsEa] = React.useState(false);
  let [totalItems, setTotalItems] = React.useState();


  //firebase  here 
  let itemsRef = firestore
    .collection('items')
    .orderBy('date', 'desc')

  
  auth().onAuthStateChanged(user => {
    let userEmail = '';
    if(user) { 
      setUserData(user)
      userEmail = user.email;
      firestore.collection('users')
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

  useEffect(() => {
    let topThreeArr = [];
    let allArr = [];
    let lastItem = ''

    itemsRef.get()
    .then(d => {setTotalItems(d.size)})

    itemsRef
    .limit(3)
    .get()
    .then(snapShot => {
      setLastFetched(snapShot.docs[snapShot.docs.length-1]);
      snapShot.forEach(item => { 
        topThreeArr.push(item.data());
        setAllowGetMore(true);
      })
      setTopThreeItems([...topThreeArr]);
    })
  }, [])

  useEffect(() => { 
    let allArr = [];
    if(allowGetMore) { 
    itemsRef
      .startAfter(lastFetched)
      .limit(3)
      .get()
      .then(snapShot => {
        setLastFetched(snapShot.docs[snapShot.docs.length-1]);
        snapShot.forEach(item => { 
          allArr.push(item.data())
        });
        setAllItems([...allArr]);
      })
    }
  }, [allowGetMore])

  const getMoreData = () => {
    let allArr = []; 
    console.log(allItems.length)
    if(allItems.length + topThreeItems.length < totalItems) {
      console.log('yeah') 
      itemsRef
      .startAfter(lastFetched)
      .limit(3)
      .get()
      .then(snapShot => {
        setLastFetched(snapShot.docs[snapShot.docs.length-1]);
        snapShot.forEach(item => { 
          allArr.push(item.data())
        });
        setAllItems([...allItems, ...allArr]);
      })
    }
    else { 
      console.log('end here')
    }
  }

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
            Latest 3 Items
          </Text>
        </Flex>
        <Grid mt='10' templateColumns='1fr 1fr 1fr' rowGap={10} columnGap={3}>
          { 
            topThreeItems.map((item, index) => {
              return ( 
                <ItemCard 
                  key={index}
                  views={item.view}
                  imageSrc={item.itemImg}
                  itemName={item.name}
                  itemDesc={item.fullDesc}
                  id={item.id}
                  price={item.price.toLocaleString()}
                  views={item.views}
                />
              )
            })
          }
        </Grid>
      </Box>
      <Box 
        p='6'
        pb='20'
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
            All Items
          </Text>
        </Flex>
        <Grid mt='10' templateColumns='1fr 1fr 1fr' rowGap={10} columnGap={3}>
          {  
            allItems.length > 0 ? allItems.map((item, index) => {
              return ( 
                <ItemCard 
                  key={index}
                  views={item.view}
                  imageSrc={item.itemImg}
                  itemName={item.name}
                  itemDesc={item.fullDesc}
                  id={item.id}
                  price={item.price.toLocaleString()}
                  views={item.views}
                />
              )
            })  : 'No items yet'
          }
        </Grid>
        <Flex 
          cursor='pointer'
          border='5px solid #F3F6FE'
          position='absolute'
          top='100%'
          p='2' 
          px='4'
          align='center' 
          bg='primary.100' 
          w='fit-content'
          borderRadius='13px'
          transform='translateY(-50%)'
          left='45%'
          onClick={getMoreData}
        > 
          <Text 
            fontSize='lg' 
            color='#fff' 
            fontWeight='bold'
          >
            {
              allItems.length + topThreeItems.length < totalItems ? 'Load More' : 'End of list'
            }
          </Text>
        </Flex>
      </Box>
    </Page>
  )
}

export default LoggedIn;