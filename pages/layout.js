import { DiRuby } from "react-icons/di";
import Link from "next/link";
import { useState } from "react";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar (Responsive) */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white p-4 transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:translate-x-0`}
      >
        <h2 className="text-xl font-bold flex items-center gap-2">
          <DiRuby /> Mini CRM
        </h2>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <Link
                className="block p-3 bg-gray-600 rounded hover:bg-gray-700"
                href="/"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                className="block p-3 bg-gray-600 rounded hover:bg-gray-700"
                href="/contacts"
              >
                Contacts
              </Link>
            </li>
            <li>
              <Link
                className="block p-3 bg-gray-600 rounded hover:bg-gray-700"
                href="/tasks"
              >
                Tasks
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for Sidebar on Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar (Responsive) */}
        <header className="flex items-center justify-between bg-gray-800 text-white p-4 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-gray-700 rounded-md hover:bg-gray-600"
          >
            Menu
          </button>
          <h1 className="text-lg font-bold">Mini CRM</h1>
        </header>

        {/* Main Children Content */}
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}
