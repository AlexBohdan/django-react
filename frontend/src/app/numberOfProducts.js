import React, { Component } from 'react';

class Products extends Component {
    render() {
        return (
            <div className="number-of-products__container">
                <div className="number-of-products__title">
                    <h3>Number of products</h3>
                    <small>Total number of products to scan</small>
                </div>
                <div className="number-of-products__picker">
                    <div className="line"></div>
                    <button data-number="0" data-cost="0" className={this.props.number[0] === 0? 'active' : ''}
                            onClick={this.props.onClick}>off($0)
                    </button>
                    <button data-number="100" data-cost="50" className={this.props.number[0] === 100 ? 'active' : ''}
                            onClick={this.props.onClick}>100($50)
                    </button>
                    <button data-number="200" data-cost="100" className={this.props.number[0] === 200 ? 'active' : ''}
                            onClick={this.props.onClick}>200($100)
                    </button>
                    <button data-number="500" data-cost="150" className={this.props.number[0] === 500 ? 'active' : ''}
                            onClick={this.props.onClick}>500($150)
                    </button>
                    <button data-number="1000" data-cost="250" className={this.props.number[0] === 1000 ? 'active' : ''}
                            onClick={this.props.onClick}>1000($250)
                    </button>
                </div>
            </div>
        )
    }
}
export default Products;

