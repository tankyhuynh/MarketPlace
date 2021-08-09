import React from 'react';

import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class BasicAuth extends React.Component {
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
                <button 
                    className="p-2 bg-red-500 rounded-lg"
                    onClick={this.onSignOutClick}
                >
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        }
        else {
            return (
                <button 
                    className="p-2 bg-green-500 rounded-lg"
                    onClick={this.onSignInClick}
                >
                    <i className="google icon" />
                    Sign in
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

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(BasicAuth);