import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .gridProgress {
    width: auto;
    height: 15px;
  }
`;

export const GiftGridComplete = (props) => {
  const now = props.complete;
  return (
    <Styles>
      <ProgressBar className='gridProgress'>
        <ProgressBar variant='success' now={now} label={`${now}%`} key={1} />
        <ProgressBar variant='danger' now={100-now} key={2} />
      </ProgressBar>
    </Styles>
  )
}

//label={`${100-now}%`}