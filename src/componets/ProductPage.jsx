import { Button, Card, Col, Container, Row } from "react-bootstrap";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts, getProductsOfCategory } from "../redux/actions";
import { useNavigate, useParams } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const dispatch = useDispatch();
  const lastProducts = useSelector((state) => state.products.content);
  const myToken = useSelector((state) => state.userToken.content);

  useEffect(() => {
    switch (category) {
      case "frutta":
        dispatch(getProductsOfCategory(category.toUpperCase()));
        // Fai qualcosa per la categoria FRUTTA
        console.log("Categoria: Frutta");
        break;
      case "verdura":
        dispatch(getProductsOfCategory(category.toUpperCase()));
        // Fai qualcosa per la categoria VERDURA
        console.log("Categoria: Verdura");
        break;
      case "carne":
        dispatch(getProductsOfCategory(category.toUpperCase()));
        // Fai qualcosa per la categoria CARNE
        console.log("Categoria: Carne");
        break;
      case "pesce":
        dispatch(getProductsOfCategory(category.toUpperCase()));
        // Fai qualcosa per la categoria PESCE
        console.log("Categoria: Pesce");
        break;
      case "latte":
        dispatch(getProductsOfCategory(category.toUpperCase()));
        // Fai qualcosa per la categoria LATTE
        console.log("Categoria: Latte");
        break;
      case "formaggio":
        dispatch(getProductsOfCategory(category.toUpperCase()));
        // Fai qualcosa per la categoria FORMAGGIO
        console.log("Categoria: Formaggio");
        break;
      case "uova":
        dispatch(getProductsOfCategory(category.toUpperCase()));
        // Fai qualcosa per la categoria UOVA
        console.log("Categoria: Uova");
        break;
      case "pasta":
        dispatch(getProductsOfCategory(category.toUpperCase()));
        // Fai qualcosa per la categoria PASTA
        console.log("Categoria: Pasta");
        break;
      case "riso":
        dispatch(getProductsOfCategory(category.toUpperCase()));
        // Fai qualcosa per la categoria RISO
        console.log("Categoria: Riso");
        break;
      case "cereali":
        dispatch(getProductsOfCategory(category.toUpperCase()));
        // Fai qualcosa per la categoria CEREALI
        console.log("Categoria: Cereali");
        break;
      case "legumi":
        dispatch(getProductsOfCategory(category.toUpperCase()));
        // Fai qualcosa per la categoria LEGUMI
        console.log("Categoria: Legumi");
        break;
      case "bevande":
        dispatch(getProductsOfCategory(category.toUpperCase()));
        // Fai qualcosa per la categoria BEVANDE
        console.log("Categoria: Bevande");
        break;
      case "olio":
        dispatch(getProductsOfCategory(category.toUpperCase()));
        // Fai qualcosa per la categoria OLIO
        console.log("Categoria: Olio");
        break;
      case "aceto":
        dispatch(getProductsOfCategory(category.toUpperCase()));
        // Fai qualcosa per la categoria ACETO
        console.log("Categoria: Aceto");
        break;
      case "all":
        // Fai qualcosa per la categoria ACETO
        dispatch(getProducts());
        break;
      default:
        console.log("Categoria non valida");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
  return (
    <>
      <NavBar />
      <Container className="mt-5">
        <Row xs={1} md={2} lg={3}>
          {lastProducts.length > 0 ? (
            lastProducts.map((product, i) => (
              <Col key={i} className="mb-3">
                <Card style={{ width: "100%" }}>
                  <Card.Img
                    variant="top"
                    src={product.photo}
                    onClick={() => {
                      navigate(`/productDetail/${product.id}`);
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Title>${product.unit_price}/kg</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Button variant="primary" disabled={myToken === null}>
                      Aggiungi al carrello
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Card>
              <h1>LOADING...</h1>
            </Card>
          )}
        </Row>
      </Container>
    </>
  );
};
export default ProductPage;