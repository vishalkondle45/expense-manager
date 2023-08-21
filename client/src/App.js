import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import Verify from "./components/Verify";
import Groups from "./pages/Groups";
import Group from "./pages/Group";
import Home from "./pages/Home";
const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/verify/:userId" element={<Verify />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/:groupId" element={<Group />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
