import React from 'react'
import { Component, Props } from '../../lib'
import { Root, HeaderContainer, Main, FooterContainer, TabBarContainer } from './App.styled'

import { useResize } from '../../hooks/useResize'

import Header from '../Header'
import TabBar from '../TabBar'
import Footer, { FooterProps } from '../Footer'
import { IconProps } from '../Icon'

import LogoImageSvg from '../../../public/images/luma.svg'

import IconSearchSvg from 'remixicon/icons/System/search-line.svg'
import IconSearchActiveSvg from 'remixicon/icons/System/search-fill.svg'
import IconBagSvg from 'remixicon/icons/Finance/shopping-bag-line.svg'
import IconBagActiveSvg from 'remixicon/icons/Finance/shopping-bag-fill.svg'
import IconHomeSvg from 'remixicon/icons/Buildings/store-2-line.svg'
import IconHomeActiveSvg from 'remixicon/icons/Buildings/store-2-fill.svg'
import IconFavoritesSvg from 'remixicon/icons/System/heart-line.svg'
import IconFavoriteActiveSvg from 'remixicon/icons/System/heart-fill.svg'
import IconDarkModeSvg from 'remixicon/icons/Design/contrast-2-line.svg'
import IconAccountSvg from 'remixicon/icons/User/user-3-line.svg'
import IconAccountActiveSvg from 'remixicon/icons/User/user-3-fill.svg'
import { useAppContext } from '../../AppProvider'

export type AppProps = {
    logo: Props

    home: Props<{
        active?: boolean
        icon?: IconProps
        text: string
    }>

    menu: Array<
        Props<{
            active?: boolean
            text: string
        }>
    >

    myAccount: Props<{
        active?: boolean
        icon?: IconProps
        text: string
    }>

    favorites: Props<{
        active?: boolean
        icon?: IconProps
        text: string
    }>

    search: Props<{
        active?: boolean
        icon?: IconProps
        text: string
    }>

    cart: Props<{
        active?: boolean
        count?: number
        icon?: IconProps
        text: string
    }>

    footer: FooterProps
}

export const App: Component<AppProps> = ({
    cart,
    children,
    footer,
    home,
    logo,
    menu,
    myAccount,
    favorites,
    search,
    ...props
}) => {
    const { vHeight } = useResize()

    const [appState, appDispatch] = useAppContext()

    return (
        <Root style={{ minHeight: vHeight }} {...props}>
            <HeaderContainer as="header" $margin>
                <Header
                    logo={{
                        svg: LogoImageSvg,
                        ...logo,
                    }}
                    menu={{
                        items: menu,
                    }}
                    utilities={{
                        items: [
                            {
                                'aria-label': myAccount.text,
                                icon: {
                                    svg: cart.active ? IconAccountActiveSvg : IconAccountSvg,
                                    ...myAccount.icon,
                                },
                                ...myAccount,
                            },
                            {
                                as: 'button',
                                text: 'Dark Mode',
                                onClick: () =>
                                    appDispatch({
                                        type: 'setColorScheme',
                                        payload: appState.colorScheme === 'dark' ? 'light' : 'dark',
                                    }),
                                icon: {
                                    svg: IconDarkModeSvg,
                                },
                            },
                            {
                                'aria-label': search.text,
                                icon: {
                                    svg: search.active ? IconSearchActiveSvg : IconSearchSvg,
                                    ...search.icon,
                                },
                                ...search,
                            },
                            {
                                'aria-label': cart.text,
                                icon: {
                                    svg: cart.active ? IconBagActiveSvg : IconBagSvg,
                                    count: appState.cartCount,
                                    ...cart.icon,
                                },
                                ...cart,
                            },
                        ],
                    }}
                />
            </HeaderContainer>

            <Main>{children}</Main>

            <FooterContainer as="footer">
                <Footer {...footer} />
            </FooterContainer>

            <TabBarContainer as="nav">
                <TabBar
                    items={[
                        {
                            'aria-label': home.text,
                            icon: {
                                svg: home.active ? IconHomeActiveSvg : IconHomeSvg,
                                ...home.icon,
                            },
                            ...home,
                        },
                        {
                            'aria-label': favorites.text,
                            icon: {
                                svg: favorites.active ? IconFavoriteActiveSvg : IconFavoritesSvg,
                                ...favorites.icon,
                            },
                            ...favorites,
                        },
                        {
                            'aria-label': search.text,
                            icon: {
                                svg: search.active ? IconSearchActiveSvg : IconSearchSvg,
                                ...search.icon,
                            },
                            ...search,
                        },
                        {
                            'aria-label': cart.text,
                            icon: {
                                svg: cart.active ? IconBagActiveSvg : IconBagSvg,
                                ...cart.icon,
                            },
                            ...cart,
                        },
                    ]}
                />
            </TabBarContainer>
        </Root>
    )
}
