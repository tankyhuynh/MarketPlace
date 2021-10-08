/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { connect } from 'react-redux';
import { fetchFunctions } from '../../../actions/function'
import CheckboxTree from './CheckboxTree'

const AdminDomains = (props) => {

    useEffect(() => {
        props.fetchFunctions();
    }, [])

    const renderCheckboxFunctionChildren = (func) => {
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

    const nodes = props.functions.map(func => {
        console.log('AdminDomains function: ', func)
        return {
            value: func.name,
            label: func.name,
            children: renderCheckboxFunctionChildren(func)
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

export default connect(mapStateToProps, { fetchFunctions })(AdminDomains);