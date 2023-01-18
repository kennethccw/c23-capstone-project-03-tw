import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRootSelector } from "../redux/store";

export default function Home2() {
  const loading = useRootSelector((state) => state.auth.loading);
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

  return (
    <div>
      <h1>Here is our Home</h1>
      <div>Hi {username}</div>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
}
