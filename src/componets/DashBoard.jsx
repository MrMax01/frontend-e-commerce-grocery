import { Card, Col, Container, Navbar, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import LineChartSales from "./charts/LineChartSales";
import PieChartCategories from "./charts/PieChartCategories";
import NavBar from "./NavBar";

const DashBoard = () => {
  return (
    <Container fluid className="bg-dashborad-color d-flex pb-5 ">
      <Sidebar />
      <div className="w-100 ">
        <Row className="my-2">
          <Col>
            <Card className="card-style">
              <Card.Body>
                <Card.Title>Guadagni</Card.Title>
                <Card.Text>$ 21,303.23</Card.Text>
              </Card.Body>
              <Card.Footer>ultimi 3 mesi</Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card className="card-style">
              <Card.Body>
                <Card.Title>Ordini</Card.Title>
                <Card.Text>1,200</Card.Text>
              </Card.Body>
              <Card.Footer>ultimi 3 mesi</Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row className="my-2">
          <Col lg={8}>
            <Card className="card-style">
              <Card.Body>
                <Card.Title>Vendite</Card.Title>
                <LineChartSales />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="card-style">
              <Card.Body>
                <Card.Title>Categories</Card.Title>
                <PieChartCategories />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="my-2">
          <Col lg={7}>
            <Card className="card-style">
              <Card.Body>
                <Card.Title>Ultimi Ordini</Card.Title>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">OREDR</th>
                      <th scope="col">STATUS</th>
                      <th scope="col">DATE</th>
                      <th scope="col">CUSTOMER</th>
                      <th scope="col">PRODILE PROGRESS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>$21425</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                      <td>$21425</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td colspan="2">Larry the Bird</td>
                      <td>@twitter</td>
                      <td>$21425</td>
                    </tr>
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={5}></Col>
        </Row>
      </div>
    </Container>
  );
};
export default DashBoard;
