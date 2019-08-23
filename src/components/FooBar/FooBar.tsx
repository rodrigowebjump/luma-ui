import React, { FunctionComponent } from 'react'
import { Root } from './FooBar.styled'

export type FooBarProps = {}

export const FooBar: FunctionComponent<FooBarProps> = ({ ...props }) => {
    return <Root {...props}>👋 Hi, I'm FooBar</Root>
}
