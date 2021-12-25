import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { loading, loaded } from '../../actions/load'
import { fetchAbouts } from '../../actions/about'

const About = (props) => {

    useEffect(() => {
        props.loading()
        props.fetchAbouts();
        props.loaded()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderAbout = () => {
        if(props.about && props.about.content){
            return (
                <div 
                    dangerouslySetInnerHTML={{ __html: props.about ? props.about.content : '' }} 
                />
            )
        }
        return (
            <div>Không có giới thiệu</div>
        )
    }

    return (
        renderAbout()
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        about: state.abouts[1],
    };
};

export default connect(
    mapStateToProps,
    { 
        fetchAbouts,
        loading, loaded
    }
)(About);