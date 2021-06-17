import React from "react"
import ContentLoader from "react-content-loader"

const FormContentLoader = (props) => (
    <ContentLoader
        speed={3}
        width={500}
        height={500}
        viewBox="0 0 500 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="145" y="11" rx="0" ry="0" width="341" height="27" />
        <rect x="63" y="84" rx="0" ry="0" width="158" height="22" />
        <rect x="65" y="121" rx="0" ry="0" width="358" height="40" />
        <rect x="67" y="265" rx="0" ry="0" width="158" height="22" />
        <rect x="65" y="301" rx="0" ry="0" width="358" height="40" />
        <rect x="66" y="176" rx="0" ry="0" width="158" height="22" />
        <rect x="66" y="212" rx="0" ry="0" width="358" height="40" />
        <rect x="70" y="392" rx="0" ry="0" width="165" height="52" />
        <rect x="286" y="417" rx="0" ry="0" width="114" height="25" />
    </ContentLoader>
)
export default FormContentLoader