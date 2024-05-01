import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className='bg-blue-500 text-white p-4'>
      <ul className='flex justify-around'>
        <li>
          <Link to='/' className='text-lg font-bold hover:text-blue-300'>
            ホーム
          </Link>
        </li>
        <li>
          <Link
            to='/register'
            className='text-lg font-bold hover:text-blue-300'
          >
            ワード登録
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
