import React, { Component } from 'react';

export default class ErrorBounday extends Component {
  constructor() {
    super();

    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    });
  }

  render() {
    if (this.state.hasError) {
      return <div>Oh no something went wrong!</div>;
    } else {
      return this.props.children;
    }
  }
}
