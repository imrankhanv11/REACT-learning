import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { addToCart } from "../store/slices/cartSlice";
import { ThemeContext } from "../context/themContext";
import type { Product } from "../types/productType";

interface ProductCardProps { product: Product; }

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.AuthStore.user);
  const cartList = useSelector((state: RootState) => state.CartStore.cartList);

  const isInCart = !!cartList.find((c) => c.userId === user?.id)?.cart.find((ci) => ci.productId === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return navigate("/login");
    if (!isInCart) dispatch(addToCart({ userId: user.id, item: { productId: product.id, quantity: 1 } }));
  };

  const handleClick = () => navigate(`/products/${product.id}`);

  return (
    <Card
      style={{ width: "18rem", margin: "10px", cursor: "pointer" }}
      onClick={handleClick}
      className={`shadow-sm d-flex flex-column ${theme === "dark" ? "bg-dark text-white border-secondary" : "bg-light text-dark border-0"}`}
    >
      <Card.Img variant="top" src={product.images[0]} style={{ height: "170px", objectFit: "cover" }} />
      <Card.Body style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <div style={{ flexGrow: 3 }}>
          <Card.Title>{product.title}</Card.Title>
          <p className={theme === "dark" ? "text-light-emphasis" : "text-muted"} style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
            {product.description}
          </p>
          <div className="d-flex justify-content-between mt-2">
            <Card.Text><strong className="text-success">${product.price}</strong></Card.Text>
            <Card.Text>⭐ {product.rating} / 5</Card.Text>
          </div>
        </div>
        <Button variant={isInCart ? "success" : theme === "dark" ? "secondary" : "primary"} onClick={handleAddToCart} disabled={isInCart} className="mt-2">
          {isInCart ? "Added in Cart" : "Add to Cart"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
