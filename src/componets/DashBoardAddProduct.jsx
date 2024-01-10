import { Alert, Button, Card, Container, Form, ListGroup } from "react-bootstrap";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMyProduct } from "../redux/actions";

const DashBoardAddProduct = () => {
  const [savedProduct, setSavedProduct] = useState({
    name: "",
    category: "",
    description: "",
    unit_price: "",
    quantity: "",
    unitOfMeasure: "",
  });
  const myToken = useSelector((state) => state.userToken.content);
  const [validationErrors, setValidationErrors] = useState({
    unitPrice: "",
    quantity: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNumeric = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };
  const handleSumbit = (e) => {
    e.preventDefault();
    if (!isNumeric(savedProduct.unit_price)) {
      setValidationErrors({
        ...validationErrors,
        unitPrice: "Inserisci un numero valido per il costo.No lettere e al posto della virgola il punto.",
      });
      return;
    }
    if (!isNumeric(savedProduct.quantity)) {
      setValidationErrors({
        ...validationErrors,
        quantity: "Inserisci un numero valido per il costo.No lettere e al posto della virgola il punto.",
      });
      return;
    }
    dispatch(addMyProduct(myToken, savedProduct))
      .then(() => {
        // L'aggiunta del prodotto è andata a buon fine, esegui il redirect
        navigate("/dashboard/products");
      })
      .catch((error) => {
        console.error("Errore durante l'aggiunta del prodotto:", error);
        // Puoi gestire gli errori qui se necessario
      });
  };
  return (
    <>
      <NavBar />

      <Container fluid className="bg-dashborad-color d-flex pb-5 min-height-100">
        <Sidebar />
        <Card className="card-style w-100 my-2 shadow border-0">
          <Form onSubmit={handleSumbit}>
            <Card.Body>
              <Card.Title>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nome del prodotto"
                  onChange={(e) => {
                    setSavedProduct({ ...savedProduct, name: e.target.value });
                  }}
                />
              </Card.Title>
              <Card.Text>
                <Form.Group className="mb-3" controlId="formBasicRegion">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    onChange={(e) => {
                      console.log(e.target.value);
                      setSavedProduct({ ...savedProduct, category: e.target.value });
                    }}
                  >
                    <option value="">--Select-category--</option>
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
                  as="textarea"
                  placeholder="raccontaci la storia del prodotto...."
                  onChange={(e) => {
                    setSavedProduct({ ...savedProduct, description: e.target.value });
                  }}
                />
                <Form.Group className="mb-3" controlId="formBasicRegion">
                  <Form.Label>Unità di misura</Form.Label>
                  <Form.Select
                    onChange={(e) => {
                      console.log(e.target.value);
                      setSavedProduct({ ...savedProduct, unitOfMeasure: e.target.value });
                    }}
                  >
                    <option value="">--Select-Unit--</option>
                    <option value="KG">KG</option>
                    <option value="PZ">PZ</option>
                  </Form.Select>
                </Form.Group>
                <Form.Label>Costo Euro al kg o al pz</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="price"
                  onChange={(e) => {
                    setSavedProduct({ ...savedProduct, unit_price: e.target.value });
                    setValidationErrors({ ...validationErrors, unitPrice: "" });
                  }}
                />
                {validationErrors.unitPrice && (
                  <Alert variant="danger" className="text-danger">
                    {validationErrors.unitPrice}
                  </Alert>
                )}
                <Form.Label>Quantità disponibile</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="quantity avaible"
                  onChange={(e) => {
                    setSavedProduct({ ...savedProduct, quantity: e.target.value });
                    setValidationErrors({ ...validationErrors, quantity: "" });
                  }}
                />
                {validationErrors.quantity && (
                  <Alert variant="danger" className="text-danger">
                    {validationErrors.quantity}
                  </Alert>
                )}
              </Card.Text>
              <Button type="submit" className="primary-button">
                Salva Prodotto
              </Button>
            </Card.Body>
          </Form>
        </Card>
      </Container>
    </>
  );
};
export default DashBoardAddProduct;
