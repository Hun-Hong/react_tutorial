interface ButtonProps {
    text: string;
    color?: string;
    onClick: () => void;
}

function Button({ text, color = "blue", onClick }: ButtonProps) {
    return (
        <button
            style={{ backgroundColor: color }}
            onClick={onClick}>
            {text}
        </button>
    )
}

export default Button