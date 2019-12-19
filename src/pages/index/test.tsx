import { inject, observer } from "@tarojs/mobx";
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components"

@inject('counterStore')
@observer
export default class TestListRender extends Component {

  render() {
    const { counterStore: { computedArr } } = this.props
    console.log('render', computedArr)
    return (
      <View>
        Output:
        {computedArr.map(item => {
          return (
            <View key={item.id}>
              <Text>item.exp: {item.exp}</Text>
            </View>
          )
        })}
      </View>
    )
  }
}
