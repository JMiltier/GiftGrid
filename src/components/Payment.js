import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import styled from 'styled-components';
import icon from '../assets/logo.png';

const Styles = styled.span`
.StripeCheckout {
  padding: 0 !important;
  height: 70px;
  width: 90px;
  border: 1px solid grey !important;
  border-radius: 0 !important;
  box-shadow: unset !important;
}

span {
  all: unset !important;
}
`;


export const Payment = (props) => {
  const price = props.price;
  const gridName = props.gridName;
  const username = 'giftgridOG';

  const handleToken = (token) => {
    axios.post('http://localhost:5000/payment', {
      price,
      gridName,
      token
    })
    .then((data) => {
      data.status === 200
      ?
      axios.post('http://localhost:5000/addpayment', {
        price,
        gridName,
        username
      })
      .then((data)=>console.log(data))
      .catch((err) => console.log('Error adding payment to db', err.message))
      :
      console.log('error completing payment using stripe');

    })
  }

  return (
    <Styles>
      <StripeCheckout
        name={'Donate'}
        description={`${username}'s ${gridName} Grid`}
        label={'$'+price}
        stripeKey='pk_test_51HAJGjIBeSXSsMg7W3W0ZwYI5LKLQkZmoK0SYnILTfwzf2QlQun4b0V004tOwkcFGO7VZq5ZJ8rnd0J7WQ9qOrEN00MTwAaVM6'
        token={handleToken}
        zipCode
        image={icon}
        amount={price * 100}
      />
    </Styles>
  )
}