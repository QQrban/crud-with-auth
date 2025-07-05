type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
    return (
        <input
            className="
    outline-1 
    outline-neutral-500 
    rounded-xs 
    p-4
    py-6 
    h-10
    focus:outline-blue-500
    transition-all 
    duration-300 
    ease-in-out
    "
            {...props}
        />
    );
};
