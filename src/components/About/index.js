import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchAbouts } from '../../actions/about'


const About = (props) => {

    useEffect(() => {
      props.fetchAbouts();
  }, []);


    return (
      <div 
          dangerouslySetInnerHTML={{ __html: props.about ? props.about.content : '' }} 
      />
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
        fetchAbouts
    }
)(About);