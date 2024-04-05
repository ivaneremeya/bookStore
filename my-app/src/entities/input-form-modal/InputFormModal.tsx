import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";

type InputFormModalProps = TextFieldProps & {
  value: string | number;
  error: boolean;
  text: string;
};

export const InputFormModal: React.FC<InputFormModalProps> = ({
  value,
  error,
  text,
  ...otherProps
}) => {
  const [inputValue, setInputValue] = React.useState<string>(String(value));
  const [isError, setIsError] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (otherProps.onChange) {
      otherProps.onChange(e);
    }
  };

  const handleBlur = () => {
    let newIsError = false;
    if (otherProps.type === "text") {
      newIsError = inputValue.trim().length === 0;
    } else if (otherProps.type === "number" && +inputValue < 0) {
      newIsError = true;
    }
    setIsError(newIsError);
  };

  return (
    <div>
      <TextField
        value={inputValue}
        error={error && isError}
        onChange={handleInputChange}
        onBlur={handleBlur}
        label={otherProps.label}
        variant={otherProps.variant}
        type={otherProps.type}
        color={otherProps.color}
        focused
      />
      {error && isError && <FormHelperText>{text}</FormHelperText>}
    </div>
  );
};
