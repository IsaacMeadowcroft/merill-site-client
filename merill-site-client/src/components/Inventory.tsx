import React, { FC, useState } from "react";
import { IShopItems, TShopItem } from "./interfaces";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import InventoryItem from "./InventoryItem";

export const Inventory: FC<IShopItems> = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newID, setNewID] = useState(0);
  const [newImage, setNewImage] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newDescription, setNewDescription] = useState("");
  const [shopItems, setShopItems] = useState(props.shopItems);

  const sendPostRequest = async () => {
    const res = await fetch("http://127.0.0.1:8080/postShopItem/ADD", {
      method: "POST",
      body: JSON.stringify({
        id: newID,
        title: newTitle,
        image: newImage,
        description: newDescription,
        price: newPrice,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
  };

  const handlePostRequest = async () => {
    await sendPostRequest();
    if (shopItems) {
      setShopItems([
        ...shopItems,
        {
          id: newID,
          title: newTitle,
          image: newImage,
          description: newDescription,
          price: newPrice,
        },
      ]);
    }
    setNewID(0);
    setNewImage("");
    setNewTitle("");
    setNewPrice(0);
    setNewDescription("");
  };

  return (
    <>
      <Container fluid>
        <Card style={{ maxWidth: "100vw", marginTop: "3vh" }}>
          <Card.Body>
            <Button
              variant="dark"
              style={{ width: "100%" }}
              onClick={handleShow}
            >
              Create new shop item
            </Button>
          </Card.Body>
        </Card>
        {shopItems
          ?.sort((a, b) => a.id - b.id)
          .map((shopItem: TShopItem) => (
            <div key={shopItem.id}>
              <InventoryItem shopItem={shopItem} />
            </div>
          ))}
      </Container>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create item</Modal.Title>
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
              handlePostRequest();
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

export default Inventory;
