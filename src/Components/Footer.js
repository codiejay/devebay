import {
  Box,
  Image,
  Grid,
  Heading,
  Code,
  Text,
  Flex,
  Icon
} from '@chakra-ui/react';
import {Link} from '@chakra-ui/react';
import Logo from '../Assets/devebayLogo.svg';
import NigeriaFlag from '../Assets/nigeria.svg';
import {AiOutlineTwitter, AiFillInstagram} from 'react-icons/ai';

const Footer = () => {
  let year = new Date().getFullYear();
  return ( 
    <Box 
      py='3' 
      px='3' 
      bg='secondary.200' 
      borderRadius='10px'
      my='10'
    > 
      <Flex alignItems='flex-end' flexDir='row'>
        <Box flex='3' my='5' mx='4'>
          <Image 
            w='10'
            aria-label='Devebay official logo'
            src={Logo}
          />
          <Heading color='#fff'  size='h2'>Devebay.</Heading>
          <Code w='40%' mt='4' colorScheme='transparent' color='neutral.100'>Devebay aims to help you buy stuff from other trusted developers</Code>
        </Box>
        <Box flex='2' my='5' mx='4'>
          <Code colorScheme='transparent' color='neutral.100' mt='4' mb='2'>Humbly made in <Image w='4' display='inline' src={NigeriaFlag} /> by James Akpan</Code>
          <Code colorScheme='transparent' color='neutral.100' >Copyright © {year} Devebay All rights reserved.</Code>
          <Flex gridGap='2'>
            <Link href='https://twitter.com/home?lang=en' isExternal><Icon color='#fff' as={AiOutlineTwitter} /></Link>
            <Link href='https://twitter.com/home?lang=en' isExternal><Icon color='#fff' as={AiFillInstagram} /></Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
};

export default Footer;
