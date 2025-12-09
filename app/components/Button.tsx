export const Button = (props: ButtonProps) => {
    const { isLoading, className, children, ...rest } = props;

    return (
        <button className={`btn ${className}`} {...rest}>
            {isLoading ? <span className="loading loading-spinner" /> : null}
            {children}
        </button>
    );
};

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    isLoading?: boolean;
};
