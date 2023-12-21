import { Card, Container } from "react-bootstrap";
import Sidebar from "./Sidebar";

const DashboardProducts = () => {
  return (
    <Container fluid className="bg-dashborad-color d-flex pb-5 min-height-100">
      <Sidebar />
      <Card className="card-style w-100 my-2">
        <Card.Body>
          <Card.Title>PRODUCTS</Card.Title>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">NAME</th>
                <th scope="col">CATEGORY</th>
                <th scope="col">QUANTITY</th>
                <th scope="col">STATUS</th>
                <th scope="col">PRICE</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>$21425</td>
                <td>
                  <i class="bi bi-pencil"></i>
                  <i class="bi bi-trash3-fill"></i>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>$21425</td>
                <td>
                  <i class="bi bi-pencil"></i>
                  <i class="bi bi-trash3-fill"></i>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
                <td>$21425</td>
                <td>
                  <i class="bi bi-pencil"></i>
                  <i class="bi bi-trash3-fill"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default DashboardProducts;