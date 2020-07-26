import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .gridProgress {
    width: auto;
    height: 5px;
  }
`;

export const GiftGridComplete = () => {
  const now = 60;
  return (
    <Styles>
      <ProgressBar className='gridProgress'>
        <ProgressBar variant='success' now={now} key={1} />
        <ProgressBar variant='danger' now={100-now} key={2} />
      </ProgressBar>
    </Styles>
  )
}

//label={`${100-now}%`}