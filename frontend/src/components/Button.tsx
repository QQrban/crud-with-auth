type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
    return (
        <button
            className="
        bg-blue-400 
        text-white 
        text-lg
        h-10
        cursor-pointer
        tracking-wider
        content-center
        hover:bg-blue-500
        rounded
        transition-all 
        duration-300 
        ease-in-out
        uppercase
        "
        >
            {props.name}
        </button>
    );
};
