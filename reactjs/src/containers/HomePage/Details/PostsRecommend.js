import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router';
import './PostsRecommend.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class PostsRecommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPosts: [],
            detailPosts: ''
        }
    }

    componentDidMount() {
        this.props.getAllPosts();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allPosts !== this.state.allPosts) {
            this.setState({
                allPosts: this.props.allPosts
            })
        }
        if (prevProps.detailPosts !== this.state.detailPosts) {
            this.setState({
                detailPosts: this.props.detailPosts
            })
        }
    };

    handleViewDetailPosts = async (posts) => {
        await this.props.getDetailPosts(posts.id);
        if (this.props.history) {
            this.props.history.push(`/posts-detail/${posts.id}`)
        }
    };

    render() {
        let { allPosts } = this.state;
        return (
            <div className='section-share share-new-section'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Các bài viết khác</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-content'>
                        <Slider dots={false} infinite={true} speed={500} slidesToShow={4} slidesToScroll={2}>
                            {allPosts && allPosts.length > 0 &&
                                allPosts.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.imageLink) {
                                        imageBase64 = new Buffer(item.imageLink, 'base64').toString('binary');
                                    }
                                    return (
                                        <div className='section-img' onClick={() => this.handleViewDetailPosts(item)}>
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
        allPosts: state.posts.allPosts,
        detailPosts: state.posts.detailPosts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllPosts: () => dispatch(actions.getAllPostsStart()),
        getDetailPosts: (id) => dispatch(actions.getDetailPostsStart(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsRecommend));
