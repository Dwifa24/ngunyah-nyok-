import React from "react";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillYoutube,
} from "react-icons/ai";
import logoo from "../assets/images/logoo.png";

function Footer() {
  return (
    <div className="text-cream">
      <div className="grid p-5 md:grid-cols-3 sm:grid-cols-1 bg-gradient-to-br from-purple-900 to-darkblue">
        <div className="text-2xl mx-auto">
          <ul>

            <li>Home</li>
            <li>About</li>
            <li>Products</li>
          </ul>
        </div>
        <div className="mx-auto">
          <div className="font-bold text-2xl">Follow Us</div>
          <div className="flex grid-cols-4 text-4xl space-x-4">
            <div className="">
              <AiFillInstagram />
            </div>
            <div className="">
              <AiFillFacebook />
            </div>
            <div className="">
              <AiFillTwitterSquare />
            </div>
            <div className="">
              <AiFillYoutube />
            </div>
          </div>
        </div>
        <div className="w-52">
          <img className="mx-auto" src={logoo} alt="logo" />
        </div>
        <p>@copyright 2022</p>
      </div>
    </div>
  );
}

export default Footer;
