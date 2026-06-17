type ButtonProps = {
    color?: string;
    bg?: string;
    content: string;
    border?: string;
    cursor?: string;
}

const Button = ({color, bg, content, border, cursor}: ButtonProps) => {
    return (
        <button className={`px-6 font-medium py-1.5 font rounded-sm  ${bg || 'bg-navy-blue'} ${border} ${color || 'text-white'} ${cursor}`}> 
            {content}
        </button>
    );
}

export default Button;