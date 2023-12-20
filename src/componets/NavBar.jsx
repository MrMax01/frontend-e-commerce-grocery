import { Button, Container, Form, Modal, Nav, NavDropdown, Navbar } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useState } from "react";

const NavBar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="">
          <Navbar.Brand href="#home">
            <img src={logo} alt="Bootstrap" width="30" height="30" className="me-2" />
            Grocery Shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className=" d-flex justify-content-between w-100">
              <Form className="d-flex w-75">
                <Form.Control type="text" placeholder="name@example.com" />
                <Button variant="outline-success">Search</Button>
              </Form>
              <div className="d-flex">
                <Button className="me-2 primary-button" onClick={handleShow}>
                  Login
                </Button>
                <Button className="secondary-button">Register</Button>
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
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPlaintextPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="secondary-button" onClick={handleClose}>
            Close
          </Button>
          <Button className="primary-button" onClick={handleClose}>
            login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavBar;
