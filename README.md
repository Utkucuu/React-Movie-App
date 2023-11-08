# React Movie App

#### [Canlı](https://tmdbmovieapp95.netlify.app) / [Live](https://tmdbmovieapp95.netlify.app)

[TMDB API](https://developer.themoviedb.org/docs)

### Özet

Bu proje React, TailwindCss ve CSS kullanarak TMDB API ile geliştirdiğim bir film sitesi projesidir. Projede api istekleri **Axios** kullanılarak, sayfa geçişleri ise **React Router Dom V6** ile gerçekleştirilmiştir.

### Kullanılan npm paketleri

- [react-router-dom](https://www.npmjs.com/package/react-router-dom)

  ```
  npm i react-router-dom@6
  ```

- [axios](https://www.npmjs.com/package/axios)

  ```
  npm install axios
  ```

- [react-player](https://www.npmjs.com/package/react-player)

  ```
  npm install react-player
  ```

- [react-responsive-carousel](https://www.npmjs.com/package/react-responsive-carousel)

  ```
  npm install react-responsive-carousel
  ```

- [swiper](https://www.npmjs.com/package/swiper)

  ```
  npm install swiper
  ```

- [react-chartjs-2](https://www.npmjs.com/package/react-chartjs-2)

  ```
  npm install react-chartjs-2`
  ```

- [chart.js](https://www.npmjs.com/package/chart.js)

  ```
  npm install chart.js
  ```

- [react-responsive](https://www.npmjs.com/package/react-responsive)

  ```
  npm install react-responsive`
  ```

- [react-helmet](https://www.npmjs.com/package/react-helmet)

  ```
  npm install react-helmet
  ```

- [three](https://www.npmjs.com/package/three)

  ```
  npm install three
  ```

- [@react-three/fiber](https://www.npmjs.com/package/@react-three/fiber)

  ```
  npm install @react-three/fiber
  ```

- [@react-three/drei](https://www.npmjs.com/package/@react-three/drei)

  ```
  npm install @react-three/drei
  ```

- [virtua](https://www.npmjs.com/package/virtua)

  ```
  npm install virtua
  ```

- [masonry](https://www.npmjs.com/package/react-responsive-masonry)

  ```
  npm install react-responsive-masonry
  ```

- [tailwindcss](https://tailwindcss.com/docs/guides/create-react-app)
  ```
  npx create-react-app
  ```

### Genel şema ve işleyiş

Kurgulanan Context yapısı içinde **useLocation hook** aracılığıyla url takip edilir. İlgili pathname render olduğunda **useReducer hook** tarafından MovieServices'te kullanılmış olan "named export" yöntemi sayesinde gerekli api istekleri gerçekleştirilir ve dönen veriler data içinde ilgili alt komponente provide edilir. Alt komponentlerde alınan veriler gerekiyorsa çeşitli filtrelerden geçirilir ve filmler uygun şekilde kullanıcıya gösterilir. Farklı yöntemler denemek amacıyla, belirli koşullar gerçekleştiğinde bazı komponentlerin içinden de axios istekleri yapılmıştır.

  <img src="./src/assest/image/MovieProject.jpg" width="400" style="display: inline-block;" />

#### Kullanıcı işlemleri

Kullanıcıların bir filmi beğenip kaydedebilmeleri için kayıt olup giriş yapmaları gerekmektedir. Oturum açılmadan pages>_Profile.js_ sayfasına, oturum açıldıktan sonra pages>_Authentication.js_ sayfasına ulaşılamaması için bu komponentler **privateRoute** olarak tasarlanmışlardır. Kullanıcı işlemleri ve oturum kontrolleri **LocalStorage** yardımıyla yönetilir. Kullanıcıların beğenip kaydettikleri filmleri profillerinde görüntüleyip daha sonra isterlerse profillerindeki ilgili bölümden kaldırabilmeleri mümkündür.

<img src="./src/assest/image/Profile.jpg" width="400" style="display: inline-block;" />

components>auth>_Register.js_ komponenti içinde form kontrolleri **Regex** ile sağlanmıştır. Eğer kayıt başarılıysa kullanıcıya **generateUUID** fonksiyonu yardımıyla benzersiz bir id tanımlanır. Projenin sonraki aşamalarına devam edilirse bu id üzerinden kullanıcıların yönetimi gerçekleştirilebilir.

#### Sayfa Akışları

<ins>pages>movies>_Populer.js_</ins> komponentinde scroll konumu takip edilerek sayfa sonuna gelindiğinde bir sonraki sayfadaki verilerin getirilmesi için API isteği yapılır ancak bu yöntem Reel DOM'u şişirdiği için verimli değildir.

<ins>pages>_Categories.js_</ins> komponentinde sayfa akışı **virtua** paketi kullanıllarak gerçekleştirilir. Bu sebeple scroll aşağıya doğru kaydrıldığında Reel DOM içinde her zaman aynı sayıda element render edilir, bu yöntem sayfa akışı için daha verimlidir.

#### utils

<ins>utils>_generatePage.js_</ins> bileşeni pages>movies>_Trend.js_ ve pages>movies>_UpCmoing.js_ sayfalarındaki pagination' lar kullanıldığında route>routes.js dosyasında kurgulanan sayfa yapısına göre yeni sayfaların yüklenmesi için URL değişimini gerçekleştirir. context>SiteContext.js içerisinde location takip edilir ve pathname üzerinde değişiklik gerçekleştiğinde belirtilen koşula göre yeni sayfaların yüklenmesi için API istekleri gerçekleştirilir.

<div >
<img src="./src/assest/image/pagi2.png" width="100" heigth ="300" style="display: inline-block;" />
<img src="./src/assest/image/pagi1.png" width="100" heigth ="300" style="display: inline-block;" />
</div>

<ins>utils>_navigateDetail.js_</ins> bileşeni herhangi bir filme tıklandığında o filmin id ve title değerlerine göre bir detay sayfası oluşturur ve yine context>_SiteContext.js_ aracılığıyla pathname değişikliği algılanıp sayfanın içeriği için API istekleri gerçekleştirilir.

#### context

###### AuthContext.js

Kullanıcı oturum durumu bu context üzerinde izlenir. activeUser bulunuyorsa alt komponentlere user=true değeri döner ve UI değişiklikleri yapılır.

###### BestMoviesContext.js

En "..." filmlerin gösterilebilmesi için
components>movies>rigthPanel>_BestMovies.js_ ile diğer komponentlerin (Populer.js, TopRated.js, Trend.js, upComing.js, Categories.js) iletişimini sağlar.

<img src="./src/assest/image/BestMovies.jpg" width="100" heigth ="300" style="display: inline-block;" />

###### SelectContext.js

Sıralama işlemlerinin yapılabilmesi için
components>movies>rigthPanel>_SortingTool.js_ ile diğer componentlerin (Populer.js, TopRated.js, Trend.js, upComing.js, Categories.js) iletişimini sağlar.

###### SiteContext.js

Film verilerini alt komponentlere dağıtmak için oluşturulmuştur.
