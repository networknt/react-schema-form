import React, {Component} from 'react'


export class ErrorBoundary extends Component {
    state = { hasError: false }

    componentDidCatch(error, info) {
        // eslint-disable-next-line no-console
        console.error(error, info)
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong when building the form.</h1>;
        }
        return this.props.children
    }
}
