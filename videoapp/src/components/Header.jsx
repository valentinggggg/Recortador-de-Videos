import { RiScissorsCutFill } from "react-icons/ri";

function Header() {
    return (
        <div className="w-full h-20 bg-green-400 flex items-center">
            <h1 className="p-8 text-2xl font-bold text-white flex items-center cursor-pointer">Video Cutter <RiScissorsCutFill className="ml-2 mt-1" /></h1>
        </div>
    );
}

export default Header;
