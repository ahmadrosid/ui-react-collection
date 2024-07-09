import React, { useState } from "react";

const AnimatedChatUI = () => {
  const [messages, setMessages] = useState([
    { content: "What is laravel?", role: "user" },
    {
      content: `Laravel is a popular open-source PHP web application framework. Here's a concise overview:

- Created by Taylor Otwell in 2011
- Follows the model-view-controller (MVC) architectural pattern
- Known for its elegant syntax and robust feature set
- Provides tools for common web development tasks like routing, authentication, and caching
- Includes an ORM (Object-Relational Mapping) called Eloquent for database interactions
- Offers a template engine called Blade for creating dynamic views
- Emphasizes developer productivity and code readability

Laravel is widely used for building modern web applications, from simple websites to complex enterprise-level systems. Would you like me to elaborate on any specific aspect of Laravel?`,
      role: "assistant",
    },
    {
        role: "user",
        content: 'Thanks!'
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages((prev) => [...prev, { content: inputValue, role: "user" }]);
      setInputValue("");

      // Simulate a response after a short delay
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { content: "This is a simulated response!", role: "assistant" },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900/20 text-white px-6">
      <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto">
        <div className="flex-grow overflow-auto p-3 flex flex-col gap-3">
          {messages.map((message, index) => (
            <div key={index}>
              <div className={`gap-4 flex`}>
                <div className="bg-gray-800 rounded-2xl flex p-4 gap-3 shadow-sm">
                  <div>
                    {message.role === "user" ? (
                      <span className="p-1.5 text-sm rounded-full bg-purple-500">
                        AR
                      </span>
                    ) : null}
                  </div>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex justify-center w-full">
          <div className="flex p-3 pb-6 bg-gray-800 rounded-t-xl max-w-4xl w-full border-2 border-gray-700/20 -mb-1">
            <textarea
              rows={1}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="text-sm flex-grow bg-gray-800 text-white px-2 py-1 focus:outline-none resize-none"
            />
            <button
              type="submit"
              className="text-xs bg-orange-800 text-gray-200 rounded-lg px-4 ml-1.5 py-2 transition-colors duration-300 ease-in-out hover:bg-orange-700 focus:outline-none"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnimatedChatUI;
