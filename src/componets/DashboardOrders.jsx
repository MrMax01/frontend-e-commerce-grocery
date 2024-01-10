import { Card, Container } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../redux/actions";
import NavBar from "./NavBar";

const DashboardOrders = () => {
  const orders = useSelector((state) => state.orders.content);
  const myToken = useSelector((state) => state.userToken.content);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyOrders(myToken));
  }, [orders.length]);
  return (
    <>
      <NavBar />
      <Container fluid className="bg-dashborad-color d-flex pb-5 min-height-100 ">
        <Sidebar />
        <Card className="card-style w-100 my-2 ">
          <Card.Body>
            <Card.Title>ORDERS</Card.Title>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ORDER ID</th>
                  <th scope="col">DATE</th>
                  <th scope="col">CUSTOMER</th>
                  <th scope="col">STATUS</th>
                  <th scope="col">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order, i) => (
                    <tr key={order.id}>
                      <th scope="row">{order.id}</th>
                      <td>{order.created_at}</td>
                      <td>{order.customer.email}</td>
                      <td>{order.orderStatus}</td>
                      <td>{order.totalCost} €</td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
export default DashboardOrders;
