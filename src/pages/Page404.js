import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
function Page404() {
  return (
    <>
      <Helmet>
        {" "}
        <title>Page404</title>
      </Helmet>
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
    </>
  );
}

export default Page404;
