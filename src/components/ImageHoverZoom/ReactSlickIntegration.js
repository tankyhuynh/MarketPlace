import React, { Component } from 'react';
import ReactSlick from './ReactSlick';

import '../../styles/app.css';
import './ReactSlick.css'

export default class ReactSlickExample extends Component {
    render() {
        const image = this.props.image;
        return (
            <div className=" fluid react-slick">
                <div className="fluid__image-container">
                    <ReactSlick {...{
                            rimProps: {
                                isHintEnabled: true,
                                shouldHideHintAfterFirstActivation: false,
                                enlargedImagePosition: 'over'
                            }
                        }} 
                        image={image}
                    />
                </div>
                
            </div>
        );
    }
}
