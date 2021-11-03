
import React, { useEffect } from 'react';
import CheckboxTree from 'react-checkbox-tree';

const BasicExample = (props) => {

        useEffect(() => {

        }, [props.nodes]) 

        console.log('BasicExample: ' )

        const { checked, expanded } = props.stateFieldIdList;

        return (
            <>
                <CheckboxTree
                    checked={checked}
                    expanded={expanded}
                    iconsClass="fa5"
                    nodes={props.nodes ? props.nodes : []}
                    onCheck={props.setStateFieldIdListChecked}
                    onExpand={props.setStateFieldIdListExpanded}
                />
                {/* <CheckboxTree
                    checked={checked}
                    expanded={expanded}
                    iconsClass="fa5"
                    nodes={this.props.nodes ? this.props.nodes : []}
                    onCheck={this.props.setStateFieldIdListChecked}
                    onExpand={this.props.setStateFieldIdListExpanded}
                /> */}
            </>
        );
}

export default BasicExample;