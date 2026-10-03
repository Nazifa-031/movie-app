import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      {/* add logo img */}
      <NavLink to="/">Home</NavLink>
      {/* <NavLink to="/favorites">Favourites</NavLink> */}
    </nav>
  );
};

export default Navbar;