import React, {useState} from 'react';
import { 
  Grid,
  Text,
  Flex,
  Heading,
  Container,
  Image,
  GridItem,
  Box,
  Input,
  Spacer,
  Icon,
  Divider,
  FormControl,
  FormLabel,
  FormHelperText,
  Tag,
  TagLabel,
  TagCloseButton,
  Textarea,
  Select,
  InputLeftElement,
  InputGroup,
  Button,
} from '@chakra-ui/react';
import Page from '../Components/Page';
import thumbsUp from '../Assets/thumbsUp.png';
import {
  FcAddImage,
} from 'react-icons/fc'
import {
  AiOutlineDollar
} from 'react-icons/ai';
import {BsBoxArrowUp} from 'react-icons/bs';

const Upload = ({}) => {

  //hooks
  let [countries, setCountries] = useState([]);
  let [isShippingWorldWide, setIsShippingWorldWide] = useState(true);
  let [itemImg, setItemImg] = useState('https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80');
  const [itemData, setItemData] = useState({ 
    owner: '',
    date: 0,
    id: 0,
    itemName: '',
    itemPrice: NaN,
    metaDesc: '',
    fullDesc: '',
    wwShipping: isShippingWorldWide,
    countries: [...countries],
    imageUrl: ''
  })

  //remove country from state
  const RemoveCountry = (e) => {
    let itemName = e.target.closest('button').id;
    setCountries(oldArr => oldArr.filter(name => name != itemName))
  };
  const imageChange = (e) => {
    let target = e.target.files[0];
    let url = URL.createObjectURL(target);
    setItemImg(url);
  };

  const ItemDataUpdate = (target) => {
    switch(target.target.dataset.inputtype) { 
      case 'itemName': 
        setItemData({...itemData, itemName: target.target.value});
        break;
      case 'itemPrice':
        setItemData({...itemData, itemPrice: parseInt(target.target.value)});
        break;
      case 'itemMetaDesc': 
        setItemData({...itemData, metaDesc: target.target.value});
        break;
      case 'fullDesc': 
        setItemData({...itemData, fullDesc: target.target.value});
        break;
    }
  }
  return ( 
    <Page>
      <Grid 
        bg='secondary.200' 
        px='5' 
        py='20' 
        borderRadius='13px'
        templateColumns='repeat(2, 1fr)'
      > 
        <GridItem> 
          <Container  m='0' >
            <Heading fontSize='4rem' mb={4} color='#fff'>Upload Your Item</Heading>
            <Text color='#fff' lineHeight='1.7rem'>Uploading on Devebay means that you are sure and willing to see your item to an intrested buyer. Please take care to fill the information below- it would help give your potential buyer a good idea of what your product looks like and your terms- Cheers!</Text>
          </Container>
        </GridItem>
        <GridItem>
          <Flex justifyContent='center' alignContent='center'>
            <Image transform='scale(1.4)' w='50%' src={thumbsUp}/>
          </Flex>
        </GridItem>
      </Grid> 

      <Grid 
        border='2px solid #5168B4' 
        borderRadius='13px' 
        mt={5} 
        p='5'
        templateColumns='6fr 5fr'
        columnGap='5'
      >
        <Box>
          <label>
            <Flex 
              cursor='pointer'
              borderRadius='9px' 
              border='2px dashed #264ABE' 
              align='center' 
              justify='center' 
              h='100%'
              bg={`linear-gradient(180deg, rgba(0, 42, 179, 0.38) 0%, rgba(1, 11, 40, 0.51) 100%), url(${itemImg})`}
              bgPosition='left'
              bgSize='cover'
              bgRepeat='no-repeat'
            > 
              <Box>
                <Icon borderRadius='200px' bg='#fff' p='3' display='block' color='#fff' m='0 auto' w='16' h='16' as={FcAddImage}/>
              </Box>
            </Flex>
            <Input 
              display='none' 
              type='file' 
              name='file'
              accept='image/*'
              onChange={(event) => {imageChange(event)}}
            /> 
          </label>
        </Box>
        <Box>
          <form>
            <FormControl p='4' borderRadius='9px' border='2px dashed #B3C4F9' isRequired>
              <FormLabel fontWeight='bold' color='secondary.200'>Your item's name</FormLabel>
              <Input 
                data-inputtype='itemName'
                onChange={(event) => {ItemDataUpdate(event)}} 
                type='text' 
                fontWeight='bold' 
                color='#010B28'
              />
              <FormHelperText>Your item's name should be short and precise 🙌🏽</FormHelperText>
            </FormControl>

            <FormControl 
              mt='8' 
              p='4' 
              borderRadius='9px' 
              border='2px dashed #B3C4F9' 
            >
              <FormLabel fontWeight='bold' color='secondary.200'>Your item's price. Leave empty for free items</FormLabel>
              <InputGroup>              
                <Input 
                data-inputtype='itemPrice'
                onChange={(event) => {ItemDataUpdate(event)}} 
                  type='number' 
                  fontWeight='bold' 
                  color='#010B28'
                />
                <InputLeftElement fontSize='20px' children={<AiOutlineDollar />} />
              </InputGroup>
              <FormHelperText>Tell us your item's price in U.S Dollars - be as fair as possible- we would appreciate your transperency.</FormHelperText>
            </FormControl>
            
            <FormControl p='4' mt='8' borderRadius='9px' border='2px dashed #B3C4F9' isRequired>
              <FormLabel fontWeight='bold' color='secondary.200'>Meta description</FormLabel>
              <Textarea 
                data-inputtype='itemMetaDesc'
                onChange={(event) => {ItemDataUpdate(event)}} 
                fontWeight='bold' 
                color='#010B28' 
                type='text' 
              />
              <FormHelperText>A short description of what your item is- something catchy but honest 😉 </FormHelperText>
            </FormControl>

            <FormControl p='4' mt='8' borderRadius='9px' border='2px dashed #B3C4F9' isRequired>
              <FormLabel fontWeight='bold' color='secondary.200'>Full Description</FormLabel>
              <Textarea 
                data-inputtype='fullDesc'
                onChange={(event) => {ItemDataUpdate(event)}} 
                fontWeight='bold' 
                color='#010B28' 
                type='text' 
              />
              <FormHelperText>Tell us everything about your item. We love the story- your buyer would too.  </FormHelperText>
            </FormControl>


            <FormControl p='4' mt='8' borderRadius='9px' border='2px dashed #B3C4F9' isRequired>
              <FormLabel fontWeight='bold' color='secondary.200'>Are you willing to ship worldwide?</FormLabel>
              <Flex>
              <Tag
                  fontWeight='bold' 
                  bg='signals.success' 
                  color='#fff'
                  py='2'
                  px='8'
                  fontSize='1rem'
                  textTransform='capitalize'
                  mr='5'
                  onClick={() => {isShippingWorldWide ? setIsShippingWorldWide(false) : setIsShippingWorldWide(true)}}
                  cursor='pointer'
                  opacity={isShippingWorldWide ? 1 : '0.3'}
                >
                  YES
                </Tag>
                <Tag
                  onClick={() => {isShippingWorldWide ? setIsShippingWorldWide(false) : setIsShippingWorldWide(true)}}
                  cursor='pointer'
                  fontWeight='bold' 
                  bg='signals.error' 
                  color='#fff'
                  py='2'
                  px='8'
                  fontSize='1rem'
                  textTransform='capitalize'
                  mr='5'
                  opacity={isShippingWorldWide ? 0.3 : 1}
                >
                  NO
                </Tag>
              </Flex>
              <FormHelperText>Developers live around the Globe, Let's know if you willing to ship everywhere or just within a particular country/countries</FormHelperText>
            </FormControl>

            <FormControl 
              display={isShippingWorldWide ? 'none' : 'revert'} 
              p='4' 
              mt='8' 
              borderRadius='9px' 
              border='2px dashed #B3C4F9' 
              isRequired
            >
              <FormLabel fontWeight='bold' color='secondary.200'>Select a country you would be shipping within</FormLabel>
              <Select 
                fontWeight='bold' 
                placeholder='Select Country'
                onChange={(event) => {
                  setCountries(oldArr => [...oldArr, event.target.value])
                }}
              >
              <option value="Afganistan">Afghanistan</    option>
              <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bonaire">Bonaire</option>
                <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                <option value="Botswana">Botswana</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                <option value="Brunei">Brunei</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Canary Islands">Canary Islands</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Channel Islands">Channel Islands</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos Island">Cocos Island</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cote DIvoire">Cote DIvoire</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Curaco">Curacao</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="East Timor">East Timor</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands">Falkland Islands</option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Ter">French Southern Ter</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Great Britain">Great Britain</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guinea">Guinea</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Hawaii">Hawaii</option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="Indonesia">Indonesia</option>
                <option value="India">India</option>
                <option value="Iran">Iran</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Isle of Man">Isle of Man</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Korea North">Korea North</option>
                <option value="Korea Sout">Korea South</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Laos">Laos</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libya">Libya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macau">Macau</option>
                <option value="Macedonia">Macedonia</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Malawi">Malawi</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Midway Islands">Midway Islands</option>
                <option value="Moldova">Moldova</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Nambia">Nambia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherland Antilles">Netherland Antilles</option>
                <option value="Netherlands">Netherlands (Holland, Europe)</option>
                <option value="Nevis">Nevis</option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau Island">Palau Island</option>
                <option value="Palestine">Palestine</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Phillipines">Philippines</option>
                <option value="Pitcairn Island">Pitcairn Island</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Republic of Montenegro">Republic of Montenegro</option>
                <option value="Republic of Serbia">Republic of Serbia</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russia">Russia</option>
                <option value="Rwanda">Rwanda</option>
                <option value="St Barthelemy">St Barthelemy</option>
                <option value="St Eustatius">St Eustatius</option>
                <option value="St Helena">St Helena</option>
                <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                <option value="St Lucia">St Lucia</option>
                <option value="St Maarten">St Maarten</option>
                <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
                <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
                <option value="Saipan">Saipan</option>
                <option value="Samoa">Samoa</option>
                <option value="Samoa American">Samoa American</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syria">Syria</option>
                <option value="Tahiti">Tahiti</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Thailand">Thailand</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks & Caicos Is">Turks & Caicos Is</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Erimates">United Arab Emirates</option>
                <option value="United States of America">United States of America</option>
                <option value="Uraguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Vatican City State">Vatican City State</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                <option value="Wake Island">Wake Island</option>
                <option value="Wallis & Futana Is">Wallis & Futana Is</option>
                <option value="Yemen">Yemen</option>
                <option value="Zaire">Zaire</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </Select>
              <FormHelperText>Since you aren't shipping you item worldwide and to mars, select a country/countries you would be shipping to.</FormHelperText>
            </FormControl>

            <FormControl 
              display={isShippingWorldWide ? 'none' : 'revert'}
              p='4' 
              mt='8' 
              borderRadius='9px' 
              border='2px dashed #B3C4F9' 
              isRequired
            >
              <FormLabel 
                fontWeight='bold' 
                color='secondary.200'
              >
                Country/Countries you're shipping to.
              </FormLabel>
              <Box>
                <Tag
                  cursor='pointer'
                  fontWeight='bold' 
                  bg='signals.error' 
                  color='#fff'
                  py='2'
                  px='4'
                  fontSize='0.8rem'
                  textTransform='capitalize'
                  mb='3'
                  >
                    Add at least one country.
                </Tag>
              </Box>
              { 
                countries.map((item, index) => {
                  return ( 
                    <Tag 
                      key={index} 
                      color='#fff' 
                      py='3' 
                      px='5'
                      fontWeight='bold' 
                      mx='2' 
                      my='1' 
                      bg='signals.success' 
                    >
                      <TagLabel>{item}</TagLabel>
                      <TagCloseButton 
                        id={item}
                        onClick={e => {RemoveCountry(e, item)}}
                      />
                    </Tag>
                  )
                })
              }
              <FormHelperText> This is list of countries or a country you're willing to ship to </FormHelperText>
            </FormControl>

            <Button alignItems='center' justifyItems='center' leftIcon={<Icon w={6} h={6} as={BsBoxArrowUp} />} mt='5' type='submit' variant='solid' >Upload your item</Button>
          </form>
        </Box>
      </Grid>
      
    </Page>
  )
}

export default Upload;