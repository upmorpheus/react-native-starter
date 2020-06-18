/**
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react'
import {SafeAreaView, ScrollView, View, Text} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {Card} from '~/components'
import ProductActions from '~/actions/product'
import styles from './style'

const BundleScreen = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(ProductActions.getbundlesRequest())
  }, [])

  const bundle = useSelector(state => state.product.bundle.bundle)
  const {subscribed, unsubscribed} = bundle
  console.log(bundle.title)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {subscribed && (
          <View style={styles.section}>
            <Text style={styles.title}>Recommended Products</Text>
            {subscribed.map((item, index) => (
              <Card data={item} key={`sub${index}`} />
            ))}
          </View>
        )}

        {unsubscribed && (
          <View style={styles.section}>
            <Text style={styles.title}>Recommended Products</Text>
            {unsubscribed.map((item, index) => (
              <Card data={item} key={`uns${index}`} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default BundleScreen
