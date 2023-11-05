import React from "react";
import { Link } from "react-router-dom";

function MyComponent() {
  return (
    <section className="container-full mx-auto mt-20 rounded-none bg-opacity-20 bg-gradient-to-b from-cyan-400 to-sky-900 p-4 dark:from-slate-950 dark:to-sky-900 lg:rounded-t-xl">
      <div className="text-center">
        <h2 className="sm:lg mb-4 text-xs font-bold text-white md:text-xl">
          API REFERANCE
        </h2>
        <Link to="https://www.themoviedb.org/">
          <img
            className="mx-auto w-1/2 sm:w-1/3"
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
            alt="Tmdb Logo"
          />
        </Link>
      </div>
    </section>
  );
}

export default MyComponent;

//   src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
