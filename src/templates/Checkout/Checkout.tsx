import React, { useEffect, useRef } from 'react'
import { Component } from '../../lib'
import { Root, Wrapper, Steps, Title, CartSummaryWrapper, DoneIcon, PendingIcon } from './Checkout.styled'

import CartList, { CartListProps } from '../../components/CartList'
import CartSummary, { CartSummaryProps } from '../../components/CartSummary'
import ContactInfoForm, { ContactInfoFormProps } from '../../components/Checkout/ContactInfoForm'
import ShippingMethodForm, { ShippingMethodFormProps } from '../../components/Checkout/ShippingMethodForm'
import PaymentMethodForm, { PaymentMethodFormProps } from '../../components/Checkout/PaymentMethodForm'
import PlaceOrderForm, { PlaceOrderFormProps } from '../../components/Checkout/PlaceOrderForm'
import Breadcrumbs, { BreadcrumbsProps } from '../../components/Breadcrumbs'

export type CheckoutProps = {
    step: 1 | 2 | 3 | 4
    breadcrumbs: BreadcrumbsProps
    contactInfo: ContactInfoFormProps & { title: string }
    shippingMethod: ShippingMethodFormProps & { title: string }
    paymentMethod: PaymentMethodFormProps & { title: string }
    placeOrder: PlaceOrderFormProps & { title: string }
    list: CartListProps
    summary: CartSummaryProps
    loading?: boolean
}

export const Checkout: Component<CheckoutProps> = ({
    step = 1,
    breadcrumbs,
    contactInfo,
    shippingMethod,
    paymentMethod,
    placeOrder,
    list,
    summary,
    loading,
    ...props
}) => {
    const contactInfoElem = useRef<HTMLDivElement>(null)
    const shippingMethodElem = useRef<HTMLDivElement>(null)
    const paymentMethodElem = useRef<HTMLDivElement>(null)
    const placeOrderElem = useRef<HTMLDivElement>(null)

    useEffect(() => {
        switch (step) {
            case 1:
                if (!contactInfoElem.current) return
                window.scrollTo({ top: 0, behavior: 'smooth' }) //.scrollIntoView(scrollOptions)
                break
            case 2:
                if (!shippingMethodElem.current) return
                window.scrollTo({
                    top: shippingMethodElem.current.offsetTop - shippingMethodElem.current.offsetHeight,
                    behavior: 'smooth',
                })
                break
            case 3:
                if (!paymentMethodElem.current) return
                window.scrollTo({
                    top: paymentMethodElem.current.offsetTop - paymentMethodElem.current.offsetHeight,
                    behavior: 'smooth',
                })
                break
            case 4:
                if (!placeOrderElem.current) return
                window.scrollTo({
                    top: placeOrderElem.current.offsetTop - placeOrderElem.current.offsetHeight,
                    behavior: 'smooth',
                })
                break
            default:
                break
        }
    }, [step])

    return (
        <Root {...props}>
            <Wrapper>
                <Breadcrumbs loading={loading} {...breadcrumbs} />

                <Steps>
                    <div ref={contactInfoElem}>
                        <Title $active>
                            <DoneIcon />
                            <PendingIcon />
                            {contactInfo.title}
                        </Title>
                        <ContactInfoForm {...contactInfo} />
                    </div>

                    <div ref={shippingMethodElem}>
                        <Title $active={step > 1}>
                            <DoneIcon />
                            <PendingIcon />
                            {shippingMethod.title}
                        </Title>
                        {step > 1 && <ShippingMethodForm loading={loading} {...shippingMethod} />}
                    </div>
                    <div ref={paymentMethodElem}>
                        <Title $active={step > 2}>
                            <DoneIcon />
                            <PendingIcon />
                            {paymentMethod.title}
                        </Title>
                        {step > 2 && <PaymentMethodForm loading={loading} {...paymentMethod} />}
                    </div>

                    <div ref={placeOrderElem}>
                        <Title $active={step > 3}>
                            <DoneIcon />
                            <PendingIcon />
                            Finish
                        </Title>
                        {step > 3 && <PlaceOrderForm loading={loading} {...placeOrder} />}
                    </div>
                </Steps>
            </Wrapper>

            <CartSummaryWrapper>
                <CartList loading={loading} {...list} />
                <CartSummary {...summary} />
            </CartSummaryWrapper>
        </Root>
    )
}
