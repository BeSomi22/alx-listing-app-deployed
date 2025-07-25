import React from "react";
import { ButtonProps } from "@/interfaces/index";

const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
    return (
        <button className={className}
            onClick={onClick}
        >
            {label}
        </button>
    )
}
export default Button;