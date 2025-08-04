import { useState, useEffect } from 'react';

interface EmbeddedModeState {
  isEmbedded: boolean;
  serviceId?: string;
}

export const useEmbeddedMode = () => {
  const [embeddedMode, setEmbeddedMode] = useState<EmbeddedModeState>({
    isEmbedded: false
  });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'EMBEDDED_MODE') {
        setEmbeddedMode({
          isEmbedded: event.data.payload.isEmbedded,
          serviceId: event.data.payload.serviceId
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const notifyViewChange = (view: string) => {
    if (embeddedMode.isEmbedded) {
      window.parent.postMessage({
        type: 'SERVICE_VIEW_CHANGE',
        payload: { view }
      }, '*');
    }
  };

  return {
    isEmbedded: embeddedMode.isEmbedded,
    serviceId: embeddedMode.serviceId,
    notifyViewChange
  };
}; 