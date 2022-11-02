import { Outlet, Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/registerForO">Register for organization</Link>
            </li>
          </ul>
        </nav>

        <Outlet />
      </>
    </>
  );
};

export default Home;
