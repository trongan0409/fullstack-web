import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SelfDesign.scss';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { withRouter } from 'react-router';

class SelfDesign extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productsSelfDesign: []
        }
    }

    componentDidMount() {
        this.props.getSelfDesign();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.productsSelfDesign !== this.props.productsSelfDesign) {
            this.setState({
                productsSelfDesign: this.props.productsSelfDesign
            })
        }
    };

    handleViewDetailProduct = (product) => {
        console.log('check: ', product);
        if (this.props.history) {
            this.props.history.push(`/product-detail/${product.id}`)
        }
    };

    render() {
        let { productsSelfDesign } = this.state;
        let { setting } = this.props;
        return (
            <div className='section-share self-design-section'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bể tự thiết kế</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-content'>
                        <Slider {...setting}>
                            {productsSelfDesign && productsSelfDesign.length > 0 &&
                                productsSelfDesign.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    return (
                                        <div className='section-img'
                                            onClick={() => this.handleViewDetailProduct(item)}>
                                            <div className='img self-design-section' style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                            <div className='img-title'>{item.nameProduct}</div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        productsSelfDesign: state.product.productsSelfDesign
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSelfDesign: () => dispatch(actions.getSelfDesignStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SelfDesign));
