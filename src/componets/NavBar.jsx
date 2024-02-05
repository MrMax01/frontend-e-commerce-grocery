import { Button, Col, Container, Form, Modal, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMyProfile, clearToken, fetchMyProfile, login } from "../redux/actions";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [show, setShow] = useState(false);

  const myToken = useSelector((state) => state.userToken.content);
  const navigation = useNavigate();
  const myProfile = useSelector((state) => state.me.content);
  const myCart = useSelector((state) => state.cart.content);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const handleSumbit = (e) => {
    e.preventDefault();
    dispatch(login(userLogin));
  };
  const handleSignOut = () => {
    // Rimuovi il token dallo stato Redux
    dispatch(clearMyProfile());
    dispatch(clearToken());
    navigation("/");

    // Rimuovi il token dal localStorage
    localStorage.removeItem("token");
  };

  const handelChange = (propertyName, propertyValue) => {
    setUserLogin({ ...userLogin, [propertyName]: propertyValue });
  };

  useEffect(() => {
    if (myToken !== null) {
      dispatch(fetchMyProfile(myToken));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myToken]);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="">
          <Link to="/" className="myTitle me-2">
            <img src={logo} alt="Bootstrap" width="40" height="40" className="me-2" />
            Grocery-Shop
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className=" d-flex justify-content-between w-100">
              <Form className="d-flex w-75">
                <Form.Control
                  className="me-2"
                  type="text"
                  placeholder="search..."
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
                <Button
                  className="primary-button"
                  onClick={() => {
                    navigation(`/product/all/?q=${query}`);
                  }}
                >
                  Search
                </Button>
              </Form>
              <div className="d-flex justify-content-center align-items-center ">
                {myProfile ? (
                  <>
                    {myProfile.role === "CUSTOMER" && (
                      <Button
                        onClick={() => {
                          navigation("/mycart");
                        }}
                        className="rounded-circle d-block icon me-3 position-relative primary-button "
                      >
                        <i className="bi bi-cart "></i>
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {myCart.length > 0 ? myCart.length : 0}
                          <span className="visually-hidden">unread messages</span>
                        </span>
                      </Button>
                    )}
                    <NavDropdown
                      title={
                        myProfile ? (
                          <>
                            <img alt="me" src={myProfile.avatar} width={40} height={40} className="rounded-circle " />
                            {/* <br /> */}
                            {/* <span>Tu</span> */}
                          </>
                        ) : (
                          // <ProfileImgLoader />
                          <></>
                        )
                      }
                      id="dropdown"
                      drop="start"
                    >
                      <div className="dropdownSizesControl ">
                        <NavDropdown.Item>
                          <Row>
                            <Col xs={3}>
                              <img alt="me" src={myProfile.avatar} width={80} height={80} className="rounded-circle" />
                            </Col>
                            <Col xs={7}>
                              <Row className="text-start">
                                <div className="d-flex flex-column mt-3 p-0 ps-1">
                                  {myProfile.surname} {myProfile.name}
                                  <div>{myProfile.company_name}</div>
                                </div>
                              </Row>
                            </Col>
                          </Row>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          {/* <Button
                            variant="outline-primary"
                            className="w-100 rounded-pill"
                            onClick={() => {
                              navigation("/profile/me");
                            }}
                          >
                            Visualizza Profilo
                          </Button> */}
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Header>Account</NavDropdown.Header>
                        {/* <NavDropdown.Item>Prova Premium gratis</NavDropdown.Item> */}
                        <NavDropdown.Item>Impostazioni</NavDropdown.Item>
                        {/* <NavDropdown.Item>Guida</NavDropdown.Item> */}
                        {/* <NavDropdown.Item>Lingua</NavDropdown.Item> */}
                        <NavDropdown.Divider />
                        {myProfile.role === "SUPPLIER" && (
                          <>
                            <NavDropdown.Header>Gestisci</NavDropdown.Header>
                            <NavDropdown.Item
                              onClick={() => {
                                navigation("/dashboard");
                              }}
                            >
                              Dashboard e attività
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                          </>
                        )}
                        <NavDropdown.Item onClick={handleSignOut}>Sign Out</NavDropdown.Item>
                      </div>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <Button className="me-2 primary-button" onClick={handleShow}>
                      Login
                    </Button>
                    <Button
                      className="secondary-button"
                      onClick={() => {
                        navigation("/register");
                      }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>
            </Nav>

            <Nav className="d-lg-none">
              <Row>
                <Col>
                  <Link className="d-block myLinks" to="/product/frutta">
                    Frutta
                  </Link>
                  <Link className="d-block myLinks" to="/product/verdura">
                    Verdura
                  </Link>
                  <Link className="d-block myLinks" to="/product/carne">
                    Carne
                  </Link>
                  <Link className="d-block myLinks" to="/product/pesce">
                    Pesce
                  </Link>
                  <Link className="d-block myLinks" to="/product/latte">
                    Latte
                  </Link>
                  <Link className="d-block myLinks" to="/product/formaggio">
                    Formaggio
                  </Link>
                  <Link className="d-block myLinks" to="/product/uova">
                    Uova
                  </Link>
                </Col>
                <Col>
                  <Link className="d-block myLinks" to="/product/pasta">
                    Pasta
                  </Link>
                  <Link className="d-block myLinks" to="/product/riso">
                    Riso
                  </Link>
                  <Link className="d-block myLinks" to="/product/cereali">
                    Cereali
                  </Link>
                  <Link className="d-block myLinks" to="/product/legumi">
                    Legumi
                  </Link>
                  <Link className="d-block myLinks" to="/product/bevande">
                    Bevande
                  </Link>
                  <Link className="d-block myLinks" to="/product/olio">
                    Olio
                  </Link>
                  <Link className="d-block myLinks" to="/product/aceto">
                    Aceto
                  </Link>
                  <Link className="d-block myLinks" to="/product/all">
                    Tutti i prodotti
                  </Link>
                </Col>
              </Row>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Navbar expand="lg" className="bg-body-tertiary d-none d-lg-block">
        <Container>
          <Nav className="me-auto">
            <Link className="myLinks me-3" to="/product/frutta">
              Frutta
            </Link>
            <Link className="myLinks me-3" to="/product/verdura">
              Verdura
            </Link>
            <Link className="myLinks me-3" to="/product/carne">
              Carne
            </Link>
            <Link className="myLinks me-3" to="/product/pesce">
              Pesce
            </Link>
            <Link className="myLinks me-3" to="/product/latte">
              Latte
            </Link>
            <Link className="myLinks me-3" to="/product/formaggio">
              Formaggio
            </Link>
            <Link className="myLinks me-3" to="/product/uova">
              Uova
            </Link>
            <Link className="myLinks me-3" to="/product/pasta">
              Pasta
            </Link>
            <Link className="myLinks me-3" to="/product/riso">
              Riso
            </Link>
            <Link className="myLinks me-3" to="/product/cereali">
              Cereali
            </Link>
            <Link className="myLinks me-3" to="/product/legumi">
              Legumi
            </Link>
            <Link className="myLinks me-3" to="/product/bevande">
              Bevande
            </Link>
            <Link className="myLinks me-3" to="/product/olio">
              Olio
            </Link>
            <Link className="myLinks me-3" to="/product/aceto">
              Aceto
            </Link>
            <Link className="myLinks me-3" to="/product/all">
              Tutti i prodotti
            </Link>
          </Nav>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Grocery Shop</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSumbit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e) => {
                  handelChange("email", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPlaintextPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  handelChange("password", e.target.value);
                }}
              />
            </Form.Group>
            <Button className="primary-button" type="submit" onClick={handleClose}>
              login
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="secondary-button" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavBar;
