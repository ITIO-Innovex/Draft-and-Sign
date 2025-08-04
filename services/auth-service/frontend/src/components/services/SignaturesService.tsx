import React from 'react';
import { ServiceEmbed } from './ServiceEmbed';

export const SignaturesService: React.FC = () => {
  return (
    <ServiceEmbed
         serviceUrl="http://localhost:3003"
         title="E-Signature Service"
       />
  );
}; 