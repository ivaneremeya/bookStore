import * as React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

export const Search = () => (
  <TextField
    fullWidth
    placeholder="Поиск"
    InputProps={{
      startAdornment: <SearchIcon />,
    }}
    sx={{
      width: 200,
      height: 10,
      borderRadius: 4,
      "& .MuiInputBase-input": {
        paddingLeft: "30px", // Устанавливаем отступ для иконки поиска
      },
    }}
  />
);
