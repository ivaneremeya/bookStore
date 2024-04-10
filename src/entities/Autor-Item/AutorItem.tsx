import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useAppDispatch } from "../../app/store/hook";
import { AutorDeletApi } from "./api/AutorDeletApi";
import styl from "../../widgets/header/ui/btn-cart/btnCart.module.scss";
import logo from "../../app/img/book-2-svgrepo-com.svg";

interface AutorType {
  firstName: string;
  secondName: string;
}

interface AutorPostType extends AutorType {
  id: number;
}

export const AutorItem: React.FC<AutorPostType> = ({
  id,
  firstName,
  secondName,
}) => {
  const dispatch = useAppDispatch();

  const delitAutorCard = () => {
    dispatch(AutorDeletApi(id));
  };
  return (
    <Card
      variant="outlined"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="body2">{firstName}</Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} alt="Logo" style={{ width: "80%", height: "auto" }} />
        </div>
        <Typography variant="body2">{secondName}</Typography>
      </CardContent>

      <button
        className={styl.button__cart}
        onClick={delitAutorCard}
        style={{ backgroundColor: "#c62020eb", margin: "15px" }}
        type="button"
      >
        удалить
      </button>
    </Card>
  );
};
