import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Login from "./Components/Login/Login";
import { UserStorage } from "./UserContext";
import './App.css'
import User from "./Components/User/User";
import ProtectedRouter from "./Helper/ProtectedRouter";
import Home from "./Components/Home";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/*" element={<Login />} />
            <Route path="conta/*" element={<ProtectedRouter><User /></ProtectedRouter>} />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
