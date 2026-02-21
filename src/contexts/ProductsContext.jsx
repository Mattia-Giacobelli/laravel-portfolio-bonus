import { createContext, useContext, useEffect, useRef, useState } from "react";

const ProductsContext = createContext();

function ProductsProvider({ children }) {

    const refProd = useRef(null);
    const refHome = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {

                if (entry.target === refProd.current && entry.isIntersecting) {
                    setVisible(true);
                }

            },
            { threshold: 0.2 }
        );

        if (refProd.current) observer.observe(refProd.current);

        return () => observer.disconnect();
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.target === refHome.current && entry.isIntersecting) {
                    setVisible(false);
                }
            },
            { threshold: 0.8 }
        );

        if (refHome.current) observer.observe(refHome.current);

        return () => observer.disconnect();
    }, [])





    return (

        <ProductsContext.Provider
            value={{ refProd, visible, refHome }}>
            {children}
        </ProductsContext.Provider>
    )
}


function useProducts() {

    const context = useContext(ProductsContext);

    return context;
}

export { ProductsProvider, useProducts };