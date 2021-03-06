import React, { useCallback, useEffect, FormHTMLAttributes, LabelHTMLAttributes, InputHTMLAttributes } from 'react'
import { Component, Props } from '../../lib'
import {
    Root,
    Field as FieldRoot,
    Label as LabelRoot,
    Error as ErrorRoot,
    Input as InputRoot,
    FormError as FormErrorRoot,
} from './Form.styled'

import { FormContext, useForm, useFormContext, ValidationOptions, FieldErrors, OnSubmit } from 'react-hook-form'
import _get from 'lodash.get'

/** Form */
export type FormProps<P = {}> = FormHTMLAttributes<any> & {
    onValues?: (values: any) => any
    onErrors?: (values: FieldErrors<any>) => any
    onSubmit: OnSubmit<P>
}

export const Form: Component<FormProps> = ({ children, onSubmit, onErrors, onValues, onChange, ...props }) => {
    const form = useForm()

    const handleOnValueChanges = useCallback(
        e => {
            const values = form.getValues({ nest: true })
            if (onValues) onValues(values)
            if (onChange) onChange(e)
        },
        [onChange, onValues]
    )

    useEffect(() => {
        if (onErrors) onErrors(form.errors)
    }, [onErrors, Object.entries(form.errors).toString()])

    return (
        <FormContext {...form}>
            <Root onSubmit={form.handleSubmit(onSubmit)} onChange={handleOnValueChanges} {...props}>
                {children}
            </Root>
        </FormContext>
    )
}

export type FormFieldProps = Props<{
    name: string
    label?: string
    error?: string
    rules?: ValidationOptions
}>

/** Field */
export type FieldProps = {}

export const Field: Component<FieldProps> = ({ children, ...props }) => {
    return <FieldRoot {...props}>{children}</FieldRoot>
}

/** Label */
export type LabelProps = LabelHTMLAttributes<any> & { error?: boolean }

export const Label: Component<LabelProps> = ({ children, error = false, ...props }) => {
    return (
        <LabelRoot $error={error} {...props}>
            {children}
        </LabelRoot>
    )
}

/** FieldInput */
export type FieldInputProps = InputHTMLAttributes<any> & { rules?: ValidationOptions; error?: boolean }

export const FieldInput: Component<FieldInputProps> = ({ children, rules, error = false, ...props }) => {
    const { register } = useFormContext()

    return (
        <InputRoot $error={error} {...props} ref={register({ ...rules })}>
            {children}
        </InputRoot>
    )
}

/** Field Error */
export type ErrorProps = {}

export const Error: Component<ErrorProps> = ({ children, ...props }) => {
    return <ErrorRoot {...props}>{children}</ErrorRoot>
}

/** Error */
export type FormErrorProps = {}

export const FormError: Component<FormErrorProps> = ({ children, ...props }) => {
    return <FormErrorRoot {...props}>{children}</FormErrorRoot>
}
