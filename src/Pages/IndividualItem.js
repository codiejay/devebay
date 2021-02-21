import React, { useEffect, useState } from 'react';
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
  Grid,
  Avatar,
  GridItem,
  Link,
  TagLabel,
  NumberIncrementStepper,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure

} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import loadingImg from '../Assets/loadingItem.png';
import  firebase, {auth, firestore} from '../firebase';
import {BiWorld} from 'react-icons/bi';
import {FiExternalLink} from 'react-icons/fi';

const IndividualItem = (userData) => {
  //hook state and variables
  let productId = useParams().productId;
  let date = new Date(parseInt(useParams().productId)).toLocaleDateString();
  let [itemData, setItemData] = React.useState();
  let [isOwner, setIsOwner] = React.useState();
  let [orderComplete, setOrderComplete] = React.useState(false);
  let [userOrders, setUserOrders] = React.useState([]);
  let [previouslyOrdered, setPreviouslyOrdered] = React.useState();
  const {isOpen, onOpen, onClose} = useDisclosure();
  console.log(useParams().productId);
  let uid;
  let userName;
  let email;

  //functions
  const checkpreviousOrders = () => {
    
  }
  const processOrder = () => {  
    firestore.collection('items')
    .doc(productId)
    .update({ 
      order: firebase.firestore.FieldValue.arrayUnion({uid: uid, name: userName, buyerEmail: email})
    }).then(() => {
      firestore.collection('users')
      .where('uid', '==', uid)
      .get()
      .then((res) => {
        res.forEach(item => {
          item.ref.update({
            orderPlaced: firebase.firestore.FieldValue.arrayUnion({itemId: productId})
          })
          .then(() => {setOrderComplete(true)})
        })
      })
    })
  }


  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if(user) { 
        let orderList = [];
        firestore.collection('users')
        .where('uid' , '==', uid)
        .get()
        .then(doc => {
          doc.forEach((item) => {
            console.log(item.data())
            item.data().orderPlaced.forEach(item => {
              orderList.push(item.itemId)
            })
          })
          setUserOrders(orderList)
        })

        userOrders.indexOf(productId) !== -1 ? setPreviouslyOrdered(true) : setPreviouslyOrdered(false)

      }
    })
  }, [uid])


  //tiny components
  const InitialState = () => {
    return ( 
      <Box>
        <Grid templateColumns='1fr 1fr' columnGap={4}> 
          <Image src={loadingImg} />
          <Box>
            <Box 
              h='40px' 
              w='80%' 
              bg='primary.200' 
            > 

            </Box>
            <Box mt='3'> 
              <Box 
                h='7px' 
                w='50%' 
                bg='primary.300' 
                mt='1'
              > 

              </Box>
              <Box 
                h='7px' 
                w='70%' 
                bg='primary.300' 
                mt='1'
              > 

              </Box>
              <Box 
                h='7px' 
                w='70%' 
                bg='primary.300' 
                mt='1'
              > 

              </Box>
            </Box>

            <Box mt='12'> 
              <Box 
                h='7px' 
                w='75%' 
                bg='primary.300' 
                mt='1'
              > 
              </Box>
              <Box 
                h='7px' 
                w='75%' 
                bg='primary.300' 
                mt='1'
              > 
              </Box>
              <Box 
                h='7px' 
                w='75%' 
                bg='primary.300' 
                mt='1'
              > 
              </Box>
              <Box 
                h='7px' 
                w='75%' 
                bg='primary.300' 
                mt='1'
              > 
              </Box>
              <Box 
                h='7px' 
                w='75%' 
                bg='primary.300' 
                mt='1'
              > 
              </Box>
              <Box 
                h='7px' 
                w='75%' 
                bg='primary.300' 
                mt='1'
              > 
              </Box>

            </Box>

            <Grid 
              w='30%' 
              templateColumns='1fr 1fr' 
              mt={10}
              columnGap={3}
            >
              <Box 
                h='40px' 
                w='100%' 
                bg='primary.200' 
              > 
              </Box>
              <Box 
                h='40px' 
                w='100%' 
                bg='primary.200' 
              > 

              </Box>
            </Grid>
            <Box 
              mt={5}
              h='60px' 
              w='70%' 
              bg='secondary.200' 
              > 
            </Box>
          </Box>
        </Grid>
      </Box>
    )
  };

  auth().onAuthStateChanged((user) => {
    if(user) { 
      uid = user.uid;
      userName = user.displayName;
      email = user.email;
    }
  });

  //firebase
  useEffect(() => { 
    let mounted = true;

    //add the list of orderitems by the current user


    
    //increase views for items if it isn't viewed by it's owner
    firestore.collection('items')
    .doc(productId)
    .get()
    .then(res => {
      if(res.data().ownerData.ownerId !== uid) { 

        setIsOwner(false)
        firestore.collection('items')
        .doc(productId)
        .update({ 
          views: firebase.firestore.FieldValue.increment(1)
        })
      }
      else { 
        setIsOwner(true)
      }
    })

    let itemObj = [];
    firestore.collection('items')
    .where('id', '==',  parseInt(productId))
    .get()
    .then(d => { 
      if(mounted) { 
        d.docs.forEach(item => { 
          if(mounted) { 
            itemObj.push(item.data());
          }
        });
        setItemData(itemObj[0]);
      }
    })

    return () => mounted = false;
  }, [])

  return ( 
    <Page>
      { 
        !itemData
        ? 
          <InitialState />
        : 
        <Box>
          <Grid
            py='4'
            px='3'
            borderRadius='9px'
            templateColumns='30% 70%'
            columnGap={6}
          >
            <GridItem>
              <Image src={itemData.itemImg} borderRadius='9px' alt={itemData.name} />
            </GridItem>
            <GridItem>
              <Text mb='1' color='neutral.200'>Date added: {date}</Text>
              <Tag
                bg='secondary.200'
                fontSize='0.9rem'
                mb={4}
                py='2'
                px='2'
                color='#fff'
              >
                <Avatar size='xs' src={itemData.ownerData.ownerImg}></Avatar>
                <Text ml='3'>
                  <Flex justify='center' align='center'>
                    <Link
                      isExternal
                      mr='2'
                      href={`https://github.com/${itemData.ownerData.owner}`}
                    >
                      This item is owned and sold by {itemData.ownerData.owner}
                    </Link>{' '}
                    <FiExternalLink />
                  </Flex>
                </Text>
              </Tag>
              <Heading>{itemData.name}</Heading>
              <Text w='80%' color='neutral.100'>
                {itemData.metaDesc}
              </Text>
              <Text w='80%' mt={6}>
                {itemData.fullDesc}
              </Text>

              <Tag
                bg='#fff'
                fontWeight='bolder'
                border='1px solid #082890'
                fontSize='1.1rem'
                mt={4}
                py='2'
                px='2'
              >
                $ {parseInt(itemData.price) > 0 ? itemData.price.toLocaleString() : 'FREE'}
              </Tag>

              {itemData.countries ===  'none' ? (
                <Box>
                  <Tag
                    fontWeight='bold'
                    bg='secondary.200'
                    color='#fff'
                    my='3'
                    py='2'
                  >
                    <BiWorld />
                    <Text ml='1'>This item ships world wide</Text>{' '}
                  </Tag>
                </Box>
              ) : (
                <Box>
                  <Tag
                    fontWeight='bold'
                    bg='secondary.200'
                    color='#fff'
                    my='3'
                    py='2'
                  >
                    <BiWorld />
                    <Text ml='1'>
                      This item ships only to this specific countries/regions
                    </Text>{' '}
                  </Tag>
                  <Box>
                    {itemData.countries !==  'none' ? itemData.countries.map((item, index) => {
                      return (
                        <Tag
                          key={index}
                          color='#fff'
                          py='3'
                          px='5'
                          fontWeight='bold'
                          my='1'
                          mr='1'
                          bg='signals.success'
                        >
                          <TagLabel>{item}</TagLabel>
                        </Tag>
                      );
                    }) : ''}
                  </Box>
                </Box>
              )}
              { 
                orderComplete ? 
                <Button bg='primary.100' my='5' py='6'>Your Order has been received</Button> 
                : 
                isOwner ? <Button bg='primary.100' my='5' py='6'>You can't order your own item 😉</Button> : 
                <Button onClick={userOrders.indexOf(productId) !== -1 ? () => {} : onOpen} bg='primary.100' my='5' py='6'>
                { 
                  userOrders.indexOf(productId) !== -1 ? 
                  `You've already placed an order for this item` : `Place Order `
                }
              </Button>
              }
              <Modal 
                size='xl' 
                isOpen={isOpen} 
                onClose={onClose}
                motionPreset="slideInBottom"
              >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>
                      {orderComplete ? '🔥 Your order has been sent' : 'Do you want to plan an order for this item?'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      { 
                        orderComplete ? 
                        <Text> {itemData.ownerData.owner ? itemData.ownerData.owner : ''} would reach our to you if they accept your order</Text>
                        : 
                        <Text>If you place this order and it's accepted by the Developer who is selling this item they'll receive your email and contact to complete the sale.</Text>
                      }
                    </ModalBody>
                    <ModalFooter>
                      <Button variant='error' mr='3' onClick={onClose}>{orderComplete ? 'Close' : 'No, Cancel'}</Button>
                      <Button  onClick={processOrder} display={orderComplete ? 'none' : 'inline-flex'} >Yes, Proceed to order</Button>
                    </ModalFooter>
                  </ModalContent>
              </Modal>
            </GridItem>
          </Grid>
      </Box>
      }
    </Page>
  )
}

export default IndividualItem;