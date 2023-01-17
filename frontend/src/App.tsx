// import { useEffect } from "react";
import "./App.css";
import MyRoutes from "./components/MyRoutes";
// import { useRootSelector } from "./redux/store";

function App() {
  // const isAuth = useRootSelector(state => state.auth.isAuth)
  // useEffect(() => {
  // const isAuth = useRootSelector(state => state.auth.isAuth)

  // }, [])
  console.log(localStorage);
  return (
    <div className="App">
      <MyRoutes />
    </div>
  );
}

export default App;
