import { Route, Routes } from "react-router-dom";
import Page1 from "../pages/page-1/Page1";

export default function Router() {
  return (
    <Routes>
      <Route path="" element={<Page1 />} />
    </Routes>
  );
}
