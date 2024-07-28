'use client'
import React from 'react';
import TestComponent from '../../components/TestComponent';
import { redirect } from 'next/navigation'; 

export default function ClientTestPage() {

  const handleSeeResultsClick = (averageScore: number) => { 
    // Redirect to results page with averageScore
    redirect(`/results?score=${averageScore}`);
  };

  return (
    <div>
      <TestComponent onSeeResultsClick={handleSeeResultsClick} />
    </div>
  );
}
