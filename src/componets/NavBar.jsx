import { Button, Container, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";
import logo from "../assets/logo.png";

const NavBar = () => {
  return (
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
              <Button variant="primary" className="me-2">
                Login
              </Button>
              <Button variant="success">Register</Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
