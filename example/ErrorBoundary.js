// @flow
import React, { Component } from "react";
import type { ChildrenArray } from "react";

type Props = {
    children: ChildrenArray<*>
};

type State = {
    hasError: boolean
};

class ErrorBoundary extends Component<Props, State> {
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
