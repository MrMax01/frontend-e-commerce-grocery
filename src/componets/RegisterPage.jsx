import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import indirizzoData from "../backend/it.json";
import { useEffect, useState } from "react";
import supplier from "../assets/farmer.png";
import customer from "../assets/customer.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { registrationCustomer, registrationSupplier } from "../redux/actions";

const RegisterPage = () => {
  const [citta, setCitta] = useState([]);
  const [page, setPage] = useState(1);
  const [role, setRole] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();
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
  const regioniUniche = [...new Set(indirizzoData.map((item) => item.admin_name))];

  const setCityRegion = (region) => {
    const filteredCities = indirizzoData.filter(
      (item) => item.admin_name.trim().toUpperCase() === region.trim().toUpperCase()
    );
    setCitta(filteredCities);
  };
  useEffect(() => {}, [page, savedClient.region, alertMessage]);

  const validateAndProceed = () => {
    switch (page) {
      case 1:
        if (role !== "") {
          setAlertMessage(null);
          setPage(page + 1);
        } else {
          setAlertMessage("Seleziona un ruolo prima di procedere.");
        }
        break;
      case 2:
        if (
          savedClient.name !== "" &&
          savedClient.surname !== "" &&
          savedClient.email !== "" &&
          savedClient.password !== ""
        ) {
          setAlertMessage(null);
          setPage(page + 1);
        } else {
          setAlertMessage("Compila tutti i campi prima di procedere.");
        }
        break;
      case 3:
        if (savedClient.company_name !== "" && savedClient.partitaIva !== "" && savedClient.telephone !== "") {
          setAlertMessage(null);
          setPage(page + 1);
        } else {
          setAlertMessage("Compila tutti i campi prima di procedere.");
        }
        break;
      case 4:
        if (savedClient.region !== "" && savedClient.city !== "" && savedClient.via !== "") {
          setAlertMessage(null);
          // Puoi fare ulteriori controlli o inviare i dati del form a questo punto
          console.log("Dati del form inviati:", savedClient);
          //   if (role === "CUSTOMER") {
          //     if (dispatch(registrationCustomer(savedClient))) {
          //       setTimeout(() => {
          //         // navigate("/");
          //       }, 3000);

          //       console.log("successo");
          //     } else {
          //       console.log("nada");
          //     }
          //   } else if (role === "SUPPLIER") {
          //     if (dispatch(registrationSupplier(savedClient))) {
          //       setTimeout(() => {
          //         // navigate("/");
          //       }, 3000);
          //       console.log("successo");
          //     } else {
          //       console.log("nada");
          //     }
          //   }
        } else {
          setAlertMessage("Compila tutti i campi prima di procedere.");
        }
        break;
      default:
        break;
    }
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    if (role === "CUSTOMER") {
      try {
        let resp = await fetch("http://localhost:8080/register/customer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(savedClient),
        });

        if (resp.ok) {
          let me = await resp.json();
          console.log(me);
          setTimeout(() => {
            navigate("/");
          }, 3000);
          console.log("successo");
        } else {
          console.log("nada");
        }
      } catch (error) {
        console.log(error);
        // alert("errore reperimento utente");
      }
    } else if (role === "SUPPLIER") {
      try {
        let resp = await fetch("http://localhost:8080/register/supplier", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(savedClient),
        });

        if (resp.ok) {
          let me = await resp.json();
          console.log(me);
          setTimeout(() => {
            navigate("/");
          }, 3000);
          console.log("successo");
        } else {
          console.log("nada");
        }
      } catch (error) {
        console.log(error);
        // alert("errore reperimento utente");
      }
    }
  };

  return (
    <Container className="pb-5  " style={{ minHeight: "100vh" }}>
      <h1
        onClick={() => {
          navigate("/");
        }}
        style={{ cursor: "pointer" }}
      >
        Grocery Shop
      </h1>
      <Container className="pb-5 d-flex align-items-center ">
        <div className="text-center form-box">
          <Form onSubmit={handleSumbit}>
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
                          consumatori la qualità distintiva dei nostri prodotti, la nostra professionalità e diffondere
                          la consapevolezza sull'importanza di una corretta alimentazione e dell'attenzione dedicata a
                          ciò che mangiamo. Siamo qui per raggiungere un pubblico più ampio, condividendo la nostra
                          passione per la qualità e la cura degli alimenti.
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
                          Siamo un'azienda di ristoratori alla ricerca di prodotti di qualità superiore per arricchire
                          la nostra offerta culinaria. La nostra costante ricerca di eccellenza ci ha portato a
                          selezionare attentamente ingredienti che rispondono ai più elevati standard. Desideriamo
                          fornire ai nostri clienti un'esperienza gastronomica unica, basata su materie prime di prima
                          scelta. Collaboriamo con fornitori certificati per garantire freschezza, sapore autentico e
                          qualità in ogni piatto che portiamo in tavola.
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
                    placeholder={savedClient.name ? savedClient.name : "Enter first name"}
                    onChange={(e) => {
                      setSavedClient({ ...savedClient, name: e.target.value });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={savedClient.surname ? savedClient.surname : "Enter surname"}
                    onChange={(e) => {
                      setSavedClient({ ...savedClient, surname: e.target.value });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={savedClient.email ? savedClient.email : "Enter email"}
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
                    placeholder="password"
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
                    placeholder={savedClient.company_name ? savedClient.company_name : "Enter Company name"}
                    onChange={(e) => {
                      setSavedClient({ ...savedClient, company_name: e.target.value });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicVAT">
                  <Form.Label>Partita IVA</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={savedClient.partitaIva ? savedClient.partitaIva : "Enter partita IVA"}
                    onChange={(e) => {
                      setSavedClient({ ...savedClient, partitaIva: e.target.value });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder={savedClient.telephone ? savedClient.telephone : "Enter telephone"}
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
                      const selectedRegion = e.target.value;
                      setSavedClient({ ...savedClient, region: selectedRegion });
                      setCityRegion(selectedRegion);
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
                    placeholder={savedClient.via ? savedClient.via : "Enter via"}
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
                {alertMessage && (
                  <Alert className="mt-3" key="danger" variant="danger">
                    {alertMessage}
                  </Alert>
                )}
              </>
            ) : (
              <>
                {page === 1 && (
                  <Button
                    className="mx-3"
                    onClick={() => {
                      validateAndProceed();
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
                        validateAndProceed();
                      }}
                    >
                      Avanti
                    </Button>
                    {alertMessage && (
                      <Alert className="mt-3" key="danger" variant="danger">
                        {alertMessage}
                      </Alert>
                    )}
                  </>
                )}
              </>
            )}
          </Form>
        </div>
      </Container>
    </Container>
  );
};
export default RegisterPage;
