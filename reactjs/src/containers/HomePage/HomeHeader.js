import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { languages } from "../../utils";
import { withRouter } from 'react-router';
import { changeLanguageApp } from '../../store/actions/appActions';
import { processLogout } from '../../store/actions';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: ''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
            this.setState({
                isLoggedIn: this.props.isLoggedIn
            })
        }
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };

    handleBackToHomePage = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    };

    handleViewAboutPage = () => {
        if (this.props.history) {
            this.props.history.push(`/posts-detail/${39}`)
        }
    }

    handleViewDesignAquarium = () => {
        if (this.props.history) {
            this.props.history.push(`/posts-detail/${40}`)
        }
    }

    handleLogin = () => {
        if (this.props.history) {
            if (this.state.isLoggedIn === false) {
                this.props.history.push(`/login`)
            } else {
                this.props.processLogout();
                this.props.history.push(`/login`)
            }
        }
    }

    render() {
        let language = this.props.language;
        let { isLoggedIn } = this.state;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className='header-bars'><i className='fas fa-bars'></i></div>
                            <div className='header-logo' onClick={() => this.handleBackToHomePage()}>
                                <div className='logo'></div>
                                <div className='name-logo'><b>BeyAquatic</b></div>
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-center-content' onClick={() => this.handleBackToHomePage()}><b><FormattedMessage id={'homeheader.homepage'} /></b></div>
                            <div className='child-center-content'><b onClick={() => this.handleViewAboutPage()}><FormattedMessage id={'homeheader.introduction'} /></b></div>
                            <div className='child-center-content'><b onClick={() => this.handleViewDesignAquarium()}><FormattedMessage id={'homeheader.design'} /></b></div>
                            <div className='child-center-content'><b><FormattedMessage id={'homeheader.category'} /></b></div>
                            <div className='child-center-content'><b><FormattedMessage id={'homeheader.shareandnew'} /></b></div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className='fas fa-question-circle'></i><FormattedMessage id={'homeheader.support'} /></div>
                            <div className='language'>
                                <div className={language === languages.VI ? 'vi active' : 'vi'}><span onClick={() => this.changeLanguage(languages.VI)}>VI</span></div>
                                <div className={language === languages.EN ? 'en active' : 'en'}><span onClick={() => this.changeLanguage(languages.EN)}>EN</span></div>
                            </div>
                            <div className='login' onClick={() => this.handleLogin()}>
                                {isLoggedIn && isLoggedIn === true ? <FormattedMessage id={'homeheader.logout'} /> : <FormattedMessage id={'homeheader.login'} />}
                            </div>
                        </div>
                    </div>
                    {this.props.isShowBanner === true &&
                        <div className='home-header-banner'>
                            <div className='title1'><FormattedMessage id={'homeheader.title1'} /></div>
                            <div className='title2'><b><FormattedMessage id={'homeheader.title2'} /></b></div>
                            <div className='search'>
                                <i className='fas fa-search'></i>
                                <input type='text' placeholder='Tìm kiếm thông tin ...' />
                            </div>
                            <div className='download-app'>
                                <div className='google-play'>
                                </div>
                                <div className='app-store'>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        processLogout: () => dispatch(processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
