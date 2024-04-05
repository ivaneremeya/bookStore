import { AxiosInstance } from "../../../shared/api/auth";
import { AppDispatch } from "../../../app/store/store";
import { setZipcodeError } from "../ui/makeOrder/model/zipcodeSlice";

export const validateZipcode = async (
  zipcode: number,
  dispatch: AppDispatch,
) => {
  try {
    const response = await AxiosInstance.get("api/cart/check_zipcode/", {
      params: { zipcode },
    });
    dispatch(setZipcodeError(""));

    return response.data.is_valid;
  } catch (error) {
    const errorMessage = `Error validating zipcode: ${zipcode}`;
    dispatch(setZipcodeError(errorMessage));
    return false;
  }
};
