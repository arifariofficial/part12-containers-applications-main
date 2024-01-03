import { useEffect } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./reducers/loginReducer";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import { initializeBlog } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/usersReducers";
import { setToken } from "./reducers/tokenReducer";

const Login = () => {
  return (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <LoginForm />
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      dispatch(setToken(user.token));
      dispatch(initializeBlog(user.token));
      dispatch(initializeUsers(user.token));
    }
  }, [dispatch]);

  const user = useSelector(({ user }) => user);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    dispatch(setUser(null));
    navigate("/login");
  };

  const padding = {
    padding: 5,
  };

  if (!user) {
    return <Login />;
  }

  return (
    <div className="container">
      <div style={{ backgroundColor: "lightgray" }}>
        <p>
          <Link style={padding} to="/">
            blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
      </div>

      {user && (
        <div>
          <h2>blog app</h2>
          <Notification />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Blogs />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
