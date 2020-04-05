import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-white px-9 fixed w-full bottom-0 left-0 right-0 text-gray-500 sm:pb-4">
      <div className="flex justify-between align-center items-center flex-col sm:flex-row">
        <ul className="flex pb-5 sm:pb-0">
          <li>
            <Link to="/" className="mr-3 underline">
              Start
            </Link>
          </li>
          <li>
            <Link to="/policy" className="mr-3 underline">
              Data policy
            </Link>
          </li>
          <li>
            <Link to="/pitch" className="mr-3 underline">
              Our pitch
            </Link>
          </li>
        </ul>

        <span>
          {" "}
          Created by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/team-la-bamba"
            className="underline"
          >
            TeamLaBamba
          </a>{" "}
          for{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            href="https://www.hackthecrisis.se/"
          >
            HacktheCrisis Sweden
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
