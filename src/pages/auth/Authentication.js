import { useState } from "react";
import Login from "../../components/auth/Login";
import Register from "../../components/auth/Register";

function Authentication() {
  const [authToggle, setAuthToggle] = useState(true);
  return (
    <div
      className="mx-auto mt-10 flex h-100 max-w-[400px] flex-col rounded-lg border-4 border-sky-200 bg-gradient-to-b
    from-cyan-400 to-sky-900"
    >
      <div className="relative flex w-full overflow-hidden border-b-2 border-white">
        <button
          className={`w-full rounded-tl-sm p-2 ${
            authToggle ? "bg-white" : "bg-transparent"
          }`}
          onClick={() => setAuthToggle(true)}
          style={{
            borderTopRightRadius: "50px",
          }}
        >
          Giriş Yap
        </button>
        {/* <span className="rotate-4 absolute -top-8 left-[180px] z-50 h-40 w-6 rotate-[30deg] bg-white"></span> */}
        <button
          className={`w-full rounded-tr-sm  p-2 ${
            (authToggle && "bg-transparent") || "bg-white"
          }`}
          onClick={() => setAuthToggle(false)}
          style={{
            borderTopLeftRadius: "50px",
          }}
        >
          Hesap Oluştur
        </button>
      </div>
      {(authToggle && <Login />) || <Register />}
    </div>
  );
}

export default Authentication;
