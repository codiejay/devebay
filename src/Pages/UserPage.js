import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {firestore, auth} from '../firebase';
import Page from '../Components/Page';
import { 
  Grid, 
  GridItem,
  Box,
  Text,
  Heading,
  Icon,
  Tabs,
  Tab,
  TabPanels,
  TabList,
  TabPanel,
  Button,
  Image,
  Link,
  useClipboard
} from '@chakra-ui/react';
import {CopyIcon} from '@chakra-ui/icons'

const UserPage = () => {


  //hooks state and variables
  let [userItems, setUserItems] = useState();
  let [orderedList, setOrderList] = useState([]);
  let [userData, setUserData] = useState();
  let [isEarlyAdopter, setIsEarlyAdopter] = useState(false);

  let username = useParams().username;
  console.log(username)

  //fucntions


  //components
  const Items = (data) => {
    let [itemid, setItemId] = useState(`http://${window.location.host}/i/${data.data.id}`);
    const { hasCopied, onCopy } = useClipboard(itemid);
    return ( 
      <Box 
        m='3' 
        border='1px dashed #010B28'
        px='3'
        py='4'
        borderRadius='20px'
      >
        <Grid templateColumns='auto 8fr'>
          <GridItem mr='3'>
            <Box 
              bg={`url(${data.data.itemImg})`}  
              bgPosition='center'
              bgSize='cover'
              w='100px'
              h='100px'
              boxShadow='0px 11px 8px 6px #a2a5ad36'
              borderRadius='12px'
            ></Box>
          </GridItem>
          <GridItem>
            <Heading fontSize='1.4rem'>{data.data.name}</Heading>
            <Text fontSize='0.8rem' color='neutral.200'>{data.data.metaDesc}</Text>
            <Text color='secondary.200'>{data.data.fullDesc}</Text>
            <Button 
              onClick={onCopy}
              leftIcon={<CopyIcon />}
              p='2' 
              bg='primary.100'  
              fontSize='0.9rem'
              _hover={{border: '1px solid transparent'}}
            >
              {hasCopied ? 'Copied!' : 'Copy Link'}
            </Button>
          </GridItem>
        </Grid>
      </Box>
    )
  }

  //hooks effects
  useEffect(() => { 
    let mounted = true;
    auth().onAuthStateChanged((user) => {
      if(user) { 
        let itemsArr = [];
        setUserData({username: username, userimg: user.photoURL})
        firestore.collection('items')
        .where('ownerData.owner', '==', username)
        .get()
        .then((res) => {
          res.forEach((item) => { 
            itemsArr.push(item.data())
          });
          setUserItems(itemsArr);
        })
      }
    })

    if(username) { 
      firestore.collection('users')
      .where('username', '==', username)
      .get()
      .then((res) => {
        res.forEach((item) => {
          setIsEarlyAdopter(item.data().earlyAdopter)
        })
      })
    }

  }, [])

  return ( 
    <Page>
      {
        userData 
        ? 
          <Grid templateColumns='3fr 5fr'>
            <GridItem>
              <Heading fontSize='1.3rem' color='neutral.200'>Your profile.</Heading>
              <Image 
                mt='4'
                boxSize='300px'
                borderRadius='30px'
                boxShadow='0px 0px 3px 4px #a2a5ad36'
                src={userData.userimg} 
                alt={userData.username} 
              />
              <Text mt='3'>
                <Link href={`github.com/${userData.username}`}>{`@${userData.username}`}</Link>
              </Text>
            </GridItem>
            <GridItem>
              <Tabs variant='soft-rounded' colorScheme='blue'>
                <TabList>
                  <Tab>Your Items</Tab>
                  <Tab>Received Orders</Tab> 
                  <Tab>Place Orders</Tab>
                </TabList>

                <TabPanels mt='5'>
                  <TabPanel>
                    <Heading fontSize='1.3rem'>Your Items 🍀</Heading>
                    { 
                      userItems ? userItems.map((item, index) => { 
                        return ( 
                          <Items 
                            data={item}
                            key={index}
                          />
                        )
                      }) : ''
                    }
                  </TabPanel>

                  <TabPanel>
                    <Heading fontSize='1.3rem'>Received Orders 📦</Heading>
                  </TabPanel>

                  <TabPanel >
                    <Heading fontSize='1.3rem'>Coming soon 🤞🏽</Heading>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </GridItem>
          </Grid>
          : 
          'wait please'
      }
    </Page>
  )
}

export default UserPage;