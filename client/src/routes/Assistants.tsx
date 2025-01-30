import React from 'react';
import { useAuthContext } from '~/hooks/AuthContext';
import { useAssistantsMap } from '~/hooks/Assistants';

export default function Assistants() {
  const { isAuthenticated } = useAuthContext();
  const assistantsMap = useAssistantsMap({ isAuthenticated });

  if (!assistantsMap) {
    return <div>Loading assistants...</div>;
  }
  console.log('Processed Assistants Map:', assistantsMap);

  // Process assistants and ensure icon and other fields are valid
  const assistants = Object.values(assistantsMap.assistants || {}).map((assistant) => ({
    id: assistant.id,
    name: assistant.name || 'Unnamed Assistant',
    description: assistant.description || 'No description available',
    icon: assistant.metadata?.icon || '/images/assistants.png', // Default icon
  }));

  if (assistants.length === 0) {
    return <div>No assistants found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Agents Munia</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {assistants.map((assistant) => (
          <div
            key={assistant.id}
            className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-lg transition"
            onClick={() => console.log(`Selected assistant: ${assistant.id}`)}
          >
            <img
              src={typeof assistant.icon === 'string' ? assistant.icon : '/images/assistants.png'}
              alt={`${assistant.name} icon`}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-bold">{assistant.name}</h3>
              <p className="text-sm text-gray-600">{assistant.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
