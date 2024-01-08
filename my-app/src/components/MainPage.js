import React from "react";
import MyCard from "./MyCard";
import { Container, Row, Col } from "react-bootstrap";
import "../components-style/MainPage.css";

function MainPage() {
  return (
    <React.Fragment>
      <Container>
        <Row>
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
            title="Card 1"
            content="This is the content of card 1"
            user="User 1"
            subject="Subject 1"
            group="Group 1"
            tags={["Tag1", "Tag2", "Tag3", "Tag4"]}
            onClick={() => console.log("Card 1 clicked")}
          />

          <MyCard
            title="Card 1"
            content="This is the content of card 1"
            user="User 1"
            subject="Subject 1"
            group="Group 1"
            tags={["Tag1", "Tag8", "Tag9"]}
            onClick={() => console.log("Card 1 clicked")}
          />

          <MyCard
            title="Card 1"
            content="This is the content of card 1"
            user="User 1"
            subject="Subject 1"
            group="Group 1"
            tags={[
              "Tag1",
              "Tag7",
              "Tag8",
              "Tag9",
            ]}
            onClick={() => console.log("Card 1 clicked")}
          />

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
            ]}
            onClick={() => console.log("Card 1 clicked")}
          />

          <MyCard
            title="Card 1"
            content="This is the content of card 1"
            user="User 1"
            subject="Subject 1"
            group="Group 1"
            tags={[
              "Tag3",
              "Tag4",
              "Tag5",
            ]}
            onClick={() => console.log("Card 1 clicked")}
          />

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
            ]}
            onClick={() => console.log("Card 1 clicked")}
          />
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default MainPage;
