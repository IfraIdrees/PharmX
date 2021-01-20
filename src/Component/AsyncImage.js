import React, { useEffect, useRef, useState } from 'react'
import { View, Image, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { Color, CommonStyles, Images } from '../Helper'

const usePreviousForSource = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

export default function AsyncImage(props) {
  //   console.log('AsyncImage source change => ', props.source)
  const [style] = useState(props.style)
  const [source, setSource] = useState(props.source)
  const prevSource = usePreviousForSource(props.source)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (JSON.stringify(prevSource) !== JSON.stringify(props.source)) {
      setSource(props.source)
    }
    // console.log('source change => ', props.source)
  }, [props.source])

  function onLoadStart() {
    // console.log('load start image')
    setLoaded(true)
  }
  function onLoadEnd() {
    // console.log('load end image')
    setLoaded(false)
  }

  return (
    <View style={style}>
      <Image
        defaultSource={Images}
        source={source}
        resizeMode={'contain'}
        style={[CommonStyles.resizeModeStyle, style]}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onError={(errorData) => {
          setLoaded(false)
        }}
      />
      {loaded ? (
        <View style={[CommonStyles.positionCenterAsyncImage, { backgroundColor: Color.transparent }]}>
          <ActivityIndicator color={Color.greenProgres} />
        </View>
      ) : null}
    </View>
  )
}

AsyncImage.propTypes = {
  source: PropTypes.any,
  style: PropTypes.any,
  onLoadCall: PropTypes.func,
}

AsyncImage.defaultProps = {
  source: '',
  onLoadCall: () => { },
}
