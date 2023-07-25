import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import Logout from "./components/Logout";
import Verify from "./components/Verify";
const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/verify/:userId" element={<Verify />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
