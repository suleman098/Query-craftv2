import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center h-20 bg-white text-black  shadow-xl border-grey border-2">

      <div>
        <p>
          Made by
          <a
            href="https://your-website-link.com"
            className="text-blue-400 hover:text-blue-600 ml-1"
          >
            Suleman.K
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
