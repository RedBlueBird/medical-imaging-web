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
import PatientInfoPanel from '@/components/oral/PatientInfoPanel';
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
    isDetecting,
    detectionComplete,
    expandedResults,
    setExpandedResults,
    handleStartDetection
  } = useOralDiagnosis();
  
  const { handleFileUpload } = useFileUpload();
  const { currentPatient, currentPatientData, handlePrevPatient, handleNextPatient } = usePatientNavigation();
  
  // Modal states
  const [showInstructions, setShowInstructions] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showKnowledge, setShowKnowledge] = useState(false);
  const [showReport, setShowReport] = useState(false);
  
  // Check if all buttons should be enabled
  const buttonsEnabled = selectedImage && detectionComplete;
  
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
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold ${colors.textPrimary} mb-4`}>
            口腔黏膜潜在恶性疾病自动化诊断平台
          </h1>
        </div>
        
        {/* Main Interface */}
        <div className="max-w-6xl mx-auto">
          <GlassCard className="p-8">
            {/* Top Control Buttons */}
            <ControlButtons 
              buttonsEnabled={buttonsEnabled}
              onFileUpload={handleFileUpload}
              onShowInstructions={() => setShowInstructions(true)}
              onShowReport={() => setShowReport(true)}
              onShowKnowledge={() => setShowKnowledge(true)}
            />
            
            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Image Display */}
              <div className="space-y-4">
                <ImageUploadArea 
                  selectedImage={selectedImage}
                  onFileUpload={handleFileUpload}
                />
                
                {/* Detection Results */}
                {detectionComplete && (
                  <DiagnosisResults 
                    expandedResults={expandedResults}
                    onToggleExpanded={() => setExpandedResults(!expandedResults)}
                  />
                )}
              </div>
              
              {/* Right Side - Patient Info and Results */}
              <div className="space-y-6">
                {/* Patient Navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={handlePrevPatient}
                    disabled={currentPatient === 0}
                    className={`p-3 rounded-lg ${currentPatient === 0 ? 'bg-gray-500/50 cursor-not-allowed' : colors.buttonGhost} transition-colors`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <span className={`${colors.textPrimary} font-medium`}>
                    前一患者 | 后一患者
                  </span>
                  
                  <button
                    onClick={handleNextPatient}
                    disabled={currentPatient === 1} // Assuming 2 patients total
                    className={`p-3 rounded-lg ${currentPatient === 1 ? 'bg-gray-500/50 cursor-not-allowed' : colors.buttonGhost} transition-colors`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Patient Info Panel */}
                <PatientInfoPanel 
                  currentPatientData={currentPatientData}
                  detectionComplete={detectionComplete}
                />
              </div>
            </div>
            
            {/* Bottom Controls */}
            <BottomControls 
              selectedImage={selectedImage}
              isDetecting={isDetecting}
              onStartDetection={handleStartDetection}
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
        currentPatientData={currentPatientData}
      />
    </div>
  );
};

export default OralDiagnosisInterface;