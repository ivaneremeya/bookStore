import React from "react";
import { Controller, UseFormReturn, FieldValues, Path } from "react-hook-form";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

export interface FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  control: UseFormReturn<TFieldValues>["control"];
  name: Path<TFieldValues>;
  options: { value: number; label: string }[];
  error: boolean;
  errorMessage: string;
  onChange: (value: number[]) => void;
}

const FormSelect = <TFieldValues extends FieldValues>({
  name,
  control,
  options,
  error,
  errorMessage,
  onChange,
}: FormSelectProps<TFieldValues>) => {
  const handleChange = (e: SelectChangeEvent<number[]>) => {
    const selected = e.target.value as number[];
    onChange(selected);
  };
  return (
    <div style={{ height: "84px" }}>
      <Controller
        name={name}
        control={control}
        rules={{ required: "Please select at least one author" }}
        render={({ field }) => (
          <div>
            <InputLabel id="demo-multiple-checkbox-label">{name}</InputLabel>
            <Select
              multiple
              value={field.value || []}
              onChange={handleChange}
              sx={{ width: 196, height: 40 }}
              error={error}
              label="Select authors"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    display: "flex",
                    flexDirection: "column",
                  },
                },
              }}
            >
              {options.map((option: { value: number; label: string }) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {error && (
              <span style={{ color: "red" }} role="alert">
                {errorMessage}
              </span>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default FormSelect;
