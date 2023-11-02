import { NavLink } from "react-router-dom";

function TopPageNavItem({ children, to }) {
  console.log("MOVIES PAGE NAVITEM rendered");
  return (
    <div className="w-full px-1 text-center xs:px-2 md:px-0">
      <NavLink
        className="whitespace-nowrap text-center text-[9px] font-medium tracking-wider text-cyan-200 focus:underline xs:text-xs
          sm:text-sm md:text-lg"
        to={to}
      >
        {children}
      </NavLink>
    </div>
  );
}

export default TopPageNavItem;
