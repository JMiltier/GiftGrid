import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import background from '../assets/background2.jpg';

const Styles = styled.div`
  .jumbo {
    background: url(${background}) no-repeat fixed top;
    background-size: cover;
    color: #efefef;
    height: 100px;
    position: relative;
    z-index: -2;
  }

  .overlay {
    background-color: #444;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

export const Jumbotron = (props) => (
  <Styles>
    <Jumbo fluid className='jumbo'>
      <div className='overlay'></div>
      <Container>
        <h1>{props.text}</h1>
        {/* <p>Lets gift grid!</p> */}
      </Container>
    </Jumbo>
  </Styles>
)