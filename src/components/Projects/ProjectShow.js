import './ProjectShow.css'

import React from 'react';

import { connect } from 'react-redux';
import { fetchProject } from '../../actions/project'

// import TemplateDefaults from '../Template/ProjectShow/Default';
import Template1 from '../Template/ProjectShow/Template1';

class ProjectShow extends React.Component {

    componentDidMount() {
        console.log('this.props.match.params.id', this.props.match.params.id);
        this.props.fetchProject(this.props.match.params.id);
    }

    render() {
        if (!this.props.project) {
            return <div>Loading...</div>;
        }

        // const renderPTCGiao = (ptcgs) => {
        //     if(ptcgs){
        //         return ptcgs.map(ptcg => {
        //             return <div>- {ptcg}</div>
        //         })
        //     }
        // }
        // const renderPVTMHoa = (pvtmhs) => {
        //     if(pvtmhs){
        //         return pvtmhs.map(pvtmh => {
        //             return <div>- {pvtmh}</div>
        //         })
        //     }
        // }
        // const renderUuDiem = (uuDiems) => {
        //     if(uuDiems){
        //         return uuDiems.map(uuDiem => {
        //             return <div>- {uuDiem}</div>
        //         })
        //     }
        // }
        
    
        // const renderAuthors = (authors) => {
        //     if(authors){
        //         return authors.map((author, index) => {
        //             console.log('author index: ', index, 'length: ', authors.length);
        //             if(index < authors.length -1){
        //                     return <span>{`${author}, `}</span>;    
        //             }
        //             return <span>{`${author}`}</span>;    
        //         })
        //     }
        // };
    
        // const renderTreeItem  = (items) => {
        //     return items.map(item => {
        //         return (
        //             <a href={`#${item.name}`} >
        //                 <TreeItem nodeId={item.nodeId} label={item.name} />
        //             </a>
        //         );
        //     })
        // };

        
    return (
        //  <TemplateDefaults project={this.props.project} />
        <Template1 project={this.props.project} />
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
