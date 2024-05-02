import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../styles/tabBar.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";

function BotBar() {
  return (
    <>
      {
        <div className="flex gap-7 justify-center px-1 py-3 text-base font-medium capitalize whitespace-nowrap bg-blue-500 text-white text-sm">
          <div className="flex flex-col text-white">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/fde68c5ea5a5a6ca217a2facf4454ee962ca5e98122ca0e9f776f58c5dfed744?"
              className="self-center aspect-[0.89] fill-white w-[17px]"
            />
            <div className="mt-3">Beranda</div>
          </div>
          <div className="flex flex-col">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f737a68aa79a0fb24bc24118bf896fe3ecf6c3c91ab3e070f6a62bf376ccde2?"
              className="self-center w-3.5 aspect-[0.74] fill-white"
            />
            <div className="mt-3">janji Temu</div>
          </div>
          <div className="flex flex-col">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f737a68aa79a0fb24bc24118bf896fe3ecf6c3c91ab3e070f6a62bf376ccde2?"
              className="self-center w-3.5 aspect-[0.74] fill-white"
            />
            <div className="mt-3">Tindakan</div>
          </div>

          <div className="flex flex-col">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9bfee8e3783854d780488f53963d79a024198b6eccd86b3e87d16643f7f5d0f0?"
              className="self-center aspect-[1.11] fill-white w-[21px]"
            />
            <div className="mt-3">Terapis</div>
          </div>
        </div>
      }
    </>
  );
}

export default BotBar;
