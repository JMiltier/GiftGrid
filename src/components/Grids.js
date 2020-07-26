import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { GiftGrid } from './GiftGrid.js';

const Styles = styled.div`

`;

export const Grids = () => {
  return (
    <Container>
      <Styles>
        <GiftGrid />
      </Styles>
    </Container>
  )
}