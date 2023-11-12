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

[tailwind Dark Mode](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually)

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

This project is a movie website developed using React, Tailwind CSS, and CSS, interacting with the TMDB API. API requests are made using **Axios**, and page transitions are implemented with **React Router Dom V6**. Various structures such as Context API, useRoute, useReducer, useGeneratePath, useNavigate, and PrivateRoute are utilized, and form controls are implemented with Regex.

In this project, you can:

- Access details about movies.
- Watch trailers for movies.
- Register and log in to create a list of movies to watch later.
- Select categories and years for movies.
- Search for movies.

### General Structure and Workflow

The established Context structure tracks the URL through the **useLocation hook**. When the relevant pathname is rendered, API requests are made using the "named export" method used in MovieServices through the **useReducer hook**, and the returned data is provided to the respective sub-components within the data. If necessary, the data received in sub-components is filtered through various filters, and movies are displayed to the user accordingly. For experimentation with different methods, some components also make Axios requests under certain conditions.

  <img src="./src/assest/image/MovieProject.jpg" width="400" style="display: inline-block;" />

### User Operations

Users need to register and log in to like and save a movie. To ensure that components like **pages>_Profile.js_** can only be accessed after logging in, these components are designed as **PrivateRoute**. User operations and session controls are managed using **LocalStorage**. Users can view the movies they liked and saved in their profiles and can remove them from the relevant section if they wish.

<img src="./src/assest/image/Profile.jpg" width="400" style="display: inline-block;" />

The form controls in the **components>auth>_Register.js_** component are provided with Regex. If the registration is successful, a unique ID is assigned to the user using the **generateUUID** function. In the subsequent stages of the project, user management can be carried out based on this ID.

### Page Flows

- In the **pages>movies>_Populer.js_** component, the scroll position is tracked, and when the end of the page is reached, an API request is made for the data on the next page. However, this method is not efficient as it inflates the Real DOM.

- In the **pages>_Categories.js_** component, page flow is implemented using the **virtual** package. Therefore, when scrolling down, the same number of elements is always rendered in the Real DOM, making this method more efficient for page flow.

### Utils

- <ins>**utils>_generatePage.js_**</ins> component changes the URL when using pagination in **pages>movies>_Trend.js_** and **pages>movies>_UpCmoing.js_**. According to the page structure established in the route>routes.js file, it triggers API requests for loading new pages when changes occur in the pathname tracked in **context>SiteContext.js**.

<div>
<img src="./src/assest/image/pagi2.png" width="300" style="display: inline-block;" />
<img src="./src/assest/image/pagi1.png" width="300" style="display: inline-block;" />
</div>
<br>

<ins>**utils>_navigateDetail.js_**</ins> component creates a detail page based on the id and title of any movie clicked. It triggers API requests for the content of the page to be loaded by detecting changes in pathname through **context>\_SiteContext.js**.

### Context

- #### AuthContext.js

User session status is monitored in this context. If there is an active user, the value **user=true** is returned to the sub-components, and UI changes are made.

- #### BestMoviesContext.js

To display the best movies, it facilitates communication between **components>movies>rigthPanel>_BestMovies.js_** and other components (Populer.js, TopRated.js, Trend.js, upComing.js, Categories.js).

<img src="./src/assest/image/BestMovies.jpg" width="200" style="display: inline-block;" />

- #### SelectContext.js

For sorting operations, it facilitates communication between **components>movies>rigthPanel>_SortingTool.js_** and other components (Populer.js, TopRated.js, Trend.js, upComing.js, Categories.js).

- #### SiteContext.js

It is created to distribute movie data to sub-components.

### Dark Mode

[Toggle Dark Mode Manually](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually)

### Palette

| Color | [Tailwind Color](https://tailwindcss.com/docs/background-color) |
| ----- | --------------------------------------------------------------- |
| Cyan  | 100-950                                                         |
| Sky   | 100-950                                                         |
| Slate | 100-950                                                         |
| Black | #                                                               |
| White | #                                                               |

#### Additional Information

- ESLint warnings may be present in the project.
- There is a manipulation in **App.css** within the **Categories.js** component.
- Some components are made responsive with the "zoom" attribute in CSS.
- **components>movieDetail>right-panel>LineChart.js** component is representative.
- Explanatory comments are included within code blocks.

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
