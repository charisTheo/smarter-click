import React from 'react'

import photo from "./../../images/photo.png"

import './photosPage.css'

const PhotosPage: React.FC = () => {
    return (
        <div id="photos-page">
            <h3>Photos</h3>
            <div className="photo-container">
                <img src={photo} alt="Your basket has been saved. Return to the site to resume your purchase."/>
            </div>
        </div>
    )
}

export default PhotosPage
