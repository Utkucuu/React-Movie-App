import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/AuthContext";
import { Helmet } from "react-helmet";
function Login() {
  const navigate = useNavigate();
  //AuthContext üzerinden kullanıcı bilgileri getirilir.
  const { setUser } = useUser();

  //inputlardan alınan verileri tutmak için formData state'i kullanılır
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const inputRef = useRef();
  //handleInputChange fonksiyonu inputlar değiştikçe formDatayı günceller
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //Giriş butonuna basıldığında handleLogin çalışır. Kullanıcı adı ve şifre kontrolü yapılır.
  const handleLogin = () => {
    if (!formData.username) {
      setError("Kullanıcı adı boş bırakılamaz.");
    } else if (!formData.password) {
      setError("Şifre boş bırakılamaz.");
    } else {
      // Kullanıcı adı ve şifre boş değilse daha önce kayıt yapılmış kullanıcıları kontrol etmek için users storage'dan getirilir.
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

      //Kullanıcının inputlara girmiş olduğu username ve password verileri formData üzerinden localStorage daki verilerle karşılaştırılır.
      const foundUser = storedUsers.find(
        (user) =>
          user.username === formData.username &&
          user.password === formData.password,
      );
      //Yukarıdaki find fonksiyonundan dönecek değer true olursa aşağıda kullanıcı oturum aktive edilir, setUser güncellenir, kullanıcı Pages>Profile.js sayfasına yönlendirilir.
      if (foundUser) {
        foundUser.isLoggedIn = true;
        localStorage.setItem("activeUser", JSON.stringify(foundUser));

        setUser(foundUser);
        setError("Giriş başarılı");
        localStorage.setItem("sessionHandle", "true");

        navigate("/profile");
      } else {
        setError("Kullanıcı adı veya şifre yanlış.");
      }
    }
  };

  return (
    <div className="mx-auto">
      <Helmet>
        <title>Giriş</title>
      </Helmet>
      <form>
        <div className="mt-5 flex">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <label>Kullanıcı Adı</label>
              <input
                className="w-60 rounded-lg ps-4 placeholder-slate-400"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-4">Şifre</label>
              <input
                className="w-60 rounded-lg ps-4 placeholder-slate-400"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 text-end">
          <button
            className="mx-auto rounded-lg border-2 border-sky-200 bg-white text-sky-900"
            type="button"
            onClick={handleLogin}
          >
            Giriş Yap
          </button>
        </div>
        {error && (
          <div className="mt-2 text-red-500" ref={inputRef}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
