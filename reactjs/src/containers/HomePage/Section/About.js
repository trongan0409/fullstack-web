import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {

    render() {

        return (
            <div className='section-share about-section'>
                <div className='section-container'>
                    <div className='section-header'>
                        <div className='title-section'>Giới thiệu về Thủy sinh</div>
                    </div>
                    <div className='section-about-content'>
                        <div className='content-left'>
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/NdtBtmSNC7o"
                                title="Thư viện Thủy Sinh - Các phong cách chơi Thủy Sinh phổ biến"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen>
                            </iframe>
                        </div>
                        <div className='content-right'>
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/sUL7uC2oFZU"
                                title="Thư viện Thủy Sinh - Bố cục trong Thủy Sinh và một số quy tắc cơ bản"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen
                            ></iframe>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
