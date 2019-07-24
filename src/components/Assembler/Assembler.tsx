import React, { Suspense } from 'react'
import { Component, ErrorBoundary } from '../../lib'

export type AssemblerProps = {
    components: AssemplerComponent[]
}

export type AssemplerComponent<P = any> = {
    name: string
    props: P
}

const Loading = () => {
    return (
        <div className="loading">
            Loading
        </div>
    )
}

export const Assembler: Component<AssemblerProps> = ({
    components,
}) => {

    return (
        <Suspense fallback={<Loading />}>
            {components.map(({ name, props }, index) => {
                const Component = React.lazy(() => import(`../${name}`))
                return (
                    <ErrorBoundary>
                        <Component key={`assembler__item--${index}`} {...props} />
                    </ErrorBoundary>
                )
            })}
        </Suspense>
    )
}
