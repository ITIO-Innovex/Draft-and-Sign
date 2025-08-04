import React, { useState } from 'react';

interface ServiceEmbedProps {
  serviceUrl: string;
  title: string;
}

export const ServiceEmbed: React.FC<ServiceEmbedProps> = ({ serviceUrl, title }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative h-full w-full">
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white">
          {/* Bouncing Dots Loader */}
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
          </div>
          <p className="mt-4 text-blue-600 text-base font-semibold animate-pulse">
            Almost there...
          </p>
        </div>
      )}
      <iframe
        src={serviceUrl}
        title={title}
        className="w-full h-full border-0"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};
