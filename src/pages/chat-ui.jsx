import React, { useState } from "react";

const AnimatedChatUI = () => {
  const sampleChat = [
    { content: "What is Quantum Computer?", role: "user" },
    {
      content: `A quantum computer is a type of computer that uses quantum-mechanical phenomena, such as superposition and entanglement, to perform computations. Here's a concise overview:

1. Quantum bits: Instead of classical bits (0 or 1), quantum computers use quantum bits or "qubits," which can exist in multiple states simultaneously.
2. Superposition: Qubits can be in a combination of 0 and 1 states at the same time, allowing for parallel processing.
3. Entanglement: Qubits can be linked in ways that classical bits cannot, enabling complex computations.
4. Potential power: For certain problems, quantum computers could theoretically perform calculations exponentially faster than classical computers.
5. Applications: Potential uses include cryptography, drug discovery, financial modeling, and optimization problems.
6. Challenges: Quantum computers are extremely sensitive to environmental disturbances and require specialized conditions to operate.
7. Current state: While progress is being made, fully functional large-scale quantum computers are still in development.

Would you like me to elaborate on any specific aspect of quantum computing?`,
      role: "assistant",
    },
    {
      role: "user",
      content: "Yes, elaborate more about Entanglement.",
    },
    {
      role: "assistant",
      content: `Certainly, I'd be happy to elaborate on quantum entanglement.

Quantum entanglement is a fascinating phenomenon in quantum mechanics that Albert Einstein famously referred to as "spooky action at a distance." Here's a more detailed explanation:

1. Definition: Entanglement occurs when two or more particles become connected in such a way that the quantum state of each particle cannot be described independently, even when separated by large distances.

2. Creation: Entanglement can be created through various processes, such as when particles interact physically or are generated from a common source.

3. Properties:
   - Correlation: The states of entangled particles are correlated. Measuring one particle instantly affects the state of its entangled partner.
   - Non-locality: This correlation exists regardless of the distance between the particles, seeming to violate the principle that information cannot travel faster than light.

4. EPR Paradox: Einstein, Podolsky, and Rosen proposed this thought experiment to challenge quantum mechanics, arguing that entanglement implied the existence of "hidden variables" determining particle states.

5. Bell's Theorem: John Stewart Bell later proved that the correlations predicted by quantum mechanics could not be explained by any local hidden variable theory, supporting the reality of entanglement.

6. Applications in quantum computing:
   - Quantum gates: Entanglement is crucial for creating multi-qubit gates, which are essential for quantum algorithms.
   - Quantum teleportation: This process uses entanglement to transmit quantum states between particles.
   - Quantum cryptography: Entangled particles can be used to create unbreakable encryption keys.

7. Challenges:
   - Fragility: Entangled states are extremely sensitive to environmental interference.
   - Scalability: Maintaining entanglement across many qubits is a major challenge in building large-scale quantum computers.

8. Ongoing research: Scientists are continually working to better understand entanglement, create more robust entangled states, and develop new applications in quantum technology.

Entanglement remains one of the most counterintuitive aspects of quantum mechanics, challenging our classical intuitions about reality and information. It's a key resource that gives quantum computers their potential power over classical computers for certain types of problems.

Would you like me to expand on any particular aspect of entanglement or its role in quantum computing?`,
    },
  ];
  const [messages, setMessages] = useState(sampleChat);
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
          { content: "Hi, how can I help you today?", role: "assistant" },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="bg-gray-900/20 text-white">
      <div className="h-screen relative overflow-auto">
        <div className="min-h-screen">
          <div className="max-w-4xl mx-auto w-full space-y-4 p-2 py-4">
            {messages.map((message, index) => (
              <div key={index}>
                <div className="gap-4 flex">
                  <div className="bg-gray-800 border border-gray-700/20 rounded-2xl flex p-4 gap-3 shadow-sm">
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
        </div>
        <div className="sticky bottom-0 inset-x-0 w-full">
          <form onSubmit={handleSubmit} className="max-w-4xl w-full mx-auto">
            <div className="flex p-3 pb-6 bg-gray-800 rounded-t-xl border border-gray-700/60 w-full">
              <textarea
                rows={2}
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                placeholder="Type a message..."
                className="text-sm flex-grow bg-gray-800 text-white px-2 py-1 focus:outline-none resize-none"
              />
              <div>
                <button
                  type="submit"
                  className="text-xs bg-orange-800 text-gray-200 rounded-lg px-4 ml-1.5 py-2 transition-colors duration-300 ease-in-out hover:bg-orange-700 focus:outline-none"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AnimatedChatUI;
