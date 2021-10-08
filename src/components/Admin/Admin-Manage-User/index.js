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

    const renderCheckboxUserChildren = (user) => {
        const children = []
        // props.fields.filter(field => field.category.id === domain.id)
        //     .map(item => {
        //         return children.push({
        //             value: `${item.id}`,
        //             label: item.name,
        //         })
        //     })
        if(children.length){
            return children
        }
        return null
    }

    const nodes = props.functions.map(userFunction => {
        return {
            value: userFunction.name,
            label: userFunction.description,
            children: renderCheckboxUserChildren(userFunction)
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