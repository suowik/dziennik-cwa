import React, {Component} from 'react';

class Header extends Component {

    render(){
        return (
            <div className="page-header">
                <h1>{this.props.title}</h1>
                <span>{this.props.subtitle}</span>
            </div>
        )
    }

}

export default Header