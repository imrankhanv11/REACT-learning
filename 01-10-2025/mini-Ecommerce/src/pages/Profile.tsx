import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../store/store";
import { logoutUser } from "../store/slices/authSlice";
import { Card, Button } from "react-bootstrap";
import userLogo from "../assets/User_logo.webp"

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.AuthStore.user);
  const dispatch = useDispatch();

  if (!user) return null;

  return (
    <div className="container mt-4">
      <Card className="shadow-sm border-0" style={{ maxWidth: "500px", margin: "0 auto" }}>
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
    </div>
  );
};

export default React.memo(Profile);
