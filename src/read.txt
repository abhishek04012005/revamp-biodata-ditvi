import React, { useState, useEffect } from "react";
import "./CheckStatus.css";
import {
  CheckCircle,
  RadioButtonUnchecked,
  AssignmentTurnedIn,
  Description,
  ThumbUpAlt,
  Payment,
  Done,
  Schedule,
  Timeline,
  AccessTime,
  ArrowForward,
} from "@mui/icons-material";
import HeaderSection from "../../structure/HeaderSection/HeaderSection";

const CheckStatus = () => {
  const [currentStatus, setCurrentStatus] = useState(1);
  const [timestamps, setTimestamps] = useState({});
  const [selectedStep, setSelectedStep] = useState(null);

  const steps = [
    {
      id: 1,
      title: "Request Received",
      icon: <AssignmentTurnedIn />,
      description: "Your biodata request has been received and is being processed.",
      expectedDuration: "1-2 hours",
      color: { light: '#E3F2FD', main: '#2196F3', dark: '#1976D2' }
    },
    {
      id: 2,
      title: "Sample Share",
      icon: <Description />,
      description: "Sample biodata has been shared for your review.",
      expectedDuration: "24-48 hours",
      color: { light: '#F3E5F5', main: '#9C27B0', dark: '#7B1FA2' }
    },
    {
      id: 3,
      title: "User Approval",
      icon: <ThumbUpAlt />,
      description: "Waiting for your approval on the sample biodata.",
      expectedDuration: "24 hours",
      color: { light: '#E8F5E9', main: '#4CAF50', dark: '#388E3C' }
    },
    {
      id: 4,
      title: "Payment",
      icon: <Payment />,
      description: "Payment confirmation pending.",
      expectedDuration: "Immediate",
      color: { light: '#FFF3E0', main: '#FF9800', dark: '#F57C00' }
    },
    {
      id: 5,
      title: "Completed",
      icon: <Done />,
      description: "Your biodata request has been completed successfully.",
      expectedDuration: "2-4 hours",
      color: { light: '#FCE4EC', main: '#E91E63', dark: '#C2185B' }
    }
  ];

  useEffect(() => {
    setTimestamps(prev => ({
      ...prev,
      [currentStatus]: new Date()
    }));
  }, [currentStatus]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getProgressPercentage = () => {
    return ((currentStatus - 1) / (steps.length - 1)) * 100;
  };

  return (
    <div className="status-check">
      <HeaderSection
        title="Track Your Order"
        subtitle="Follow your biodata creation progress in real-time"
      />
      
      <div className="status-card">
        <div 
          className="status-header" 
          style={{ background: steps[currentStatus - 1].color.main }}
        >
          <div className="header-content">
            <div className="header-left">
              <Timeline className="header-icon" />
              <div>
                <h2>Order Status</h2>
                <p className="order-id">Order ID: #BD12345</p>
              </div>
            </div>
            
            <div className="progress-tracker">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${getProgressPercentage()}%`,
                    background: steps[currentStatus - 1].color.dark 
                  }}
                />
              </div>
              <span className="progress-text">
                {getProgressPercentage().toFixed(0)}% Complete
              </span>
            </div>
          </div>
        </div>

        <div className="timeline-container">
          <div className="timeline-track">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`timeline-step ${currentStatus >= step.id ? 'completed' : ''} 
                  ${currentStatus === step.id ? 'active' : ''}
                  ${selectedStep === step.id ? 'selected' : ''}`}
                onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                style={{
                  '--step-color': step.color.main,
                  '--step-light': step.color.light,
                  '--step-dark': step.color.dark
                }}
              >
                <div className="timeline-icon">
                  {currentStatus > step.id ? (
                    <CheckCircle />
                  ) : currentStatus === step.id ? (
                    step.icon
                  ) : (
                    <RadioButtonUnchecked />
                  )}
                </div>
                
                {index < steps.length - 1 && (
                  <div className="step-connector">
                    <div className={`connector-line ${currentStatus > step.id ? 'completed' : ''}`} />
                    <ArrowForward className={`connector-arrow ${currentStatus > step.id ? 'completed' : ''}`} />
                  </div>
                )}

                <div className="timeline-content">
                  <h4>{step.title}</h4>
                  {timestamps[step.id] && (
                    <div className="timestamp">
                      <AccessTime className="time-icon" />
                      <span>{formatDate(timestamps[step.id])}</span>
                    </div>
                  )}
                </div>

                {selectedStep === step.id && (
                  <div className="step-details">
                    <p>{step.description}</p>
                    <div className="step-meta">
                      <span className="duration">
                        <Schedule />
                        {step.expectedDuration}
                      </span>
                      {currentStatus === step.id && (
                        <span className="status-badge">In Progress</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="status-footer">
          <div className="total-time">
            <Schedule className="time-icon" />
            <div>
              <h4>Total Estimated Time</h4>
              <p>72-96 hours from request initiation</p>
            </div>
          </div>

          <div className="control-buttons">
            <button
              className="control-btn previous"
              onClick={() => setCurrentStatus(prev => Math.max(1, prev - 1))}
              disabled={currentStatus === 1}
              style={{ 
                background: steps[currentStatus - 1].color.light,
                color: steps[currentStatus - 1].color.main 
              }}
            >
              Previous Step
            </button>
            <button
              className="control-btn next"
              onClick={() => setCurrentStatus(prev => Math.min(steps.length, prev + 1))}
              disabled={currentStatus === steps.length}
              style={{ background: steps[currentStatus - 1].color.main }}
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckStatus;