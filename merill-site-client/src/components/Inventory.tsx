import React, { FC } from "react";
import { IShopItems, TShopItem } from "./interfaces";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";

export const Inventory: FC<IShopItems> = (props) => {
  if (props.shopItems != undefined) {
    return (
      <Container>
        {props.shopItems.map((item: TShopItem) => (
          <Row key={item.id}>{item.description}</Row>
        ))}
      </Container>
    );
  } else {
    return <></>;
  }
};

export default Inventory;
