import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Product.scss';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router';
import ReactPaginate from 'react-paginate';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
    }

    componentDidMount() {
        this.props.getAllProduct();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.products !== this.props.products) {
            this.setState({
                products: this.props.products,
            })
        }
    };

    handleViewDetailProduct = (product) => {
        if (this.props.history) {
            this.props.history.push(`/product-detail/${product.id}`)
        }
    };

    render() {
        let { products } = this.state;
        return (
            <div className='section-share product-section'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Sản Phẩm</span>
                        <button className='btn-section'>Xem tất cả</button>
                    </div>
                    <div className='section-content'>
                        <div className='row'>
                            {products && products.length > 0 &&
                                products.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    return (
                                        <div
                                            className='col-2'
                                            onClick={() => this.handleViewDetailProduct(item)}
                                        //hidden={item.categoryType === 'C3' ? true : false}
                                        >
                                            <div className='product'>
                                                <div className='img-product' style={{ backgroundImage: `url(${imageBase64})` }}>
                                                </div>
                                                <div className='name-product'><span>{item.nameProduct}</span></div>
                                                <div className='price'>
                                                    <div className='price-product'>{item.price}đ</div>
                                                    <div className='da-ban'>Đã bán: 90</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className='col-12'>
                                {/* <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="next >>"
                                    onPageChange={this.handlePageClick()}
                                    pageRangeDisplayed={5}
                                    pageCount={this.state.totalPages}
                                    previousLabel="<< previous"
                                    pageClassName='page-item'
                                    pageLinkClassName='page-link'
                                    previousClassName='page-item'
                                    previousLinkClassName='page-link'
                                    nextClassName='page-item'
                                    nextLinkClassName='page-link'
                                    breakClassName='page-item'
                                    breakLinkClassName='page-link'
                                    containerClassName='pagination'
                                    activeClassName='active'
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        products: state.product.products,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllProduct: () => dispatch(actions.getAllProductStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product));
