const Number = ({
    number,
    className,
}: {
    number?: number | undefined 
    className: string
}) => {
    return <h1 className={className}> {number}</h1>
}

export default Number
