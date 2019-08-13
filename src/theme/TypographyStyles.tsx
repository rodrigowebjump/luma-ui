
import React from 'react'
import { useTheme } from './useTheme'

export default () => {
    const { typography } = useTheme()

    return (
        <style jsx global>{`
            html {
                -webkit-font-smoothing: antialiased;
                font-family: ${typography.body.family};
                font-size: 62.5%; /* ~10px = 1rem! */
                font-style: ${typography.body.style};
                font-weight: ${typography.body.weight};
            }
            
            body {
                font-size: 16px; /* px fallback */
                font-size: 1.6rem; /* default font-size for document */
            }
            
            /* Copy & Lists */
            
            ul {
                list-style-type: circle;
            }
            
            ul li, ol li {
                line-height: 1.5;
            }
            
            blockquote {
                font-size: 2.4rem;
                font-style: italic;
                line-height: 1.5;
                margin-bottom: 1rem;
                margin-top: 1rem;
                padding-left: 2.4rem;
                position: relative;
            }
            
            /* Headings */
            
            h1, h2, h3, h4, h5, h6 {
                /* Change heading typefaces here */
                font-family: ${typography.heading.family};
                font-style: ${typography.heading.style};
                font-weight: ${typography.heading.weight};
                line-height: 1.1;
            }
            
            h1 {
                font-size: 3.2rem;
            }
            
            h2 {
                font-size: 2.6rem;
            }
            
            h3 {
                font-size: 2.2rem;
            }
            
            h4, h5, h6 {
                font-size: 2rem;
            }
            
            /* Tables */
            
            table {
                margin-top: 1rem;
                border-spacing: 0;
                border-collapse: collapse;
            }
            
            table td, table th {
                padding: 0;
                line-height: 3.3rem;
            }
            
            /* Code blocks */
            
            code {
                font-family: 'Fira Code', 'Courier New', Courier, monospace;
                font-size: 1.4rem;
                line-height: 1.5;
            }
        `}</style>
    )
}
