import { useRef, useState } from "react";
import EyeIcon from "../../assest/icons/EyeIcon";
import EyeSlashIcon from "../../assest/icons/EyeSlashIcon";
import { generateUUID } from "three/src/math/MathUtils";

function Register() {
  console.log("REGİSTER rendered");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordAgain: "",
    gender: "", // Cinsiyet bilgisi
    userId: "",
    isLoggedIn: false,
    userLikedMovies: [],
    userSavedMovies: [],
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword); // Şifreyi göstermek veya gizlemek için showPassword state'ini tersine çevirir
  };

  function isValidEmail(email) {
    // E-posta adresinin geçerliliğini kontrol etmek için bir regex deseni kullanın
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // E-posta adresini desenle karşılaştırın
    return emailPattern.test(email);
  }

  function isValidUsername(username) {
    // Sadece harf ve sayılardan oluşan, 6-20 karakter uzunluğunda bir regex kullanarak kontrol ediyoruz.
    const pattern = /^[a-zA-Z0-9]{6,20}$/;
    return pattern.test(username);
  }

  function isValidPassword(password) {
    // Şifre en az 6 karakter uzunluğunda, en az bir büyük harf, bir sayı ve bir noktalama işareti içermelidir.
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#./])[A-Za-z\d@$!%*?&#./]{6,}$/;
    return passwordPattern.test(password);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const spanRef = useRef(null);
  const handleInputFocus = () => {
    if (spanRef.current) {
      spanRef.current.style.display = "block";
    }
  };
  const handleInputBlur = () => {
    if (spanRef.current) {
      spanRef.current.style.display = "none";
    }
  };

  const inputRef = useRef();
  const handleRegister = () => {
    let errorMessage = "";

    // Kullanıcı adı ve e-posta geçerliyse kontrolü
    if (!formData.username) {
      errorMessage = "Kullanıcı adı boş bırakılamaz.";
    } else if (!isValidUsername(formData.username)) {
      errorMessage = "Geçersiz Kullanıcı Adı.";
    } else if (!formData.email) {
      errorMessage = "E-posta boş bırakılamaz.";
    } else if (!isValidEmail(formData.email)) {
      errorMessage = "Geçersiz E-posta Adresi.";
    } else if (!formData.password) {
      errorMessage = "Şifre boş bırakılamaz.";
    } else if (!isValidPassword(formData.password)) {
      errorMessage = "Geçersiz Şifre. ";
    } else if (formData.password !== formData.passwordAgain) {
      errorMessage = "Şifreler uyuşmuyor. Şifreleri kontrol ediniz.";
    } else if (!formData.gender) {
      errorMessage = "Cinsiyet alanı boş bırak.";
    }

    if (errorMessage) {
      inputRef.current.innerText = errorMessage;
    } else {
      // Daha önce kayıt yapılmış kullanıcıları kontrol et
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

      // daha önce verilmiş bir userId varsa kontrol et, yoksa oluşturduğunu ver, varsa yeni oluştur
      let userId = generateUUID();
      if (storedUsers.some((user) => user.userId === userId)) {
        userId = generateUUID();
      }
      formData.userId = userId;

      // Aynı kullanıcı adı ile kayıt yapılmışsa, yeni bir kullanıcı adı girmesini iste
      if (storedUsers.some((user) => user.username === formData.username)) {
        errorMessage =
          "Bu kullanıcı adı daha önce alınmış. Lütfen başka bir kullanıcı adı seçin.";
        inputRef.current.innerText = errorMessage;
      } else {
        // Kayıt işlemi başarılı, localStorage a gönderilebilir.
        console.log("Kayıt Bilgileri:", { ...formData });
        inputRef.current.innerText = "Kayıt Başarılı. Yönlendiriliyorsunuz..";
        // Kullanıcıyı local storage'a kaydet
        storedUsers.push(formData);
        localStorage.setItem("users", JSON.stringify(storedUsers));

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
  };

  return (
    <div className="mx-auto px-2 sm:px-0">
      <form>
        <div className="mt-5 flex">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <label>Kullanıcı Adı</label>
              <input
                placeholder="min 6 karakter"
                className="w-60 rounded-lg ps-4 placeholder-slate-400"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-1">Email</label>
              <input
                placeholder="ornek@example.com"
                className="w-60 rounded-lg ps-4 placeholder-slate-400"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-2">Şifre</label>
              <div className="flex">
                <input
                  placeholder="min 6 karakter"
                  className="w-60 rounded-lg ps-4 placeholder-slate-400"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <button
                  className="ms-4"
                  onClick={(e) => handleTogglePassword(e)}
                >
                  {(showPassword && <EyeIcon />) || <EyeSlashIcon />}
                </button>
              </div>
              <span
                ref={spanRef}
                className="hidden text-xs font-thin text-slate-100"
              >
                En az bir büyük harf, bir sayı ve bir özel karakter
              </span>
            </div>

            <div className="flex flex-col">
              <label className="mt-2">Şifre Yeniden</label>
              <input
                className="w-60 rounded-lg ps-4 placeholder-slate-400"
                type={showPassword ? "text" : "password"}
                name="passwordAgain"
                value={formData.passwordAgain}
                onChange={handleInputChange}
              />
            </div>

            <div className="mt-2">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleInputChange}
                />
                Kadın
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleInputChange}
                />
                Erkek
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  name="gender"
                  value="unspecified"
                  checked={formData.gender === "unspecified"}
                  onChange={handleInputChange}
                />
                Belirtmek İstemiyorum
              </label>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <button
            className="mx-auto rounded-lg border-2 border-sky-200 bg-white px-2 text-sky-900"
            type="button"
            onClick={handleRegister}
          >
            Hesap Oluştur
          </button>
        </div>
        <div
          className="mt-4 text-start text-xs font-bold text-red-600 "
          ref={inputRef}
        ></div>
      </form>
    </div>
  );
}

export default Register;
// const userId = generateUUID();
// formData.userId = userId;
