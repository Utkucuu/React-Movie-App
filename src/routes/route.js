import SiteLayout from "../pages/index";
import Home from "../pages/Home";
import MoviesLayout from "../pages/movies";
import UpComing from "../pages/movies/UpComing";
import Categories from "../pages/Categories";
import Trend from "../pages/movies/Trend";
import MovieDetail from "../pages/MovieDetail";
import TopRated from "../pages/movies/TopRated";
import Populer from "../pages/movies/Populer";
import Profile from "../pages/Profile";
import Authentication from "../pages/auth/Authentication";
import { PrivateProfile, PrivateAuth } from "../components/privateRoute";

const routes = [
  {
    path: "",
    element: <SiteLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "movies",
        element: <MoviesLayout />,
        children: [
          {
            index: true,
            element: <Populer />,
          },
          {
            path: "trend",
            element: <Trend />,
            children: [
              {
                path: "page/:id",
                element: <Trend />,
              },
            ],
          },

          {
            path: "top_rated",
            element: <TopRated />,
          },
          {
            path: "populer",
            element: <Populer />,
          },
          {
            path: "upcoming",
            element: <UpComing />,
            children: [
              {
                path: "page/:id",
                element: <UpComing />,
              },
            ],
          },
        ],
      },
      {
        path: "categories",
        element: <Categories />,
      },

      {
        path: "/detail/:id/:name",
        element: <MovieDetail />,
      },

      {
        path: "profile",
        element: (
          <PrivateProfile>
            {" "}
            <Profile />
          </PrivateProfile>
        ),
      },

      {
        path: "auth",
        element: (
          <PrivateAuth>
            <Authentication />
          </PrivateAuth>
        ),
      },
    ],
  },
];

export default routes;
