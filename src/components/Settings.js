import React from 'react';
import { Container, Image } from 'react-bootstrap';
import styled from 'styled-components';
import avatar from '../assets/generic-avatar.jpg';

const Styles = styled.div`
  .rounded-circle {
    height: 150px;
    width: auto;
  }
`;

export const Settings = () => {
  return (
    <Container>
      <Styles>
        <Image src={avatar} roundedCircle />
        <p><h3>giftgridOG</h3></p>
      </Styles>
    </Container>
  )
}