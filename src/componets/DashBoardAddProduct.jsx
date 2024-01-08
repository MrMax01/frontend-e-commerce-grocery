import { Button, Card, Container, Form, ListGroup } from "react-bootstrap";
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
  });
  const myToken = useSelector((state) => state.userToken.content);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSumbit = (e) => {
    e.preventDefault();
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
                  placeholder="raccontaci la storia del prodotto...."
                  onChange={(e) => {
                    setSavedProduct({ ...savedProduct, description: e.target.value });
                  }}
                />
                <Form.Label>Costo al kg</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="price"
                  onChange={(e) => {
                    setSavedProduct({ ...savedProduct, unit_price: e.target.value });
                  }}
                />
                <Form.Label>Quantità disponibile</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="quantity avaible"
                  onChange={(e) => {
                    setSavedProduct({ ...savedProduct, quantity: e.target.value });
                  }}
                />
              </Card.Text>
              <Button type="submit">Salva Prodotto</Button>
            </Card.Body>
          </Form>
        </Card>
      </Container>
    </>
  );
};
export default DashBoardAddProduct;
