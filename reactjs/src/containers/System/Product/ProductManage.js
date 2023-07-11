import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
//import './ProductManage.scss';
import { languages, crudActions, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import LightBox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageProduct from './TableManageProduct';
import Select from 'react-select';


class ProductManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allCodes: [],
            types: [],
            statusProduct: [],
            action: '',
            previewImageURL: '',
            id: '',
            nameProduct: '',
            categoryType: '',
            price: '',
            quantity: '',
            slug: '',
            detail: '',
            status: '',
            image: '',
            isOpen: false,
            selectedProduct: null,
        }
    }



    async componentDidMount() {
        this.props.getType();
        this.props.getStatus();
    };

    componentDidUpdate(prevProps, prevState, spapshot) {
        if (prevProps.types !== prevState.types) {
            let arrTypes = this.props.types;
            this.setState({
                types: arrTypes,
                categoryType: arrTypes && arrTypes.length > 0 ? arrTypes[0].keyMap : ''
            })
        }
        if (prevProps.statusProduct !== prevState.statusProduct) {
            let arrStatus = this.props.statusProduct;
            this.setState({
                statusProduct: arrStatus,
                status: arrStatus && arrStatus.length > 0 ? arrStatus[0].keyMap : ''
            })
        }
        if (prevProps.allProducts !== this.props.allProducts) {
            let arrTypes = this.props.types;
            let arrStatus = this.props.statusProduct;
            this.setState({
                nameProduct: '',
                categoryType: arrTypes && arrTypes.length > 0 ? arrTypes[0].keyMap : '',
                price: '',
                quantity: '',
                slug: '',
                detail: '',
                status: arrStatus && arrStatus.length > 0 ? arrStatus[0].keyMap : '',
                image: '',
                previewImageURL: '',
                action: crudActions.CREATE
            })
        }


    };

    isOpenImage = () => {

    };

    handleCreateProduct = () => {
        console.log('check state: ', this.state);
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        this.props.createProduct({
            nameProduct: this.state.nameProduct,
            categoryType: this.state.categoryType,
            price: this.state.price,
            quantity: this.state.quantity,
            slug: this.state.slug,
            detail: this.state.detail,
            status: this.state.status,
            image: this.state.image
        });
    };

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({ ...copyState });
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

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['nameProduct', 'price', 'quantity', 'slug', 'detail', 'previewImageURL'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    };

    handleEditProductParent = (product) => {
        console.log('check product: ', product);
        let imageBase64 = '';
        if (product.image) {
            imageBase64 = new Buffer(product.image, 'base64').toString('binary');
        }
        this.setState({
            id: product.id,
            nameProduct: product.nameProduct,
            categoryType: product.categoryType,
            price: product.price,
            quantity: product.quantity,
            slug: product.slug,
            detail: product.detail,
            status: product.status,
            image: '',
            previewImageURL: imageBase64,
            action: crudActions.EDIT
        })
    };

    handleUpdateProduct = () => {
        let { image } = this.state;
        if (!image) {
            this.props.editProduct({
                id: this.state.id,
                nameProduct: this.state.nameProduct,
                categoryType: this.state.categoryType,
                price: this.state.price,
                quantity: this.state.quantity,
                slug: this.state.slug,
                detail: this.state.detail,
                status: this.state.status,
            })
        } else {
            this.props.editProduct({
                id: this.state.id,
                nameProduct: this.state.nameProduct,
                categoryType: this.state.categoryType,
                price: this.state.price,
                quantity: this.state.quantity,
                slug: this.state.slug,
                detail: this.state.detail,
                status: this.state.status,
                image: this.state.image,
            })
        }
    };

    isOpenImage = () => {
        if (!this.state.previewImageURL) return;

        this.setState({ isOpen: true });
    };

    handleClearForm = () => {
        this.setState({
            action: '',
            previewImageURL: '',
            id: '',
            nameProduct: '',
            categoryType: '',
            price: '',
            quantity: '',
            slug: '',
            detail: '',
            status: '',
            image: '',
            isOpen: false
        })
    };

    handleChange = (selectedProduct) => {
        this.setState({ selectedProduct }, () =>
            console.log(`Option selected:`, this.state.selectedProduct)
        );
    };

    render() {

        let { types } = this.state;
        let { statusProduct } = this.state;
        let { nameProduct, categoryType, price, quantity, slug, detail, status } = this.state;
        let { selectedProduct } = this.state;

        return (
            <div className='product-container'>
                <div className="title" ><FormattedMessage id="manage-product.title" /></div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 my-3'><FormattedMessage id="manage-product.add" /></div>
                        {/* <div className='col-12 my-3'>
                            <div style={{ width: 300 }}>
                                <Select
                                    value={selectedProduct}
                                    onChange={this.handleChange}
                                    options={options}
                                />
                            </div>
                        </div> */}
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-product.name" /></label>
                            <input className='form-control' type='text' value={nameProduct}
                                onChange={(event) => this.handleOnChangeInput(event, 'nameProduct')} />
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-product.type" /></label>
                            <select className="form-control" value={categoryType}
                                onChange={(event) => this.handleOnChangeInput(event, 'categoryType')}
                            >
                                {types && types.length > 0 &&
                                    types.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='col-2'>
                            <label><FormattedMessage id="manage-product.price" /></label>
                            <input className='form-control' type='text' value={price}
                                onChange={(event) => this.handleOnChangeInput(event, 'price')}
                            />
                        </div>
                        <div className='col-2'>
                            <label><FormattedMessage id="manage-product.quantity" /></label>
                            <input className='form-control' type='text' value={quantity}
                                onChange={(event) => this.handleOnChangeInput(event, 'quantity')}
                            />
                        </div>
                        <div className='col-2'>
                            <label><FormattedMessage id="manage-product.status" /></label>
                            <select className="form-control" value={status}
                                onChange={(event) => this.handleOnChangeInput(event, 'status')}
                            >
                                {statusProduct && statusProduct.length > 0 &&
                                    statusProduct.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='col-4'>
                            <label><FormattedMessage id="manage-product.slug" /></label>
                            <input className='form-control' type='text' value={slug}
                                onChange={(event) => this.handleOnChangeInput(event, 'slug')} />
                        </div>
                        <div className='col-5'>
                            <label><FormattedMessage id="manage-product.detail" /></label>
                            <textarea className='form-control' value={detail} rows={1}
                                onChange={(event) => this.handleOnChangeInput(event, 'detail')} />
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-product.image" /></label>
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
                        <div className='col-12 mt-3 mb-4'>
                            <button
                                className='btn btn-primary'
                                onClick={this.state.action === crudActions.EDIT ? () => this.handleUpdateProduct() : () => this.handleCreateProduct()}
                            >{this.state.action === crudActions.EDIT ?
                                <FormattedMessage id="manage-product.save" />
                                :
                                <FormattedMessage id="manage-product.create" />}
                            </button>
                            <button
                                className='btn btn-secondary ml-3'
                                onClick={this.handleClearForm}
                            >
                                Làm mới
                            </button>
                        </div>
                        <div className='col-12 mb-5'>
                            <TableManageProduct
                                handleEditProductParent={this.handleEditProductParent}
                                action={this.state.action}
                            />
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <LightBox
                        mainSrc={this.state.previewImageURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        types: state.product.types,
        statusProduct: state.product.statusProduct,
        allProducts: state.product.products
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getType: () => dispatch(actions.getTypeStart()),
        getStatus: () => dispatch(actions.getStatusStart()),
        createProduct: (dataInput) => dispatch(actions.createProductStart(dataInput)),
        editProduct: (product) => dispatch(actions.editProductStart(product))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
