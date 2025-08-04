import React from 'react';
import { ServiceEmbed } from './ServiceEmbed';

export const DocumentsService: React.FC = () => {
  return (
    <ServiceEmbed
      serviceUrl="http://localhost:3002"
      title="PDF Service"
    />
  );
}; 