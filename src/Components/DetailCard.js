import { 
  Box,
  Flex,
  Tag,
  Text
} from '@chakra-ui/react';

const DetailCard = ({tag, heading, body}) => {
  return ( 
    <Box 
      mr='3'
      p='4' 
      w='100%' 
      borderRadius='13px' 
      border='2px solid rgba(237, 237, 237, 0.3)'
      mb={{base: '1rem'}}
      h='100%'
    > 
    <Box p='3' border='2px solid #EDEDED' borderRadius='9px'>
      <Flex align='center'>
        <Tag bgGradient='linear(to-r, fancy.100, fancy.200 )' color='white' fontWeight='bold' mr='2' p='2'>{tag}</Tag>
        <Text fontWeight='300' fontSize='13px' fontWeight='bold'>{heading}</Text>
      </Flex>
    </Box>
    <Text mt='10'>
      {body}
    </Text>
  </Box>
  )
}

export default DetailCard;