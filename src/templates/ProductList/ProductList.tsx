import React, { useState, useRef } from 'react'
import { Component, Element, Props, classes } from '../../lib'

import { useTheme } from '../../theme'
import { useResize } from '../../hooks/useResize'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'

import Assembler, { AssemblerProps } from '../../components/Assembler'
import GridList from '../../components/GridList'
import ProductItem, { ProductItemProps } from '../../components/ProductItem'
import Filters, { FiltersProps } from '../../components/Filters'
import Button, { ButtonProps } from '../../components/Button'
import Breadcrumbs, { BreadcrumbsProps } from '../../components/Breadcrumbs'

import FiltersIcon from '@fortawesome/fontawesome-free/svgs/solid/sliders-h.svg'

export type ProductListProps = Props<{
    title: Props,
    breadcrumbs?: BreadcrumbsProps
    assembler?: AssemblerProps
    filters: {
        label: string
        open?: boolean
        closeButton: ButtonProps,
        props: FiltersProps
    }
    products?: ProductItemProps[]
}>

export const ProductList: Component<ProductListProps> = ({
    assembler,
    breadcrumbs,
    title,
    filters,
    products,
    ...props
}) => {
    const [showFilter, setShowFilter] = useState(!!filters.open)
    const { colors, margin } = useTheme()
    const { vHeight } = useResize()
    const filtersRef = useRef(null)

    useOnClickOutside(filtersRef, () => setShowFilter(false))

    return (
        <Element {...props} className={classes('product-list', props.className)}>
            <div className="product-list__top-bar">
                <div className="product-list__top-bar__heading">
                    {breadcrumbs && (
                        <Breadcrumbs 
                            prefix="#"
                            {...breadcrumbs} 
                            className={classes('product-list__top-bar__heading__breadcrumbs', breadcrumbs.className)}
                        />
                    )}

                    <Element 
                        {...title} 
                        className={classes('product-list__top-bar__heading__title', title.className)} 
                    />
                </div>
                
                <button className="product-list__top-bar__filter-button"
                    type="button"
                    onClick={() => setShowFilter(!showFilter)}
                >  
                    <span>
                        <FiltersIcon className="product-list__top-bar__filter-button__icon" /> 
                        {filters.label}
                    </span>
                </button>
            </div>

            <div className={classes('product-list__filters', ['--active', showFilter])}
                ref={filtersRef}                 
            >
                <Filters {...filters.props} />
                
                {filters.closeButton && (
                    <div className="product-list__filters__buttons">  
                        <Button 
                            fill 
                            onClick={() => setShowFilter(false)}
                            {...filters.closeButton} 
                        />
                    </div>
                )}
            </div>

            <div className="product-list__content"> 
                {assembler && (
                    <Assembler 
                        {...assembler} 
                        className={classes('product-list__content__assembler', assembler.className)} 
                    />
                )}
                
                {products && (
                    <GridList className="product-list__content__results">
                        {products && products.map((product, index) => (
                            <GridList.Item key={index}>
                                <ProductItem className="product-list__results__grid__item" 
                                    {...product}
                                />
                            </GridList.Item>
                        ))}
                    </GridList>
                )}
            </div>

            <style jsx global>{`
                .product-list__filters  { 
                    height: ${vHeight};
                }
            `}</style>
            
            <style jsx global>{`
                .product-list__top-bar {
                    align-items: center;
                    background-color: ${colors.surface.fade(0.05)};
                    color: ${colors.onSurface};
                    display: grid;
                    grid-gap: 2rem;
                    grid-template-columns: 1fr auto;
                    min-height: 6rem;
                    position: sticky;
                    top: 0;
                    z-index: 1;
                }

                .product-list__top-bar__heading {
                    align-items: center;
                    display: grid;
                    grid-auto-flow: row;
                    grid-auto-rows: max-content;
                    grid-gap: 0.5rem;
                    
                    @media(--medium-screen) {
                        grid-auto-columns: max-content;
                        grid-auto-flow: column;
                        grid-gap: 2rem;
                    }
                }

                .product-list__top-bar__heading__title {
                    font-family: inherit;
                    font-size: 1.6rem;
                    line-height: inherit;
                }

                .product-list__top-bar__heading__breadcrumbs {
                    color: ${colors.onSurface.fade(0.4)};
                    font-size: 1.3rem;
                    line-height: inherit;
                }

                .product-list__top-bar__filter-button > span {
                    align-items: center;
                    display: grid;
                    fill: currentColor;
                    font-size: 1.4rem;
                    grid-auto-columns: max-content;
                    grid-auto-flow: column;
                    grid-gap: 0.75rem;
                }

                .product-list__top-bar__filter-button__icon {
                    width: 1.2em;
                }

                .product-list__content {
                    display: grid;
                    grid-auto-rows: minmax(max-content, max-content);
                    grid-gap: 3rem;
                }    

                .product-list__filters {
                    -webkit-overflow-scrolling: touch;   
                    background-color: ${colors.surface};
                    color: ${colors.onSurface};
                    display: flex;
                    flex-direction: column;
                    right: 0;
                    max-width: calc(100vw - 3rem);
                    min-width: 30rem;
                    overflow: scroll;
                    position: fixed;
                    top: 0;
                    transform: translateX(100%);
                    transition: transform 305ms ease-out;
                    width: auto;
                    z-index: 4;
                    
                    & .filters {
                        padding: 4rem;
                        flex-grow: 1;
                    }

                    &.--active {
                        box-shadow: 3rem 0 6rem rgba(0, 0, 0, 0.75);
                        transform: translateX(0);
                    }
                }

                .product-list__filters__buttons {
                    background-color: ${colors.surface};
                    border-top: 0.1rem solid rgba(0, 0, 0, 0.15);
                    bottom: 0;
                    color: ${colors.onSurface};
                    display: grid;
                    grid-auto-flow: column;
                    grid-gap: 2rem;
                    padding: 2rem;
                    position: sticky;

                    @supports(padding: max(0px)) {
                        padding-bottom: max(2rem, env(safe-area-inset-bottom));
                    }
                }
            `}</style>
        </Element>
    )
}
