import React from "react";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>
        {" "}
        Aranan sayfa bulunamadı. Anasayfaya dönmek için
        <span>
          {" "}
          <Link className="font-bold text-sky-900 underline" to="">
            {" "}
            tıklayınız
          </Link>
        </span>
      </p>
    </div>
  );
}

export default Page404;
