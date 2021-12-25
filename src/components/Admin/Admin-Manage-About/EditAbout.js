import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useAlert } from 'react-alert'


import { fetchAbout, editAbout } from '../../../actions/aboutAdmin'

import Editor from './editor'

const MESSAGE_SUCCCESS = 'Chỉnh sửa thành công'

const EditAbout = (props) => {

    const history = useHistory();
    const alertUseAlert = useAlert()

    useEffect(() => {
        props.fetchAbout(props.match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = (data) => {
        console.log('EditAbout onsubmit: ', data);
        props.editAbout(data)
            .then(response => {
                history.push('/admin/abouts')
                alertUseAlert.success(MESSAGE_SUCCCESS)
            })
    }

    return (
        <Editor about={props.about} onSubmit={onSubmit} />
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        about: state.adminAbouts[ownProps.match.params.id],
    };
};

export default connect(
    mapStateToProps,
    { 
        fetchAbout, editAbout
    }
)(EditAbout);