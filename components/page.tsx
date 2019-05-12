import Link from 'next/link'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';

function Page ({
  error,
  linkTo,
  NavigateTo,
  product,
  title
}) {
  return (
    <div>
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
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
    
  )
}

export default connect(state => state)(Page)
