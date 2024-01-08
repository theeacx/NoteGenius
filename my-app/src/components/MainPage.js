import React from "react";
import MyCard from "./MyCard";
import MyMenu from "./MyMenu";
import { Container, Row, Col } from "react-bootstrap";
import "../components-style/MainPage.css";

function MainPage() {
  return (
    <React.Fragment>
      <Container>
        <Row>
          {/* Left Column - List of Cards */}
          <Col md={8}>
            <Row>
              {/* Render your MyCard components here */}
              <MyCard
                title="Card 1"
                content="This is the content of card 1"
                user="User 1"
                subject="Subject 1"
                group="Group 1"
                tags={[
                  "Tag1",
                  "Tag2",
                  "Tag3",
                  "Tag4",
                  "Tag5",
                  "Tag6",
                  "Tag7",
                  "Tag8",
                  "Tag9",
                ]}
                onClick={() => console.log("Card 1 clicked")}
              />

              <MyCard
                title="Card 2"
                content="This is the content of card 2"
                user="User 2"
                subject="Subject 2"
                group="Group 2"
                tags={[
                  "Tag1",
                  "Tag2",
                  "Tag3",
                  "Tag4",
                ]}
                onClick={() => console.log("Card 2 clicked")}
              />

              <MyCard
                title="Card 3"
                content="This is the content of card 3"
                user="User 3"
                subject="Subject 3"
                group="Group 3"
                tags={[
                  "Tag7",
                  "Tag8",
                  "Tag9",
                ]}
                onClick={() => console.log("Card 3 clicked")}
                />

              <MyCard
                title="Card 4"
                content="This is the content of card 4"
                user="User 4"
                subject="Subject 4"
                group="Group 4"
                tags={[
                  "Tag1",
                  "Tag2",
                  "Tag3",
                  "Tag4",
                  "Tag5",
                  "Tag6",
                  "Tag7",
                  "Tag8",
                  "Tag9",
                ]}
                onClick={() => console.log("Card 4 clicked")}
                />  

              <MyCard
                title="Card 5"
                content="This is the content of card 5"
                user="User 5"
                subject="Subject 5"
                group="Group 5"
                tags={[
                  "Tag1",
                  "Tag2",
                  "Tag3",
                  "Tag4",
                  "Tag5",
                  "Tag6",
                  "Tag7",
                  "Tag8",
                  "Tag9",
                ]}
                onClick={() => console.log("Card 5 clicked")}
                />

              <MyCard
                title="Card 6"
                content="This is the content of card 6"
                user="User 6"
                subject="Subject 6"
                group="Group 6"
                tags={[
                  "Tag1",
                  "Tag2",
                  "Tag3",
                  "Tag4",
                  "Tag5",
                  "Tag6",
                  "Tag7",
                  "Tag8",
                  "Tag9",
                ]}
                onClick={() => console.log("Card 6 clicked")}
                />  
            </Row>
          </Col>

          {/* Right Column - Menu */}
          <Col md={4}>
          <MyMenu />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default MainPage;
