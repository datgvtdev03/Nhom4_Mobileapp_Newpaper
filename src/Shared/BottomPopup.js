import {
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
} from 'react-native';
import React from 'react';

const deviceHeight = Dimensions.get('window').height;
export class BottomPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      selectedItem: null, //Thêm state để lưu trữ item được chọn
    };
  }

  closeWithItem = item => {
    const {onCloseWithItem} = this.props;
    this.setState({show: false, selectedItem: item}); // Lưu trữ item được chọn vào state
    onCloseWithItem(item);
  };

  show = () => {
    this.setState({show: true});
  };

  close = () => {
    this.setState({show: false});
  };

  handleSearchTextChange = text => {
    this.setState({searchText: text});
  };

  renderFilteredData = () => {
    const { data } = this.props;
    const { searchText } = this.state;

    if (!searchText) {
      return (
        <FlatList
          style={{ marginBottom: 20 }}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={this.renderItem}
          extraData={this.state.selectedItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      );
    }

    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
      <FlatList
        style={{ marginBottom: 20 }}
        showsVerticalScrollIndicator={false}
        data={filteredData}
        renderItem={this.renderItem}
        extraData={this.state.selectedItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={this.renderSeparator}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    );
  };
  renderOutsideTouchable(onTouch) {
    const view = <View style={{flex: 1, width: '100%'}} />;
    if (!onTouch) {
      return view;
    }

    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{flex: 1, width: '100%'}}>
        {view}
      </TouchableWithoutFeedback>
    );
  }

  renderTitle = () => {
    const {title} = this.props;
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.textTitle}>{title}</Text>
      </View>
    );
  };


  renderContent = () => {
    return (
      <View>
        {this.renderFilteredData()}
      </View>
    );
  };

  renderItem = ({item}) => {
    const {selectedItem} = this.state;
    return (
      <View
        style={{
          height: 50,
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => {
            this.closeWithItem(item); // Gọi phương thức close để ẩn popup va luu tru duoc chon
          }}>
          <Text style={{fontSize: 14, fontWeight: 'bold', marginLeft: 20}}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderSeparator = () => (
    <View
      style={{
        opacity: 0.1,
        backgroundColor: '#182e44',
        height: 1,
      }}
    />
  );

  renderSelectedItem = () => {
    const {selectedItem} = this.state;
    if (selectedItem) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.textItemSelected}>{selectedItem.name}</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  render() {
    let {show} = this.state;
    const {onTouchOutside, title} = this.props;

    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={show}
        onRequestClose={this.close}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000AA',
            justifyContent: 'flex-end',
          }}>
          {this.renderOutsideTouchable(onTouchOutside)}
          <View style={styles.viewPopup}>
            {this.renderTitle()}
            {this.renderContent()}
            {this.renderSelectedItem()}
            {/* Hiển thị item được chọn  */}
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  textTitle: {
    color: '#182e44',
    fontSize: 20,
    fontWeight: 500,
    margin: 15,
  },
  viewPopup: {
    backgroundColor: '#ffffff',
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 10,
    // maxHeight: deviceHeight,
    maxHeight: 350,
  },
  textItemSelected: {
    color: '#182e44',
    fontSize: 12,
    fontWeight: 'bold',
    margin: 10,
  },
});
