import { useEffect } from "react";
import Header from "../components/header";
import { Outlet } from "react-router-dom";
import NavToggleProvider from "../context/NavToggleContext";
import OptionProvider from "../context/SelectContext";
import BestProvider from "../context/BestMoviesContext";

import UpArrow from "../components/upArrow";
function SiteLayout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container mx-auto max-w-7xl ">
        <NavToggleProvider>
          <Header />
        </NavToggleProvider>

        {/* index js yi layout sayfası olarak tasarlamak istiyorum bu sebeple outlet haline getirdim. Artık burada kullandığım tüm componentler tüm alt componentlerde görünecek. 
      Headerın tüm componentlerde görünmesini istediğim için burada kullanarak nested haline getirdim. */}

        <OptionProvider>
          <BestProvider>
            <Outlet />
          </BestProvider>
        </OptionProvider>
      </div>

      {/* sağ alt yönlendirme butonları */}
      <UpArrow />
    </>
  );
}

export default SiteLayout;
