import React, { FC } from "react";
import { IShopItems } from "./interfaces";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

export const Inventory: FC<IShopItems> = (props) => {
  if (props.shopItems != undefined) {
    return <Container></Container>;
  } else {
    return <></>;
  }
};

export default Inventory;
