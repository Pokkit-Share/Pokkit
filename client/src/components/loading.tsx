import { useEffect, useRef, useState } from 'react';
import './loading.css';


export default function Loading() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(0)

	useEffect(() => {
		if (containerRef.current) {
			setWidth(containerRef.current.offsetWidth);
		}

		const handleResize = () => {
			if (containerRef.current) {
				setWidth(containerRef.current.offsetWidth);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className='loader' ref={containerRef}>
			<div className='loader-track' aria-hidden="true">
				<img className='loader-frame' style={{width: width ? `${width}px` : "auto" }} draggable={false} alt="" src="/dragapult-sprite.webp" />
				<img className='loader-frame' style={{width: width ? `${width}px` : "auto" }} draggable={false} alt="" src="/dragapult-sprite.webp" />
			</div>

			<div>Loading...</div>
		</div>
	)
}
