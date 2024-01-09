import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addMyProduct, getProductDetail, pictureForMyProduct, updateMyProduct } from "../redux/actions";
import NavBar from "./NavBar";
import { Button, Card, Col, Container, Form, Image, ListGroup, Modal, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useEffect, useRef, useState } from "react";

const DashboardUpdateProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [changeQuantity, setChangeQuantity] = useState(0);

  const myCart = useSelector((state) => state.cart.content);
  const myToken = useSelector((state) => state.userToken.content);
  const isProductInCart = myCart.some((cartItem) => cartItem.product.id === productId);

  const [savedProduct, setSavedProduct] = useState(null);
  const [urlImg, setUrlImg] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const previewImg = (event) => {
    console.log(event);
    const [file] = event.target.files;
    if (file) {
      setUrlImg(URL.createObjectURL(file));
    }
  };
  const photoInput = useRef(null);

  const handleClick = () => {
    photoInput.current.click();
  };

  const handleSubmitPhoto = (event) => {
    event.preventDefault();
    const form = document.querySelector(`#photoForm`);
    const formData = new FormData(form);
    console.log(formData);

    dispatch(pictureForMyProduct(myToken, formData, productId));

    handleClose();
  };
  const handleSumbit = (e) => {
    e.preventDefault();
    dispatch(updateMyProduct(myToken, savedProduct, productId));
    console.log(savedProduct);
  };
  useEffect(() => {
    fetch("http://localhost:8080/products/" + productId, {
      headers: {
        Authorization: "Bearer " + myToken,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((product) => {
        const newproduct = {
          name: product.name,
          category: product.category,
          product_status: product.product_status,
          description: product.description,
          unit_price: product.unit_price,
          quantity: product.quantity,
        };
        setUrlImg(product.photo);
        setSavedProduct(newproduct);
      })
      .catch((err) => console.log(err));
  }, [productId]);
  return (
    <>
      <NavBar />

      <Container fluid className="bg-dashborad-color d-flex pb-5 min-height-100">
        <Sidebar />
        {savedProduct && (
          <Row xs={1} lg={2} className="mt-2 w-100">
            <Col>
              <Card className="shadow mt-2">
                <Card.Img variant="top" src={urlImg} />
                <Card.Body>
                  <Button className="primary-button" onClick={handleShow}>
                    Upload
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="card-style w-100 my-2 shadow border-0">
                <Form onSubmit={handleSumbit}>
                  <Card.Body>
                    <Card.Title>
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={savedProduct.name}
                        defaultValue={savedProduct.name}
                        onChange={(e) => {
                          setSavedProduct({ ...savedProduct, name: e.target.value });
                        }}
                      />
                    </Card.Title>
                    <Card.Text>
                      <Form.Group className="mb-3" controlId="formBasicRegion">
                        <Form.Label>Stato del prodotto</Form.Label>
                        <Form.Select
                          defaultValue={savedProduct.product_status}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setSavedProduct({ ...savedProduct, product_status: e.target.value });
                          }}
                        >
                          <option value="DISPONIBILE">DISPONIBILE</option>
                          <option value="ESAURITO">ESAURITO</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicRegion">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                          defaultValue={savedProduct.category}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setSavedProduct({ ...savedProduct, category: e.target.value });
                          }}
                        >
                          <option value="FRUTTA">Frutta</option>
                          <option value="VERDURA">Verdura</option>
                          <option value="CARNE">Carne</option>
                          <option value="PESCE">Pesce</option>
                          <option value="LATTE">Latte</option>
                          <option value="FORMAGGIO">Fromaggio</option>
                          <option value="UOVA">Uova</option>
                          <option value="PASTA">Pasta</option>
                          <option value="RISO">Riso</option>
                          <option value="CEREALI">Cereali</option>
                          <option value="LEGUMI">Legumi</option>
                          <option value="BEVANDE">Bevande</option>
                          <option value="OLIO">Olio</option>
                          <option value="ACETO">Aceto</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Label>Descrizione prodotto</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={savedProduct.description}
                        defaultValue={savedProduct.description}
                        onChange={(e) => {
                          setSavedProduct({ ...savedProduct, description: e.target.value });
                        }}
                      />
                      <Form.Label>Costo al kg</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={savedProduct.unit_price}
                        defaultValue={savedProduct.unit_price}
                        onChange={(e) => {
                          setSavedProduct({ ...savedProduct, unit_price: e.target.value });
                        }}
                      />
                      <Form.Label>Quantità disponibile</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={savedProduct.quantity}
                        defaultValue={savedProduct.quantity}
                        onChange={(e) => {
                          setSavedProduct({ ...savedProduct, quantity: e.target.value });
                        }}
                      />
                    </Card.Text>
                    <Button type="submit" className="primary-button">
                      Salva
                    </Button>
                  </Card.Body>
                </Form>
              </Card>
            </Col>
            <Modal show={show} onHide={handleClose} className="mt-3" keyboard={true}>
              <Form onSubmit={handleSubmitPhoto} id="photoForm">
                <Modal.Header closeButton>
                  <Modal.Title>
                    <p>Carica una Immagine</p>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Image src={urlImg} alt="Preview" className="w-100" />
                </Modal.Body>
                <Modal.Footer>
                  <Form.Control type="file" className="d-none" name="avatar" onChange={previewImg} ref={photoInput} />
                  <Button onClick={handleClick}>Add Photo</Button>
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </Row>
        )}
      </Container>
    </>
  );
};
export default DashboardUpdateProduct;
