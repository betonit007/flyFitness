import React from 'react'
import Helmet from 'react-helmet'


const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
        <title>{title}</title>
        <meta name='description' content={description}></meta>
        <meta name='keywords' content={keywords}></meta >
    </Helmet >
    )
}


Meta.defaultProps = {
    title: "Welcome To Fly Fitness",
    description: 'Get Fit, Look Fly!',
    keywords: 'gym fitness workout equipment'
}

export default Meta
