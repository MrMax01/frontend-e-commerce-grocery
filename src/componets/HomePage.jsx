import { Card, Col, Container, Row } from "react-bootstrap";
import headerImg from "../assets/headerImg.png";
// import vegetebles from "../assets/verdure.png";
// import fish from "../assets/pesci.png";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLastProducts } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lastProducts = useSelector((state) => state.products.content);
  const myToken = useSelector((state) => state.userToken.content);

  useEffect(() => {
    dispatch(getLastProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />

      <Container className="pb-5">
        <Card className="bg-dark text-white mb-5">
          <Card.Img
            src={headerImg}
            alt="Card image"
            height="500"
            className="object-fit-cover"
            style={{ filter: "brightness(70%)" }}
          />
          <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center">
            <Card.Title className="w-50 text-center">
              "Ciò che mettiamo nel nostro corpo ha un impatto diretto sulla nostra salute. Scegliere cibi nutrienti e
              bilanciati non è solo un atto d'amore per noi stessi, ma anche un investimento nel nostro benessere a
              lungo termine."
            </Card.Title>
          </Card.ImgOverlay>
        </Card>
        {/* <Row className="mb-2">
          <Col>
            <Card className="bg-dark text-white">
              <Card.Img src={vegetebles} alt="Card image" height="500" className="object-fit-cover" />
              <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
                <Card.Title className="h-1">PROMO #1</Card.Title>
              </Card.ImgOverlay>
            </Card>
          </Col>
          <Col>
            <Card className="bg-dark text-white">
              <Card.Img src={fish} alt="Card image" height="500" className="object-fit-cover" />
              <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
                <Card.Title className="h-1">PROMO #2</Card.Title>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row> */}
        <Container fluid>
          <h1>Ultimi Prodotti Caricati</h1>
          <Row>
            {lastProducts.length > 0 ? (
              lastProducts.map((product, i) => (
                <Col key={i}>
                  <Card className="shadow-sm">
                    <Card.Img variant="top" src={product.photo} />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Title>€{product.unit_price}/kg</Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                      <button
                        className="detail-button learn-more"
                        onClick={() => {
                          navigate(`/productDetail/${product.id}`);
                        }}
                      >
                        <span className="circle" aria-hidden="true">
                          <span className="icon arrow"></span>
                        </span>
                        <span className="button-text">Detail</span>
                      </button>
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
      </Container>
    </>
  );
};
export default HomePage;
