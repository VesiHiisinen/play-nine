import React, { Component } from 'react';
import _range from 'underscore-es/range';

export default class Stars extends Component {

    render() {
        return(
            <div className="col-5">
            {_range(this.props.numberOfStars).map(i =>
            <i key={i} className="fa fa-star"></i>
            )}
            </div>
        );
    }
}