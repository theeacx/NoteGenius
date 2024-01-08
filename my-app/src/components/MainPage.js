import React from 'react';
import MyCard from './MyCard';
import { Container, Row, Col } from 'react-bootstrap';
import MyNavbar from './MyNavbar';

// BIG BIG BIG BIG BIG WIP

function MainPage() {
  return (
    <React.Fragment>
      <MyNavbar />
      <Container>
        <Row>
          <Col>
            <MyCard
              title="Card 1"
              content="This is the content of card 1"
              onClick={() => console.log('Card 1 clicked')}
            />
          </Col>
          <Col>
            <MyCard
              title="Card 2"
              content="This is the content of card 2"
              onClick={() => console.log('Card 2 clicked')}
            />
          </Col>
          <Col>
            <MyCard
              title="Card 3"
              content="This is the content of card 3"
              onClick={() => console.log('Card 3 clicked')}
            />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default MainPage;