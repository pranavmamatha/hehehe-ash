"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

interface Product {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    tags: string[];
}

const ProductsSection = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/products', {
                withCredentials: true
            });
            
            const productsData = response.data.products || [];
            
            // Transform the data to match our Product interface
            const transformedProducts = productsData.map((item: any) => ({
                id: item._id,
                name: item.name,
                description: item.description,
                technologies: item.technologies || [],
                tags: item.tags || []
            }));
            
            setProducts(transformedProducts);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error instanceof Error ? error : new Error('An error occurred'));
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error.message}</div>;

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Products Section</h2>
                <Link 
                    href="/add-product"
                    className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    + New Product
                </Link>
            </div>
            
            {/* Scrollable Products Container */}
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide min-h-0">
                <div className="space-y-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div 
                                key={product.id} 
                                className="p-4 rounded-lg border bg-background hover:bg-accent transition-colors cursor-pointer"
                            >
                                <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                                <p className="text-sm text-muted-foreground mb-3">
                                    {product.description}
                                </p>
                                <div className="space-y-2">
                                    {product.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {product.technologies.map((tech, index) => (
                                                <span 
                                                    key={index}
                                                    className="text-sm px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {product.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {product.tags.map((tag, index) => (
                                                <span 
                                                    key={index}
                                                    className="text-sm px-2.5 py-0.5 rounded-full bg-background border text-foreground"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-muted-foreground p-4">
                            No products found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsSection; 