import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/signup", formData);

      toast.success(
        "Account created successfully!"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Signup failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-3xl overflow-hidden bg-[#141414] shadow-2xl border border-zinc-800 border-t-4 border-t-[#00e676]">

        {/* Left Section */}
        <div className="hidden md:flex flex-col items-center justify-center p-10 bg-[#1a1a1a] border-r border-zinc-800">
          <div className="text-8xl">⚡</div>

          <h1 className="text-5xl font-bold text-[#00e676] mt-4 tracking-tight">
            NoteSpark
          </h1>

          <p className="text-zinc-400 text-center mt-4 max-w-sm">
            Create an account and start organizing
            your notes beautifully.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center p-8 lg:p-12">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md"
          >
            <h2 className="text-4xl font-bold text-white">
              Create Account
            </h2>

            <p className="text-zinc-400 mt-2 mb-8">
              Join NoteSpark today.
            </p>

            <div className="space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 bg-[#222222] text-white placeholder:text-zinc-500 border border-zinc-700 rounded-xl focus:outline-none focus:border-[#00e676] focus:ring-1 focus:ring-[#00e676] transition-all"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-[#222222] text-white placeholder:text-zinc-500 border border-zinc-700 rounded-xl focus:outline-none focus:border-[#00e676] focus:ring-1 focus:ring-[#00e676] transition-all"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Create Password"
                  className="w-full px-4 py-3 bg-[#222222] text-white placeholder:text-zinc-500 border border-zinc-700 rounded-xl focus:outline-none focus:border-[#00e676] focus:ring-1 focus:ring-[#00e676] transition-all"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 bg-[#00e676] hover:bg-[#00c968] text-black font-semibold rounded-xl shadow-[0_0_15px_rgba(0,230,118,0.3)] hover:shadow-[0_0_25px_rgba(0,230,118,0.5)] transition-all duration-300"
              >
                Create Account
              </button>
            </div>

            <p className="text-center mt-8 text-zinc-400">
              Already have an account?
              <Link
                to="/login"
                className="text-[#00e676] hover:text-[#00c968] font-semibold ml-2 transition-colors"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;