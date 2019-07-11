import React, { FunctionComponent, useState, createContext, useContext, useEffect } from 'react'
import ResetStyles from './ResetStyles'
import GlobalStyles from './GlobalStyles'
import TypographyStyles from './TypographyStyles'
import { ReactComponentLike } from 'prop-types'
import { ColorProperty, FontFamilyProperty, FontStyleProperty, FontWeightProperty } from 'csstype'

import ColorObject from 'color'
const color = require('color')

type Colors = {
    link: ColorObject
    linkHover: ColorObject

    background: ColorObject
    onBackground: ColorObject

    surface: ColorObject
    onSurface: ColorObject

    primary: ColorObject
    onPrimary: ColorObject

    secondary: ColorObject
    onSecondary: ColorObject

    accent: ColorObject
    onAccent: ColorObject

    error: ColorObject
    onError: ColorObject

    warning: ColorObject
    onWarning: ColorObject

    notice: ColorObject
    onNotice: ColorObject
}

type Typography = {
    bodyFamily: FontFamilyProperty
    bodyStyle: FontStyleProperty
    bodyWeight: FontWeightProperty

    headingFamily: FontFamilyProperty
    headingStyle: FontStyleProperty
    headingWeight: FontWeightProperty
}

type Theme = {
    colors: Colors
    typography: Typography
    isDark: boolean
    routerLink: ReactComponentLike
    setDark: (v: boolean) => any
}

type ThemeProviderProps = {
    colors?: {
        link?: [ ColorProperty, ColorProperty? ]
        linkHover?: [ ColorProperty, ColorProperty? ]
    
        background?: [ ColorProperty, ColorProperty? ]
        onBackground?: [ ColorProperty, ColorProperty? ]
    
        surface?: [ ColorProperty, ColorProperty? ]
        onSurface?: [ ColorProperty, ColorProperty? ]
    
        primary?: [ ColorProperty, ColorProperty? ]
        onPrimary?: [ ColorProperty, ColorProperty? ]
    
        secondary?: [ ColorProperty, ColorProperty? ]
        onSecondary?: [ ColorProperty, ColorProperty? ]
    
        accent?: [ ColorProperty, ColorProperty? ]
        onAccent?: [ ColorProperty, ColorProperty? ]
    
        error?: [ ColorProperty, ColorProperty? ]
        onError?: [ ColorProperty, ColorProperty? ]
    
        warning?: [ ColorProperty, ColorProperty? ]
        onWarning?: [ ColorProperty, ColorProperty? ]
    
        notice?: [ ColorProperty, ColorProperty? ]
        onNotice?: [ ColorProperty, ColorProperty? ]
    }
    
    typography?: {
        bodyFamily?: FontFamilyProperty
        bodyStyle?: FontStyleProperty
        bodyWeight?: FontWeightProperty
    
        headingFamily?: FontFamilyProperty
        headingStyle?: FontStyleProperty
        headingWeight?: FontWeightProperty
    }

    routerLink?: ReactComponentLike
}

const defaultColors = {
    link: [
        color('hsla(200, 19.1%, 18.4%, 1)'), 
        color('hsla(204, 15.2%, 93.5%, 1)'),
    ],

    linkHover: [
        color('hsla(200, 17.9%, 26.3%, 1)'), 
        color('hsla(198.5, 15.7%, 83.7%, 1)'),
    ],

    background: [
        color('#f6f6f6'), 
        color('hsla(0, 0%, 13.3%, 1)'),
    ],

    onBackground: [
        color('hsla(0, 0%, 13.3%, 1)'), 
        color('hsla(0, 0%, 100%, 1)'),
    ],

    surface: [
        color('hsla(0, 0%, 100%, 1)'), 
        color('hsla(0, 0%, 13.3%, 1)'),
    ],

    onSurface: [
        color('hsla(0, 0%, 13.3%, 1)'), 
        color('hsla(0, 0%, 100%, 1)'),
    ],

    primary: [
        color('hsla(0, 0%, 6.7%, 1)'), 
        color('hsla(0, 0%, 100%, 1)'),
    ],

    onPrimary: [
        color('hsla(0, 0%, 100%, 1)'), 
        color('hsla(0, 0%, 6.7%, 1)'),
    ],

    secondary: [
        color('hsla(0, 0%, 98%, 1)'), 
        color('hsla(0, 0%, 12.9%, 1)'),
    ],

    onSecondary: [
        color('hsla(0, 0%, 12.9%, 1)'), 
        color('hsla(0, 0%, 98%, 1)'),
    ],

    accent: [
        color('hsla(18.2, 63.5%, 38.6%, 1)'),
    ],

    onAccent: [
        color('hsla(0, 0%, 98%, 1)'),
    ],

    error: [
        color('hsla(0, 0%, 100%, 1)'), 
        color('hsla(1.1, 83.2%, 62.5%, 1)'),
    ],
    onError: [
        color('hsla(1.1, 83.2%, 62.5%, 1)'), 
        color('hsla(0, 0%, 100%, 1)'),
    ],

    warning: [
        color('hsla(0, 0%, 100%, 1)'), 
        color('hsla(30.4, 100%, 48%, 1)'),
    ],
    onWarning: [
        color('hsla(30.4, 100%, 48%, 1)'), 
        color('hsla(0, 0%, 100%, 1)'),
    ],

    notice: [
        color('hsla(0, 0%, 100%, 1)'), 
        color('hsla(199.6, 97.4%, 45.5%, 1)'),
    ],
    onNotice: [
        color('hsla(199.6, 97.4%, 45.5%, 1)'), 
        color('hsla(0, 0%, 100%, 1)'),
    ],
}

const defaultTypography = {
    bodyFamily: 'sans-serif',
    bodyStyle: 'normal',
    bodyWeight: 400,
    headingFamily: 'serif',
    headingStyle: 'normal',
    headingWeight: 600,
}

const initialTheme: Theme = {
    colors: {
        link: defaultColors.link[0],
        linkHover: defaultColors.linkHover[0],

        background: defaultColors.background[0],
        onBackground: defaultColors.onBackground[0],

        surface: defaultColors.surface[0],
        onSurface: defaultColors.onSurface[0],

        primary: defaultColors.primary[0],
        onPrimary: defaultColors.onPrimary[0],

        secondary: defaultColors.secondary[0],
        onSecondary: defaultColors.onSecondary[0],

        accent: defaultColors.accent[0],
        onAccent: defaultColors.onAccent[0],

        error: defaultColors.error[0],
        onError: defaultColors.onError[0],

        warning: defaultColors.warning[0],
        onWarning: defaultColors.onWarning[0],

        notice: defaultColors.notice[0],
        onNotice: defaultColors.onNotice[0],
    },

    typography: defaultTypography,

    isDark: false,

    setDark: (v: boolean) => { },
    
    routerLink: ({ ...props }) => <a {...props} />,
}

const ThemeContext = createContext(initialTheme)

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({
    children,
    colors: newColors,
    routerLink = (props: any) => <a {...props} />,
    typography: newTypography,
    
}) => {
    const [isDark, setDark] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches || false)

    const mergedColors = {
        ...defaultColors,
        ...newColors,
    }

    const colors: any = Object.keys(mergedColors)
        .reduce((acc, key) => {
            const colorsByKey = mergedColors[key]
            const selectedColor = colorsByKey[(isDark && colorsByKey.length > 1) ? 1 : 0]
            
            // https://github.com/Qix-/color
            return {
                ...acc,
                [key]: typeof selectedColor === 'string' ? color(colorsByKey) : selectedColor,
            }
        }, {})

    const typography: any = {
        ...defaultTypography,
        ...newTypography,
    }

    return (
        <ThemeContext.Provider value={{ 
            colors,
            isDark, 
            routerLink,
            setDark, 
            typography, 
        }}>
            <div className="theme">
                {children}
            </div>

            <ResetStyles />
            <GlobalStyles colors={colors} />
            <TypographyStyles typography={typography} />
        </ThemeContext.Provider>
    )
} 

export const Container: FunctionComponent = ({ children }) => (
    <div className="theme-container">
        {children}
    </div>
)
