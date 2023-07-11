import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import SelfDesign from './Section/SelfDesign';
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShareNews from './Section/ShareNews';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import Product from './Section/Product';

class HomePage extends Component {

    render() {

        let setting = {
            dots: false,
            infiniti: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2
        }

        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <SelfDesign setting={setting} />
                <Product setting={setting} />
                <ShareNews setting={setting} />
                <About />
                <HomeFooter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
