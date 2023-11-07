import axios from "axios";

async function Request(url, language = false, page = false) {
  const options = {
    method: "GET",
    url: process.env.REACT_APP_MOVIES + url,
    params: {
      language: (language && language) || "tr-TR",
      page: (page && page) || 1,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
    },
    cache: true, // ifadesi, Axios'un GET isteklerini önbellekleme yeteneğini etkinleştiren bir seçenektir. Bu, aynı isteğin birden fazla kez gönderilmesini önlemek ve ağ trafiğini azaltmak için kullanışlıdır.Önbellek, bir isteğin sonucunun (yanıtın) bir süre boyunca saklandığı bir bellek alanıdır. Bu, aynı isteğin tekrar gönderilmesi gerektiğinde, yanıtı aynı istemciden alma avantajını sağlar. Yani, aynı verileri birden fazla kez almak yerine, önbelleğe alınmış bir yanıt kullanılır.
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
