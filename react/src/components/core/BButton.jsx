import React from 'react';
import { Link } from 'react-router-dom';

export default function BButton({
  color = 'blue',
  to = '',
  circle = false,
  href = '',
  link = false,
  target = '_blank',
  children,
  onClickEvent,
}) {
  const commonStyles = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin:'7px',
    padding: '3px',
    borderRadius: '5px',
    
  };

  let iconColor = color;
  let backgroundColor = 'transparent';

  if (href !== '') {
    backgroundColor = "#A259FF";
  } else if (to !== '') {
    backgroundColor = 'transparent';
    
  } else {
    backgroundColor = 'transparent';
    commonStyles.width = '30px';
    color = color;
  }

  const buttonStyles = {
    ...commonStyles,
    backgroundColor: backgroundColor,
    color: color
  };
  
  

  const renderButtonContent = () => {
    
    if (href !== '') {
      
      return (
        <Link className="text-decoration-none" to={href} style={buttonStyles}>
          {children}
        </Link>
      );
    }

    if (to !== '') {
      
      return (
        <Link to={to} className="" style={buttonStyles}>
          {children}
        </Link>
      );
    }

    return (
      
      <Link onClick={onClickEvent} style={buttonStyles}>
        {children}
      </Link>
    );
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      {renderButtonContent()}
    </div>
  );
}
