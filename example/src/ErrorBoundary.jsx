import React, { Component } from "react";

class ErrorBoundary extends Component {
    state = { hasError: false };

    componentDidCatch(error, info) {
        // eslint-disable-next-line no-console
        console.error(error, info);
        this.setState({ hasError: true });
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;
        if (hasError) {
            return <h1>Something went wrong when building the form.</h1>;
        }
        return children;
    }
}

export default ErrorBoundary;
