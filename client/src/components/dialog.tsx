import { createContext, useContext, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { CircleX } from 'lucide-react';
import './dialog.css'

type DialogContextType = {
	variant: "dialog" | "drawer";
	side: "left" | "right" | "bottom";
}

const DialogContext = createContext<DialogContextType|null>(null);

function useDialogContext() {
	const context = useContext(DialogContext);
	if (!context) {
		throw new Error("Dialog components must be used within <Dialog.Root>");
	}
	return context;
}

type Props = ComponentPropsWithoutRef<typeof DialogPrimitive.Root> & {
	variant?: "dialog" | "drawer";
	side: "left" | "right" | "bottom";
	children?: ReactNode;
}

const Root = ({
	variant = "dialog",
	side = "right",
	children,
	...props
}: Props) => {
	return (
		<DialogContext.Provider value={{variant, side}}>
			<DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>
		</DialogContext.Provider>
	);
};

const Trigger = DialogPrimitive.Trigger;
const Overlay = () => (
	<DialogPrimitive.Overlay className="dialog-overlay" />
);

type ContentProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
	children: ReactNode
}
const Content = ({
	children,
	className,
	...props
}: ContentProps) => {
	const { variant, side } = useDialogContext();

	return (
		<DialogPrimitive.Portal>
			<Overlay />
			<DialogPrimitive.Content
				{...props}
				className={`dialog-content ${variant === "drawer" ? `drawer drawer-${side}` : "dialog"} ${className || ""}`}
			>
				<DialogPrimitive.Close aria-label='close'  className="dialog-close">
					<CircleX size={36} strokeWidth={2.75} />
				</DialogPrimitive.Close>
				{children}
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	)
};

type CloseProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Close> & {
	children: ReactNode,
}

const Close = ({children, ...props}: CloseProps) => (
	<DialogPrimitive.Close {...props}>
		{children}
	</DialogPrimitive.Close>
);

type TitleProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
	children: ReactNode,
}

const Title = ({children, ...props}: TitleProps) => (
	<DialogPrimitive.Title {...props}>
		{children}
	</DialogPrimitive.Title>
);

export const Dialog = {
	Root,
	Trigger,
	Content,
	Close,
	Title,
};
