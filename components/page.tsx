import Link from 'next/link';
import { connect } from 'react-redux';
import Loader from './shared/loader/loader'

function Page({
  error,
  linkTo,
  NavigateTo,
  product,
  title
}) {
  return (
    <div>
      <Loader />
      <h1>{title}</h1>
      <nav>
        <Link href={linkTo}>
          <a>Navigate: {NavigateTo}</a>
        </Link>
      </nav>
      {product.data.length > 0 && (
        <pre>
          <code>{JSON.stringify(product.data, null, 2)}</code>
        </pre>
      )}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>

  )
}

export default connect(state => state)(Page)
