import { CalendarDays } from "lucide-react";
import { Sparkles } from "lucide-react";
import { CiCirclePlus } from "react-icons/ci";
import { FaQuestion } from "react-icons/fa";
import Avatar from "./Avatar";
import { TbWorld } from "react-icons/tb";
function Navbar() {
  return (
    <div className="bg-[#333a64] flex justify-between px-10 py-5">
      <div className="flex gap-4 items-center">
        <div>
          <img
            className="rounded-lg cursor-pointer"
            src="/logo.jpg"
            width={40}
            height={40}
            alt=""
          />
        </div>
        <button className="flex gap-2 items-center text-sm cursor-pointer rounded-lg px-4 py-2 hover:bg-neutral-100/10 focus:bg-neutral-100/10">
          <CalendarDays size={15} strokeWidth={3} />
          <p className="font-semibold">Events</p>
        </button>
        <button className="flex gap-2 items-center text-sm cursor-pointer rounded-lg px-4 py-2 hover:bg-neutral-100/10 focus:bg-neutral-100/10">
          <Sparkles size={15} strokeWidth={2} />
          <p>My Spaces</p>
        </button>
      </div>
      <div className="flex gap-3 items-center text-sm">
        <div className="flex items-center gap-1.5 px-4 hover:bg-white/10 cursor-pointer py-2 rounded-lg">
          <Avatar />
          Parikshit Gup...
        </div>
        <div className="flex gap-1.5 px-4 hover:bg-white/10 cursor-pointer py-2 rounded-lg items-center">
          <FaQuestion
            className="bg-white rounded-full p-1 size-5 text-[#333a64]"
            size={1}
          />
          Resources
        </div>
        <div className="flex items-center gap-1.5 px-4 hover:bg-white/10 cursor-pointer py-2 rounded-lg">
          <TbWorld size={20}/>
          <p>English</p>
        </div>
        <div className="bg-emerald-500 text-gray-900 font-semibold flex rounded-lg gap-2 items-center cursor-pointer px-3 py-2">
          <CiCirclePlus size={20} strokeWidth={2} />
          Create Space
        </div>
      </div>
    </div>
  );
}

export default Navbar;
