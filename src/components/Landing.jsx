import ResponsiveAppBar from "./ResponsiveAppBar";
import heroImg from "../image.jpg";
import { useDispatch } from "react-redux";
import { hideSearchBar } from "../redux/searchBarSlice";
import "../styles/landing.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function Landing() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hideSearchBar());
  }, [dispatch]);
  return (
    <>
      <ResponsiveAppBar />
      <div className="landing-container">
        <div className="heading-container">
          <div className="heading">Crypto Tracker</div>
          <div className="heading heading-secondary">Get Live Updates</div>
          <button className="btn btn-sign-up">Sign Up</button>
          <Link to={`/dashboard`}>
            <button className="btn btn-dashboard">Dashboard</button>
          </Link>
        </div>

        <img
          src={heroImg}
          alt=""
          style={{ width: "30rem", height: "25rem", color: "lawngreen" }}
        />
      </div>
    </>
  );
}
