import { Card, Container } from "react-bootstrap";
import headerImg from "../assets/headerImg.png";

const HomePage = () => {
  return (
    <Container>
      <Card className="bg-dark text-white">
        <Card.Img src={headerImg} alt="Card image" height="500" className="" />
        <Card.ImgOverlay>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in to additional content. This content is
            a little bit longer.
          </Card.Text>
          <Card.Text>Last updated 3 mins ago</Card.Text>
        </Card.ImgOverlay>
      </Card>
    </Container>
  );
};
export default HomePage;
