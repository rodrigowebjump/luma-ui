import React from 'react'

export default ({ colors }: any) => {

    return (
        <style jsx global>{`
            body {
                background: ${colors.background};
                color: ${colors.onBackground};
            }    

            a {
                color: inherit;
                text-decoration: none;
            }

            .visuallyhidden { 
                clip: rect(0 0 0 0); 
                height: 1px; width: 1px; 
                margin: -1px; padding: 0; border: 0; 
                overflow: hidden; 
                position: absolute; 
            }
            
            a[href], button {

                &:not([disabled]) {
                    cursor: pointer;
                }
                
                &[disabled] {
                    color: inherit;
                }
            }

            *:focus {
                outline: none;
            }
    
            /*
            *:focus {
                outline-style: solid;
                outline-color: currentColor;
                outline-width: 0.1rem;
                outline-offset: 0.1rem;
            }
            */    

        `}</style>
    )
}
