'use client'
import { useState } from "react";
import "./modal.css";

export const Modal = ({ close }:any) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [IsExperienceOpen, setIsExperienceOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        <div className="modal-header">
          <h3>Add to your profile</h3>
          <p>Choose what you want to add</p>
        </div>

        <div className="modal-buttons">
          <button 
            className="primary-bttn"
            onClick={() => setIsProfileOpen(true)}
          >
            Update Profile
          </button>

          <button 
            className="secondary-bttn"
            onClick={() => setIsEducationOpen(true)}
          >
            Add Education
          </button>

          <button 
            className="secondary-bttn"
            onClick={() => setIsExperienceOpen(true)}
          >
            Add Experience
          </button>

          <button 
            className="secondary-bttn"
            onClick={() => setIsProjectOpen(true)}
          >
            Add Projects
          </button>

          {/* Close Button */}
          <button 
            className="secondary-bttn"
            onClick={close}
          >
            Close
          </button>
        </div>
      </div>

      {isProfileOpen && <Modal close={close} />}
      {isEducationOpen && <Modal close={close} />}
      {IsExperienceOpen && <Modal close={close} />}
      {isProjectOpen && <Modal close={close} />}
    </div>
  );
};