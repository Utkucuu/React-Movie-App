# React Movie App

## Özet

Bu proje TypeScript, Redux, Nextjs... şeklinde kendimi geliştirmeye devam etmeden önce öğrendiğim bilgileri uygulamak amacıyla React, TailwindCss ve CSS kullanarak TMDB API ile geliştirdiğim bir film sitesi projesidir. Projede api istekleri **Axios** kullanılarak, sayfa geçişleri ise **React Router Dom V6** ile gerçekleştirilmiştir.

Öncelikle kurgulanmış olduğum Context yapısı içinde **useLocation hook** aracılığıyla url takip edilir. İlgili sayfa render olduğunda **useReducer hook** tarafından MovieServices custom hook kullanılarak gerekli api istekleri gerçekleştirilir ve dönen veriler data içinde ilgili alt komponente provide edilir. Alt componentlerde alınan veri gerekiyorsa çeşitli filtrelerden geçirilir ve son haliyle filmler kullanıcıya gösterilir. Farklı yöntemler denemek amacıyla, belirli koşullar gerçekleştiğinde bazı komponentlerin içinden de axios istekleri yapılmıştır.

![Genel şema](./src/assest/image/MovieProject.jpg)

#### [Live](https://tmdbmovieapp95.netlify.app)

#### [TMDB API](https://developer.themoviedb.org/docs)

## Kullanılan npm paketleri

- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
  `npm i react-router-dom@6`

- [axios](https://www.npmjs.com/package/axios)
  `npm install axios`

- [react-player](https://www.npmjs.com/package/react-player)
  `npm install react-player`

- [react-responsive-carousel](https://www.npmjs.com/package/react-responsive-carousel)
  `npm install react-responsive-carousel`

- [swiper](https://www.npmjs.com/package/swiper)
  `npm install swiper`

- [react-chartjs-2](https://www.npmjs.com/package/react-chartjs-2)
  `npm install react-chartjs-2`

- [chart.js](https://www.npmjs.com/package/chart.js)
  `npm install chart.js`

- [react-responsive](https://www.npmjs.com/package/react-responsive)
  `npm install react-responsive`

- [react-helmet](https://www.npmjs.com/package/react-helmet)
  `npm install react-helmet`

- [three](https://www.npmjs.com/package/three)
  `npm install three`

- [@react-three/fiber](https://www.npmjs.com/package/@react-three/fiber)
  `npm install @react-three/fiber`

- [@react-three/drei](https://www.npmjs.com/package/@react-three/drei)
  `npm install @react-three/drei`

- [virtua](https://www.npmjs.com/package/virtua)
  `npm install virtua`

- [masonry](https://www.npmjs.com/package/react-responsive-masonry)
  `npm install react-responsive-masonry`

- [tailwindcss](https://tailwindcss.com/docs/guides/create-react-app)
  `npx create-react-app`
