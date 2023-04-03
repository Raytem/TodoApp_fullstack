import { useEffect, useRef } from "react"


export function useInfinitiePagination(parentRef: React.RefObject<HTMLDivElement>, childRef: React.RefObject<HTMLDivElement>, callback: () => void) {
    const parent = parentRef.current as HTMLDivElement;
    const child = childRef.current as HTMLDivElement;

    useEffect(() => {
        const options: IntersectionObserverInit = {
            root: parent,
            rootMargin: '0px',
            threshold: 0,
        }

        const observer = new IntersectionObserver(([target]) => {
            if (target.isIntersecting) {
                console.log('intersected');
                callback();
            }
        }, options)

        observer.observe(child);

        return function() {
            observer.unobserve(child);
        }
    }, [callback])
}