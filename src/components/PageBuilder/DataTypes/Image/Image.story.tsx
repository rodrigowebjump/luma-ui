import React from 'react'
import { storiesOf } from '@storybook/react'
import { PageBuilder } from '../../PageBuilder'

const html = `<div data-content-type=\"row\" data-appearance=\"contained\" data-element=\"main\"><div data-enable-parallax=\"0\" data-parallax-speed=\"0.5\" data-background-images=\"{}\" data-element=\"inner\" style=\"justify-content: flex-start; display: flex; flex-direction: column; background-position: left top; background-size: cover; background-repeat: no-repeat; background-attachment: scroll; border-style: none; border-width: 1px; border-radius: 0px; margin: 0px 0px 10px; padding: 10px;\"><figure data-content-type=\"image\" data-appearance=\"full-width\" data-element=\"main\" style=\"margin: 0px; padding: 0px; border-style: none;\"><a href=\"https://magento.com\" target=\"_blank\" data-link-type=\"default\" title=\"Test Title\" data-element=\"link\"><img class=\"pagebuilder-mobile-hidden\" src=\"${require('../../../../../public/images/banner-1.jpg')}\" alt=\"Test Alt\" title=\"Test Title\" data-element=\"desktop_image\" style=\"border-style: none; border-width: 1px; border-radius: 10px; max-width: 100%; height: auto;\"><img class=\"pagebuilder-mobile-only\" src=\"${require('../../../../../public/images/banner-1--mobile.jpg')}\" alt=\"Test Alt\" title=\"Test Title\" data-element=\"mobile_image\" style=\"border-style: none; border-width: 1px; border-radius: 10px; max-width: 100%; height: auto;\"></a><figcaption data-element=\"caption\">An example of a caption is a descriptive title under a photograph. 🤓</figcaption></figure></div></div>`
storiesOf('📦 Components/PageBuilder/Image', module).add('Default', () => <PageBuilder html={html} />)
