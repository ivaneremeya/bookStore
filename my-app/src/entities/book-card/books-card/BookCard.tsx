import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { useTranslation } from "react-i18next";
import CardContent from "@mui/material/CardContent";
import { useAppSelector } from "../../../app/store/hook";
import { CartItemProps } from "./api/CartApi";
import logo from "../../../app/img/book-2-svgrepo-com.svg";
import { CartUpdateButton } from "./lib/CartUpdateButton";

interface Props {
  id: number;
  title: string;
  price: number;
  descr: string;
}

export const BookCard: React.FC<Props> = ({ id, title, price, descr }) => {
  const carts: CartItemProps[] = useAppSelector((state) => state.cart.item);
  const { t } = useTranslation(["bookCard"]);

  return (
    <Card
      variant="outlined"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <CardContent
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} alt="Logo" style={{ width: "80%", height: "auto" }} />
        </div>
        <Typography style={{ marginBottom: "10px" }} variant="body2">
          {descr}
        </Typography>
        <Typography variant="body2">
          {t("bookCard:price")}
          {price}
        </Typography>
      </CardContent>

      <Box sx={{ padding: 4, display: "flex", justifyContent: "center" }}>
        <CartUpdateButton bookId={id} carts={carts} />
      </Box>
    </Card>
  );
};
