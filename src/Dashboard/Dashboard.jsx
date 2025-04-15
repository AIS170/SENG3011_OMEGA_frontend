import { useNavigate } from "react-router";
import Navbar from "../Navbar/Navbar";
import Service from "./Services";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[rgb(34,34,34)]">
      <Navbar currPage={"Dashboard"}/>
      <Service />
    </div>
  )
}