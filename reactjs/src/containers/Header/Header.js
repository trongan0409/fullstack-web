import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { languages } from "../../utils";
//import { changeLanguageApp } from '../../store/actions/appActions';

class Header extends Component {

    handleOnChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };

    render() {
        const { processLogout, language, userInfo } = this.props;
        //let language = this.props.language;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div
                    className='languages'>
                    <span className='welcome'>
                        <FormattedMessage id="system.user-redux.welcome" />, {userInfo && userInfo.fullName ? userInfo.fullName : ''}!
                    </span>
                    <span
                        className={language === languages.VI ? 'language-vi active' : 'language-vi'}
                        onClick={() => this.handleOnChangeLanguage(languages.VI)}

                    >VI</span>
                    <span

                        className={language === languages.EN ? 'language-en active' : 'language-en'}
                        onClick={() => this.handleOnChangeLanguage(languages.EN)}

                    >EN</span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Đăng xuất'>
                        <span>Đăng xuất</span>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
