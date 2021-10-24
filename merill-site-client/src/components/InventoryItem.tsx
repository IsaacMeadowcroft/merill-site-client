import React, { FC, useState } from "react";
import { IShopItem } from "./interfaces";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";

export const InventoryItem: FC<IShopItem> = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newID, setNewID] = useState(props.shopItem.id);
  const [newImage, setNewImage] = useState(props.shopItem.image);
  const [newTitle, setNewTitle] = useState(props.shopItem.title);
  const [newPrice, setNewPrice] = useState(props.shopItem.price);
  const [newDescription, setNewDescription] = useState(
    props.shopItem.description
  );

  const sendDeleteRequest = async () => {
    const res = await fetch("http://127.0.0.1:8080/deleteShopItem", {
      method: "DELETE",
      body: JSON.stringify({ id: props.shopItem.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
  };

  const sendUpdateRequest = async () => {
    const res = await fetch("http://127.0.0.1:8080/postShopItem/EDIT", {
      method: "POST",
      body: JSON.stringify({
        id: props.shopItem.id,
        newItem: {
          id: newID,
          title: newTitle,
          image: newImage,
          description: newDescription,
          price: newPrice,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
  };

  return (
    <>
      <Card style={{ maxWidth: "100vw", marginTop: "3vh" }}>
        <Card.Body>
          <Row>
            <Col sm={2}>
              <Image src={newImage} style={{ maxWidth: "12vw" }} />
            </Col>
            <Col sm={10}>
              <ListGroup variant="flush">
                <ListGroup.Item>ID: {newID}</ListGroup.Item>
                <ListGroup.Item>Description: {newDescription}</ListGroup.Item>
                <ListGroup.Item>Price: {newPrice}</ListGroup.Item>
                <ListGroup.Item>Title: {newTitle}</ListGroup.Item>
                <ListGroup.Item>ImageURL: {newImage}</ListGroup.Item>
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
                onClick={() => {
                  sendDeleteRequest();
                  props.removeShopItem(props.shopItem);
                }}
              >
                Delete Item
              </Button>
            </Col>
            <Col>
              <Button
                variant="dark"
                style={{ width: "100%" }}
                onClick={handleShow}
              >
                Edit Item
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Image src={newImage} style={{ maxWidth: "100%" }} />
            </Col>
            <Col>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={newID}
                    onChange={(e) => setNewID(Number(e.target.value))}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              sendUpdateRequest();
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InventoryItem;
