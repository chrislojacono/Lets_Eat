import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Radio,
  RadioGroup,
  HStack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import sessionData from '../../Helpers/Data/SessionData';

class SessionForm extends Component {
  state = {
    UserId: this.props.user?.id,
    Location: 'Nashville, TN',
    SearchTerm: 'Restaurants',
    ShowAlert: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { Location, SearchTerm, UserId } = this.state;
    const sessionObject = {
      Location,
      SearchTerm,
      User1Id: UserId,
    };
    sessionData.AddASession(sessionObject).then((responseId) => {
      this.setState({
        ShowAlert: true,
      });
      setTimeout(() => {
        this.props.history.push(`/session/${responseId}`);
      }, 2000);
    });
  };

  render() {
    const { ShowAlert } = this.state;

    return (
      <>
        <Flex
          direction='column'
          backgroundColor='whiteSmoke'
          marginTop='2%'
          width='40%'
          p='18'
          rounded={10}
          flexWrap='wrap'
          bgGradient='linear(orange.200 25%, blue.200 50%, green.200 100%)'
          className='sessionForm'
        >
          {ShowAlert && (
            <Alert status='success' marginY='5px'>
              <AlertIcon />
              Your session has been created!
            </Alert>
          )}
          <FormControl as='fieldset' p={3} justifyContent='center'>
            <FormLabel as='legend' fontSize='larger' p={2}>
              What are you in the mood for?
            </FormLabel>
            <RadioGroup
              defaultValue='Restaurants'
              colorScheme='facebook'
              justify='center'
              alignItems='center'
              bgColor='white'
              p={5}
              rounded={5}
            >
              <HStack
                wrap='wrap'
                letterSpacing='wide'
                justifyContent='space-evenly'
              >
                <Radio value='Restaurants' id='SearchTerm' onChange={this.handleChange}>
                  Anything
                </Radio>
                <Radio
                  value='Pizza'
                  id='SearchTerm'
                  onChange={this.handleChange}
                >
                  Pizza
                </Radio>
                <Radio
                  value='Mexican'
                  id='SearchTerm'
                  onChange={this.handleChange}
                >
                  Mexican
                </Radio>
                <Radio
                  value='Healthy'
                  id='SearchTerm'
                  onChange={this.handleChange}
                >
                  Healthy
                </Radio>
                <Radio
                  value='Vegan'
                  id='SearchTerm'
                  onChange={this.handleChange}
                >
                  Vegan
                </Radio>
                <Radio
                  value='Chinese'
                  id='SearchTerm'
                  onChange={this.handleChange}
                >
                  Chinese
                </Radio>
                <Radio
                  value='Greek'
                  id='SearchTerm'
                  onChange={this.handleChange}
                >
                  Greek
                </Radio>
                <Radio
                  value='Indian'
                  id='SearchTerm'
                  onChange={this.handleChange}
                >
                  Indian
                </Radio>
                <Radio
                  value='Thai'
                  id='SearchTerm'
                  onChange={this.handleChange}
                >
                  Thai
                </Radio>
                <Radio
                  value='Italian'
                  id='SearchTerm'
                  onChange={this.handleChange}
                >
                  Italian
                </Radio>
                <Radio
                  value='French'
                  id='SearchTerm'
                  onChange={this.handleChange}
                >
                  French
                </Radio>
                <Radio
                  value='Dessert'
                  id='SearchTerm'
                  onChange={this.handleChange}
                >
                  Dessert
                </Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <FormControl
            id='Location'
            p={2}
            onChange={this.handleChange}
            isRequired
          >
            <FormLabel fontSize='larger'>Where are you heading?</FormLabel>
            <Input bgColor='white' placeholder='ex: Nashville, Tn' />
          </FormControl>
          <Button
            mt={4}
            colorScheme='facebook'
            onClick={this.handleSubmit}
            type='submit'
          >
            Submit
          </Button>
        </Flex>
      </>
    );
  }
}

export default withRouter(SessionForm);
