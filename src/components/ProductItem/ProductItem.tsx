import React from 'react'
import { Component, classes } from '../../lib'
import Image from '../Image'
import { useTheme } from '../../theme'

export type ProductItemProps = {
    badge?: string
    image: string
    price?: string
    priceSpecial?: string
    priceLabel?: string
    title: string
    colors?: [string]
    sizes?: [string]
}

export const ProductItem: Component<ProductItemProps> = ({ 
    as: ProductItem = 'div', 
    badge,
    colors,
    image,
    price,
    priceLabel,
    priceSpecial,
    title,
    ...props
}) => {
    const theme = useTheme()
    
    return (
        <ProductItem {...props} className={classes('product-item', props.className)}>
            <Image className="product-item__image"
                src={image} alt={title} 
            >
                 {!!colors && (
                    <ul className="product-item__details__colors">
                        {colors.map((color, index) => (
                            <li className="product-item__details__colors__item"
                                key={`color--${index}`} 
                                style={{ backgroundColor: color }}
                            ></li>
                        ))}
                    </ul> 
                 )}

                <span className="product-item__details">
                    <strong className="product-item__details__title">{title}</strong>
                    
                    { !!badge && <span className="product-item__details__badge">{badge}</span> }

                    { price && (
                        <span className="product-item__details__price">
                            {!!priceLabel && <em className="product-item__details__price__label">{priceLabel}</em>}
                            
                            <span className={classes('product-item__details__price__original', ['--special', !!priceSpecial])}>
                                {price}
                            </span> 

                            { !!priceSpecial && <span className="product-item__details_price__special">{priceSpecial}</span> }
                        </span>
                    )}
                </span>

            </Image>

            <style jsx global>{`
                .product-item__image {
                    position: relative;
                }

                .product-item__details {
                    display: grid;
                    line-height: 1.5;
                    justify-content: center;
                    text-align: center;
                }

                .product-item__details__badge {
                    background-color: ${theme.colors.primary.fade(0.92)};
                    color: ${theme.colors.primary};
                    font-size: 1.1rem;
                    letter-spacing: 0.1rem;
                    left: 0;
                    padding: 0.5rem 1.5rem;
                    position: absolute;
                    text-align: center;
                    text-transform: uppercase;
                    top: 0;
                    transform-origin: bottom left;
                    transform: rotate(90deg);
                }

                .product-item__details__colors {
                    display: grid;
                    grid-auto-flow: column;
                    margin: -1rem 0 1rem;
                }

                .product-item__details__colors__item {
                    display: inline-block;
                    height: 0.65rem;
                    width: 100%;
                }

                .product-item__details__title {
                    font-weight: 600;
                }

                .product-item__details__price {
                    font-size: 0.95em;
                    display: grid;
                    grid-gap: 0.75rem;
                    grid-auto-flow: column;
                    grid-auto-columns: minmax(max-content, max-content);
                }

                .product-item__details__price__label {
                    font-style: italic;
                }

                .product-item__details__price__original {
                    &.--special {
                        text-decoration: line-through;
                    }
                }

                .product-item__details__price__special {
                    color: ${colors.accent};
                }
            `}</style>
        </ProductItem>
    )
}
