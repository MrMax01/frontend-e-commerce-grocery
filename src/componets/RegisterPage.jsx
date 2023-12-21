import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import indirizzoData from "../backend/it.json";
import { useEffect, useState } from "react";
import supplier from "../assets/farmer.png";
import customer from "../assets/customer.png";

const RegisterPage = () => {
  const regioniUniche = [...new Set(indirizzoData.map((item) => item.admin_name))];
  const citta = indirizzoData.filter((item) => item.admin_name === "Campania");
  const [page, setPage] = useState(1);
  const [role, setRole] = useState("");
  const [savedClient, setSavedClient] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    telephone: "",
    partitaIva: "",
    company_name: "",
    region: "",
    city: "",
    via: "",
  });
  useEffect(() => {}, [page]);

  return (
    <Container className="pb-5 d-flex align-items-center " style={{ minHeight: "100vh" }}>
      <div className="text-center form-box">
        <Form>
          {page === 1 && (
            <>
              <h2>In che ruolo ti identifichi?</h2>
              <Row className="my-2">
                <Col>
                  <Card
                    className="bg-dark text-white"
                    onClick={() => setRole("SUPPLIER")}
                    style={{
                      maxWidth: "500px",
                      cursor: "pointer",
                      border: role === "SUPPLIER" ? "5px solid #ed6a5e " : "none",
                    }}
                  >
                    <Card.Img src={supplier} alt="Card image" style={{ filter: "brightness(40%)" }} />
                    <Card.ImgOverlay className="d-flex flex-column justify-content-center">
                      <Card.Title>SUPPLIER</Card.Title>
                      <Card.Text>
                        Siamo un'azienda dedicata alla produzione di prodotti alimentari di altissima qualità,
                        sottoposti a rigorosi controlli e certificazioni. Il nostro impegno è far conoscere ai
                        consumatori la qualità distintiva dei nostri prodotti, la nostra professionalità e diffondere la
                        consapevolezza sull'importanza di una corretta alimentazione e dell'attenzione dedicata a ciò
                        che mangiamo. Siamo qui per raggiungere un pubblico più ampio, condividendo la nostra passione
                        per la qualità e la cura degli alimenti.
                      </Card.Text>
                    </Card.ImgOverlay>
                  </Card>
                </Col>
                <Col>
                  <Card
                    className="bg-dark text-white"
                    onClick={() => setRole("CUSTOMER")}
                    style={{
                      maxWidth: "500px",
                      cursor: "pointer",
                      border: role === "CUSTOMER" ? "5px solid #ed6a5e " : "none",
                    }}
                  >
                    <Card.Img src={customer} alt="Card image" style={{ filter: "brightness(40%)" }} />
                    <Card.ImgOverlay className="d-flex flex-column justify-content-center">
                      <Card.Title>CUSTOMER</Card.Title>
                      <Card.Text>
                        Siamo un'azienda di ristoratori alla ricerca di prodotti di qualità superiore per arricchire la
                        nostra offerta culinaria. La nostra costante ricerca di eccellenza ci ha portato a selezionare
                        attentamente ingredienti che rispondono ai più elevati standard. Desideriamo fornire ai nostri
                        clienti un'esperienza gastronomica unica, basata su materie prime di prima scelta. Collaboriamo
                        con fornitori certificati per garantire freschezza, sapore autentico e qualità in ogni piatto
                        che portiamo in tavola.
                      </Card.Text>
                    </Card.ImgOverlay>
                  </Card>
                </Col>
              </Row>
            </>
          )}
          {page === 2 && (
            <>
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  onChange={(e) => {
                    setSavedClient({ ...savedClient, name: e.target.value });
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  onChange={(e) => {
                    setSavedClient({ ...savedClient, surname: e.target.value });
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => {
                    setSavedClient({ ...savedClient, email: e.target.value });
                  }}
                />
                <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setSavedClient({ ...savedClient, password: e.target.value });
                  }}
                />
              </Form.Group>
            </>
          )}
          {page === 3 && (
            <>
              <Form.Group className="mb-3" controlId="formBasicCompanyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter company name"
                  onChange={(e) => {
                    setSavedClient({ ...savedClient, company_name: e.target.value });
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicVAT">
                <Form.Label>Partita IVA</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Partita IVA"
                  onChange={(e) => {
                    setSavedClient({ ...savedClient, partitaIva: e.target.value });
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter phone number"
                  onChange={(e) => {
                    setSavedClient({ ...savedClient, telephone: e.target.value });
                  }}
                />
              </Form.Group>
            </>
          )}
          {page === 4 ? (
            <>
              <Form.Group className="mb-3" controlId="formBasicRegion">
                <Form.Label>Region</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    console.log(e.target.value);
                    setSavedClient({ ...savedClient, region: e.target.value });
                  }}
                >
                  <option value="">Select Region</option>
                  {regioniUniche.map((region, index) => (
                    <option key={index} value={region.toUpperCase()}>
                      {region}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    console.log(e.target.value);
                    setSavedClient({ ...savedClient, city: e.target.value });
                  }}
                  disabled={savedClient.region.trim() === ""}
                >
                  <option value="">Select City</option>
                  {citta.map((city, index) => (
                    <option key={index} value={city.city.toUpperCase()}>
                      {city.city}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>via</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  onChange={(e) => {
                    setSavedClient({ ...savedClient, via: e.target.value });
                  }}
                />
              </Form.Group>
              <Button
                className="mx-3"
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                Indietro
              </Button>
              <Button variant="primary" type="submit" className="mx-3">
                Submit
              </Button>
            </>
          ) : (
            <>
              {page === 1 && (
                <Button
                  className="mx-3"
                  onClick={() => {
                    setPage(page + 1);
                  }}
                >
                  Avanti
                </Button>
              )}
              {page !== 1 && (
                <>
                  <Button
                    className="mx-3"
                    onClick={() => {
                      setPage(page - 1);
                    }}
                  >
                    Indietro
                  </Button>
                  <Button
                    className="mx-3"
                    onClick={() => {
                      setPage(page + 1);
                    }}
                  >
                    Avanti
                  </Button>
                </>
              )}
            </>
          )}
        </Form>
      </div>
    </Container>
  );
};
export default RegisterPage;
