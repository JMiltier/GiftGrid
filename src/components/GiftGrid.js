import React from 'react';
import { Button, Container } from 'react-bootstrap';
import styled from 'styled-components';

export const GiftGrid = () => {
  let grid = [];
  for (let i = 1; i <= 300; i += 1) {
    grid.push(i);
  }

  const Styles = styled.div`
    .gift-button {
      margin: 10px 10px;
      height: 40px;
      width: 60px;
    }
  `;

  return (
    <Styles>
      <Container className='gift-container'>
        {grid.map(i => {
          return(
            <Button key={i} className='gift-button'>${i}</Button>
          )
        })}
      </Container>
    </Styles>
  )
}

// export default GiftGrid;