import SignIn from "../view/auth/SignIn";
import SignUp from "../view/auth/SignUp";
import CompleteProfile from "../view/auth/CompleteProfile";
import Dashboard from "../view/dashboard/Dashboard";
import Boards from "../view/Boards/Boards";
import MakeNewPage from "../view/Boards/MakeNewPage";
import BoardDetails from "../view/Boards/BoardDetails";

const userRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/complete-profile", component: CompleteProfile },
  { path: "/boards", component: Boards },
  { path: "/make-new-board", component: MakeNewPage },
  { path: "/board-details", component: BoardDetails },
  { path: "", exact: true, component: Boards },
];

const authRoutes = [
  { path: "/sign-up", component: SignUp },
  { path: "/sign-in", component: SignIn },
];

export { userRoutes, authRoutes };
