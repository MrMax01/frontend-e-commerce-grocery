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
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const handleSumbit = (e) => {
    e.preventDefault();
    dispatch(login(userLogin));
  };
  const handleSignOut = () => {
    // Rimuovi il token dallo stato Redux
    dispatch(clearMyProfile());
    dispatch(clearToken());

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
          <Navbar.Brand href="#home">
            <img src={logo} alt="Bootstrap" width="40" height="40" className="me-2" />
            Grocery Shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className=" d-flex justify-content-between w-100">
              <Form className="d-flex w-75">
                <Form.Control type="text" placeholder="name@example.com" />
                <Button variant="outline-success">Search</Button>
              </Form>
              <div className="d-flex justify-content-center align-items-center ">
                {myProfile ? (
                  <>
                    <Button variant="danger" className="rounded-circle d-block icon me-3">
                      <i className="bi bi-cart "></i>
                    </Button>
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
                              <img alt="me" src={myProfile.image} width={80} height={80} className="rounded-circle" />
                            </Col>
                            <Col xs={7}>
                              <Row className="text-start">
                                <div className="d-flex flex-column mt-3 p-0 ps-1">
                                  <Link to="/me">
                                    {myProfile.surname} {myProfile.name}
                                  </Link>
                                  <div>{myProfile.company_name}</div>
                                </div>
                              </Row>
                            </Col>
                          </Row>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Button
                            variant="outline-primary"
                            className="w-100 rounded-pill"
                            onClick={() => {
                              navigation("/profile/me");
                            }}
                          >
                            Visualizza Profilo
                          </Button>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Header>Account</NavDropdown.Header>
                        <NavDropdown.Item>Prova Premium gratis</NavDropdown.Item>
                        <NavDropdown.Item>Impostazioni & privecy</NavDropdown.Item>
                        <NavDropdown.Item>Guida</NavDropdown.Item>
                        <NavDropdown.Item>Lingua</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Header>Gestisci</NavDropdown.Header>
                        <NavDropdown.Item>Posts & attività</NavDropdown.Item>
                        <NavDropdown.Item>Account per la pubblicazione di Off...</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleSignOut}>Sign Out</NavDropdown.Item>
                      </div>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <Button className="me-2 primary-button" onClick={handleShow}>
                      Login
                    </Button>
                    <Button className="secondary-button">Register</Button>
                  </>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
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
