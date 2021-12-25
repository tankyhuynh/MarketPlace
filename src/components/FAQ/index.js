import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchFaqs } from '../../actions/faq'

import Accordion from '../Accordion/Accordion'

const FAQ = (props) => {

    useEffect(() => {
        props.fetchFaqs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderList = () => {
        if(props.faqs && props.faqs.length){
            return (
                <>
                    <Accordion data={props.faqs}/>
                </>
            )
        }
        return (
            <div>
                Không có FAQ
            </div>
        )
    }

    return renderList()
    
}

const mapStateToProps = (state) => {
    return { 
        faqs:  Object.values(state.faqs),
    };
}

export default connect(
    mapStateToProps, 
    { 
        fetchFaqs
    }
)(FAQ);