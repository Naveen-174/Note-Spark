import { ArrowLeftIcon, Sparkles } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"; // Updated to react-router-dom
import api from "../lib/axios.js";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          
          {/* Back Button */}
          <Link 
            to={"/"} 
            className="btn btn-ghost text-base-content/70 hover:text-primary hover:bg-transparent mb-8 group transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Notes
          </Link>

          {/* Form Card */}
          <div className="card bg-base-100 border border-zinc-800 border-t-4 border-t-primary rounded-3xl shadow-2xl">
            <div className="card-body p-8 sm:p-10">
              
              <h2 className="card-title text-3xl font-bold text-base-content mb-8 flex items-center gap-3">
                Create New Note <Sparkles className="text-primary w-6 h-6" />
              </h2>
              
              <form onSubmit={handleSubmit}>
                
                {/* Title Input */}
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text text-base-content/80 font-medium text-sm tracking-wide uppercase">
                      Title
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="What is this note about?"
                    className="input bg-neutral text-base-content placeholder:text-base-content/40 border-zinc-700 focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all text-lg"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Content Textarea */}
                <div className="form-control mb-10">
                  <label className="label">
                    <span className="label-text text-base-content/80 font-medium text-sm tracking-wide uppercase">
                      Content
                    </span>
                  </label>
                  <textarea
                    placeholder="Start typing your brilliant ideas here..."
                    className="textarea bg-neutral text-base-content placeholder:text-base-content/40 border-zinc-700 focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all text-base min-h-[200px] resize-y py-4"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                {/* Submit Button */}
                <div className="card-actions justify-end">
                  <button 
                    type="submit" 
                    className="btn btn-primary text-black font-bold px-8 rounded-xl shadow-[0_0_15px_rgba(0,230,118,0.3)] hover:shadow-[0_0_25px_rgba(0,230,118,0.5)] transition-all"
                    disabled={loading}
                  >
                    {loading && <span className="loading loading-spinner loading-sm"></span>}
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
                
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CreatePage;