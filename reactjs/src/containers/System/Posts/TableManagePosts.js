import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagePosts.scss';
import * as actions from '../../../store/actions';

class TableManagePosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allPosts: []
        };
    };

    componentDidMount() {
        this.props.getAllPosts();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allPosts !== this.props.allPosts) {
            this.setState({ allPosts: this.props.allPosts })
        }
    };

    handleDeletePosts = (posts) => {
        this.props.deletePosts(posts.id);
    }

    handleEditPosts = (posts) => {
        this.props.handleEditPostsParent(posts);
    };

    render() {
        let { allPosts } = this.state;

        return (
            <div className='posts-container mx-0'>
                <table id='TableManagePosts'>
                    <tr>
                        <th>Tiêu đề bài viết</th>
                        <th>Loại</th>
                        <th>Ngày tạo mới</th>
                        <th>Ngày cập nhật</th>
                        <th>Action</th>
                    </tr>
                    {allPosts && allPosts.length > 0 &&
                        allPosts.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.title}</td>
                                    <td>{item.typePosts}</td>
                                    <td>{item.createAt}</td>
                                    <td>{item.UpdateAt}</td>
                                    <td>
                                        <button
                                            type='button'
                                            className='btn-edit'
                                            onClick={() => this.handleEditPosts(item)}
                                        ><i className='fas fa-pencil-alt'></i></button>
                                        <button
                                            onClick={() => { this.handleDeletePosts(item) }}
                                            type='button'
                                            className='btn-delete'
                                        ><i className='fas fa-trash'></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        );

    }

}

const mapStateToProps = state => {
    return {
        allPosts: state.posts.allPosts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllPosts: () => dispatch(actions.getAllPostsStart()),
        deletePosts: (id) => dispatch(actions.deletePostsStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagePosts);
