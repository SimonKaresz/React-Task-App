import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Main } from "./pages/main/main";
import { Create } from "./pages/create/create";
import { Login } from "./pages/login";

import { NavbarComponents } from "./components/navbar";
import { auth } from "./config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);
  return (
    <Router>
      <div className="App">
        <NavbarComponents />
        <div className="content">
          {user ? (
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/create" element={<Create />} />
              <Route path="/signUp" element={<Login />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signUp" element={<Login />} />
            </Routes>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
