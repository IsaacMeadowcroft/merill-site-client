import React, { FC, useEffect, useState } from "react";
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
  const [newImage, setNewImage] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newDescription, setNewDescription] = useState("");
  const [shopItems, setShopItems] = useState(props.shopItems || []);
  const [newID, setNewID] = useState(
    Math.max.apply(
      Math,
      shopItems?.map(function (o) {
        return o.id;
      })
    ) + 1
  );

  if (newID < 0) {
    setNewID(1);
  }

  const sendPostRequest = async () => {
    const res = await fetch(
      "https://merillbackend.herokuapp.com/postShopItem/ADD",
      {
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
      }
    );
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
    setNewID(newID + 1);
    setNewImage("");
    setNewTitle("");
    setNewPrice(0);
    setNewDescription("");
  };

  const removeShopItem = (shopItem: TShopItem) => {
    const newShopItems = shopItems.filter((item) => item !== shopItem);
    setShopItems(newShopItems);
  };

  useEffect(() => {
    setNewID(
      Math.max.apply(
        Math,
        shopItems?.map(function (o) {
          return o.id;
        })
      ) + 1
    );
  }, [shopItems.length]);

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
              Create New Shop Item
            </Button>
          </Card.Body>
        </Card>
        {shopItems
          ?.sort((a, b) => a.id - b.id)
          .map((shopItem: TShopItem) => (
            <div key={shopItem.id}>
              <InventoryItem
                shopItem={shopItem}
                removeShopItem={removeShopItem}
              />
            </div>
          ))}
      </Container>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ height: "100%" }}>
            <Col
              style={{
                textAlign: "center",
                height: "100%",
              }}
            >
              {newImage == "" ? (
                "Input Image URL To Render Image"
              ) : (
                <Image src={newImage} style={{ maxWidth: "100%" }} />
              )}
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
