import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../store/store";
import { logoutUser } from "../store/slices/authSlice";
import { Card, Button } from "react-bootstrap";
import userLogo from "../assets/User_logo.webp"
import OrderDetails from "../components/OrderDetails";
import type { OrderType } from "../types/orderType";

const Profile: React.FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state: RootState) => state.OrderStore.orderList);
  const user = useSelector((state: RootState)=> state.AuthStore.user);

  const [orderList, setOrderList] = useState<OrderType[]>([]);

  useEffect(()=>{
    const OrderDetailsItems = orders.find(o=> o.userId === user?.id)?.orders;

    setOrderList(OrderDetailsItems || []);
  },[user, setOrderList, orders]);


  if (!user) return null;

  return (
    <div className="container mt-4">
      <Card className="shadow-sm border-2 bg-body " style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div className="text-center mt-3">
          <img
            src={userLogo}
            alt="Profile"
            className="rounded-circle border"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          <h5 className="mt-3 mb-0">{user.name}</h5>
          <p className="text-muted">{user.email}</p>
        </div>
        <Card.Body>
          <div className="d-flex justify-content-between mb-2">
            <span className="fw-bold">User ID:</span>
            <span>{user.id}</span>
          </div>
          <hr />
          <Button
            variant="outline-danger"
            className="w-100 mt-2"
            onClick={() => dispatch(logoutUser())}
          >
            Logout
          </Button>
        </Card.Body>
      </Card>

      <div className=" mt-2">
        <OrderDetails orderList = {orderList}/>
      </div>
    </div>
  );
};

export default React.memo(Profile);
