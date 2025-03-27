import './HeadingTitle.css'
const HeadingTitle = ({ children }: { children: string }) => {
    return (
        <div className="headingTitle">
            <h2>{children}</h2>
        </div>
    )
}

export default HeadingTitle
