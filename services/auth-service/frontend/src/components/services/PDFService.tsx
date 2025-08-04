import React from 'react';
import { ServiceEmbed } from './ServiceEmbed';

export const PDFService: React.FC = () => {
  return (
    <ServiceEmbed
      serviceUrl="http://localhost:3004"
      title="PDF Service"
    />
  );
}; 