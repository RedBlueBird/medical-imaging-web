// src/components/oral/OralDiagnosisInterface.tsx
'use client'
import React, { useState, useCallback } from 'react';
import { Upload, Download, BookOpen, ArrowLeft, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { useColors } from '@/config/colors';

// Component imports
import GlassCard from '@/components/ui/GlassCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Modal imports
import InstructionsModal from '@/components/oral/modals/InstructionsModal';
import ErrorModal from '@/components/oral/modals/ErrorModal';
import KnowledgeModal from '@/components/oral/modals/KnowledgeModal';
import ReportModal from '@/components/oral/modals/ReportModal';

// Section imports
import ImageUploadArea from '@/components/oral/ImageUploadArea';
import DiagnosisResults from '@/components/oral/DiagnosisResults';
import ControlButtons from '@/components/oral/ControlButtons';
import BottomControls from '@/components/oral/BottomControls';

// Hook imports
import { useOralDiagnosis } from '@/hooks/useOralDiagnosis';
import { useFileUpload } from '@/hooks/useFileUpload';
import { usePatientNavigation } from '@/hooks/usePatientNavigation';

const OralDiagnosisInterface: React.FC = () => {
  const colors = useColors();
  
  // State management using custom hooks
  const {
    selectedImage,
    selectedFile,
    isDetecting,
    detectionComplete,
    detectionResults,
    diagnosisResponse,
    currentPatient,
    showInstructions,
    showError,
    showKnowledge,
    showReport,
    reportConfirmed,
    error,
    buttonsEnabled,
    canStartDetection,
    currentPatientId,
    handleImageSelect,
    handleDetectionStart,
    handleDetectionComplete,
    handleReset,
    setShowError,
    setShowInstructions,
    setShowKnowledge,
    setShowReport,
    setReportConfirmed
  } = useOralDiagnosis();
  
  const { handleFileUpload } = useFileUpload({
    onImageSelect: handleImageSelect,
    onDetectionReset: handleReset,
    onError: (error: string) => setShowError(true) // Convert string error to boolean
  });
  
  const { handlePrevPatient, handleNextPatient, currentPatientData } = usePatientNavigation({
    currentPatient,
    patients: [], // You'll need to provide patient data
    onPatientChange: () => {} // You'll need to implement this
  });
  
  return (
    <div className={`min-h-screen ${colors.bgPrimary} relative overflow-hidden`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mt-16 mb-8">
          <h1 className={`text-4xl font-bold ${colors.textPrimary} mb-4`}>
            口腔黏膜潜在恶性疾病自动化诊断平台
          </h1>
        </div>
        
        {/* Main Interface */}
        <div className="max-w-6xl mx-auto">
          <GlassCard className="p-8">
            {/* Top Control Buttons */}
            <ControlButtons 
              onFileUpload={handleFileUpload}
              onShowInstructions={() => setShowInstructions(true)}
            />
            
            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Image Display and Patient Navigation */}
              <div className="space-y-4">
                <ImageUploadArea 
                  selectedImage={selectedImage}
                  onFileUpload={handleFileUpload} // Add this prop
                />
              </div>
              
              {/* Right Side - Patient Info and Diagnosis Results */}
              <div className="space-y-6">
                <DiagnosisResults 
                  results={detectionResults ?? undefined}
                  finding={diagnosisResponse?.data.results.finding}
                  recommendation={diagnosisResponse?.data.results.recommendation}
                  patientData={currentPatientData}
                />
              </div>
            </div>
            
            {/* Bottom Controls */}
            <BottomControls 
              buttonsEnabled={buttonsEnabled}
              onShowReport={() => setShowReport(true)}
              onShowKnowledge={() => setShowKnowledge(true)}
              selectedImage={selectedImage}
              isDetecting={isDetecting}
              onStartDetection={handleDetectionStart}
              currentPatient={currentPatient}
              totalPatients={2}
              onPrevPatient={handlePrevPatient}
              onNextPatient={handleNextPatient}
            />
          </GlassCard>
        </div>
      </div>
      
      {/* Modals */}
      <InstructionsModal 
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />
      
      <ErrorModal 
        isOpen={showError}
        onClose={() => setShowError(false)}
      />
      
      <KnowledgeModal 
        isOpen={showKnowledge}
        onClose={() => setShowKnowledge(false)}
      />
      
      <ReportModal 
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        patientData={currentPatientData}
        reportConfirmed={false} // You'll need to manage this state
        onReportConfirmedChange={(confirmed) => {
          // TODO: Implement report confirmation logic
          console.log('Report confirmed:', confirmed);
        }}
        onDownloadReport={() => {
          // TODO: Implement download logic
          console.log('Downloading report...');
        }}
        onPrintReport={() => {
          // TODO: Implement print logic
          console.log('Printing report...');
        }}
      />
    </div>
  );
};

export default OralDiagnosisInterface;