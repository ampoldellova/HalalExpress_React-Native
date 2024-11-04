import { StyleSheet, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'

const NetworkImage = ({ source, width, height, radius }) => {
  return (
    <Image
      source={{ uri: source }}
      style={styles.image(width, height, radius)}
    />
  )
}

export default NetworkImage

const styles = StyleSheet.create({
  image: (width, height, radius) => ({
    width: width,
    height: height,
    borderRadius: radius,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: COLORS.gray2
  })
})