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
  Grid,
  Avatar,
  GridItem,
  Link,
  TagLabel,
  NumberIncrementStepper

} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import loadingImg from '../Assets/loadingItem.png';
import  firebase, {firestore} from '../firebase';
import {BiWorld} from 'react-icons/bi';
import {FiExternalLink} from 'react-icons/fi'

const IndividualItem = (userData) => {
  //hook state and variables
  let productId = useParams().productId;
  let [itemData, setItemData] = React.useState();
  
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

  //firebase
  useEffect(() => { 
    let mounted = true;
    console.log(userData)
    firestore.collection('items')
    .doc(productId)
    .get()
    .then(res => {
      if(res.data().ownerData.ownerId !== userData.userData.uid) { 
        firestore.collection('items')
        .doc(productId)
        .update({ 
          views: firebase.firestore.FieldValue.increment(1)
        })
      }
      console.log(userData.userData.uid)
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
  }, [userData])

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

              <Button bg='primary.100' my='5' py='6'>
                Place Order
              </Button>
            </GridItem>
          </Grid>
      </Box>
      }
    </Page>
  )
}

export default IndividualItem;