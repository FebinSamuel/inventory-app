import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Header(props) {
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                    <label tabindex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabindex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li tabindex="0">
                        <a className="justify-between">
                            Products
                            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
                        </a>
                        <ul className="p-2">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                        </li>
                        <li><Link to="/about">Contact</Link></li>
                    </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl"><Link to="/">STRING LAB</Link></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li tabindex="0">
                        <a>
                        Products
                        <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                        </a>
                        <ul className="p-2">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Get started</a>
                </div>
            </div>

            
            <Outlet/>
        </div>
    );
}

export default Header;