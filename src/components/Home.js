import React from 'react';
import styled from 'styled-components';
import { Container, Card, CardColumns, Button } from 'react-bootstrap';
import gifts from '../assets/background.jpg';
import gift2 from '../assets/gifts-pink-repeat.jpg';
import gift3 from '../assets/money-gift.svg';
import { Faker } from 'fakergem';

const Styles = styled.div`

`;

export const Home = () => {
  return (
    <Container>
      <Styles>
        <Card>
          <Card.Header>Featured</Card.Header>
          <Card.Body>
            <Card.Title>Hack Reactor bootcampee raises ${Faker.Number.between(12,45)}k for graduation using GiftGrid</Card.Title>
            <Card.Text>
              After spending an intense 13 weeks pouring sweat [or were those tears?], giftgridOG fundraised an exceptionally grand amount of dough. GiftgridOG went on to create the next big thing - find out!
            </Card.Text>
            <Button variant="dark">Check it out</Button>
          </Card.Body>
        </Card>
        <br/>
        <CardColumns>
          <Card>
            <Card.Img variant="top" src={gifts} />
            <Card.Body>
              <Card.Title>{Faker.Hipster.sentence()}</Card.Title>
              <Card.Text>
              {Faker.Hipster.sentences(4)}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="p-3">
            <blockquote className="blockquote mb-0 card-body">
              <p>
                {Faker.Hacker.saySomethingSmart()}
              </p>
              <footer className="blockquote-footer">
                <small className="text-muted">
                  Recent graduates <cite>{Faker.Pokemon.name()}</cite> from {Faker.Pokemon.location()}
                </small>
              </footer>
            </blockquote>
          </Card>
          <Card>
            <Card.Img variant="top" src={gift2} />
            <Card.Body>
              <Card.Title>{Faker.Hipster.word()}</Card.Title>
              <Card.Text>
              {Faker.Hipster.sentence(15)}{' '}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated {Faker.Number.between(2, 30)} mins ago</small>
            </Card.Footer>
          </Card>
          <Card bg="dark" text="white" className="text-center p-3">
            <blockquote className="blockquote mb-0 card-body">
              <p>
                {Faker.Hipster.sentence()}
              </p>
              <footer className="blockquote-footer">
                <small className="text-muted">
                  Someone famous from <cite>{Faker.Hipster.word()}</cite>
                </small>
              </footer>
            </blockquote>
          </Card>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Dummy text?</Card.Title>
              <Card.Text>
              {Faker.Matz.quote()}{' '}
              </Card.Text>
              <Card.Text>
                <small className="text-muted">Last updated {Faker.Number.between(2, 30)} mins ago</small>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img src={gift3} />
          </Card>
          <Card className="text-right">
            <blockquote className="blockquote mb-0 card-body">
              <p>
                One of the best things since cryptocurrency..
              </p>
              <footer className="blockquote-footer">
                <small className="text-muted">
                A famous journalist from <cite title="Galvanize News">Galvanize News</cite>
                </small>
              </footer>
            </blockquote>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text>
                {Faker.Hacker.saySomethingSmart()}
              </Card.Text>
              <Card.Text>
                <small className="text-muted">Last updated {Faker.Number.between(2, 30)} mins ago</small>
              </Card.Text>
            </Card.Body>
          </Card>
        </CardColumns>
      </Styles>
    </Container>
  )
}