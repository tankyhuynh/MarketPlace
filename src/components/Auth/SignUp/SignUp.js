import './SignUp.css'

import React from 'react'
import {connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

import { signup } from '../../../actions'

import Input from '@material-tailwind/react/Input'


class SignUp extends React.Component {

    renderError({ error, touched }){
        if (touched && error) {
            return (
                <div className="ui error message">{error}</div>
            )
        }
    }

    renderInput = ({ input, type, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div>
                <Input
                    { ...input }
                    type={type}
                    color="lightBlue"
                    size="regular"
                    outline={false}
                    placeholder={label}
                />
                {this.renderError(meta)}
            </div>
        );  
    }

    onSubmit = (formValues) => {
        this.props.signup(formValues);
    }

    render() {
        return (
            <div className="flex justify-center min-h-screen">
                <div className="flex flex-col items-center justify-center w-full px-4 font-black bg-white sm:w-1/2 sm:px-6 lg:px-8">
                    <div className="mb-4 text-2xl font-bold">
                        Chào mừng đến 
                        <Link 
                            to="/" 
                            className="mx-2 hover:text-red-500"
                        >
                            CTU Market Place
                        </Link>
                    </div>
                    <div className="w-full max-w-lg p-2 space-y-0 border-2 form_border">
                        <div>
                            <h2 className="text-4xl font-bold text-center text-gray-900">
                                Đăng ký
                            </h2>
                        
                        </div>
                        <form 
                            className="px-4 py-0 mt-8 space-y-6" 
                            action="#" 
                            method="POST"
                            onSubmit={this.props.handleSubmit(this.onSubmit)}
                        >
                            {/* <input type="hidden" name="remember" value="true" /> */}
                            <div className="space-y-4">
                                {/* <div>
                                    <Input
                                        name="email"
                                        type="text"
                                        color="lightBlue"
                                        size="regular"
                                        outline={false}
                                        placeholder="Email"
                                    />
                                </div>
                                <div>
                                    <Input
                                        name="password"
                                        type="text"
                                        color="lightBlue"
                                        size="regular"
                                        outline={false}
                                        placeholder="Password"
                                    />
                                </div> */}
                                
                                <Field 
                                    name="fullName" 
                                    component={this.renderInput} 
                                    label="Enter full name" 
                                    type="text"
                                />
                                <Field 
                                    name="email" 
                                    component={this.renderInput} 
                                    label="Enter email" 
                                    type="email"
                                />
                                <Field 
                                    name="phoneNumber" 
                                    component={this.renderInput} 
                                    label="Enter phone number" 
                                    type="number"
                                />
                                <Field 
                                    name="address" 
                                    component={this.renderInput} 
                                    label="Enter address" 
                                    type="text"
                                />

                                <div className="flex gap-4">
                                    <label><Field name="gender" component="input" type="radio" value="male"/> Male</label>
                                    <label><Field name="gender" component="input" type="radio" value="female"/> Female</label>
                                </div>
                                
                                <Field 
                                    name="username" 
                                    component={this.renderInput} 
                                    label="Enter username" 
                                    type="text"
                                />
                                <Field 
                                    name="password" 
                                    component={this.renderInput} 
                                    label="Enter password" 
                                    type="password"
                                />
                                
                            </div>

                            {/* <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                                    <label for="remember-me" className="block ml-2 text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <Link href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div> */}

                            <div className="relative flex justify-center gap-2">
                                <Link to="/" className="auth--btn btn-cancel hover:bg-red-700">
                                    <button type="submit" className="font-bold" >
                                        Hủy
                                    </button>
                                </Link>
                                <Link className="text-white auth--btn btn-signin hover:bg-green-700">
                                    <button type="submit" className="font-bold">
                                        Đăng ký
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-col w-full max-w-lg gap-2 p-2 mt-6 space-y-0 text-lg text-center border-2">
                        <div>
                            Bạn đã có tài khoản CTU Market Place
                        </div>
                        <div className="">
                            <Link to="/auth/signin" className="auth--link">Đăng nhập</Link>
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

    if (!formValues.title) {
        errors.title = 'You must enter a title'
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description'
    }

    return errors;
}

const formWrapped = reduxForm({
    form: 'signUpForm',
    validate: validate
})(SignUp);

export default connect(null, { signup })(formWrapped);