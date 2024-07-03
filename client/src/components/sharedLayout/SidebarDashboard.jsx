import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { links } from "../../utils/links";
import React from "react";

const SidebarDashboard = () => {
  const location = useLocation();

  return (
    <section className="bg-black/90">
      <div
        className={`bg-black min-h-screen  ${
          open ? "w-64" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="mt-4 flex flex-col gap-4 relative">
          {links?.map((menu, i) => (
            <Link
              to={menu?.path}
              key={i}
              className={`${
                menu?.margin && "mt-5"
              } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-green-600 rounded-md ${
                location.pathname === menu?.path ? "bg-green-900" : ""
              }`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.text}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.text}
              </h2>
            </Link>
          ))}
          <hr />
        </div>
      </div>
    </section>
  );
};
export default SidebarDashboard;
