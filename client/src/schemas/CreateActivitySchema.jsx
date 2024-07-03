import * as yup from "yup";

export const CreateActivitySchema = yup
  .object({
    distance: yup.number().required("Por favor, forneça a distance"),
    time: yup.number().required("Por favor, forneça o tempo"),
    date: yup.date().required("Por favor, forneça a data"),
  })
  .required();
