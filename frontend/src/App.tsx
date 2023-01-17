import { useEffect } from "react";
import "./App.css";
import MyRoutes from "./components/MyRoutes";
import { validateTokenThunk } from "./redux/auth/thunk";
import { useRootDispatch } from "./redux/store";
// import { useRootSelector } from "./redux/store";

function App() {
  const dispatch = useRootDispatch();
  // const isAuth = useRootSelector(state => state.auth.isAuth)
  useEffect(() => {
    console.log("did mount");
    dispatch(validateTokenThunk(localStorage.getItem("token")));
  }, [dispatch]);

  return (
    <div className="App">
      <MyRoutes />
    </div>
  );
}

export default App;
