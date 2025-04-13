import { useNavigate } from "react-router";
import Service from "./Services";

export default function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/login")
      return;
    }
    try {
      const res = await fetch(
        "http://authloadbalancer-648996409.ap-southeast-2.elb.amazonaws.com/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
    } catch {

    }
  }
  return (
    <div>
      <Service />
    </div>
  )
}