// src/app/oral/page.tsx
'use client'
import React from 'react';
import { useColors } from '@/config/colors';
import OralDiagnosisInterface from '@/components/oral/OralDiagnosisInterface';

const OralPage: React.FC = () => {
  const colors = useColors();
  
  return (
    <main className={`${colors.bgPrimary} min-h-screen`}>
      <OralDiagnosisInterface />
    </main>
  );
};

export default OralPage;