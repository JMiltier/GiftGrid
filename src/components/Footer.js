import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .footer {
    position: fixed;
    bottom: 0px;
    opacity: .9;
    font-size: 11px;
    max-width: unset;
    background-color: white;
    z-index: 5;
    border: 1px lightgrey solid;
  }
`;

export const Footer = () => {
  return (
    <Styles>
      <Container className='footer text-center'>
        <span fluid='true' className='float-left'>
          © {new Date().getFullYear()} Copyright: <a href ='http://localhost:3000/'>GiftGrid.com</a>
        </span>
        <span role='button' onClick={()=>window.location.href = 'mailto:customercare@giftgrid.com?subject=Contact Us'}>Contact GiftGrid</span>
        <span fluid='true' className='float-right'>Made with ♡ by JM</span>
      </Container>
    </Styles>
  )
}

//❤️ ♥