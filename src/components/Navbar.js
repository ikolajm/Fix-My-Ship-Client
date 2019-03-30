import React, { Component } from 'react';

import Auth from './Auth';
import Logout from './Logout';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    viewConductor = () => {
        if (this.props.token === undefined) {
            return <Auth storeAuthData={this.props.storeAuthData} />
        } else {
            return <Logout user={this.props.user} clearAuthData={this.props.clearAuthData} />
        }
    }

    render() {
        return(
            <nav>
                <h2>Fix My 'Ship!</h2>
                {this.viewConductor()}
            </nav>
        )
    }
}