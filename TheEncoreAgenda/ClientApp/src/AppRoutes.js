import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { FetchData } from './components/FetchData';
import { Home } from './components/Home';
import LeaderBoardPage from './components/Pages/LeaderBoard/LeaderBoardPage';
import LeaderBoardCreate from './components/Pages/LeaderBoard/LeaderBoardCreate';

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
    path: '/Leaderboard/Create',
    element: <LeaderBoardCreate />,
  },
  ...ApiAuthorzationRoutes,
];

export default AppRoutes;
