/** @format */

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { axiosInstance } from '../config';
import Product from './Product';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-template-rows: repeat(auto-fit, 1fr);
`;

interface ProductsProps {
  category: string;
  filters: Object;
  sort: string;
}
export interface ProductDocument {
  _id: string;
  name: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
  img: { secure_url: string; id: string };
  categories: string[];
  size: string[];
  color: string[];
  price: number;
}

const Products: React.FC<ProductsProps> = ({ category, filters, sort }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(
          category ? `/getAllProducts?category=${category}` : `/getAllProducts`
        );
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    //TODO: DEBUG!!!
    if (sort === 'newest') {
      setProducts((prevState: any) =>
        [...prevState].sort((a: any, b: any) => a.createdAt - b.createdAt)
      );
    } else if (sort === 'asc') {
      setProducts((prevState: any) =>
        [...prevState].sort((a: any, b: any) => b.price - a.price)
      );
    } else {
      setProducts((prevState: any) =>
        [...prevState].sort((a: any, b: any) => a.price - b.price)
      );
    }
  }, [sort]);

  return (
    <Container className=' p-7'>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        products.map((product: ProductDocument) => {
          return (
            <Product
              img={product.img.secure_url}
              id={product._id}
              key={product._id}
            />
          );
        })
      )}
    </Container>
  );
};

export default Products;
