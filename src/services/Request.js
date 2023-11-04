import axios from "axios";

async function Request(url, language = false, page = false) {
  const options = {
    method: "GET",
    url: process.env.REACT_APP_MOVIES + url,
    params: {
      language: (language && language) || "tr-TR",
      page: (page && page) || 1, // hata aldıktan sonra ekledim
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
    },
    cache: true,
  };

  try {
    const res = await axios.request(options);
    const result = res;
    return result;
  } catch (err) {
    if (err.response) {
      // Hata yanıtı alındı
      const { status, data } = err.response;
      console.log(`Hata durumu: ${status}`);
      console.log(`Hata mesajı: ${data}`);
    } else {
      // Hata yanıtı alınmadı
      console.log(err);
    }
  }
}

export const get = (url, language, page) => Request(url, language, page);
