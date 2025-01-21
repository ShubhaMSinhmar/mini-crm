import { DiRuby } from "react-icons/di";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-4">
      <div className="text-center bg-gray-400 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Shubham's mini CRM <DiRuby className="inline" />
        </h1>
        <p className="text-lg text-gray-600">Manage your contacts and tasks with ease.</p>
      </div>
    </div>
  );
}
