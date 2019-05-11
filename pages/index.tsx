import React from 'react'
import { connect } from 'react-redux'

import Page from '../components/page'
import { productTickClock } from '../store/product.actions';
import { loadData, startClock } from '../generics/actions';

class Index extends React.Component {
  static async getInitialProps (props) {
    const { store, isServer } = props.ctx
    // store.dispatch(productTickClock(isServer))

    if (!store.getState().placeholderData) {
      store.dispatch(loadData())
    }

    return { isServer }
  }

  componentDidMount () {
    // this.props.dispatch(startClock())
  }

  render () {
    return <Page title='Index Page' linkTo='/other' NavigateTo='Other Page' />
  }
}

export default connect()(Index)
