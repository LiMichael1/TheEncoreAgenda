import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { FetchData } from './components/FetchData';
import { Home } from './components/Home';
import LeaderBoardPage from './components/Pages/LeaderBoard/LeaderBoardPage';
import LeaderBoardCreate from './components/Pages/LeaderBoard/LeaderBoardCreate';
import LeaderBoardDetails from './components/Pages/LeaderBoard/LeaderBoardDetails';
import { Counter } from './components/Counter';
import CalendarPage from './components/Pages/CalendarPage';
import ProfilePage from './components/Pages/Profile/ProfilePage';

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
    element: <LeaderBoardPage />,
  },
  //{
  //  path: '/Leaderboard/Create',
  //  element: <LeaderBoardCreate />,
  //  },
  {
    path: '/Leaderboard/:id/Create',
    requireAuth: true,
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
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  ...ApiAuthorzationRoutes,
];

export default AppRoutes;
