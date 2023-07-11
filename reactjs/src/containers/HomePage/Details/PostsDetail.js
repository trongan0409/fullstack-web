import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../HomeHeader';
import './PostsDetail.scss'
import HomeFooter from '../HomeFooter';
import * as actions from '../../../store/actions';
import PostsRecommend from './PostsRecommend';
import { withRouter, useHistory } from 'react-router';

class PostsDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailPosts: '',
        }
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.props.getDetailPosts(this.props.match.params.id);
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detailPosts !== this.props.detailPosts) {
            this.setState({
                detailPosts: this.props.detailPosts
            })
        }
    }

    render() {

        let { detailPosts } = this.state;
        let imageBase64 = '';
        if (detailPosts.imageLink) {
            imageBase64 = new Buffer(detailPosts.imageLink, 'base64').toString('binary');
        }

        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='posts-detail-container'>
                    <div className='posts-name'>{detailPosts.title}</div>
                    <div className='posts-image'>
                        <div className='image'>
                            <div className='img' style={{ backgroundImage: `url(${imageBase64})` }}></div>
                        </div>
                    </div>
                    <div className='post-content'>
                        <div dangerouslySetInnerHTML={{ __html: detailPosts.contentHTML }}></div>
                    </div>
                </div>
                <PostsRecommend id={this.props.match.params.id} />
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        detailPosts: state.posts.detailPosts,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailPosts: (id) => dispatch(actions.getDetailPostsStart(id)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsDetail));
