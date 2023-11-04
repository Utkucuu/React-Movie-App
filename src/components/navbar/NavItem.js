import { memo } from "react";
import { NavLink } from "react-router-dom";
function NavItem({ children, to }) {
  return (
    <>
      <NavLink
        className={({ isActive }) =>
          `${isActive && "text-slate-50"}  px-4 text-center text-xs 
          font-bold tracking-wider text-cyan-200 lg:px-8 lg:text-sm`
        }
        to={to}
      >
        {children}
      </NavLink>
    </>
  );
}

export default memo(NavItem);
