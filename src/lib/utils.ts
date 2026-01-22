import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Toggles body scroll lock.
 * @param lock - Whether to lock or unlock.
 */
export function toggleScrollLock(lock: boolean) {
	if (typeof document === "undefined") return;

	const lenis = (window as any).lenis;

	if (lock) {
		if (lenis) lenis.stop();
		document.body.style.overflow = "hidden";
		// Optional: handle padding to prevent layout shift
		const scrollBarWidth =
			window.innerWidth - document.documentElement.clientWidth;
		document.body.style.paddingRight = `${scrollBarWidth}px`;
	} else {
		if (lenis) lenis.start();
		document.body.style.overflow = "";
		document.body.style.paddingRight = "";
	}
}
