import { createBrowserRouter } from "react-router-dom";
import { Root } from "./components/root";
import { Login } from "./components/login";
import { Dashboard } from "./components/dashboard";
import { Messages } from "./components/messages";
import { Compose } from "./components/compose";
import { Announcements } from "./components/announcements";
import { Students } from "./components/students";
import { NotFound } from "./components/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Login },
      { path: "dashboard", Component: Dashboard },
      { path: "messages", Component: Messages },
      { path: "compose", Component: Compose },
      { path: "announcements", Component: Announcements },
      { path: "students", Component: Students },
      { path: "*", Component: NotFound },
    ],
  },
]);
