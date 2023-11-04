import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/AuthContext";
function Login() {
  const navigate = useNavigate();

  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const inputRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    // Kullanıcı adı ve şifre geçerliyse kontrolü
    if (!formData.username) {
      setError("Kullanıcı adı boş bırakılamaz.");
    } else if (!formData.password) {
      setError("Şifre boş bırakılamaz.");
    } else {
      // Daha önce kayıt yapılmış kullanıcıları kontrol et
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

      const foundUser = storedUsers.find(
        (user) =>
          user.username === formData.username &&
          user.password === formData.password,
      );

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
