import React from 'react';
import { Button, Container } from 'react-bootstrap';
import styled from 'styled-components';

export const GiftGrid = () => {
  let grid = [];
  let amount = 50;
  for (let i = 1; i <= amount; i += 1) {
    grid.push(i);
  }

  const Styles = styled.div`
    .btn-light {
      margin: 0px 0px;
      height: 70px;
      width: 90px;
      border: 1px solid grey;
      border-radius: 0;
    }

    .disabled {
      text-decoration: line-through
    }
  `;

  return (
    <Styles>
      <Container className='gift-container'>
        {grid.map(i => {
          if(i%2 === 0) {
            return(
              <Button key={i} className='btn-light'>${i}</Button>
            )
          } else {
            return(
              <Button key={i} className='btn-light disabled'>${i}</Button>
            )
          }
        })}
        <br />
        <h3>${amount*(amount-1) / 2}</h3>
      </Container>
    </Styles>
  )
}

// export default GiftGrid;