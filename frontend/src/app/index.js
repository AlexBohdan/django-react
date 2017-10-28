import React, { Component } from 'react';
import '../static/css/style.css';
import Products from './numberOfProducts';
import Crawls from './crawlsPerMonth';
import Accounts from './connectedAccounts';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfProducts: [500, 150],
            crawlsPerMonth: [1, 1],
            connectedAccounts: [2, 17.5],
            productTotal: 150,
            accountTotal: 17.5.toFixed(2),
            grandTotal: 167.5.toFixed(2),
            submitDisable: false,
            submitError: null,
            productError: null
        };
    }

    handleProductsClick(event) {
        let number = event.currentTarget.dataset.number;
        let cost = event.currentTarget.dataset.cost;
        // calculate grand total
        let grand_total = parseFloat(cost) * this.state.crawlsPerMonth[1] + this.state.connectedAccounts[1];
        if (grand_total % 1 !== 0) {
            grand_total = grand_total.toFixed(2)
        }
        this.setState({
            ...this.state,
            numberOfProducts: [parseInt(number, 10), parseFloat(cost)],
            grandTotal: grand_total,
            submitError: null,
            productError: null
        });

        //make request to backend
        const url = `/api/v0/number-of-products-validation/`;
        const configs = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number_of_products: number
            })
        };

        (async() => {
            try {
                let response = await fetch(url, configs);
                if (response.ok) {
                    this.setState({
                        ...this.state,
                        productError: null,
                        submitDisable: false
                    });
                } else if (response.status === 422) {
                    let data = await response.json();
                    for (let key in data['error']) {
                        throw new Error(data['error'][key]);
                    }
                } else {
                    throw new Error('Something wrong with network response status...');
                }
            } catch (e) {
                this.setState({
                    ...this.state,
                    productError: e.message,
                    submitDisable: true
                });
            }
        })();
    }

    handleCrawlsClick(event) {
        let number = event.currentTarget.dataset.number;
        let cost = event.currentTarget.dataset.cost;
        let grand_total = this.state.numberOfProducts[1] * parseFloat(cost) + this.state.connectedAccounts[1];
        if (grand_total % 1 !== 0) {
            grand_total = grand_total.toFixed(2)
        }
        this.setState({
            ...this.state,
            crawlsPerMonth: [parseInt(number, 10), parseFloat(cost)],
            grandTotal: grand_total
        });
    }

    handleAccountsConnectedClick(event) {
        let number = event.currentTarget.dataset.number;
        let cost = event.currentTarget.dataset.cost;
        let grand_total = this.state.numberOfProducts[1] * this.state.crawlsPerMonth[1] + parseFloat(cost);
        if (grand_total % 1 !== 0) {
            grand_total = grand_total.toFixed(2)
        }
        this.setState({
            ...this.state,
            connectedAccounts: [parseInt(number, 10), parseFloat(cost)],
            grandTotal: grand_total
        });
    }

    submit() {
        ////disable submit button
        this.setState({
            ...this.state,
            submitDisable: true,
            submitError: null,
            productError: null
        });
        //make request to backend
        const url = `/api/v0/fake-payment/`;
        const configs = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number_of_products: this.state.numberOfProducts[0],
                crawl_per_month: this.state.crawlsPerMonth[0],
                connected_accounts: this.state.connectedAccounts[0]
            })
        };

        (async() => {
            try {
                let response = await fetch(url, configs);
                if (response.ok) {
                    alert('success');
                } else if (response.status === 422) {
                    let data = await response.json();
                    for (let key in data['errors']) {
                        throw new Error(data['errors'][key][0]);
                    }
                } else {
                    throw new Error('Something wrong with network response status...');
                }
            } catch (e) {
                this.setState({
                    ...this.state,
                    submitError: e.message
                });

            } finally {
                this.setState({
                    ...this.state,
                    submitDisable: false
                });
            }
        })();
    }

    render() {
        return (
            <div className="billing__container">
                <h1>Billing</h1>
                <div className="billing__card">
                    <h2>Product scanner</h2>
                    <Products number={this.state.numberOfProducts} onClick={(e)=>this.handleProductsClick(e)}/>
                    <Crawls number={this.state.crawlsPerMonth} onClick={(e)=>this.handleCrawlsClick(e)}/>
                    <div className={`total ${this.state.productError ? 'error' : ''}`}>
                        ${this.state.numberOfProducts[1]}*{this.state.crawlsPerMonth[1]} =
                        ${this.state.numberOfProducts[1] * this.state.crawlsPerMonth[1]} / month
                        {this.state.productError}
                    </div>
                    <h2>Account connector</h2>
                    <Accounts number={this.state.connectedAccounts}
                              onClick={(e)=>this.handleAccountsConnectedClick(e)}/>
                    <div className="total">
                        ${this.state.connectedAccounts[1] % 1 !== 0 ? this.state.connectedAccounts[1].toFixed(2) : this.state.connectedAccounts[1]}
                        / month
                    </div>
                    <div className="grand-total">
                        <div className="grand-total__sum">
                            <span className="grand-total__sum__text">Grand total:</span>
                            <span>
                                ${this.state.grandTotal} / month
                            </span>
                        </div>
                        <div className="submit__error">
                            {this.state.submitError}
                        </div>
                        <button className="cancel__btn">Cancel</button>
                        <button className={this.state.submitDisable ? '' : 'submit__btn'}
                                disabled={this.state.submitDisable} onClick={()=>this.submit()}>Update plan
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
