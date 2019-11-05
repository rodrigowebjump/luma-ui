import styled from 'styled-components'

export const Root = styled.div`
    min-height: 40rem;

    & .braintree-sheet {
        background-color: ${props => props.theme.colors.surface};
        color: ${props => props.theme.colors.onSurface};
        border-radius: 1rem;
    }

    & .braintree-sheet__error,
    .braintree-placeholder,
    .braintree-heading {
        display: none;
    }

    &
        .braintree-sheet__content--form
        .braintree-form__field-group
        .braintree-form__field
        .braintree-form__hosted-field {
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 0.1rem solid ${props => props.theme.colors.primary25};
    }

    &
        .braintree-sheet__content--form
        .braintree-form__field-group.braintree-form__field-group--has-error
        .braintree-form__field
        .braintree-form__hosted-field {
        border-bottom-color: ${props => props.theme.colors.onError};
    }

    & .braintree-sheet__content--form .braintree-form__field-group .braintree-form__field-error {
        color: ${props => props.theme.colors.onError};
        min-height: 2rem;
        display: block;
    }

    & .braintree-sheet__content--form .braintree-form__field-group .braintree-form__field-error-icon use {
        fill: ${props => props.theme.colors.onError};
    }

    & .braintree-sheet__content--form .braintree-form__field-group {
        margin-bottom: 1rem;
    }

    & .braintree-sheet__header .braintree-sheet__header-label {
        display: none;
    }

    & .braintree-sheet__content--form .braintree-form__field-group .braintree-form__label {
        font-size: 1.3rem;
        font-weight: 600;
        pointer-events: none;
        color: ${props => props.theme.colors.onSurface};
    }

    &
        .braintree-sheet__content--form
        .braintree-form__field-group.braintree-form__field-group--card-type-known
        .braintree-form__field-secondary-icon,
    .braintree-sheet__content--form
        .braintree-form__field-group.braintree-form__field-group--has-error
        .braintree-form__field-error-icon,
    .braintree-sheet__content--form
        .braintree-form__field-group.braintree-form__field-group--is-focused
        .braintree-form__field-secondary-icon {
        display: none;
    }
`
