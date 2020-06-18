import {StyleSheet} from 'react-native'
import {Metrics} from '~/theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Metrics.spacing.three,
  },
  section: {
    marginBottom: Metrics.spacing.four,
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
  },
})

export default styles
