import React, { Component } from 'react';

class Crawls extends Component {
    render() {
        return (
            <div className="crawls-per-month__container">
                <div className="crawls-per-month__title">
                    <h3>Crawls pew month</h3>
                    <small>How often should the product be scanned per month</small>
                </div>
                <div className="crawls-per-month__picker">
                    <div className="line"></div>
                    <button data-number="1" data-cost="1" className={this.props.number[0] === 1? 'active' : ''}
                            onClick={this.props.onClick}>1
                    </button>
                    <button data-number="2" data-cost="2" className={this.props.number[0] === 2? 'active' : ''}
                            onClick={this.props.onClick}>2(2x)
                    </button>
                    <button data-number="4" data-cost="3" className={this.props.number[0] === 4? 'active' : ''}
                            onClick={this.props.onClick}>4(3x)
                    </button>
                    <button data-number="8" data-cost="5" className={this.props.number[0] === 8? 'active' : ''}
                            onClick={this.props.onClick}>8(5x)
                    </button>
                    <button data-number="30" data-cost="15" className={this.props.number[0] === 30? 'active' : ''}
                            onClick={this.props.onClick}>30(15x)
                    </button>
                </div>
            </div>
        )
    }
}
export default Crawls;