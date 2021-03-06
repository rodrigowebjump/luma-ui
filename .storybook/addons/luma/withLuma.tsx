import React from 'react'
import { makeDecorator } from '@storybook/addons'
import { AppProvider } from '../../../src/AppProvider'

import styled from 'styled-components'

const Story = styled.div<{ $layout: 'centered' | 'fullPage' }>`
    ${props =>
        props.$layout === 'centered' &&
        `
                min-height: 100vh;
                min-width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
        `}
`

export const withLuma = makeDecorator({
    name: 'withLuma',
    parameterName: 'luma',
    wrapper: (getStory, context, { parameters = {} }) => {
        return (
            <AppProvider>
                <Story $layout={parameters.layout || 'centered'}>{getStory(context)}</Story>
            </AppProvider>
        )
    },
})
