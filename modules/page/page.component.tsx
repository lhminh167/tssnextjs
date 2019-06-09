import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { useReduxDispatch, useReduxState } from 'reactive-react-redux';
import { getPending } from '../generics/generics.actions';
import { enqueueSnackbar } from '../notifier/notifier.redux';
import { product } from '../product/product.model';
import ProductFilter from '../product.filter/product.filter.component';
import ProductCard from '../product.card/product.card.component';


function Page(props) {

  const {
    error,
    linkTo,
    NavigateTo,
    title,
  } = props;
  const [count, setCount] = useState(0);
  const state = useReduxState();
  const dispatch = useReduxDispatch();

  useEffect(() => {
    // dispatch(getPending(productFilter.entityName));
    // dispatch(getPending(product.entityName));
    return () => { return; };
  }, [])

  const handleClick= () => {
    setCount(count + 1)
    const snack = {
      message: count,
      options: {
        variant: 'warning',
      },
    }
    dispatch(enqueueSnackbar(snack))
    return 
  }
  


  return (
    <Fragment>

      {/* <Button onClick={handleClick}>Show snackbar</Button> */}

      <h1>{title}</h1>

      <nav>
        <Link href={linkTo}>
          <a>Navigate: {NavigateTo}</a>
        </Link>
      </nav>
      
      <ProductFilter/>

      <ProductCard/>

      {/* {state.product.data.length > 0 && (
        <pre>
          <code>{JSON.stringify(state.product.data, null, 2)}</code>
        </pre>
      )}

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>} */}

    </Fragment>
  )
}

export default Page;

