import React from 'react';

import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '575970420631-0qb9dgpsotjifap43j648dklg4hofc9s.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();

                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId(), this.auth.currentUser.get().getBasicProfile());
        }
        else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton(){
        if (this.props.isSignedIn === null) {
            return null;
        }
        else if (this.props.isSignedIn) {
            return (
                <div className="flex items-center gap-4">
                    <h2>Tran Van A</h2>
                    <button 
                        className="p-2 bg-red-500 rounded-lg"
                        onClick={this.onSignOutClick}
                    >
                        <i className="google icon" />
                        Sign Out
                    </button>
                </div>
            );
        }
        else {
            return (
                <button 
                    className="p-2 bg-green-500 rounded-lg"
                    onClick={this.onSignInClick}
                >
                    <i className="google icon" />
                    Sign in with Google
                </button>
            )
        }
    }

    render(){
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }

};

// const mapStateToProps = (state) => {
//     return { isSignedIn: state.auth.isSignedIn };
// }
const mapStateToProps = (state) => {
    return { 
        currentUserId: state.auth.userId,
        currentUsername: state.auth.username,
        isSignedIn: state.auth.isSignedIn
    };
  }

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);