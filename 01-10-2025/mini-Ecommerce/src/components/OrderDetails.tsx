import React, { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { BsArrowRightCircle } from "react-icons/bs";
import type { OrderType } from "../types/orderType";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { ThemeContext } from "../context/themContext";

interface OrderDetailsProps {
  orderList: OrderType[];
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderList }) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  const products = useSelector((state: RootState) => state.ProductsStore.items);

    const {theme } = useContext(ThemeContext);

  const getProductName = (productId: number) => {
    const product = products.find(p => p.id === productId);
    return product ? product.title : "Unknown Product";
  };

  if (!orderList || orderList.length === 0) {
    return (
      <div className="p-4 text-center text-secondary fs-5">
        No orders found.
      </div>
    );
  }

  const handleClose = () => setSelectedOrder(null);

  return (
    <div className="p-4">
      {orderList.map((order) => {
        const totalAmount = order.orderItems.reduce(
          (sum, item) => sum + item.total,
          0
        );

        return (
          <div
            key={order.orderId}
            onClick={() => setSelectedOrder(order)}
            className="d-flex align-items-center justify-content-between border rounded-3 p-3 mb-3 bg-body shadow-sm hover-shadow-sm"
            style={{
              cursor: "pointer",
              transition: "all 0.3s ease",
              borderLeft: "6px solid #0d6efd",
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <div>
                <h6 className="mb-1 text-success fw-bold">
                  Order #{order.orderId}
                </h6>
                <small className="text-muted">
                  {new Date(order.date).toLocaleDateString()}
                </small>
              </div>
            </div>

            <div className="text-end d-flex gap-4">
              <div>
                <span className="fw-bold text-success fs-5">
                  ₹{totalAmount.toFixed(2)}
                </span>
                <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                  Tap for details
                </div>
              </div>
              <BsArrowRightCircle
                size={30}
                color={theme === "dark"? "white" : "black"}
                className="me-2"
                style={{ flexShrink: 0 }}
              />
            </div>

          </div>
        );
      })}

      <Modal show={!!selectedOrder} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-primary">
            Order Details - #{selectedOrder?.orderId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <div className="mb-3">
                <p className="mb-1">
                  <strong>Name:</strong> {selectedOrder.name}
                </p>
                <p className="mb-1">
                  <strong>Address:</strong> {selectedOrder.address}
                </p>
                <p className="mb-1">
                  <strong>Date:</strong>{" "}
                  {new Date(selectedOrder.date).toLocaleDateString()}
                </p>
              </div>
              <hr />
              <h6 className="fw-bold mb-2"> Items:</h6>
              <div className="d-flex flex-column gap-2">
                {selectedOrder.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center border-bottom pb-2"
                  >
                    <span>
                      <strong>Product: </strong>{getProductName(item.productId)}
                    </span>
                    <span className="text-end">
                      x{item.quantity} ={" "}
                      <strong className="text-success">
                        ₹{item.total.toFixed(2)}
                      </strong>
                    </span>
                  </div>
                ))}
              </div>
              <hr />
              <div className="text-end fw-bold fs-5 text-primary">
                Total: ₹
                {selectedOrder.orderItems
                  .reduce((sum, item) => sum + item.total, 0)
                  .toFixed(2)}
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default React.memo(OrderDetails);
