import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import './BackButton.css';

const BackButton = ({ 
  tooltipText = "Back", 
  customPath,       // Custom navigation path
  onClick,          // Custom click handler
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (customPath) {
      navigate(customPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="back-button-wrapper">
      <Tooltip title={tooltipText} placement="right">
        <IconButton
          aria-label="go back"
          onClick={handleClick}
          className="back-button"
        >
          <ArrowBack />
          <span className="back-button-text">Back</span>
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default BackButton;