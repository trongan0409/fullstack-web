import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router';
import './ProductRecommend.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class ProductRecommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendProduct: []
        }
    }

    componentDidMount() {
        this.props.getAllProduct(this.props.id);
        this.props.getRecommendProduct(this.props.id);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.recommendProduct !== this.props.recommendProduct) {
            this.setState({
                recommendProduct: this.props.recommendProduct,
            })
        }
    };

    handleViewDetailProduct = async (product) => {
        await this.props.getDetailProduct(product.id);
        if (this.props.history) {
            this.props.history.push(`/product-detail/${product.id}`)
        }
    };

    render() {
        let { recommendProduct } = this.state;
        return (
            <div className='section-share share-new-section'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Sản phẩm tương tự</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-content'>
                        <Slider dots={false} infinite={true} speed={500} slidesToShow={4} slidesToScroll={2}>
                            {recommendProduct && recommendProduct.length > 0 &&
                                recommendProduct.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    return (
                                        <div className='section-img' onClick={() => this.handleViewDetailProduct(item)}
                                        // hidden={item.id === '18' ? true : false}
                                        >
                                            <div className='img share-new-section' style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                            <div className='img-title'>{item.nameProduct}</div>
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
        posts: state.posts.allPosts,
        product: state.product.products,
        recommendProduct: state.product.recommendProduct
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllProduct: (id) => dispatch(actions.getAllProductStart(id)),
        getRecommendProduct: (id) => dispatch(actions.getReommendProductStart(id)),
        getDetailProduct: (id) => dispatch(actions.getAllProductStart(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductRecommend));
