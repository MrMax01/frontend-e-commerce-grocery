import { Button, Card, Container } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyProduct, getMyProducts } from "../redux/actions";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const DashboardProducts = () => {
  const myToken = useSelector((state) => state.userToken.content);
  const myProducts = useSelector((state) => state.myProducts.content);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMyProducts(myToken));
  }, []);
  return (
    <>
      <NavBar />
      <Container fluid className="bg-dashborad-color d-flex pb-5 min-height-100">
        <Sidebar />
        <Card className="card-style w-100 my-2 shadow border-0">
          <Card.Body>
            <Card.Title className="d-flex justify-content-between">
              <span>PRODUCTS</span>
              <Button
                className="primary-button"
                onClick={() => {
                  navigate("/dashboard/products/add");
                }}
              >
                {" "}
                Aggiungi prodotto
              </Button>
            </Card.Title>
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
                {myProducts.length > 0 ? (
                  myProducts.map((product, i) => (
                    <tr key={product.id}>
                      <th scope="row">{product.name}</th>
                      <td>{product.category}</td>
                      <td>{product.quantity}kg</td>
                      <td
                        className={
                          product.product_status === "DISPONIBILE" ? "text-success fw-bold" : "text-danger fw-bold"
                        }
                      >
                        {product.product_status}
                      </td>
                      <td>${product.unit_price}/kg</td>
                      <td>
                        <i
                          className="bi bi-pencil me-3 fs-5 hvr-grow"
                          onClick={() => {
                            navigate(`/dashboard/products/${product.id}`);
                          }}
                        ></i>
                        <i
                          className="bi bi-trash3-fill secondary-color fs-5 hvr-grow"
                          onClick={() => {
                            dispatch(deleteMyProduct(myToken, product.id));
                          }}
                        ></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <>0 prodotti</>
                )}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
export default DashboardProducts;
