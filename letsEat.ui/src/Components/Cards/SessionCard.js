import React, { useState, useEffect } from 'react';
import {
  Text,
  Heading,
  Flex,
  Button,
  WrapItem,
  Avatar,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import UserData from '../../Helpers/Data/UserData';

export default function SessionCard({ sessionInfo, userId, deleteSession }) {
  const [otherUser, setOtherUser] = useState('');
  const [sessionData] = useState(sessionInfo);
  const [myUserId] = useState(userId);

  useEffect(() => {
    const loadUsers = () => {
      if (sessionData.user1Id === myUserId && sessionData.user2Id !== null) {
        UserData.GetSingleUser(sessionData.user2Id).then((response) => {
          setOtherUser(response);
        });
      } else if (sessionData.user2Id === myUserId) {
        UserData.GetSingleUser(sessionData.user1Id).then((response) => {
          setOtherUser(response);
        });
      }
    };
    loadUsers();
  }, [sessionData, myUserId]);

  const date = new Date(sessionData.createdDate);

  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      width='auto'
      border='3px'
      borderColor='turquoise'
      boxShadow='lg'
      margin={5}
      background='whitesmoke'
      rounded={6}
      className='sessionCard'
    >
      <Heading whiteSpace='nowrap' p={5} fontSize='1.1rem' letterSpacing='wide'>
        Session with {otherUser.firstName}
      </Heading>
      <WrapItem>
        <Avatar
          size='lg'
          src={otherUser.image_Url}
          name={otherUser.firstName}
        />
      </WrapItem>
      <Text fontSize='lg' p={5}>
        Looking for {sessionData.searchTerm}
      </Text>
      <Text fontSize='medium' color='gray.400'>
        {date.toDateString()}
      </Text>
      <Flex>
        <Link
          to={{
            pathname: `/session/${sessionData.id}`,
          }}
        >
          <Button backgroundColor='yellow.300' margin={3}>
            Keep Swiping
          </Button>
        </Link>
        <Link
          to={{
            pathname: `/SessionBreakdown/${sessionData.id}`,
          }}
        >
          <Button backgroundColor='turquoise' margin={3}>
            Session Breakdown
          </Button>
        </Link>
        <Button colorScheme='red' margin={3} className='deleteSession' size='xs' onClick={() => deleteSession(sessionData.id)}>
            <CloseIcon/>
          </Button>
      </Flex>
    </Flex>
  );
}
