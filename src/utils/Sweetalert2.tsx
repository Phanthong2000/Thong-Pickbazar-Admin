import { Icon } from "@iconify/react";
import Swal from "sweetalert2";

type Icon = "success" | "error" | "warning" | "info" | "question";
type Boolean = true | false;
const alert2 = (
  title: string,
  icon: Icon,
  showConfirmButton: boolean,
  confirmButtonText: string,
  confirmButtonColor: string,
  showCancelButton: boolean,
  cancelButtonText: string,
  cancelButtonColor: string,
  titleText: string,
  text: string,
  handleConfirm: () => void
) => {
  return Swal.fire({
    title: title,
    icon: icon,
    showCancelButton,
    cancelButtonText,
    showConfirmButton,
    confirmButtonText,
    confirmButtonColor,
    cancelButtonColor,
    titleText,
    text,
  }).then((result) => {
    if (result.isConfirmed) {
      handleConfirm();
    }
  });
};

export default alert2;
