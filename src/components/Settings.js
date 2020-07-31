import React from 'react';
import { Container, Image, Button } from 'react-bootstrap';
import avatar from '../assets/generic-avatar.jpg';
import styled from 'styled-components';
import axios from 'axios';

const Styles = styled.div`
  .rounded-circle {
    height: 150px;
    width: auto;
  }
`;

export const Settings = (props) => {
  const username = props.username;

  const handleDeleteAll= () => {
    axios.post('http://localhost:5000/deleteall', {username})
    .then(()=>console.log(`${username} deleted`))
    .then(window.location.reload(true))
    .catch(() => console.log(`Unable to delete ${username}`));
  }

  return (
    <Container>
      <Styles>
        <Image src={avatar} roundedCircle />
        <h3>{username}</h3>
        <br/><br/><br/><br/><br/><br/><br/>
        <Button variant="danger" onClick={handleDeleteAll}>
          DELETE ACCOUNT
        </Button>
      </Styles>
    </Container>
  )
}