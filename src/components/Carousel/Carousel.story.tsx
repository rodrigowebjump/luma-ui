import React from 'react'
import Carousel from './'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import { number } from '@storybook/addon-knobs'

const Item = styled.div`
    align-items: center;
    color: #fff;
    display: flex;
    height: 50vh;
    justify-content: center;
    font-size: 4rem;
    background-color: ${props => props.theme.colors.primary25};
`

storiesOf('📦 Components/Carousel', module).add('Default', () => (
    <Carousel padding={number('padding', 4)} gap={number('gap', 2)} show={number('show', 1)}>
        <Carousel.Item>
            <Item>1</Item>
        </Carousel.Item>
        <Carousel.Item>
            <Item>2</Item>
        </Carousel.Item>
        <Carousel.Item>
            <Item>3</Item>
        </Carousel.Item>
    </Carousel>
))