import NavItem from "./NavItem";
import { useToggle } from "../../context/NavToggleContext";

function Navbar() {
  const { toggle, setToggle } = useToggle();

  const toggleHandle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className="lg:flex- hidden text-center lg:block">
        <nav className="items-center justify-center divide-x divide-sky-200 lg:flex">
          <NavItem to="/">Anasayfa</NavItem>
          <NavItem to="movies">Filmler</NavItem>
          <NavItem to="categories"> Kategoriler </NavItem>
          {/* <NavItem to="soon"> Yakında</NavItem> */}
        </nav>
      </div>
      <div className="block w-full flex-col items-center justify-center text-center lg:hidden">
        {" "}
        <button className="mx-auto text-sky-900" onClick={toggleHandle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-10 w-10 rounded-lg border-2 border-cyan-100 stroke-cyan-100 p-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
export default Navbar;
