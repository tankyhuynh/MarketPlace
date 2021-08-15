

import React from 'react';
import { connect } from 'react-redux';
import { fetchProject } from '../../../actions';


class ProjectShow extends React.Component {
  componentDidMount() {
    this.props.fetchProject(this.props.match.params.id);
  }


  render() {
    if (!this.props.project) {
      return <div>Loading...</div>;
    }
    
    const { ten, content } = this.props.project;

    return (
      <>
          <div className="mx-4 mt-4 md:mx-0">
              <div className="text-xl font-bold text-center">
                  { ten }
              </div>
              <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { project: state.projects[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchProject }
)(ProjectShow);
