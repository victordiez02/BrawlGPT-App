
/** @jsxImportSource react */
import React from 'react';

const Background = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px] opacity-20"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-red-600 rounded-full filter blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-20"></div>
    </div>
  );
};

export default Background;
