import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Button, Table, Modal, Form } from 'react-bootstrap';
import { GiftGrid } from './GiftGrid.js';
import { GiftGridComplete } from './GiftGridComplete.js';
import axios from 'axios';

const Styles = styled.div`
  .thead {
    background-color: #222;
  }

  .gridname {
    cursor: pointer;
  }
`;

export const Grids = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] =  useState('giftgridOG');
  const [completed, setCompleted] = useState(false);
  const [gridName, setGridName] = useState('');
  const [gridAmount, setGridAmount] = useState(0);
  const [grids, setGrids] = useState([]);


  const createClose = () => setShow(false);
  const createOpen = () => setShow(true);
  const createGrid = () => {
    axios.post('http://localhost:5000/addgrid', {
        username,
        gridName,
        gridAmount,
    })
    .then((res) => {setShow(false); console.log('New grid inserted into', res);})
    .catch((err) => console.log('Unable to insert new grid', err.message));
  };

  useEffect(() => {
    axios.get('http://localhost:5000/gridnames', {
      params: { username }
    })
    .then((res) => {
      setGrids(res.data);
    })
    .catch((err) => console.log('Unable to get gridnames', err.message));
  }, [username] );

  const jumpToGiftGrid = (e) => {
    console.log(e);
    window.location.href=`/grid?grid=${e}`
  }

  return (
    <Container>
      <Styles>
      <Modal show={show} onHide={createClose} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create new grid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={completed}>
            <Form.Group controlId='formBasic'>
              <Form.Label>Grid Name</Form.Label>
              <Form.Control
                required
                type='gridname'
                placeholder='Enter name for new grid'
                onChange={e => setGridName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please input a name for the new grid.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Number of cell grids to create.</Form.Label>
              <Form.Control
                required
                type='gridnumber'
                placeholder='Enter grid size'
                onChange={e => setGridAmount(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please input a grid size.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={createClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={createGrid}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
        <h3>Your Existing Grids</h3>
        <Table striped bordered hover variant='dark' size='sm'>
          <thead className='thead'>
            <tr>
              <th>Grid Name</th>
              <th>Grid Amount</th>
              <th>Total Amount</th>
              <th>Percent Complete</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
              {grids.map((i, id) => { return (
                <tr key={id}>
                  <td
                    className='gridname'
                    onClick={() => jumpToGiftGrid([i[0], i[1]])}>
                      {i[0]}
                  </td>
                  <td>{i[1]}</td>
                  <td>${i[1]*(i[1]-1) / 2}</td>
                  <td><GiftGridComplete complete={i[1]%100}/></td>
                  <td><Button className='align-content-center' size='sm' variant='info'/></td>
                  <td><Button size='sm' variant='danger'/></td>
                </tr>
              )})}
          </tbody>
        </Table>
        <Button variant="primary" onClick={createOpen}>
          Create New Grid
        </Button>
      </Styles>
    </Container>
  )
}