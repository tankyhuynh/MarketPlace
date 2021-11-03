import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useAlert } from 'react-alert'

import { createAbout } from '../../../actions/about'

import Editor from './editor'

const MESSAGE_SUCCCESS = 'Thêm thành công'

const AddAbout = (props) => {

    const history = useHistory();
    const alertUseAlert = useAlert()

    const onSubmit = (data) => {
        props.createAbout(data)
        history.push('/admin/abouts')
        alertUseAlert.success(MESSAGE_SUCCCESS)
    }


    return (
        <Editor onSubmit={onSubmit} />
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        about: state.abouts[ownProps.match.params.id],
    };
};

export default connect(
    mapStateToProps,
    { 
        createAbout
    }
)(AddAbout);