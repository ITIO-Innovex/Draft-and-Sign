import React from 'react';
import { ServiceEmbed } from './ServiceEmbed';

export const TemplatesService: React.FC = () => {
  return (
    <ServiceEmbed
      serviceUrl="http://localhost:3005"
      title="Template Service"
    />
  );
}; 