import { useEffect, useState } from "react";
import { useSearchStore } from "../../pages/Home/CoinTable";

const activeStyles = "bg-gray-900 text-white";
const normalStyles =
  "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white";

export default function NavBar() {
  const [activeURL, setActiveURL] = useState("");
  const { setSearchString, searchString } = useSearchStore();

  useEffect(() => {
    setActiveURL(window.location.pathname);
  }, []);

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 select-none items-center">
              <img
                className="h-8 w-auto"
                src="/favicon.png"
                alt="Crypto Asset Tracker"
                style={{
                  filter: "invert(1)",
                }}
              />
              <h1 className="ml-2 text-white">Crypto Asset Tracker</h1>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a
                  href="/"
                  className={`${normalStyles} ${activeURL === "/" ? activeStyles : ""}`}
                  aria-current="page"
                >
                  Home
                </a>
                <a
                  href="/compare"
                  className={`${normalStyles} ${activeURL === "/compare" ? activeStyles : ""}`}
                >
                  Compare
                </a>
              </div>
            </div>
          </div>
          {activeURL === "/" && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative ml-3">
                <div>
                  <input
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    className="inset-y-0 rounded border-none p-2 px-4 shadow outline-none"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
