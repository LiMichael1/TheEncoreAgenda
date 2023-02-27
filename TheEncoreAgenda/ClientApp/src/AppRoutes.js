import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { FetchData } from './components/FetchData';
import { Home } from './components/Home';
import LeaderBoardPage from './components/Pages/LeaderBoard/LeaderBoardPage';
import LeaderBoardCreate from './components/Pages/LeaderBoard/LeaderBoardCreate';
import LeaderBoardDetails from './components/Pages/LeaderBoard/LeaderBoardDetails';
import { Counter } from './components/Counter';
import CalendarPage from './components/Pages/CalendarPage';

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: '/fetch-data',
    requireAuth: true,
    element: <FetchData />,
  },
  {
    path: '/Leaderboard',
    element: <LeaderBoardPage />,
  },
  {
      path: '/Leaderboard/:id',
      element: <LeaderBoardPage />
  },
  //{
  //  path: '/Leaderboard/Create',
  //  element: <LeaderBoardCreate />,
  //  },
  {
      path: '/Leaderboard/:id/Create',
      element: <LeaderBoardCreate />,
  },
  {
    path: '/Leaderboard/Details/:id',
    element: <LeaderBoardDetails />,
  },
  {
    path: '/calendar',
    element: <CalendarPage />,
  },
  ...ApiAuthorzationRoutes,
];

export default AppRoutes;
