import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Button, Flex } from '@chakra-ui/react';
import Chat from './Chat';
import UserData from '../../Helpers/Data/UserData';
import MessageData from '../../Helpers/Data/MessageData';

export default function ChatRoom2({ userId, sessionId }) {
  const [signalConnection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState();
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    UserData.GetSingleUser(userId).then((response) => {
      setUserName(response.firstName);
    });
    MessageData.GetSessionMessages(sessionId).then((response) => {
      setMessages(response);
    });
    setDidMount(true);
    return () => setDidMount(false);
  }, [userId, sessionId, userName, signalConnection]);

  const clearMessages = async () => {
    try {
      await signalConnection.invoke('ClearMessages', sessionId);
      MessageData.ClearMessages(sessionId);
      MessageData.GetSessionMessages(sessionId).then((response) => {
        setMessages(response);
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const joinChat = async () => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl('https://localhost:44371/chat')
        .configureLogging(LogLevel.Information)
        .build();
        // eslint-disable-next-line
      connection.on('RecieveMessage', (userName, message) => {
        // eslint-disable-next-line
        setMessages(messages => [...messages, { userName, message }]);
      });

      connection.onclose((e) => {
        setConnection('');
        setMessages([]);
      });

      connection.on('ClearMessages', () => {
        MessageData.ClearMessages(sessionId);
        MessageData.GetSessionMessages(sessionId).then((response) => {
          setMessages(response);
        });
      });

      await connection.start();
      await connection.invoke('JoinRoom', { userName, sessionId });
      setConnection(connection);
    } catch (e) {
      console.warn(e);
    }
  };

  const sendMessage = async (message) => {
    try {
      await signalConnection.invoke('SendMessage', message, sessionId, userName);
    } catch (e) {
      console.warn(e);
    }
  };

  const closeConnection = async () => {
    try {
      await signalConnection.stop();
    } catch (e) {
      console.warn(e);
    }
  };

  if (!didMount) {
    return null;
  }
  return (
    <Flex className='app mb-3' width='auto' justify='center' align='center'>
      {!signalConnection ? (
        <Button onClick={joinChat} colorScheme='messenger'>Join Chat Room</Button>
      ) : (
        <Chat messages={messages} sendMessage={sendMessage} clearMessages={clearMessages} closeConnection={closeConnection}/>
      )}
    </Flex>
  );
}
