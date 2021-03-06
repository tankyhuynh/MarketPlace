import './SignUp.css'

import React from 'react'
import {connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import validator from 'validator' 
import { withAlert } from 'react-alert'
import { withRouter  } from 'react-router-dom'

import { signupNormalUser } from '../../../actions/auth'

// import Input from '@material-tailwind/react/Input'
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


class SignUp extends React.Component {
    
    state = {
        getNews: true
    }

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

    handleChange = (event) => {
        console.log('handleChange getNews: ', event.target.checked)
        this.setState({
          getNews: event.target.checked,
        });
      };

    renderCheckbox = ({ input, type, label, meta }) => {
        // const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div>
                <FormControlLabel
                    label={label}
                    control={
                        <Checkbox 
                            {...input} 
                            checked={this.state.getNews}
                            size="small" 
                            onClick={e => this.handleChange(e)}
                        />
                    }
                />
                {this.renderError(meta)}
            </div>
        );  
    }

    onSubmit = (formValues) => {
        console.log('Sign up');
        console.log('Sign up domainId', this.state.domainId);
        
        const updateFormValues = { ...formValues, domainId: this.state.domainId }
        console.log('Sign up formValues', updateFormValues);
        console.log('Sign up this.props.history', this.props.history);
        this.props.signupNormalUser(updateFormValues, this.props.history)
            .then(response => {
                this.props.alert.show('????ng k?? th??nh c??ng')  
            })
            .catch(error => {
                this.props.alert.error('????ng k?? th???t b???i, vui l??ng ki???m tra l???i th??ng tin nh???p !!!')  
                console.log('error: ', error)
            });
    }

    render() {
        return (
            <div className="flex justify-center min-h-screen">
                <div className="flex flex-col items-center justify-center w-full px-4 font-black bg-white sm:w-1/2 sm:px-6 lg:px-8">
                    <div className="mb-4 text-2xl font-bold">
                        Ch??o m???ng ?????n 
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
                                ????ng k??
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
                                    label="H??? t??n" 
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
                                    label="S??? ??i???n tho???i" 
                                    type="tel"
                                />
                                <Field 
                                    name="address" 
                                    component={this.renderInput} 
                                    label="?????a ch???" 
                                    type="text"
                                />

                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <Field 
                                            name="gender" 
                                            component="input" 
                                            type="radio" 
                                            value={true} 
                                            normalize={value => value === 'true'}  
                                        /> 
                                            Nam
                                        </label>
                                    <label className="flex items-center gap-2">
                                        <Field 
                                            name="gender" 
                                            component="input" 
                                            type="radio" 
                                            value={false} 
                                            normalize={value => value === 'true'}  
                                        /> 
                                            N???
                                        </label>
                                </div>

                                <Field 
                                    name="username" 
                                    component={this.renderInput} 
                                    label="T??n ????ng nh???p" 
                                    type="text"
                                />
                                <Field 
                                    name="password" 
                                    component={this.renderInput} 
                                    label="M???t kh???u" 
                                    type="password"
                                />
                                <Field 
                                    name="repassword" 
                                    component={this.renderInput} 
                                    label="Nh???p l???i m???t kh???u" 
                                    type="password"
                                />

                                <Field 
                                    name="getNews" 
                                    component={this.renderCheckbox} 
                                    label="Nh???n th??ng b??o" 
                                    type="checkbox"
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
                                <Link to="/" className="font-bold auth--btn btn-cancel hover:bg-red-700">
                                        H???y
                                </Link>
                                <button className="text-white auth--btn btn-signin hover:bg-green-700">
                                    <button type="submit" className="font-bold">
                                        ????ng k??
                                    </button>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-col w-full max-w-lg gap-2 p-2 mt-6 space-y-0 text-lg text-center border-2">
                        <div>
                            B???n ???? c?? t??i kho???n CTU Market Place
                        </div>
                        <div className="">
                            <Link to="/auth/signin" className="auth--link">????ng nh???p</Link>
                        </div>
                        <div className="">
                            <Link href="#" className="auth--link">????ng nh???p v???i t??i kho???n CTU</Link>
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
        errors.fullName = 'H??? t??n kh??ng ???????c ????? tr???ng'
    }
    if(formValues.email ? validator.isEmpty(formValues.email) : true){
        errors.email = 'Email kh??ng ???????c ????? tr???ng'
    }
    if (formValues.email ? !validator.isEmail(formValues.email) : false) {
        errors.email = 'Email kh??ng h???p l???'
    }
    if(formValues.phoneNumber ? validator.isEmpty(formValues.phoneNumber) : true){
        errors.phoneNumber = 'S??? ??i???n tho???i kh??ng ???????c ????? tr???ng'
    }
    if (formValues.phoneNumber ? !validator.isMobilePhone(formValues.phoneNumber) : false) {
        errors.phoneNumber = 'S??? ??i???n tho???i kh??ng h???p l???'
    } 
    if (!formValues.address) {
        errors.address = '?????a ch??? kh??ng ???????c ????? tr???ng'
    }
    if (!formValues.username) {
        errors.username = 'T??n ????ng nh???p kh??ng ???????c ????? tr???ng'
    }
    if (!formValues.password) {
        errors.password = 'M???t kh???u kh??ng ???????c ????? tr???ng'
    }
    if (!formValues.repassword) {
        errors.repassword = 'Vui l??ng nh???p l???i m???t kh???u'
    }
    if (formValues.password && formValues.repassword) {
        if(formValues.password !== formValues.repassword){
            errors.repassword = 'M???t kh???u nh???p l???i ch??a ????ng'
        }
    }

    return errors;
}


const formWrapped = reduxForm({
    form: 'signUpForm',
    validate: validate
})(withAlert()(SignUp));

export default withRouter(
    connect
    (
        null, 
        { 
            signupNormalUser 
        }
    )
    (formWrapped)
);