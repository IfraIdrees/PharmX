import { Modal, View, StyleSheet, ActivityIndicator } from 'react-native'
import React, { PureComponent } from 'react'
import { Color, Responsive } from '../Helper'

class AppLoader extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  showLoader = (isLoading) => {
    this.setState({ isLoading })
  }

  render() {
    const { visible, onRequestClose } = this.props
    const { isLoading } = this.state
    return (
      <Modal
        animationType="fade"
        visible={visible || isLoading}
        transparent
        onRequestClose={onRequestClose}
      >
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <ActivityIndicator color={Color.primary} size="large" />
          </View>
        </View>
      </Modal>
    )
  }
}

export default AppLoader

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.modalOverlay
  },
  innerContainer: {
    width: Responsive.widthPx(25),
    height: Responsive.widthPx(25),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  }
})
