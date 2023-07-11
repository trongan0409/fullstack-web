import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "./HomeFooter.scss";

class HomeFooter extends Component {

    render() {

        return (
            <div className='home-footer-container'>
                <div className='home-footer-content-left'>
                    <div className='home-footer-title'>BeyAquatic
                        <div><hr></hr></div>
                    </div>
                    <div className='home-footer-content'>
                        <h5><b>CÔNG TY TNHH MTV ĐỨC TUẤN</b></h5>
                        <h5><b><i className='fas fa-envelope">'></i>Địa chỉ: 91 Phan Bội Châu, Phước Vĩnh, TP Huế</b></h5>
                        <h5><b>Điện thoại: 0932 234 591 - 0702 442 524</b></h5>
                        <h5><b>Email: nguyenductuan030@gmail.com</b></h5>
                    </div>
                </div>
                <div className='home-footer-content-cennter'>
                    <div className='home-footer-title'>Bản đồ
                        <div><hr></hr></div>
                    </div>
                    <div className='home-footer-content'>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.4412956926426!2d107.57799637770917!3d16.453177743758907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a1272651ca5d%3A0x245d225aac9b57a8!2sBey%20aquatic!5e0!3m2!1sen!2s!4v1688578303908!5m2!1sen!2s"
                            title='Địa chỉ công ty'
                            width="100%"
                            height="350"
                            style={{ border: 0 }}
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className='footer-bottom'>DESIGN BY BeyAquatic</div>
                </div>
                <div className='home-footer-content-right'>
                    <div className='home-footer-title'>Fanpage
                        <div><hr></hr></div>
                    </div>
                    <div className="home-footer-content">
                        <iframe
                            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100090687517210&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                            width="100%"
                            height="350"
                            title='link facebook'
                            style={{ border: "none", overflow: "hidden" }}
                            scrolling="no"
                            frameborder="0"
                            allowfullscreen="true"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                    </div>
                </div>
            </div>
        );
    };

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
