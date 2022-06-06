import "./App.css";
import  Pocetna  from "./Pocetna";
import { Donacije } from "./Donacije";
import { Donatori } from "./Donatori";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Unosi from "./Unosi";
import NoviDonator from "./NoviDonator";
import { ClimbingBoxLoader } from "react-spinners";

const App = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 6500);
  }, []);
  return (
    <div className="App">
      {loading ? (
        <div className="loader">
          <ClimbingBoxLoader size={30} color={"rgb(220,53,69)"} loading={loading} />
        </div>
      ) : (
        <header>
          <BrowserRouter>
            <div className="zavod">
              <img
                className="d-flex justify-content-center m-3"
                src="https://cdn.pixabay.com/photo/2013/07/13/09/48/blood-156063_960_720.png"
                alt="transfuzija"
                width={150}
                height={150}
              />
              <p>ZAVOD ZA TRANSFUZIJSKU MEDICINU</p>
            </div>
          
            <nav className="navbar navbar-expand-sm">
              <ul className="navbar-nav">
                <li className="nav-item- m-1">
                  <NavLink
                    type="button"
                    className="btn btn-light btn-outline-danger"
                    to="/pocetna"
                  >
                    Početna
                  </NavLink>
                </li>
                <li className="nav-item- m-1">
                  <NavLink
                    type="button"
                    className="btn btn-light btn-outline-danger"
                    to="/donacije"
                  >
                    Donacije
                  </NavLink>
                </li>
                <li className="nav-item- m-1">
                  <NavLink
                    type="button"
                    className="btn btn-light btn-outline-danger"
                    to="/donatori"
                  >
                    Donatori
                  </NavLink>
                </li>
                <li className="nav-item- m-1">
                  <NavLink
                    type="button"
                    className="btn btn-light btn-outline-danger"
                    to="/noviDonator"
                  >
                    Novi donator
                  </NavLink>
                </li>
                <li className="nav-item- m-1">
                  <NavLink
                    type="button"
                    className="btn btn-light btn-outline-danger"
                    to="/unosi"
                  >
                    Unosi
                  </NavLink>
                </li>
              </ul>
            </nav>
            

            <Routes>
              <Route path="/pocetna" element={<Pocetna />} />
              <Route path="/donacije" element={<Donacije />} />
              <Route path="/donatori" element={<Donatori />} />
              <Route path="/noviDonator" element={<NoviDonator />} />
              <Route path="/unosi" element={<Unosi />} />
            </Routes>
          </BrowserRouter>
        </header>
      )}
    </div>
  );
};

export default App;
