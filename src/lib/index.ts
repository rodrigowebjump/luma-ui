import React from 'react'
import { FunctionComponent, HTMLAttributes } from 'react'
import { ReactComponentLike } from 'prop-types'

export type Component<P = {}> = FunctionComponent<P & HTMLAttributes<HTMLElement> & {
    as?: ReactComponentLike
}>

export const classes = (...args: Array<string|[string, boolean]|undefined>) => {
    return args
        .map(x => {
            if (typeof x === 'string') return x
            else if (Array.isArray(x) && !!x[1]) return x[0]
            else return null
        })
        .filter(x => x !== null)
        .join(' ')
}

/**
 * Error Boundary
 */
export class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
    constructor(props: any) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    // componentDidCatch(error) {
    //     // You can also log the error to an error reporting service
    // }

    render() {
        if (this.state.hasError) {
            return null
        }

        return this.props.children
    }
}
