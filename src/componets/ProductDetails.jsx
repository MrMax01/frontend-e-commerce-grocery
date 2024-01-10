import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart, getMyCart, getProductDetail } from "../redux/actions";
import { Alert, Button, Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import NavBar from "./NavBar";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [changeQuantity, setChangeQuantity] = useState(0);

  const item = useSelector((state) => state.productDetail.content);
  const myCart = useSelector((state) => state.cart.content);
  const myToken = useSelector((state) => state.userToken.content);
  const isProductInCart = myCart.some((cartItem) => cartItem.product.id === productId);
  const myProfile = useSelector((state) => state.me.content);
  const [validationError, setValidationError] = useState("");
  const isNumeric = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };

  useEffect(() => {
    dispatch(getProductDetail(productId));
  }, [productId]);

  return item ? (
    <Container className="p-5">
      <NavBar />
      <Row xs={1} lg={2} className="mt-5">
        <Col>
          <Card>
            <Card.Img variant="top" src={item.photo} />
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <span className="me-2">€</span>
                {item.unit_price}/{item.unitOfMeasure}
              </ListGroup.Item>
              <ListGroup.Item>
                quantità massima: {item.quantity} {item.unitOfMeasure}
              </ListGroup.Item>
              <ListGroup.Item>
                pubblicato: {item.publicatedAt}
                {/* {item.supplier.company_name} */}
              </ListGroup.Item>
            </ListGroup>
            {myProfile.role === "CUSTOMER" && (
              <Card.Body>
                <Form>
                  <Form.Label>quantità che hai bisogno</Form.Label>
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-2">
                      <Form.Control
                        type="number"
                        placeholder="example 100.5"
                        onChange={(e) => {
                          setChangeQuantity(e.target.value);
                          setValidationError("");
                        }}
                        disabled={myToken === null}
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
                  {isProductInCart ? (
                    <>
                      <span className="text-success bolder">Aggiunto</span>
                      <i className="bi bi-check-circle-fill text-success"></i>
                    </>
                  ) : (
                    <Button
                      className="secondary-button"
                      disabled={myToken === null || changeQuantity === 0 || changeQuantity > item.quantity}
                      onClick={() => {
                        if (!isNumeric(changeQuantity)) {
                          setValidationError("Inserisci un numero valido per il costo.");
                          return;
                        }
                        dispatch(addToCart(myToken, { productId: productId, quantity: changeQuantity }));
                      }}
                    >
                      Aggiungi al carrello
                    </Button>
                  )}
                </Form>
              </Card.Body>
            )}

            <Alert variant="warning" className={changeQuantity > item.quantity ? "mt-3" : "d-none"}>
              Quantità superiore a quella disponibile
            </Alert>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <Container>
      <h1>loading</h1>
    </Container>
  );
};
export default ProductDetails;
