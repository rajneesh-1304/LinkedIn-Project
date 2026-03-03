'use client'
import React, { useState } from "react";
import "./image.css";
import { useAppSelector } from "@/redux/hooks";
import { Modal } from '../../Profile_Components/Modal/Modal'

const Image = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClose, setIsClose] = useState(true);

    const currectUser = useAppSelector((state) => state.users.currentUser);
    return (
        <div className="header">
            <div className="cover-photo"></div>

            <div className="profile-section">
                <div className="profile-image"></div>

                <div className="profile-info">
                    <h1 className="name">{currectUser?.name}</h1>
                    <p className="headline">--</p>
                    <p className="location">New York, United States</p>

                    <div className="buttons">
                        <button className="primary-btn">Open to</button>
                        <button className="secondary-btn" onClick={() => setIsOpen(true)}>Add section</button>
                        <button className="secondary-btn">Enhance profile</button>
                    </div>
                </div>
            </div>

            {isOpen &&
                <Modal close={() => setIsOpen(false)}/>

            }
        </div>
    );
};

export default Image;