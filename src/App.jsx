import React, { useState } from "react";
import "./App.css";
import IDCart from "./components/IDCart";
import Button from "@mui/material/Button";
import ModalComponent from "./components/modal";

function App() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File uploaded:", file);
    }
  };

  return (
    <>
      <section id="root">
        <div className="flex w-[90%] h-[100%] font-sans">
          <div className="h-[100vh] fixed w-[20%] bg-black"></div>
          <div className="ml-[25%] mt-[30px]">
            <div className="ml-[93%]">
              <Button variant="contained" onClick={handleOpen}>
                Add +
              </Button>
            </div>
            <IDCart />
          </div>
        </div>
      </section>

      <ModalComponent
        open={open}
        handleClose={handleClose}
        handleFileChange={handleFileChange}
      />
    </>
  );
}

export default App;
