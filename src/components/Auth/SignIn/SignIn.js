import './SignIn.css'

import React from 'react'
import {connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import TextField from '@mui/material/TextField';
import { withAlert } from 'react-alert'

import { login } from '../../../actions/auth';
import { loaded } from '../../../actions/load';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);
    }

    renderError({ error, touched }){
        if (touched && error) {
            return (
                <div className="text-red-500">{error}</div>
            )
        }
    }

    renderInput = ({ input, type, label, meta }) => {
        return (
            <div>
                <TextField 
                    {...input}
                    type={type}
                    id={`standard-${label}`} 
                    label={label}
                    variant="standard" 
                    className="w-full"
                />
                {this.renderError(meta)}
            </div>
        );  
    }

    onSubmit = (formValues) => {
        this.props.login(formValues, this.props.history)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                this.props.alert.error('Tên đăng nhập hoặc mật khẩu không chính xác !!!')
                this.props.loaded();
                this.props.reset();
                this.props.history.push('/auth/signin');
            });
    }

    render() {
        return (
            <div className="flex justify-center min-h-screen">
                <div className="flex flex-col items-center justify-center w-full px-4 font-black bg-white sm:w-1/2 sm:px-6 lg:px-8">
                    <div className="mb-6 text-2xl font-bold text-center">
                        Chào mừng đến 
                        <Link 
                            to="/" 
                            className="mx-2 hover:text-red-500"
                        >
                            CTU Market Place
                        </Link>
                    </div>
                    <div className="w-full max-w-lg p-6 space-y-0 border-2 form_border">
                        <div>
                            <h2 className="text-2xl font-bold text-center text-gray-900 sm:text-4xl ">
                                Đăng nhập
                            </h2>
                        
                        </div>
                        <form 
                            className="px-4 py-0 mt-8 space-y-6" 
                            action="#" 
                            method="POST"
                            onSubmit={this.props.handleSubmit(this.onSubmit)}
                        >
                            <input type="hidden" name="remember" value="true" />
                            <div className="space-y-4">
                                <Field 
                                    name="username" 
                                    component={this.renderInput} 
                                    label="Tên đăng nhập" 
                                    type="text"
                                    />
                                <Field 
                                    name="password" 
                                    component={this.renderInput} 
                                    label="Mật khẩu" 
                                    type="password"
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                                    <label for="remember-me" className="block ml-2 text-sm text-gray-900">
                                        Ghi nhớ tôi
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <Link href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Quên mật khẩu?
                                    </Link>
                                </div>
                            </div>

                            <div className="relative flex justify-center gap-2">
                                <section className="auth--btn btn-cancel hover:bg-red-700">
                                    <Link to="/" type="submit" className="font-bold" >
                                        Hủy
                                    </Link>
                                </section>
                                <section className="text-white auth--btn btn-signin hover:bg-green-700">
                                    <button type="submit" className="font-bold">
                                        Đăng nhập
                                    </button>
                                </section>
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-col w-full max-w-lg gap-2 p-2 mt-6 space-y-0 text-lg text-center border-2">
                        <div>
                            Bạn chưa có tài khoản CTU Market Place
                        </div>
                        <div className="">
                            <Link to="/auth/signup" className="auth--link">Tạo tài khoản</Link>
                        </div>
                        <div className="">
                            <Link href="#" className="auth--link">Đăng nhập với tài khoản CTU</Link>
                        </div>
                    </div>
                </div>
            </div>
        ); 
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.username) {
        errors.username = 'Tên đăng nhập không được để trống'
    }
    if (!formValues.password) {
        errors.password = 'Mật khẩu không được để trống'
    }

    return errors;
}

const mapStateToProps = (state) => {
    return { 
        isSignedIn: state.auth.isSignedIn,
    };
}

const formWrapped = reduxForm({
    form: 'loginForm',
    validate: validate
})(withAlert()(SignIn));

export default connect(mapStateToProps, { login, loaded })(formWrapped);