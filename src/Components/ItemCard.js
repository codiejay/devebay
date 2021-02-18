import { 
  Box,
  Center, 
  Text,
  Image, 
  Flex,
  Icon,
  Heading,
} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import { Eye, DollarSign } from 'react-feather';

const ItemCard = ({views, imageSrc, itemName, price, itemDesc, id}) => {

  return ( 
      <Box 
        p='5' 
        borderRadius='12px' 
        bg='#fff' 
        mr='3'
        h='auto'
        position='relative'
        w='100%'
      >
        <Flex 
          gap={10}
          borderRadius='9px' 
          bg='secondary.200' 
          w='fit-content' 
          p='2' 
          align='center'
          position='absolute'
          right='5%'
          transform='translateY(-100%)'
        >
          <Icon color='#fff' w='5' h='5' mr='3' as={Eye}/>
          <Text color='#fff' fontWeight='bold'>{views}</Text>
        </Flex>
        <Link to={`/i/${id}`}>
          <Box 
            mt='5' 
            h='200px' 
            w='100%' 
            bg={`url(${imageSrc})`} 
            bgPosition='center' 
            bgSize='cover'
            borderRadius='14px'
          ></Box>
          <Flex 
            mt={5}
            borderRadius='9px' 
            bg='secondary.200' 
            w='fit-content' 
            p='2' 
            align='center'
          >
            <Icon color='#fff' w='5' h='5' mr='3' as={DollarSign}/>
            <Text color='#fff' fontWeight='bold'>{price > 0 ? price : 'Free'}</Text>
          </Flex>
          <Heading mt={3} size='h3' textTransform='capitalize' fontWeight='bold'>{itemName}</Heading>
          <Text mt={4}>{itemDesc}</Text>
        </Link>
      </Box>
  )
}

export default ItemCard;