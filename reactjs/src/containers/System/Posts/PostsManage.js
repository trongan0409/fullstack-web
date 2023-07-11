import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages, crudActions, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import LightBox from 'react-image-lightbox';
import './PostsManage.scss';
import 'react-image-lightbox/style.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import TableManagePosts from './TableManagePosts';

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ProductManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postsTypeArr: [],
            contentMarkdown: '',
            contentHTML: '',
            typePosts: '',
            title: '',
            previewImageURL: '',
            image: '',
            isOpen: false,
            action: '',
            id: ''
        }
    }

    async componentDidMount() {
        this.props.getPostsType();
    };

    componentDidUpdate(prevProps, prevState, spapshot) {
        if (prevProps.typePosts !== this.props.typePosts) {
            let postsTypeArr = this.props.typePosts;
            this.setState({
                postsTypeArr: postsTypeArr,
                typePosts: postsTypeArr && postsTypeArr.length > 0 ? postsTypeArr[0].keyMap : ''
            })
        }
        if (prevProps.allPosts !== this.props.allPosts) {
            let postsTypeArr = this.props.typePosts;
            this.setState({
                title: '',
                contentMarkdown: '',
                previewImageURL: '',
                image: '',
                typePosts: postsTypeArr && postsTypeArr.length > 0 ? postsTypeArr[0].keyMap : ''
            })
        }
    };

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({ ...copyState });
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    };

    handleClearForm = () => {
        let postsTypeArr = this.props.typePosts;
        this.setState({
            typePosts: postsTypeArr && postsTypeArr.length > 0 ? postsTypeArr[0].keyMap : '',
            title: '',
            contentMarkdown: '',
            previewImageURL: '',
            image: '',
            action: ''
        })
    };

    handleOnChangeImage = async (event) => {
        let fileImage = event.target.files;
        let file = fileImage[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log('check base64 image: ', base64);
            let imageObjectUrl = URL.createObjectURL(file);
            this.setState({
                previewImageURL: imageObjectUrl,
                image: base64
            })
        }
    };

    isOpenImage = () => {
        if (!this.state.previewImageURL) return;

        this.setState({ isOpen: true });
    };

    handleCreatePosts = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        this.props.createPosts({
            contentMarkdown: this.state.contentMarkdown,
            contentHTML: this.state.contentHTML,
            title: this.state.title,
            typePosts: this.state.typePosts,
            image: this.state.image,
        })
    };

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['title', 'previewImageURL', 'contentHTML', 'contentMarkdown'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    };

    handleEditPostsParent = async (posts) => {
        console.log('posts: ', posts);
        let imageBase64 = '';
        if (posts.imageLink) {
            imageBase64 = new Buffer(posts.imageLink, 'base64').toString('binary');
        }
        this.setState({
            id: posts.id,
            contentMarkdown: posts.contentMarkdown,
            contentHTML: posts.contentHTML,
            previewImageURL: imageBase64,
            image: '',
            typePosts: posts.typePosts,
            title: posts.title,
            action: crudActions.EDIT
        })
    };

    handleUpdatePosts = () => {
        let { image } = this.state;
        if (!image) {
            this.props.editPosts({
                id: this.state.id,
                typePosts: this.state.typePosts,
                title: this.state.title,
                contentHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown,
            })
        } else {
            this.props.editPosts({
                id: this.state.id,
                typePosts: this.state.typePosts,
                title: this.state.title,
                contentHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown,
                image: this.state.image,
            })
        }
    }


    render() {
        let { typePosts, title, postsTypeArr } = this.state;

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-12 title'>QUẢN LÝ BÀI VIẾT</div>
                    <div className='col-12 my-3'>Tạo bài viết mới</div>
                    <div className='col-2'>
                        <label>Loại bài viết</label>
                        <select
                            className='form-control'
                            value={typePosts}
                            onChange={(event) => this.handleOnChangeInput(event, 'typePosts')}
                        >
                            {postsTypeArr && postsTypeArr.length > 0 &&
                                postsTypeArr.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='col-7'>
                        <label>Tiêu đề bài viết</label>
                        <input
                            className='form-control'
                            type='text'
                            value={title}
                            onChange={(event) => this.handleOnChangeInput(event, 'title')}
                        ></input>
                    </div>
                    <div className='col-3'>
                        <label>Hình ảnh</label>
                        <div className='preview-img-container'>
                            <input id='previewImg' type='file' hidden onChange={(event) => this.handleOnChangeImage(event)} />
                            <label className='label-upload' htmlFor="previewImg">Tải ảnh <i className='fas fa-upload'></i></label>
                            <div
                                className='preview-image'
                                style={{ backgroundImage: `url(${this.state.previewImageURL})` }}
                                onClick={() => this.isOpenImage()}
                            ></div>
                        </div>
                    </div>
                    {this.state.isOpen === true &&
                        <LightBox
                            mainSrc={this.state.previewImageURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
                    <div className='col-12'>
                        <label>Nội dung bài viết</label>
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>
                    <div className='col-4 pt-3'>
                        <button
                            className='btn btn-primary'
                            onClick={this.state.action === crudActions.EDIT ? () => this.handleUpdatePosts() : () => this.handleCreatePosts()}
                        >
                            {this.state.action === crudActions.EDIT ?
                                <FormattedMessage id='manage-product.save' />
                                :
                                <FormattedMessage id='manage-product.create' />
                            }
                        </button>
                        <button
                            className='btn btn-secondary ml-3'
                            onClick={this.handleClearForm}
                        >
                            Làm mới
                        </button>
                    </div>
                    <div className='col-12'>
                        <TableManagePosts
                            handleEditPostsParent={this.handleEditPostsParent}
                            action={this.state.action}
                        ></TableManagePosts>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        typePosts: state.posts.types,
        allPosts: state.posts.allPosts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPostsType: () => dispatch(actions.getPostsTypeStart()),
        createPosts: (postsInput) => dispatch(actions.createPostsStart(postsInput)),
        editPosts: (postsInput) => dispatch(actions.editPostsStart(postsInput))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
