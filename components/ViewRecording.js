import React from 'react';
import { View, Text } from 'react-native';
import { Card, Rating } from 'react-native-elements';

class ViewRecording extends React.Component {
    constructor(props) {
        super(props);
    }

    msToTimeString = (duration) => {
        const seconds = Math.floor((duration / 1000)) % 60;
        const minutes = Math.floor((duration / (1000 * 60))) % 60;
        const hours = Math.floor((duration / (1000 * 60 * 60))) % 24;
        const days = Math.floor((duration / (1000 * 60 * 60 * 24)));
        
        const D = (days > 0) ? days + ' days, ' : '';

        return D + hours + ':' + minutes + ':' + seconds;
    }

    render() {
        const track = this.props.track;
        const distance = Number.parseFloat(track.stats.distance).toPrecision(2) + ' km';
        const elevation = Number.parseFloat(track.stats.elevation).toPrecision(2) + ' m';
        const time = this.msToTimeString(track.stats.time);

        return (
            <View style={{flex: 1}}>
                <Card
                    key={track.key} 
                    image={{uri: track.snapshotURL}}
                    imageProps={{resizeMode: 'cover'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>{track.title}</Text>
                    <Rating
                        imageSize={14}
                        type='star'
                        fractions={0}
                        readonly
                        startingValue={track.rating}
                    />
                    <Text>{track.stats.date}</Text>
                </Card>

                <Card title='Stats'>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>Distance: {distance}</Text>
                        <Text>Elevation gain: {elevation}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>Total time: {time}</Text>
                    </View>
                </Card>

                <Card title='Photos'></Card>
            </View>
        );
    }

}

export default ViewRecording;