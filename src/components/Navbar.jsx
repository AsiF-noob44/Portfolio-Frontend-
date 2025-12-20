import { NavLink } from "react-router-dom";

const Navbar = () => {
  const closeDropdown = () => {
    // Remove focus from the dropdown trigger to close it
    document.activeElement?.blur();
  };

  const navLinks = (
    <>
      <li className="mx-1">
        <NavLink
          to="/"
          onClick={closeDropdown}
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-primary bg-primary/10 rounded-lg px-4 py-2 transition-all duration-200"
              : "font-medium text-base-content/70 hover:text-primary hover:bg-base-200 rounded-lg px-4 py-2 transition-all duration-200"
          }
        >
          Home
        </NavLink>
      </li>
      <li className="mx-1">
        <NavLink
          to="/about"
          onClick={closeDropdown}
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-primary bg-primary/10 rounded-lg px-4 py-2 transition-all duration-200"
              : "font-medium text-base-content/70 hover:text-primary hover:bg-base-200 rounded-lg px-4 py-2 transition-all duration-200"
          }
        >
          About Me
        </NavLink>
      </li>
      <li className="mx-1">
        <NavLink
          to="/contact"
          onClick={closeDropdown}
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-primary bg-primary/10 rounded-lg px-4 py-2 transition-all duration-200"
              : "font-medium text-base-content/70 hover:text-primary hover:bg-base-200 rounded-lg px-4 py-2 transition-all duration-200"
          }
        >
          Contact
        </NavLink>
      </li>
      <li className="mx-1">
        <NavLink
          to="/blogs"
          onClick={closeDropdown}
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-primary bg-primary/10 rounded-lg px-4 py-2 transition-all duration-200"
              : "font-medium text-base-content/70 hover:text-primary hover:bg-base-200 rounded-lg px-4 py-2 transition-all duration-200"
          }
        >
          Blogs
        </NavLink>
      </li>
      <li className="mx-1">
        <NavLink
          to="/service"
          onClick={closeDropdown}
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-primary bg-primary/10 rounded-lg px-4 py-2 transition-all duration-200"
              : "font-medium text-base-content/70 hover:text-primary hover:bg-base-200 rounded-lg px-4 py-2 transition-all duration-200"
          }
        >
          Service
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm mt-4 py-4 px-5 rounded-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <NavLink to="/" className="flex items-center lg:hidden">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-auto object-contain scale-125 origin-left"
          />
        </NavLink>
        <NavLink to="/" className="hidden lg:flex items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 w-auto object-contain scale-175 origin-left"
          />
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-primary font-bold">Login</button>
      </div>
    </div>
  );
};

export default Navbar;
