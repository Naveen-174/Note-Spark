import { Link, useNavigate } from "react-router-dom";
import { PlusIcon, LogOutIcon } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
              NoteSpark
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            {isLoggedIn && (
              <>
                <Link to="/create" className="btn btn-primary">
                  <PlusIcon className="size-5" />
                  <span>New Note</span>
                </Link>

                <button
                  onClick={logout}
                  className="btn btn-error"
                >
                  <LogOutIcon className="size-5" />
                  <span>Logout</span>
                </button>
              </>
            )}

            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="btn btn-primary"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="btn btn-outline"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;