import React, { FC } from "react";
import { IShopItems, TShopItem } from "./interfaces";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, ListGroup } from "react-bootstrap";
import InventoryItem from "./InventoryItem";

export const Inventory: FC<IShopItems> = (props) => {
  return (
    <Container fluid>
      <Card style={{ maxWidth: "100vw", marginTop: "3vh" }}>
        <Card.Body>
          <h1>Create new shop item</h1>
          <ListGroup variant="flush">
            <ListGroup.Item>Description:</ListGroup.Item>
            <ListGroup.Item>Price: </ListGroup.Item>
            <ListGroup.Item>Title: </ListGroup.Item>
            <ListGroup.Item>ImageURL: </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
      {props.shopItems
        ?.sort((a, b) => a.id - b.id)
        .map((shopItem: TShopItem) => (
          <div key={shopItem.id}>
            <InventoryItem shopItem={shopItem} />
          </div>
        ))}
    </Container>
  );
};

export default Inventory;
