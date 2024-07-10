import React from "react";
import {
  Search,
  PlusCircle,
  ArrowRight,
  Smartphone,
  Gamepad,
  Coffee,
} from "lucide-react";

const SearchBox = () => (
  <div className="relative w-full mb-4">
    <div className="grid items-center bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="flex">
        <textarea
          type="text"
          rows={2}
          placeholder="Ask anything..."
          className="flex-grow py-3 px-3 bg-transparent text-sm resize-none text-white placeholder-gray-400 focus:outline-none"
        />
      </div>
      <div className="flex justify-between p-2">
        <div className="flex items-center space-x-2 pr-3">
          <button className="text-gray-400 hover:text-white flex gap-2 items-center text-sm">
            <PlusCircle className="size-4"/> Attach
          </button>
        </div>

        <div className="right-3 flex items-center space-x-4">
          <span className="text-gray-400 text-sm">Pro</span>
          <div className="w-8 h-4 bg-gray-600 rounded-full flex items-center">
            <div className="w-3 h-3 bg-gray-400 rounded-full ml-1"></div>
          </div>

          <button className="text-gray-400 bg-gray-600 rounded-full p-1.5 hover:text-white hover:bg-gray-700">
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const SuggestionButton = ({ icon: Icon, text }) => (
  <button className="flex items-center border border-gray-800 hover:bg-gray-800 text-white p-2 rounded-md text-sm">
    <span className="bg-gray-800 p-1.5 rounded mr-2">
        <Icon size={16} />
    </span>
    <span>{text}</span>
  </button>
);

const KnowledgeSearchInterface = () => {
  return (
    <div className="bg-gray-900/50 text-white p-8 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Where knowledge begins</h1>
      <div className="w-full max-w-2xl">
        <SearchBox />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <SuggestionButton
            icon={Smartphone}
            text="When will the next iPhone be released?"
          />
          <SuggestionButton
            icon={Gamepad}
            text="Best gaming consoles of 2024"
          />
          <SuggestionButton
            icon={Search}
            text="How is We Developed AI different?"
          />
          <SuggestionButton icon={Coffee} text="Healthiest cooking oils" />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeSearchInterface;
