import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions/stream';

class StreamList extends React.Component {
    componentDidMount(){
        this.props.fetchStreams();
    }

    renderAdmin(stream){
        if (stream?.userId === this.props.currentUserId) {
            return (
                <div className="left floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">EDIT</Link>
                    <Link 
                        to={`/streams/delete/${stream.id}`}
                        className="ui button negative"
                    >
                        DELETE
                    </Link>
                </div>
            );
        }
    }

    renderCreate(){
        // if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="w-32 p-4 bg-green-600 rounded-md">
                        Create Stream
                    </Link>
                </div>
            );
        // }
    }

    renderList(){
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    <i className="large middle aligned icon camera"></i>
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">
                            {stream.title}
                        </Link>
                        <div className="description">{stream.description}</div>
                    </div>
                    {this.renderAdmin(stream)}
                </div>
            );
        })
    }
    
    render() {
        return (
            <div>
                <h1>Streams</h1>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        )
    };
}

const mapStateToProps = (state) => {
    return { 
        streams:  Object.values(state.streams),
        currentUserProfile: state.auth.userProfile,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);