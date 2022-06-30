import { View, Image } from "react-native"
import React from "react"
import Text from './Text'
import theme from "../theme"

const FormatNumber = ({ number }) => {
  const numberValue = number > 1000
    ? String(Math.round((number / 1000) * 10) / 10) + "k"
    : number
  return (
   <Text style={{fontWeight: theme.fontWeights.bold}}>{numberValue}</Text>
  )
}

const RepositoryItem = ({ repo }) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={{flexDirection: 'row', gap: 20}}>
        <Image
        style={{ width: 50, height: 50, borderRadius: 5 }}
        source={{ uri: repo.ownerAvatarUrl }}
        />
        <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
          <Text style={{ fontWeight: theme.fontWeights.bold }}>{repo.fullName}</Text>
          <Text>{repo.description}</Text>
          <Text style={{
            backgroundColor: theme.colors.primary,
            alignSelf: 'flex-start',
            color: 'white',
            borderRadius: 5,
            padding: 5,
            fontWeight: theme.fontWeights.bold
          }}>
            {repo.language}
          </Text>
        </View>
        
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <View style={{ flexDirection: 'column', gap:5}}>
          <FormatNumber number={repo.stargazersCount} />
          <Text>Stars</Text>
        </View>
        <View style={{ flexDirection: 'column', gap:5}}>
          <FormatNumber number={repo.forksCount} />
          <Text>Forks</Text>
        </View>
        <View style={{ flexDirection: 'column', gap:5}}>
          <FormatNumber number={repo.reviewCount} />
          <Text>Reviews</Text>
        </View>
        <View style={{ flexDirection: 'column', gap:5}}>
          <FormatNumber number={repo.ratingAverage} />
          <Text>Rating</Text>
        </View>

      </View>
    </View>
  )
}

export default RepositoryItem