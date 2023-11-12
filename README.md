# React Movie App

- ### [Canlı / Live](https://tmdbmovieapp95.netlify.app)

- [en](#Summary)

- [npm](#npm)

- [TMDB API](https://developer.themoviedb.org/docs)

- [tailwindcss](https://tailwindcss.com)

### Özet

Bu proje React, tailwindcss ve CSS kullanarak TMDB API ile geliştirdiğim bir film sitesi projesidir. Projede API istekleri **Axios** kullanılarak, sayfa geçişleri ise **React Router Dom V6** ile gerçekleştirilmiştir. Context API, useRoute, useReducer, useGeneratePath, useNavigate, PrivateRoute... gibi yapılar kullanılmış olup form kontrolleri Regex ile gerçekleştirilmiştir.

Bu projede,

- Filmler ile ilgili detaylara ulaşabilirsiniz.
- Filmlerin fragmanlarını izleyebilirsiniz.
- Oturum açarak daha sonra izlemek istediğiniz filmler için liste oluşturabilirsiniz.
- Kategori ve yıl seçimi yapabilirsiniz.
- Film arama işlemi yapabilirsiniz.

### Genel Şema ve İşleyiş

Kurgulanan Context yapısı içinde **useLocation hook** aracılığıyla url takip edilir. İlgili pathname render olduğunda **useReducer hook** tarafından MovieServices'te kullanılmış olan "named export" yöntemi sayesinde gerekli API istekleri gerçekleştirilir ve dönen veriler data içinde ilgili alt komponente provide edilir. Alt komponentlerde alınan veriler gerekiyorsa çeşitli filtrelerden geçirilir ve filmler uygun şekilde kullanıcıya gösterilir. Farklı yöntemler denemek amacıyla, belirli koşullar gerçekleştiğinde bazı komponentlerin içinden de axios istekleri yapılmıştır.

  <img src="./src/assest/image/MovieProject.jpg" width="400" style="display: inline-block;" />

### Kullanıcı işlemleri

Kullanıcıların bir filmi beğenip kaydedebilmeleri için kayıt olup giriş yapmaları gerekmektedir. Oturum açılmadan **pages>_Profile.js_** sayfasına, oturum açıldıktan sonra **pages>_Authentication.js_** sayfasına ulaşılamaması için bu komponentler **PrivateRoute** olarak tasarlanmışlardır. Kullanıcı işlemleri ve oturum kontrolleri **LocalStorage** yardımıyla yönetilir. Kullanıcıların beğenip kaydettikleri filmleri profillerinde görüntüleyip daha sonra isterlerse profillerindeki ilgili bölümden kaldırabilmeleri mümkündür.

<img src="./src/assest/image/Profile.jpg" width="400" style="display: inline-block;" />

**components>auth>_Register.js_** komponenti içinde form kontrolleri **Regex** ile sağlanmıştır. Eğer kayıt başarılıysa kullanıcıya **generateUUID** fonksiyonu yardımıyla benzersiz bir id tanımlanır. Projenin sonraki aşamalarına devam edilirse bu id üzerinden kullanıcıların yönetimi gerçekleştirilebilir.

### Sayfa Akışları

- <ins>**pages>movies>_Populer.js_**</ins> komponentinde scroll konumu takip edilerek sayfa sonuna gelindiğinde bir sonraki sayfadaki verilerin getirilmesi için API isteği yapılır ancak bu yöntem Reel DOM'u şişirdiği için verimli değildir.

- <ins>**pages>_Categories.js_**</ins> komponentinde sayfa akışı **virtua** paketi kullanıllarak gerçekleştirilir. Bu sebeple scroll aşağıya doğru kaydrıldığında Reel DOM içinde her zaman aynı sayıda element render edilir, bu yöntem sayfa akışı için daha verimlidir.

### utils

-<ins>**utils>_generatePage.js_**</ins> bileşeni **pages>movies>_Trend.js_** ve **pages>movies>_UpCmoing.js_** sayfalarındaki pagination' lar kullanıldığında route>routes.js dosyasında kurgulanan sayfa yapısına göre yeni sayfaların yüklenmesi için URL değişimini gerçekleştirir. **context>SiteContext.js** içerisinde location takip edilir ve pathname üzerinde değişiklik gerçekleştiğinde belirtilen koşula göre yeni sayfaların yüklenmesi için API istekleri gerçekleştirilir.

<div >
<img src="./src/assest/image/pagi2.png" width="300"  style="display: inline-block;" />
<img src="./src/assest/image/pagi1.png" width="300"  style="display: inline-block;" />
</div>
<br>

<ins>**utils>_navigateDetail.js_**</ins> bileşeni herhangi bir filme tıklandığında o filmin id ve title değerlerine göre **pages>_MovieDetail.js_** sayfası oluşturur ve yine **context>_SiteContext.js_** aracılığıyla pathname değişikliği algılanıp sayfanın içeriğinin yüklenebilmesi için API istekleri gerçekleştirilir.

### context

- #### AuthContext.js

Kullanıcı oturum durumu bu context üzerinde izlenir. activeUser bulunuyorsa alt komponentlere user=true değeri döner ve UI değişiklikleri yapılır.

- #### BestMoviesContext.js

En "..." filmlerin gösterilebilmesi için
**components>movies>rigthPanel>_BestMovies.js_** ile diğer komponentlerin (Populer.js, TopRated.js, Trend.js, upComing.js, Categories.js) iletişimini sağlar.

<img src="./src/assest/image/BestMovies.jpg" width="200" style="display: inline-block;" />

- #### SelectContext.js

Sıralama işlemlerinin yapılabilmesi için
**components>movies>rigthPanel>_SortingTool.js_** ile diğer componentlerin (Populer.js, TopRated.js, Trend.js, upComing.js, Categories.js) iletişimini sağlar.

- #### SiteContext.js

Film verilerini alt komponentlere dağıtmak için oluşturulmuştur.

### DarkMode

[tailwindcss Dark Mode](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually)

### Palet

| color | [tailwindColor](https://tailwindcss.com/docs/background-color) |
| ----- | -------------------------------------------------------------- |
| cyan  | 100-950                                                        |
| sky   | 100-950                                                        |
| slate | 100-950                                                        |
| black | #                                                              |
| white | #                                                              |

#### Ek Bilgi

- Projede Eslint uyarıları görülebilir.
- Categories.js koponentindeki bir hata App.css içerisinde manipüle edilmiştir.
- Bazı komponentler css "zoom" attribute ile responsive uyumlu hale getirilmiştir.
- components>movieDetail>right-panel>LineChart.js komponenti temsilidir.
- Kod blokları içerisinde açıklayıcı yorum satırlarına yer verilmiştir.

<hr>

### Summary

This project is a movie website that I developed using the TMDB API, React, TailwindCSS, and CSS. API requests were handled using **Axios**, while page transitions were facilitated by **React Router Dom V6**. Various React features like Context API, useRoute, useReducer, useGeneratePath, useNavigate, and PrivateRoute were utilized. Form controls were implemented using Regex. In this project, users can:

- Find details about movies.
- Watch movie trailers.
- Create a watchlist by logging in.
- Select movies by category and year.
- Search for movies.

### General Structure and Workflow

The URL is monitored using the **useLocation** hook within a constructed Context structure. When a specific pathname is rendered, necessary API requests are made using the **useReducer** hook via the "named export" method in MovieServices. The returned data is then provided to relevant sub-components. This data, received in the subcomponents, goes through various filters, if necessary, to display the movies to users. To experiment with different methods, Axios requests were also made directly within some components under certain conditions.

  <img src="./src/assest/image/MovieProject.jpg" width="400" style="display: inline-block;" />

### User Operations

Users must register and log in to like or save movies. Access to pages like **pages>_Profile.js_** and **pages>auth>_Authentication.js_** is controlled via **PrivateRoute**, ensuring appropriate access based on login status. User actions and session states are managed using **LocalStorage**. Registered users can view, add, or remove liked or saved movies in their profiles.

<img src="./src/assest/image/Profile.jpg" width="400" style="display: inline-block;" />

The **_Register.js_** component in components>auth implements form controls with **Regex**. Successful registration assigns a unique ID to each user via a **generateUUID** function, laying the groundwork for advanced user management in future project phases.

### Page Flows

- By tracking the scroll position in the <ins>**pages>movies>_Populer.js_**</ins> component and when the end of the page is reached, an API request is made to fetch the data on the next page, but this method is not efficient as it inflates the Real DOM.

- Page flow is achieved using the **Virtua** package in the <ins>**pages>_Categories.js_**</ins> component. For this reason, when the scroll is scrolled down, always the same number of elements are rendered in the Real DOM, this method is more efficient for page flow.

### Utils

- The <ins>**utils>_generatePage.js_**</ins> utility in utils changes URLs for new page loads, as defined in the route>routes.js file, utilized in pagination for pages like Trend.js and UpComing.js.

<div>
<img src="./src/assest/image/pagi2.png" width="300" style="display: inline-block;" />
<img src="./src/assest/image/pagi1.png" width="300" style="display: inline-block;" />
</div>
<br>

The <ins>**utils>_navigateDetail.js_**</ins> component creates a **pages>_MovieDetail.js_** page based on a movie's ID and title when clicked. Through **context>_SiteContext.js_**, pathname changes are detected and API requests made to load page content.

### Context

- #### AuthContext.js

Monitors user session status. If an activeUser exists, a user=true value is returned to subcomponents, prompting UI changes.

- #### BestMoviesContext.js

Facilitates communication between components>movies>rightPanel>BestMovies.js and other components to display the most popular movies.

<img src="./src/assest/image/BestMovies.jpg" width="200" style="display: inline-block;" />

- #### SelectContext.js

Enables sorting operations and provides communication between components>movies>rightPanel>SortingTool.js and other components.

- #### SiteContext.js

Distributes movie data to subcomponents.

### Dark Mode

[tailwindcss Dark Mode](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually)

### Palette

| Color | [Tailwind Color](https://tailwindcss.com/docs/background-color) |
| ----- | --------------------------------------------------------------- |
| Cyan  | 100-950                                                         |
| Sky   | 100-950                                                         |
| Slate | 100-950                                                         |
| Black | #                                                               |
| White | #                                                               |

#### Additional Information

- Eslint warnings are present in the project.
- A workaround for an issue in the **Categories.js** component is addressed in **App.css**.
- Responsive design is partially achieved using the CSS "zoom" attribute in some components.
- The **LineChart.js** component in components>movieDetail>right-panel serves as a representative example.
- Explanatory comments are included in the code for clarity and ease of understanding.

<hr>

### npm

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
