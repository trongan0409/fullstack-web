import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router';

class ShareNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setting: this.props.setting,
            posts: []
        }
    }

    componentDidMount() {
        this.props.getAllPosts();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.posts !== this.props.posts) {
            this.setState({
                posts: this.props.posts,
            })
        }
    };

    handleViewPostsDetail(posts) {
        if (this.props.history) {
            this.props.history.push(`/posts-detail/${posts.id}`)
        }
    };

    render() {
        let { posts } = this.state;
        let { setting } = this.state;
        return (
            <div className='section-share share-new-section'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Kiến thức chia sẻ & Tin tức</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-content'>
                        <Slider {...setting}>
                            {posts && posts.length > 0 &&
                                posts.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.imageLink) {
                                        imageBase64 = new Buffer(item.imageLink, 'base64').toString('binary');
                                    }
                                    return (
                                        <div className='section-img' onClick={() => this.handleViewPostsDetail(item)}>
                                            <div className='img share-new-section' style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                            <div className='img-title'>{item.title}</div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
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
        posts: state.posts.allPosts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllPosts: () => dispatch(actions.getAllPostsStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShareNews));
