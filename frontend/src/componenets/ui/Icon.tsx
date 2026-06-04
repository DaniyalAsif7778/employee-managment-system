

interface IconPrope {
    className: string,
    Icon:  React.ComponentType, 
     
}

const Icon = ({ className, Icon  }: IconPrope) => {
    return <div className={className} > <Icon /> </div>;

}

export default Icon