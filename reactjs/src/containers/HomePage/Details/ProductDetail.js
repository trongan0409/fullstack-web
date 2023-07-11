import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../HomeHeader';
import './ProductDetail.scss'
import HomeFooter from '../HomeFooter';
import ProductRecommend from './ProductRecommend';
import * as actions from '../../../store/actions';

class ProductDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: '',
        }
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.props.getDetailProduct(this.props.match.params.id);
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.product !== this.props.product) {
            this.setState({
                product: this.props.product
            });
        }
    };

    render() {
        let { product } = this.state;
        let imageBase64 = '';
        if (product.image) {
            imageBase64 = new Buffer(product.image, 'base64').toString('binary');
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='product-detail-container'>
                    <div className='product'>
                        <div className='row'>
                            <div className='col-5'>
                                <div className='image-product'>
                                    <div className='img' style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                </div>
                            </div>
                            <div className='col-7'>
                                <div className='info-product'>
                                    <div className='caythumuc'>link cay thu muc</div>
                                    <div className='product-name'>{product.nameProduct}</div>
                                    <div className='price'>
                                        <div className='title-price'>Giá tiền</div>
                                        <div className='price-product'>{product.price}đ</div>
                                    </div>
                                    <div className='quantity'>
                                        <div className='title-quantity'>Số lượng</div>
                                        <div className='form'>
                                            <button type='button' className='minus'><i className='fas fa-minus' /></button>
                                            <input
                                                type='text'
                                                className='text'
                                            ></input>
                                            <button type='button' className='plus' ><i className='fas fa-plus' /></button>
                                        </div>
                                    </div>
                                    <div className='buy'>
                                        <button className='btn btn-warning'><i className='fas fa-cart-plus' /> Thêm vào giỏ hàng</button>
                                        <button className='btn btn-danger'>Mua ngay</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='detail-comment'>
                        <div className='row'>
                            <div className='col-5'>
                                <div className='detail'>
                                    <div className='title-detail'>Chi tiết sản phẩm</div>
                                    <div className='detail-content'>{product.detail}</div>
                                </div>
                            </div>
                            <div className='col-7'>
                                <div className='comment'>
                                    <div className='title-comment'>Đánh giá sản phẩm</div>
                                    <div className='your-comment'>
                                        <div className='your-comment-title'>Đánh giá của bạn về sản phẩm</div>
                                        <div className='star'>
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                        </div>
                                        <div className='your-comment-title'>Nhận xét của bạn về sản phẩm</div>
                                        <textarea className='text-comment' />
                                        <button className='btn btn-danger'>Đánh giá</button>
                                        <div className='your-comment-title'>Đánh giá của mọi người</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='recommend'></div>
                </div>
                <ProductRecommend id={this.props.match.params.id} />
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        product: state.product.products,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailProduct: (id) => dispatch(actions.getAllProductStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
