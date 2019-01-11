import React from 'react';
import { View, Text } from 'react-native';

class Trails extends React.Component {

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>This is where my <Text style={{color: 'green'}}>trails</Text> will be displayed!</Text>
            </View>
        )
    }
}

export default Trails;