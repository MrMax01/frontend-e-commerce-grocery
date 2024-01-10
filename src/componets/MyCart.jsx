import { Alert, Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addOrder, deleteMyCart, getMyCart, getMyOrders } from "../redux/actions";

const MyCart = () => {
  const myToken = useSelector((state) => state.userToken.content);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.content);
  const ordersItems = useSelector((state) => state.orders.content);
  const [changeQuantity, setChangeQuantity] = useState({ productId: "", quantity: "" });
  const [total, setTotal] = useState(0);
  const [validationError, setValidationError] = useState("");
  const isNumeric = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };

  //   const handelChange = (propertyName, propertyValue) => {
  //     setChangeQuantity({ ...changeQuantity, [propertyName]: propertyValue });
  //   };

  const [showModal, setShowModal] = useState(null);
  const handleSumbit = () => {
    let dataToUpdate = { quantity: changeQuantity.quantity };
    if (!isNumeric(dataToUpdate.quantity)) {
      setValidationError("Inserisci un numero valido per il costo.");
      return;
    }
    fetch("http://localhost:8080/cart/" + changeQuantity.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + myToken,
      },
      body: JSON.stringify(dataToUpdate),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Qui potresti fare il controllo sulla validità del JSON
      })
      .then((data) => {
        if (data) {
          console.log("PUT request successful:", data);
          dispatch(getMyCart(myToken));
          handleClose();
        } else {
          // Se la risposta non è JSON valido o è vuota
          console.error("Empty or invalid JSON response");
        }
      })
      .catch((error) => {
        console.error("Error making PUT request:", error);
      });
  };

  const handleClose = () => {
    setShowModal(null);
  };
  const handleShow = (cartId) => {
    setShowModal(cartId);
  };
  useEffect(() => {
    dispatch(getMyCart(myToken));
    dispatch(getMyOrders(myToken));
  }, [myToken, cartItems.length]);
  return myToken != null ? (
    <Container>
      <NavBar />
      <h2 className="mt-5">Carrello:</h2>
      <Row xs={1} lg={2}>
        {cartItems.length === 0 ? (
          <>
            <Col>
              <div className="d-flex justify-content-center align-items-center  border">
                <i className="bi bi-cart-x fs-1 secondary-color me-2"></i>
                <span className="fs-1">Carrello Vuoto</span>
              </div>
            </Col>
            <Col className="text-center">
              <h3>
                TOTALE: <br />€ 0
              </h3>
            </Col>
          </>
        ) : (
          <>
            <Col>
              <Row>
                <Col>
                  <span className="fw-bold">Item:</span>
                </Col>
                <Col>
                  <span className="fw-bold">Quantità:</span>
                </Col>
                <Col>
                  <span className="fw-bold">Costo:</span>
                </Col>
              </Row>
              <hr />
              {cartItems.length > 0 &&
                cartItems.map((cart, i) => (
                  <div key={cart.id}>
                    <Row className=" justify-content-between align-items-center mb-3 shadow-sm">
                      <Col>
                        <Card>
                          <Card.Img variant="top" src={cart.product.photo} />
                        </Card>
                      </Col>
                      <Col className="text-truncate">
                        <div>
                          <p className="m-0 ">{cart.product.name}</p>
                          <p className="m-0 ">{cart.product.category}</p>
                          <p className="m-0 ">max: {cart.product.quantity}kg</p>
                        </div>
                      </Col>
                      <Col></Col>
                      <Col>
                        <div className="d-flex align-items-center">
                          <div className="me-2">
                            <span>{cart.quantity}kg</span>
                          </div>
                          <div>
                            <i className="bi bi-gear-fill hvr-grow" onClick={() => handleShow(cart.id)}></i>

                            <Modal show={showModal === cart.id} onHide={handleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>{cart.product.category}</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Form>
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>
                                      cambia la quantità di cui hai bisogno(max: {cart.product.quantity}kg){" "}
                                    </Form.Label>
                                    <div className="d-flex align-items-center mb-3">
                                      <div className="me-2">
                                        <Form.Control
                                          type="number"
                                          placeholder={cart.quantity}
                                          onChange={(e) => {
                                            setChangeQuantity({ id: cart.id, quantity: e.target.value });
                                            setValidationError("");
                                          }}
                                        />
                                        {validationError && (
                                          <Alert variant="danger" className="text-danger">
                                            {validationError}
                                          </Alert>
                                        )}
                                      </div>
                                      <div>
                                        <span>kg</span>
                                      </div>
                                    </div>
                                  </Form.Group>
                                </Form>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                  Close
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    handleSumbit();
                                  }}
                                >
                                  Save Changes
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <span>€{cart.product.unit_price * cart.quantity}</span>
                      </Col>
                      <Col>
                        <i
                          className="bi bi-x-lg secondary-color fs-5 hvr-grow"
                          onClick={() => {
                            dispatch(deleteMyCart(myToken, cart.id));
                          }}
                        ></i>
                      </Col>
                    </Row>
                    <Alert variant="danger" className={cart.product.quantity < cart.quantity ? "d-block" : "d-none"}>
                      Attenzione rimettere la quantità che vuoi acquistare!
                    </Alert>
                  </div>
                ))}
            </Col>
            <Col className="text-center">
              <h3>
                TOTALE: <br />€
                {cartItems.reduce(
                  (totalQuantity, cartItem) => totalQuantity + cartItem.quantity * cartItem.product.unit_price,
                  0
                )}
              </h3>
              <Button
                onClick={() => {
                  dispatch(addOrder(myToken, cartItems));
                }}
              >
                Buy it
              </Button>
            </Col>
          </>
        )}
      </Row>
      <br />
      <Container fluid className="mt-5">
        <h2>Ordini:</h2>
        {ordersItems.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center  border">
            <i className="bi bi-bag-x secondary-color fs-1 me-2"></i>
            <span className="fs-1">Non hai ordini</span>
          </div>
        ) : (
          <>
            <Row>
              <Col>
                <span className="fw-bold">Item:</span>
              </Col>
              <Col>
                <span className="fw-bold">Nome prodotto:</span>
              </Col>
              <Col>
                <span className="fw-bold">stato dell'ordine:</span>
              </Col>
              <Col>
                <span className="fw-bold">quantità:</span>
              </Col>
              <Col>
                <span className="fw-bold">costo:</span>
              </Col>
            </Row>
            {ordersItems.map((order, i) => (
              <Row key={order.id} className="border  align-items-center mb-3">
                <Col>
                  <Card style={{ width: "5rem" }}>
                    <Card.Img variant="top" src={order.product.photo} />
                  </Card>
                </Col>
                <Col>{order.product.name}</Col>
                <Col>{order.orderStatus}</Col>
                <Col>
                  {order.quantity}
                  {order.unitOfMeasure}
                </Col>
                <Col>{order.totalCost}€</Col>
              </Row>
            ))}
          </>
        )}
      </Container>
    </Container>
  ) : (
    <Container>error</Container>
  );
};
export default MyCart;
