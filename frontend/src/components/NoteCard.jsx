import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom"; 
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="group flex flex-col bg-[#141414] hover:bg-[#1a1a1a] rounded-2xl border border-zinc-800 border-t-4 border-t-[#00e676] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,230,118,0.1)] hover:-translate-y-1"
    >
      <div className="p-6 flex flex-col h-full">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 truncate">
          {note.title}
        </h3>
        
        {/* Content */}
        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
          {note.content}
        </p>
        
        {/* Footer (Date & Actions) */}
        <div className="flex justify-between items-center border-t border-zinc-800/80 pt-4 mt-auto">
          <span className="text-xs font-medium text-zinc-500 tracking-wide">
            {formatDate(new Date(note.createdAt))}
          </span>
          
          <div className="flex items-center gap-1">
            {/* Edit Icon (relies on the parent Link wrapper to navigate) */}
            <div className="p-2 text-zinc-500 group-hover:text-[#00e676] transition-colors rounded-lg hover:bg-[#222222]">
              <PenSquareIcon className="w-[18px] h-[18px]" />
            </div>
            
            {/* Delete Button */}
            <button
              className="p-2 text-zinc-500 hover:text-[#ff4757] transition-colors rounded-lg hover:bg-[#ff4757]/10"
              onClick={(e) => handleDelete(e, note._id)}
              aria-label="Delete note"
            >
              <Trash2Icon className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;