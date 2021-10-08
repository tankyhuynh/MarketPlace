/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { connect } from 'react-redux';

import { fetchDomains } from '../../../actions/domain'

// import ManageUser from '../../UserFunction'
import CheckboxTree from './CheckboxTree'

const AdminDomains = (props) => {

    useEffect(() => {
        props.fetchDomains();
    }, [])

    const renderCheckboxDomainChildren = (domain) => {
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

    const nodes = props.domains.map(domain => {
        console.log('AdminDomains domain: ', domain)
        return {
            value: domain.name,
            label: domain.name,
            children: renderCheckboxDomainChildren(domain)
        }
    });


    return (
        <CheckboxTree nodes={nodes} />
    )
}

const mapStateToProps = (state) => {
    return { 
        domains:  Object.values(state.domains),
    };
}

export default connect(mapStateToProps, { fetchDomains })(AdminDomains);