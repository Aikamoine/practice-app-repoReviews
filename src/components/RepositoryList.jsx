import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import TextInput from './TextInput';
import React from 'react';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  constructor(repositories, order, setOrder, filter, setFilter, filtervalue, onEndReach) {
    super()
    this.repositories = repositories
    this.order = order
    this.setOrder = setOrder
    this.filter = filter
    this.setFilter = setFilter
    this.filtervalue = filtervalue
    this.onEndReach = onEndReach
  }

  //could not get this to not defocus, spent a good hour trying :(
  renderHeader = () => {
    return (
      <View>
        <TextInput onChange={(e) => { this.setFilter(e.target.value) }} value={this.filter}></TextInput>
        <Picker
          selectedValue={this.order}
          onValueChange={
            (itemValue, itemIndex) => this.setOrder(itemValue)
          }
        >
          <Picker.Item label="Latest repositories" value="latest" />
          <Picker.Item label="Highest rated repositories" value="best" />
          <Picker.Item label="Lowest rated repositories" value="worst" />
        </Picker>
      </View>
    )
  }

  render() {   
    const repositoryNodes = this.repositories
    ? this.repositories.edges.map((edge) => edge.node)
      : [];
    return (
      <FlatList
        data={repositoryNodes}
        renderItem={({ item }) => <RepositoryItem repo={item} gitLink={false} />}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.onEndReach}
        onEndReachedThreshold={0.5}
      />
    )
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState('latest')
  const [filter, setFilter] = useState('')
  const filtervalue = useDebounce(filter, 500)
  const { repositories } = useRepositories(order, filter)

  const onEndReach = () => {
    console.log('this is the end, my friend')
  }

  if (repositories) {
    const container = new RepositoryListContainer(
      repositories,
      order,
      setOrder,
      filter,
      setFilter,
      filtervalue,
      onEndReach
    )
    return container.render()
  }
  return <Text>Loading...</Text>  
};

export default RepositoryList;