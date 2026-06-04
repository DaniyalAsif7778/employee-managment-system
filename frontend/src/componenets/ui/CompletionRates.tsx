interface CompletionRatesProps {
    className: string;
    Icon?: React.ComponentType<any>;
    rate: number;
    time: string;
}

 const  CompletionRates =({
    className,
    Icon,
    rate,
    time,
}: CompletionRatesProps) =>{
    return <p className={className}><span>  </span> +{rate}% {time}</p>
}

export default CompletionRates;
