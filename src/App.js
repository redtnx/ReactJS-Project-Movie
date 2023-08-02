import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserTemplate from "./template/UserTemplate";
import HomePage from "./pages/HomePage/HomePage";
import Page404 from "./pages/Page404/Page404";
import Login from "./pages/Login/Login";
import AdminTemplate from "./template/AdminTemplate";
import LoginAdmin from "./pages/LoginAdmin/LoginAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserTemplate />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />}></Route>
        </Route>
        <Route path="/admin" element={<AdminTemplate />}></Route>
        <Route path="/admin-login" element={<LoginAdmin />}></Route>
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
