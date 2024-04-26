
import React from 'react';
import mentor_pic from '../img/mentor.jpeg';

const MainComponent = () => {
  const MentorCard = ({ mentorName, section, imageUrl }) => {
    return (
      <div className="card">
        <div className="image-container" style={{ width: '200px', height: '200px', overflow: 'hidden', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img  src={imageUrl} alt={mentorName} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover'}} />
        </div>
        <div className="card-content">
          <h2>{mentorName}</h2>
          <p>Section: {section}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <MentorCard
        mentorName="Murali Mohan"
        section="ReactJS"
        imageUrl={mentor_pic}
      />
    </div>
  );
}

export default MainComponent;
