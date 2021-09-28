import React from 'react';
import CheckboxTree from 'react-checkbox-tree';

class BasicExample extends React.Component {
    // state = {
    //     checked: [],
    //     expanded: [],
    // };

    

    // constructor(props) {
    //     super(props);

    //     this.onCheck = this.onCheck.bind(this);
    //     this.onExpand = this.onExpand.bind(this);
    // }

    // onCheck(checked) {
    //     console.log('onCheck', checked);
    //     this.setState({ checked: checked });
    // }

    // onExpand(expanded) {
    //     console.log('expanded', expanded)
    //     this.setState({ expanded: expanded });
    // }

    render() {
        const { checked, expanded } = this.props.stateFieldIdList;
        return (
            <>
                <CheckboxTree
                    checked={checked}
                    expanded={expanded}
                    iconsClass="fa5"
                    nodes={this.props.nodes ? this.props.nodes : []}
                    onCheck={this.props.setStateFieldIdListChecked}
                    onExpand={this.props.setStateFieldIdListExpanded}
                    // onCheck={this.onCheck}
                    // onExpand={this.onExpand}
                />
                {/* { this.state.checked.length } items checked */}
            </>
        );
    }
}

export default BasicExample;