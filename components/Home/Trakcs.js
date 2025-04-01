import { useState, useEffect } from "react";
import SectionLayout from "../SectionLayout";
import Image from "next/image";
import { trackConfig } from "../../config/tracks";

const cardStyle = {
  justifyContent: "center",
  alignItems: "center",
  padding: "20px 20px 30px 20px",
  width: "250px",
  height: "200px",
  cursor: "pointer",
};
const headingStyle = {
  fontSize: "1.4rem",
  marginBottom: "10px",
};

const TrackCard = ({ logo, title, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="tracks-card" style={cardStyle} onClick={onClick} title="See Problem Statement"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
      <div className="centered-icon">
        <Image
          src={logo}
          alt=""
          priority={true}
          sizes="100%"
          width={150}
          height={150}
        />
      </div>
      <h2 style={headingStyle}>{isHovered ? "See Problem Statement" : title}</h2>
    </div>
  );
};

const Popup = ({ track, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (track) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [track]);

  if (!track) return null;

  const { problem,id ,title, techStack, description, challenges,challengeDescription } = track;

  return (
    <div className={`popup-overlay ${show ? "show" : ""}`} onClick={onClose} data-lenis-prevent>
      <div className={`popup-content ${show ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p><strong>Problem Statement (PS-{id}): </strong> {problem}</p>
        <div className="description">
          <p><strong>Description:</strong>{description}</p>
          <p>{challenges && <strong>Challenge:</strong>}
          <p>{challengeDescription}
          <ol>
            {challenges?.map((challenge, index) => (
              <li key={index}>{challenge}</li>
            ))}
          </ol>
          </p>
          </p>
        </div>
        {techStack && <p><strong>Note:</strong> {techStack}</p> }
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const Trakcs = () => {
  const { Track } = trackConfig;
  const [selectedTrack, setSelectedTrack] = useState(null);

  const handleCardClick = (track) => {
    setSelectedTrack(track);
  };

  const handleClosePopup = () => {
    setSelectedTrack(null);
  };

  return (
    <SectionLayout Title="TRACKS" Classname={"why-sponsor-section tracks"}>
      <h3>
        Hackatron features diverse tracks designed to help hackers tackle unique challenges while fostering creativity, collaboration, and innovation.
        <br />
        Hackatron goes beyond being just an event—it's an opportunity to Think, Build, and Launch. With cutting-edge tracks for all skill levels, from beginners to experts, it offers a platform to explore new ideas, solve real-world problems, and create a lasting impact. Join us on this exciting journey of discovery and innovation!
      </h3>
      <div className="tracks-container">
        {Track.map((track) => (
          <TrackCard
            {...track}
            key={track.id}
            onClick={() => handleCardClick(track)}
          />
        ))}
      </div>
      <Popup track={selectedTrack} onClose={handleClosePopup} />
    </SectionLayout>
  );
};

export default Trakcs;