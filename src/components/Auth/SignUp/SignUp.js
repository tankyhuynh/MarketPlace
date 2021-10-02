import './SignUp.css'

import React from 'react'
import {connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import validator from 'validator' 

import { signup } from '../../../actions/auth'

// import Input from '@material-tailwind/react/Input'
import TextField from '@mui/material/TextField';


class SignUp extends React.Component {

    componentDidMount() {
        console.log('props: ', this.props)
    }

    renderError({ error, touched }){
        if (touched && error) {
            return (
                <div className="text-red-500">{error}</div>
            )
        }
    }

    renderInput = ({ input, type, label, meta }) => {
        // const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div>
                {/* <Input
                    { ...input }
                    type={type}
                    color="lightBlue"
                    size="regular"
                    outline={false}
                    placeholder={label}
                /> */}
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
        console.log('Sign up');
        this.props.signup(formValues, this.props.history);
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
                                <Field 
                                    name="fullName" 
                                    component={this.renderInput} 
                                    label="Họ tên" 
                                    type="text"
                                />
                                <Field 
                                    name="email" 
                                    component={this.renderInput} 
                                    label="Email" 
                                    type="email"
                                />
                                <Field 
                                    name="phoneNumber" 
                                    component={this.renderInput} 
                                    label="Số điện thoại" 
                                    type="number"
                                />
                                <Field 
                                    name="address" 
                                    component={this.renderInput} 
                                    label="Địa chỉ" 
                                    type="text"
                                />

                                <div className="flex gap-4">
                                    <label>
                                        <Field 
                                            name="gender" 
                                            component="input" 
                                            type="radio" 
                                            value={true} 
                                            normalize={value => value === 'true'}  
                                        /> 
                                            Nam
                                        </label>
                                    <label>
                                        <Field 
                                            name="gender" 
                                            component="input" 
                                            type="radio" 
                                            value={false} 
                                            normalize={value => value === 'true'}  
                                        /> 
                                            Nữ
                                        </label>
                                </div>
                                
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
                                <Field 
                                    name="repassword" 
                                    component={this.renderInput} 
                                    label="Nhập lại mật khẩu" 
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
                                <button className="text-white auth--btn btn-signin hover:bg-green-700">
                                    <button type="submit" className="font-bold">
                                        Đăng ký
                                    </button>
                                </button>
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

    if (!formValues.fullName) {
        errors.fullName = 'Họ tên không được để trống'
    }
    if(formValues.email ? validator.isEmpty(formValues.email) : true){
        errors.email = 'Email không được để trống'
    }
    if (formValues.email ? !validator.isEmail(formValues.email) : false) {
        errors.email = 'Email không hợp lệ'
    }
    if(formValues.phoneNumber ? validator.isEmpty(formValues.phoneNumber) : true){
        errors.phoneNumber = 'Số điện thoại không được để trống'
    }
    if (formValues.phoneNumber ? !validator.isMobilePhone(formValues.phoneNumber) : false) {
        errors.phoneNumber = 'Số điện thoại không được để trống'
    } 
    if (!formValues.address) {
        errors.address = 'Địa chỉ không được để trống'
    }
    if (!formValues.username) {
        errors.username = 'Tên đăng nhập không được để trống'
    }
    if (!formValues.password) {
        errors.password = 'Mật khẩu không được để trống'
    }
    if (!formValues.repassword) {
        errors.repassword = 'Vui lòng nhập lại mật khẩu'
    }
    if (formValues.password && formValues.repassword) {
        if(formValues.password !== formValues.repassword){
            errors.repassword = 'Mật khẩu nhập lại chưa đúng'
        }
    }

    return errors;
}


const formWrapped = reduxForm({
    form: 'signUpForm',
    validate: validate
})(SignUp);

export default connect(null, { signup })(formWrapped);