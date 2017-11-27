import React from 'react';
import DebugLog from '../../Utils/DebugLog';
import './Loading.css'

/*
 * Adapted from https://codepen.io/mrrocks/pen/EiplA
 */
const Loading = ({isLoading, status}) => {
  return (
    <svg className={`Loading ${isLoading ? 'Loading--Show' : 'Loading--Hide'}`} width="40px" height="40px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle className="Loading__Path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
    </svg>
  )
};

export default Loading;
