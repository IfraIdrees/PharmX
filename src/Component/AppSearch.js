import { Color, CommonStyles, Fonts, Images, Responsive, Screen } from '../Helper'
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { PureComponent } from 'react'

import { Actions } from 'react-native-router-flux'
import { PaperScreen } from '../Screen/PaperScreen/PaperScreen';

export default class AppSearch extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
    }
  }

  onPressSearchClick = (toSearch) => () => {
    console.log('search value => ', toSearch)
    const { onPressSearch } = this.props

    const paperlistT = global.paperlistT;
    const paperlistP = global.paperlistP;
    const resultP = paperlistP.filter((obj) => obj.name.toLowerCase().includes(toSearch.toLowerCase()));
    console.log("surch test P=> " + resultP);
    const resultT = paperlistT.filter((obj) => obj.name.toLowerCase().includes(toSearch.toLowerCase()));
    console.log("surch test T=> " + resultT);
    if (Actions.currentScene === Screen.DashBoardScreen) {
      if (resultP.length > 0 || resultT.length > 0) {
        Actions[Screen.PaperScreen]({ tlist: resultT, plist: resultP })
      }
    }
    else if ((Actions.currentScene === Screen.PaperScreen)) {
      if (resultP.length > 0 || resultT.length > 0) {
        onPressSearch(resultT, resultP)
      }
    }
  }
  render() {
    const { search } = this.state
    return (
      <View style={[styles.searchBox, CommonStyles.shadow, { backgroundColor: Color.darkbrown }]}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Paper"
          placeholderTextColor={Color.darkskin}
          value={search}
          onChangeText={(search) => { this.setState({ search: search }) }}
        />
        <TouchableOpacity style={styles.searchImgBox} onPress={this.onPressSearchClick(search)}>
          <Image resizeMode="contain" source={Images.newsearch} style={styles.searchImg} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchBox: {
    width: Responsive.widthPx(80),
    height: Responsive.heightPx(7),
    borderRadius: Responsive.heightPx(3),
    paddingLeft: 15,
    alignSelf: 'center',
    marginTop: Responsive.heightPx(1),
    flexDirection: 'row',
    alignContent: 'center'
  },
  searchInput: {
    flex: 1,
    fontSize: Responsive.font(2),
    fontFamily: Fonts.regular,
    color: Color.black
  },
  searchImgBox: {
    height: Responsive.heightPx(5.5),
    aspectRatio: 1,
    backgroundColor: Color.darkskin,
    ...CommonStyles.centerItem,
    ...CommonStyles.shadowGreen,
    alignSelf: 'center',
    borderRadius: Responsive.heightPx(10),
    marginRight: Responsive.widthPx(2)
  },
  searchImg: {
    height: Responsive.heightPx(5),
    aspectRatio: 0.5,
    tintColor:Color.grayShade70


  }
})
