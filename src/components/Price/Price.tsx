import React from 'react'
import { Component } from '../../lib'
import { Root, Label, RegularPrice, SpecialPrice } from './Price.styled'

export type PriceProps = {
    currency?: string
    label?: string
    regular: number
    special?: number
}

export const Price: Component<PriceProps> = ({ currency = 'USD', label, regular, special, ...props }) => {
    return (
        <Root {...props}>
            {label && <Label>{label}</Label>}

            <RegularPrice $hasSpecial={!!special}>
                {regular.toLocaleString('en-US', { style: 'currency', currency })}
            </RegularPrice>

            {!!special && (
                <SpecialPrice>{special.toLocaleString('en-US', { style: 'currency', currency })}</SpecialPrice>
            )}
        </Root>
    )
}
