"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// DATA: Your forms list with new structure (icon, description)
const dashboardLinks = [
  {
    id: 1,
    title: "Dispatch Entry",
    description: "Create new dispatch entries with auto-fill BC Code lookup",
    url: "https://dispatch-form-ten.vercel.app/", // Assuming this is still for Dispatch Entry
    // Placeholder icon for Dispatch Entry (Box/Package)
    // icon: (
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     width="48"
    //     height="48"
    //     viewBox="0 0 24 24"
    //     fill="none"
    //     stroke="currentColor"
    //     strokeWidth="1.5"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //     className="text-white mb-3"
    //   >
    //     <path d="m7.5 4.27 9 5.15" />
    //     <path d="M21 8.03V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8.03c0-1.21.74-2.34 1.9-2.79l8.06-3.11c1.16-.45 2.52-.45 3.69 0L19.1 5.24c1.16.45 1.9 1.58 1.9 2.79z" />
    //     <path d="m3 8 7.07 4.07c.7.4 1.5.4 2.2 0L21 8" />
    //     <path d="M12 22v-8" />
    //     <path d="M12 14H3" />
    //     <path d="M12 14h9" />
    //   </svg>
    // ),
  },
  {
    id: 2,
    title: "Receipt Form",
    // description: "Upload Excel files to populate BC Master Database",
    url: "https://form-nine-green.vercel.app//", // Assuming this is for Admin Upload
    // Placeholder icon for Admin Upload (Wrench/Gear)
    // icon: (
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     width="48"
    //     height="48"
    //     viewBox="0 0 24 24"
    //     fill="none"
    //     stroke="currentColor"
    //     strokeWidth="1.5"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //     className="text-white mb-3"
    //   >
    //     <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.78 1.28a2 2 0 0 0 .73 2.73l.15.08a2 2 0 0 1 1 1.74v.17a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.78-1.28a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74V4a2 2 0 0 0-2-2z" />
    //     <circle cx="12" cy="12" r="3" />
    //   </svg>
    // ),
  },
  {
    id: 3,
    title: "Master Sheet BOB",
    // description: "Upload Excel files to populate BC Master Database",
    url: "https://docs.google.com/spreadsheets/d/1PIQPUMo4MAsJ9CTwwwGMdSjVcGw2YP1QohQm2uOjKbo/edit?gid=2100204529#gid=2100204529", // Assuming this is for Admin Upload
    // Placeholder icon for Admin Upload (Wrench/Gear)
    // icon: (
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     width="48"
    //     height="48"
    //     viewBox="0 0 24 24"
    //     fill="none"
    //     stroke="currentColor"
    //     strokeWidth="1.5"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //     className="text-white mb-3"
    //   >
    //     <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.78 1.28a2 2 0 0 0 .73 2.73l.15.08a2 2 0 0 1 1 1.74v.17a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.78-1.28a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74V4a2 2 0 0 0-2-2z" />
    //     <circle cx="12" cy="12" r="3" />
    //   </svg>
    // ),
  },
  {
    id: 4,
    title: "BOB Stationery Sheet",
    "url": "https://docs.google.com/spreadsheets/d/1PqTBMH4eRr_4ulr4tUUC6EvN3JcA2h4QfEAKh6Vu5Pc/edit?resourcekey=&gid=1749550861#gid=1749550861"
  },
  {
    id: 5,
    title: "New Agreement Status Sheet",
    "url": "https://docs.google.com/spreadsheets/d/11JKHwb6spl_aq0JI18vxTgQRFaXApUo-yVhcPY4S_Tw/edit?gid=0#gid=0"
  },
  {
    id: 6,
    title: "Courier Management System",
    "url": "https://www.appsheet.com/start/097bd681-929a-499c-8f58-2a4c1ba45ccc?platform=desktop#appName=CourierManagementSystem-867379832&vss=H4sIAAAAAAAAA6WQTU_EIBCG_4qZMzWlRalc_Ug2Rg-68aDsgZZpQmyhoVTdNPx36X5kL17UG_MOz5snM8OHwc_noJp3EG_zabrHLQiYJay3A0oQEq6dDd51EoiER9Ufw8kb9Gd3zvcSIsQNOXYEHEHMv68Q_7cgYDTaYNoULn0LnXoObFov5C44cRAJ9FNQdYc7-YU7AD_9JvDkXEhpu59uVFCJ64cUFXnBMkqzolzTUuRclOycsZwy_rqojSt7q014cDq1Bj8hgeCVHVUTjLMrnRpqynTNaZFVVYMZo5fpxSnPVNXUWGqOV_kFxJiUW9dMI-qXdLE_XmrR-RqU1XuhVnUjxm_TDTsJGAIAAA==&view=Courier%20Form"
  },
  {
    id: 7,
    title: "Task App",
    "url": "https://tasks.automatebusiness.com/mytasks"
  },
  {
    id: 8,
    title: "New Request Form - For BC",
    "url": "https://forms.gle/oZ8f85z6WN8svo39A"
  },
  {
    id: 9,
    title: "ID CARD DETAILS",
    "url": "https://docs.google.com/spreadsheets/d/1sBG9G0SYZU7Lw_FYBlJspfDGkpW_kZ0H/edit?gid=1841476323#gid=1841476323 "
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState("");

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn");
    const currentUser = sessionStorage.getItem("currentUser");
    
    if (!loggedIn) {
      router.push("/");
    } else {
      setUser(currentUser || "User");
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-400">Verifying access...</div>;
  }

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-linear-to-br from-[#4f2a7a] via-[#8a2be2] to-[#ff0066] relative overflow-hidden text-white">
      
      {/* Header with User and Logout */}
      <div className="absolute top-8 right-8 flex items-center gap-4 z-10">
        <span className="text-white/70 text-sm hidden sm:block">Logged in as <span className="text-white font-semibold">{user}</span></span>
        <button 
          onClick={handleLogout}
          className="text-xs bg-white/10 border border-white/20 text-white/80 px-4 py-2 rounded-full hover:bg-white/20 hover:text-white transition-all shadow-md"
        >
          Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-10 w-full max-w-5xl">
        
        {/* Main Title and Subtitle */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-3 text-white drop-shadow-lg">Dashboard</h1>
          <p className="text-xl text-white/80 drop-shadow">Manage your system entries efficiently</p>
        </div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
          {dashboardLinks.map((item) => (
            <Link 
              key={item.id} 
              href={item.url} 
              target="_blank"
              className="group flex flex-col items-center p-8 rounded-2xl 
                         bg-white/10 backdrop-blur-md border border-white/20 
                         shadow-lg hover:shadow-xl hover:border-white/40 
                         hover:scale-[1.02] transition-all duration-300 ease-in-out
                         cursor-pointer text-center"
            >
              {/* Icon */}
              {/* {item.icon} */}

              {/* Title */}
              <h2 className="text-3xl font-semibold mb-2 text-white group-hover:text-white transition-colors">
                {item.title}
              </h2>

              {/* Description */}
              <p className="text-white/70 text-base leading-relaxed">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}