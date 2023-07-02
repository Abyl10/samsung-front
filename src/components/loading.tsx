import React from 'react';
import './loading.css';

const Loading: React.FC = () => {
  return (
    <div className="abs">
      <div className="loader book">
        <figure className="page"></figure>
        <figure className="page"></figure>
        <figure className="page"></figure>
      </div>

      <h1 className="header">Reading ...</h1>
    </div>
  );
};

export default Loading;
