import { useEffect, useState } from 'react';
import productApi from '~/api/productApi';

export default function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await productApi.get(productId);
        setProduct(result);
        // console.log(result);
      } catch (error) {
        console.log('Failed to fecth', error);
      }
      setLoading(false);
    })();
  }, [productId]);
  return { product, loading };
}
