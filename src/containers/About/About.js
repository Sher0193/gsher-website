import React from 'react';
import './Home.css';

import image1 from '../../img/asters.jpg';
import image2 from '../../img/plumtree.jpg';
import image3 from '../../img/hayfield.jpg';
import image4 from '../../img/highway.jpg';
import image5 from '../../img/fallwoodlot.jpg';

import BackgroundSlider from 'react-background-slider';

export default class About extends React.Component {
    render() {
        return (
            <div className="App">
                <BackgroundSlider
                    images={[image1, image2, image3, image4, image5]}
                    duration={10}
                    transition={2}
                />
            </div>
        );
    }
}
