import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { GiftGridProgress } from './GiftGridProgress.js';
import { Payment } from './Payment.js';
import styled from 'styled-components';


const Styles = styled.div`
.StripeCheckout {
  background: unset !important;
  background-image: unset;
}

.btn-light {
  padding: 0;
  height: 70px;
  width: 90px;
  border: 1px solid grey;
  border-radius: 0;
  vertical-align: unset;
}

.disabled {
  text-decoration: line-through;
  background-color: lightgrey !important;
  cursor: not-allowed;
`;

export const GiftGrid = (props) => {
  const [completion, setCompletion] = useState(Math.floor(Math.random() * 101));

  let grid = [];
  const amount = props.location.search.split(',')[1];
  const gridName = props.location.search.split(',')[0].split('=')[1];
  for (let i = 1; i <= amount; i += 1) {
    grid.push(i);
  }

  return (
    <Styles>
      <Container className='gift-container'>
        <h2>{gridName} Grid</h2>
        <GiftGridProgress complete={completion}/>
        {grid.map(i => {
          if(i%2 === 0 || i%5 === 0) {
            return(
              <Payment key={i} price={i} gridName={gridName} />
            )
          } else {
            return(
              <Button key={i} className='btn-light disabled'>${i}</Button>
            )
          }
        })}
        {/* <Modal size='sm' show={show} onHide={handlePayClose}>
          <Modal.Header closeButton>
            <Modal.Title>Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <StripeCheckout
              stripeKey='pk_test_51HAJGjIBeSXSsMg7W3W0ZwYI5LKLQkZmoK0SYnILTfwzf2QlQun4b0V004tOwkcFGO7VZq5ZJ8rnd0J7WQ9qOrEN00MTwAaVM6'
              token={handleToken}
              onClick={handlePayClose}
              zipCode
              amount={price * 100}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handlePayClose}>
              OK.
            </Button>
          </Modal.Footer>
        </Modal> */}
      </Container>
    </Styles>
  )
}

// export default GiftGrid;