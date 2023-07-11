/* eslint-disable react-hooks/rules-of-hooks */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';
import { useHistory } from 'react-router';
import { userLoginSuccess } from '../../store/actions';
import { withRouter } from 'react-router';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowHidePwd: true,
            message: ''
        }
    }

    handleOnChangeUserName = (event) => {
        this.setState({
            username: event.target.value
        });
    };

    handleOnChangePwd = (event) => {
        this.setState({
            password: event.target.value
        });
    };

    handleLogin = async () => {
        this.setState({
            message: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    message: data.errMessage
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.dataUser)
                console.log('login succeeds!')
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        message: e.response.data.errMessage
                    })
                }
            }

        }
    };

    handleShowHidePwd = () => {
        this.setState({
            isShowHidePwd: !this.state.isShowHidePwd
        });
    };

    handleBackToHomePage = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    };

    render() {


        return (
            <div className='login-background'>
                <div className='login-intro'></div>
                <div className='login-form'>
                    <div className='container'>
                        <div className='login-content row'>
                            <div className='col-12 title' onClick={() => this.handleBackToHomePage()}>Bai Aquatic</div>
                            <div className='col-12 signin-text text-center'>Chào mừng đến với thủy sinh Bai Aquatic</div>
                            <form className='col-12 form'>
                                <div className='form-group'>
                                    <label>Email:</label>
                                    <input type='text' className='form-control' placeholder='Nhập...' value={this.state.username}
                                        onChange={(event) => { this.handleOnChangeUserName(event) }}></input>
                                </div>
                                <div className='form-group'>
                                    <label>Mật Khẩu:</label>
                                    <div className='custom-pwd-input'>
                                        <input type={this.state.isShowHidePwd ? 'password' : 'text'} className='form-control' placeholder='Nhập...' value={this.state.password}
                                            onChange={(event) => { this.handleOnChangePwd(event) }}></input>
                                        <span onClick={() => { this.handleShowHidePwd() }}><i className={this.state.isShowHidePwd ? 'far fa-eye-slash' : 'far fa-eye'}></i></span>
                                    </div>
                                </div>
                                <div className='form-check'>
                                    <input type='checkbox' className='form-check-input'></input>
                                    <label className='form-check-label'>Nhớ mật khẩu</label>
                                    <span className='forgot-pwd'>Quên mật khẩu?</span>
                                </div>
                                <div className='check-message'>{this.state.message}</div>
                                <div className='signin-btn'>
                                    <button type='button' className='btn btn-success signin' onClick={() => this.handleLogin()}>Đăng nhập</button>
                                </div>
                                <div className='signin-other row'>
                                    <div className='col-5 line-1'><hr></hr></div>
                                    <div className='col-2 text-center text-other'>Hoặc</div>
                                    <div className='col-5 line-2'><hr></hr></div>
                                </div>
                                <div className='signin-google'>
                                    <i className='fab fa-google-plus-g google-icon'></i>
                                    <p className='google-text'>Đăng nhập với Google</p>
                                </div>
                                <div className='signin-fb'>
                                    <i className='fab fa-facebook-f fb-icon'></i>
                                    <p className='fb-text'>Đăng nhập với Facebook</p>
                                </div>
                                <div className='create-acc'>
                                    <label>Bạn chưa có tài khoản?</label>
                                    <span className='register'>Đăng ký ngay</span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );

    };
};

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
