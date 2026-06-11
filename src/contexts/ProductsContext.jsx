import { createContext, useContext, useEffect, useRef, useState } from "react";

const ProductsContext = createContext();

function ProductsProvider({ children }) {

    const refProd = useRef(null);
    const refProducts = useRef(null);
    const refHome = useRef(null);
    const [visible, setVisible] = useState(false);


    const setRefs = (node, type) => {
        if (node) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisible(type === 'projects');
                    }
                },
                { threshold: type === 'home' ? 0.8 : 0.2 }
            );
            observer.observe(node);

            node._observer = observer;
        }
    };

    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //         (entries) => {
    //             entries.forEach((entry) => {

    //                 if (entry.isIntersecting) {
    //                     setVisible(true);
    //                 }
    //                 //   else {
    //                 //     setVisible(false); 
    //                 // }
    //             });
    //         },
    //         { threshold: 0.2 }
    //     );

    //     // Salviamo i valori correnti in variabili locali per la pulizia
    //     const currentProd = refProd.current;
    //     const currentProducts = refProducts.current;

    //     if (currentProd) observer.observe(currentProd);
    //     if (currentProducts) observer.observe(currentProducts);

    //     return () => {
    //         if (currentProd) observer.unobserve(currentProd);
    //         if (currentProducts) observer.unobserve(currentProducts);
    //         observer.disconnect();
    //     };
    // }, [refProd, refProducts]);

    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //         ([entry]) => {
    //             if (entry.target === refHome.current && entry.isIntersecting) {
    //                 setVisible(false);
    //             }
    //         },
    //         { threshold: 0.8 }
    //     );

    //     if (refHome.current) observer.observe(refHome.current);

    //     return () => observer.disconnect();
    // }, [refHome])

    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //         ([entry]) => {
    //             if (entry.target === refProd.current && entry.isIntersecting) {
    //                 setVisible(true);
    //             }
    //         },
    //         { threshold: 0.8 }
    //     );

    //     if (refProd.current) observer.observe(refProd.current);

    //     return () => observer.disconnect();
    // }, [])





    return (

        <ProductsContext.Provider
            value={{ refProducts, refProd, visible, refHome, setRefs }}>
            {children}
        </ProductsContext.Provider>
    )
}


function useProducts() {

    const context = useContext(ProductsContext);

    return context;
}

export { ProductsProvider, useProducts };