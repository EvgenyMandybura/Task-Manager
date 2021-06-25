import SignIn from "../view/auth/SignIn";
import SignUp from "../view/auth/SignUp";
import CompleteProfile from "../view/auth/CompleteProfile";
import Dashboard from "../view/dashboard/Dashboard";
import Boards from "../view/Boards/Boards";
import MakeNewPage from "../view/Boards/MakeNewPage";
import BoardDetails from "../view/Boards/BoardDetails";
import EditBoardDetails from "../view/Boards/EditBoardDetails";
import AddNewTask from "../view/tasks/AddNewTask";
import TaskDetails from "../view/tasks/TaskDetails";
import ReportDetails from "../view/reports/ReportDetails";

const userRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/complete-profile", component: CompleteProfile },
  { path: "/boards", component: Boards },
  { path: "/make-new-board", component: MakeNewPage },
  { path: "/board-details", component: BoardDetails },
  { path: "/edit-board-details", component: EditBoardDetails },
  { path: "/add-new-task", component: AddNewTask },
  { path: "/task-details", component: TaskDetails },
  { path: "/reports", component: ReportDetails },
  { path: "", exact: true, component: Boards },
];

const authRoutes = [
  { path: "/sign-up", component: SignUp },
  { path: "/sign-in", component: SignIn },
];

export { userRoutes, authRoutes };
