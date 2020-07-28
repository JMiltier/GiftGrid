import React from 'react';
import { Button, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { GiftGridComplete } from './GiftGridComplete.js';

export const GiftGrid = (props) => {
  let grid = [];
  let amount = props.location.search.split(',')[1];
  let gridName = props.location.search.split(',')[0].split('=')[1];
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
      text-decoration: line-through;
      background-color: lightgrey;
    }
  `;

  return (
    <Styles>
      <Container className='gift-container'>
        <h2>{gridName} Grid <GiftGridComplete complete={amount%100}/></h2>
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
      </Container>
    </Styles>
  )
}

// export default GiftGrid;