import { Button, Card, Col, Container, Row } from "react-bootstrap";
import headerImg from "../assets/headerImg.png";
import vegetebles from "../assets/verdure.png";
import fish from "../assets/pesci.png";

const HomePage = () => {
  return (
    <Container>
      <Card className="bg-dark text-white mb-5">
        <Card.Img src={headerImg} alt="Card image" height="500" className="object-fit-cover" />
        <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center">
          <Card.Title>
            "Ciò che mettiamo nel nostro corpo ha un impatto diretto sulla nostra salute. Scegliere cibi nutrienti e
            bilanciati non è solo un atto d'amore per noi stessi, ma anche un investimento nel nostro benessere a lungo
            termine."
          </Card.Title>
          <Button variant="primary" className="mt-5">
            Inizia ad acquistare
          </Button>
        </Card.ImgOverlay>
      </Card>
      <Row>
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
      </Row>
    </Container>
  );
};
export default HomePage;
