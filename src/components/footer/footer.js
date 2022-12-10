import React from 'react'
import * as C from './styles'

export const Footer = () => {
    return (
        <>
            <footer>
                <C.FooterWrapper>
                    <C.Footer />
                </C.FooterWrapper>
                <C.Span>
                    Developed by <C.Link target='_blank' href='https://github.com/paulomonezi'> Paulo Monezi</C.Link>
                </C.Span>
            </footer>
        </>
    )
}