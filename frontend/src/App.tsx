import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./App.css";
import MyRoutes from "./components/MyRoutes";
import { validateTokenThunk } from "./redux/auth/thunk";
import { useRootDispatch, useRootSelector } from "./redux/store";

function App() {
  const dispatch = useRootDispatch();
  const navigate = useNavigate();
  const isAuth = useRootSelector((state) => state.auth.isAuth);

  useEffect(() => {
    console.log("did mount");
    dispatch(validateTokenThunk(localStorage.getItem("token")));
    // .then(() => navigate("/home"));
  }, []);

  return (
    <div className="App">
      <MyRoutes />
    </div>
  );
}

export default App;
