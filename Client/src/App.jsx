// import AppRoutes from "./Routers/appRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./Pages/Auth/SignUpPage";
import LoginPage from "./Pages/Auth/LoginPage";
import HomeDashBoard from "./Pages/Dashboards/home";
import DashBoard from "./Pages/Dashboards/DashBoard";
import Header from "./Components/Layout/header";
import Scroll from "./Components/Common/Scroll";
import PrivateRoute from "./Components/Layout/User/PrivateRoute";
import CreatePost from "./Pages/Post/createPost";
import ViewPost from "./Pages/Post/ViewPost";
import UpdatePost from "./Pages/Post/UpdatePost";
function App() {
  return (
    <BrowserRouter>
      <Scroll />
      <Header />
      <Routes>
        <Route path="/" element={<HomeDashBoard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/post/:postSlug" element={<ViewPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
