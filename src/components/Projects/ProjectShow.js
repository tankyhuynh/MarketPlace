import './ProjectShow.css'

import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { 
  fetchProjectDetail_Commercial,
  fetchProjectDetail_Researching

} from '../../actions/projectDetail'

// import TemplateDefaults from '../Template/ProjectShow/Default';
import Template1 from '../Template/ProjectShow/Template1';

const TYPE_COMMERCIAL = 'CP';
const TYPE_RESEARCHING = 'RP';

const ProjectShow = (props) => {

  // const [projectDetail, setProjectDetail] = useState(null)

    useEffect(() => {
        // console.log('props.match.params.id', props.match.params.id);
        // console.log('props.project', props.project);
        // props.fetchProject(props.match.params.id);

        if(props.match.params.type === TYPE_COMMERCIAL){
            props.fetchProjectDetail_Commercial(props.match.params.id)
            .then(response => {
                console.log('props.fetchProjectDetail_Commercial: ', response)
                // setProjectDetail(response)
            });
        }
        if(props.match.params.type === TYPE_RESEARCHING){
            props.fetchProjectDetail_Researching(props.match.params.id)
            .then(response => {
                console.log('props.fetchProjectDetail_Researching: ', response)
                // setProjectDetail(response)
            });
        }
    // eslint-disable-next-line
    }, [])

    return (
        //  <TemplateDefaults project={this.props.project} />
          props.project
           ? (
              <>
                <div className="flex flex-col gap-2">
                <div className="">
                    <Template1 project={props.project} />
                </div>
                
                </div>
                {/* <section className="bg-white">
                      <Footer />
                </section> */}
              </>
           )
           : null
    );
}

const mapStateToProps = (state, ownProps) => {
  return { project: state.projectsDetail[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { 
      fetchProjectDetail_Commercial,
      fetchProjectDetail_Researching
  }
)(ProjectShow);
