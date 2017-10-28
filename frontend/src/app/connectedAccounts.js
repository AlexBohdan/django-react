import React, { Component } from 'react';

class Accounts extends Component {
    render() {
        return (
            <div className="connected-accounts__container">
                        <div className="connected-accounts__title">
                            <h3>Connected accounts</h3>
                            <small>Total number of connected accounts</small>
                        </div>
                        <div className="connected-accounts__picker">
                            <div className="line"></div>
                            <button data-number="0" data-cost="0" className={this.props.number[0] === 0? 'active' : ''}
                            onClick={this.props.onClick}>off($0)</button>
                            <button data-number="1" data-cost="10" className={this.props.number[0] === 1? 'active' : ''}
                            onClick={this.props.onClick}>1($10)</button>
                            <button data-number="2" data-cost="17.5" className={this.props.number[0] === 2? 'active' : ''}
                            onClick={this.props.onClick}>2($17.50)</button>
                            <button data-number="5" data-cost="30" className={this.props.number[0] === 5? 'active' : ''}
                            onClick={this.props.onClick}>5($30)</button>
                            <button data-number="10" data-cost="50" className={this.props.number[0] === 10? 'active' : ''}
                            onClick={this.props.onClick}>10($50)</button>
                        </div>
                    </div>
        )
    }
}
export default Accounts;