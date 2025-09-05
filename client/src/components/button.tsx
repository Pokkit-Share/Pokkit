import type { ReactNode } from 'react'
import './button.css'

// type Props = ComponentPropsWithoutRef<typeof DialogPrimitive.Root> & {
// 	variant?: "dialog" | "drawer";
// 	side: "left" | "right" | "bottom";
// 	children?: ReactNode;
// }
type ButtonProps = {
	children?: ReactNode;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	variant?: 'primary'
	wide?: boolean;
	disabled?: boolean;
	className?: string;
	[key: string] : any;
}

export default function Button(buttonProps: ButtonProps) {
	const {
		children,
		onClick,
		variant = 'primary',
		wide = false,
		disabled = false,
		className = '',
		...props
		} = buttonProps;
	const variantClass = `btn-${variant}`
	const wideClass = wide === true ? 'btn-wide' : ''
	return (
		<button
			className={`btn ${variantClass} ${className.trim()} ${wideClass}`}
			onClick={onClick}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	)
}
