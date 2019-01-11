import React from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Card, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchHikes } from '../actions';
import { Actions } from 'react-native-router-flux';

class Hikes extends React.Component {

    constructor(props) {
        super(props);

        this.props.fetchHikes();

    }

    msToTimeString = (duration) => {
        const seconds = Math.floor((duration / 1000)) % 60;
        const minutes = Math.floor((duration / (1000 * 60))) % 60;
        const hours = Math.floor((duration / (1000 * 60 * 60))) % 24;
        const days = Math.floor((duration / (1000 * 60 * 60 * 24)));
        
        const D = (days > 0) ? days + ' days, ' : '';

        return D + hours + ':' + minutes + ':' + seconds;
    }

    mToDistanceString = (distance) => {
        if (distance > 1000) {
            return Number.parseFloat(distance).toPrecision(2) + ' km';
        } else {
            return Number.parseFloat(distance).toPrecision(2) + ' m';
        }
    }

    renderHikes = () => {
        const hikes = this.props.tracks;

        // const cards = hikes.map((hike) => this.renderHikeCard(hike));

        // return cards;

        return (
            <FlatList
                data={hikes}
                renderItem={({item: track}) => this.renderHikeCard(track)}
            />
        );
    };

    renderHikeCard = (track) => {

        const time = this.msToTimeString(track.stats.time);
        const distance = Number.parseFloat(track.stats.distance).toPrecision(2) + ' km';
        const elevation = Math.floor(track.stats.elevation) + ' m';

        return(
            <TouchableWithoutFeedback onPress={() => Actions.viewRecording({track: track})}>
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
            </TouchableWithoutFeedback>
            
        );
    }

    render() {
        if (this.props.tracks.length < 1) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>This is where my <Text style={{color: 'green'}}>hikes</Text> will be displayed!</Text>
                </View>
            );
        };
        return (
            <View style={{flex: 1}}>
                { this.renderHikes() }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const tracks = state.hikes.tracks;

    return {
        tracks: tracks
    };
}

export default connect(mapStateToProps, { fetchHikes })(Hikes);