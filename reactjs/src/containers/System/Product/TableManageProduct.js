import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageProduct.scss';
import * as actions from '../../../store/actions';

class TableManageProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productRedux: []
        };
    };

    componentDidMount() {
        this.props.getAllProduct();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allProducts !== this.props.allProducts) {
            this.setState({ productRedux: this.props.allProducts })
        }
    };

    handleDeleteProduct = (product) => {
        this.props.deleteProduct(product.id);
    }

    handleEditUser = (product) => {
        this.props.handleEditProductParent(product);
    };

    render() {
        let { productRedux } = this.state;

        return (
            <div className='product-container mx-0'>
                <table id='TableManageProduct'>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Loại</th>
                        <th>Giá tiền</th>
                        <th>Số lượng</th>
                        <th>Đường dẫn</th>
                        <th>Trạng thái</th>
                        <th>Action</th>
                    </tr>
                    {productRedux && productRedux.length > 0 &&
                        productRedux.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.nameProduct}</td>
                                    <td>{item.categoryType}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.slug}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <button
                                            type='button'
                                            className='btn-edit'
                                            onClick={() => this.handleEditUser(item)}
                                        ><i className='fas fa-pencil-alt'></i></button>
                                        <button
                                            onClick={() => { this.handleDeleteProduct(item) }}
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
        allProducts: state.product.products
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllProduct: () => dispatch(actions.getAllProductStart()),
        deleteProduct: (id) => dispatch(actions.deleteProductStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageProduct);
