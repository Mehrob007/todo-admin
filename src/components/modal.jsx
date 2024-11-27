import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { addData, editData } from "../reduser/counter";

// Validation schema for form inputs
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required").positive().integer(),
});

const ModalComponent = ({
  open,
  handleClose,
  idx,
  initialValues = { name: "", description: "", price: "" },
  onSubmit,
}) => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    if (values.id) {
      
      dispatch(editData({ id: idx, updatedData:values })); 
     
      
    } else {
     
      dispatch(addData(values));
    }
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          backdropFilter: "blur(30px)",
          border: "1px solid gray",
          borderRadius: "5px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2 id="modal-title" className="text-[24px] font-mono mb-[20px]">
          {initialValues && initialValues.id ? "Edit Item" : "Add Item"}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                name="name"
                as={TextField}
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />

              <Field
                name="description"
                as={TextField}
                fullWidth
                label="Description"
                variant="outlined"
                margin="normal"
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />

              <Field
                name="price"
                as={TextField}
                fullWidth
                label="Price"
                variant="outlined"
                margin="normal"
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
              />

              <div className="mb-[10px]">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {initialValues && initialValues.id ? "Update" : "Add"}
                </Button>
              </div>

              <Button
                onClick={handleClose}
                variant="outlined"
                color="error"
                fullWidth
              >
                Close
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
