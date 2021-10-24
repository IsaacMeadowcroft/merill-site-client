import React, { FC } from "react";
import { IShopItem } from "./interfaces";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";

const sendDeleteRequest = async (id: number) => {
  const res = await fetch("http://127.0.0.1:8080/deleteShopItem", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res);
};

export const InventoryItem: FC<IShopItem> = (props) => {
  return (
    <Card style={{ maxWidth: "100vw", marginTop: "3vh" }}>
      <Card.Body>
        <Row>
          <Col sm={2}>
            <Image src={props.shopItem.image} style={{ maxWidth: "12vw" }} />
          </Col>
          <Col sm={10}>
            <ListGroup variant="flush">
              <ListGroup.Item>ID: {props.shopItem.id}</ListGroup.Item>
              <ListGroup.Item>
                Description: {props.shopItem.description}
              </ListGroup.Item>
              <ListGroup.Item>Price: {props.shopItem.price}</ListGroup.Item>
              <ListGroup.Item>Title: {props.shopItem.title}</ListGroup.Item>
              <ListGroup.Item>ImageURL: {props.shopItem.image}</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col>
            <Button
              variant="dark"
              style={{ width: "100%" }}
              onClick={() => sendDeleteRequest(props.shopItem.id)}
            >
              Delete item
            </Button>
          </Col>
          <Col>
            <Button variant="dark" style={{ width: "100%" }}>
              Update Item
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default InventoryItem;
