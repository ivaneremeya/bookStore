import React from "react";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useTranslation } from "react-i18next";
import { onSubmitLogin, onSubmitOther } from "../../../shared/api/auth";
import { FormAuth } from "./FormAuth";

export const ModalAuth = () => {
  const [auth, setAuth] = React.useState(true);
  const { t } = useTranslation(["authModal"]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={
            auth ? t("authModal:authEntrance") : t("authModal:authRegistr")
          }
        />
      </FormGroup>

      {auth ? (
        <FormAuth
          title={t("authModal:authEntrance")}
          descr={t("authModal:authEntrance")}
          onSubmit={onSubmitLogin}
        />
      ) : (
        <FormAuth
          title={t("authModal:authRegistr")}
          descr={t("authModal:authRegistr")}
          onSubmit={onSubmitOther}
        />
      )}
    </Box>
  );
};
