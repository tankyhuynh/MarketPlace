/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { connect } from 'react-redux';

import { fetchFunctions } from '../../../actions/function'

// import ManageUser from '../../UserFunction'
import CheckboxTree from './CheckboxTree'

const AdminUsers = (props) => {

    useEffect(() => {
        props.fetchFunctions();
    }, [])

    const nodes = props.functions.map(userFunction => {
        return {
            value: userFunction.name,
            label: userFunction.description,
            children: []
        }
    });


    return (
        <CheckboxTree nodes={nodes} />
    )
}

const mapStateToProps = (state) => {
    return { 
        functions:  Object.values(state.functions),
    };
}

export default connect(mapStateToProps, { fetchFunctions })(AdminUsers);