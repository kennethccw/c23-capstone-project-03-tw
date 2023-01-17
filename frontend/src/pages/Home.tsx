import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRootSelector } from "../redux/store";
import { NavBarUtilis } from "../components/NavBarUtilis";
import from "../css/homepage.module.scss";

export default function Home() {
  const loading = useRootSelector((state: { auth: { loading: any; }; }) => state.auth.loading);
  const navigate = useNavigate();
  const logout = () => {
    console.log("logout");
    localStorage.clear();
    navigate("/");
  };
  const [username, setUsername] = useState(localStorage.getItem("username"));
  useEffect(() => {
    if (!loading) {
      setUsername(localStorage.getItem("username"));
    }
  }, [loading]);

  const NavBar= NavBarUtilis();



  return (
    <div>
      <div className={styles.upperLayer}>
        <div>dog</div>
        <div>alarm</div>
      </div>
      <h1>Here is our Home</h1>
      <div>Hi {username}</div>
      <button onClick={() => logout()}>logout</button>
      {NavBar}
    </div>
  );
}
