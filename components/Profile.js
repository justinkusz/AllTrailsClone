import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Card } from 'react-native-elements';
import { connect } from 'react-redux';

class Profile extends React.Component {
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

    renderStatsCard = () => {
        const hikes = this.props.userStats.hikes;
        const distance = Number.parseFloat(this.props.userStats.distance).toPrecision(2) + ' km';
        const elevation = Number.parseFloat(this.props.userStats.elevation).toPrecision(2) + ' m';
        const time = this.msToTimeString(this.props.userStats.time);

        return (
            <Card title='Lifetime Stats'>
                <View>
                    <Text>Total number of hikes: <Text>{hikes}</Text></Text>
                    <Text>Total distance: <Text>{distance}</Text></Text>
                    <Text>Total elevation gain: <Text>{elevation}</Text></Text>
                    <Text>Total time: <Text>{time}</Text></Text>
                </View>
            </Card>
        );
    };

    renderUserInfoCard = () => {
        return (
            <Card>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Avatar large source={{uri: this.props.profilePhotoURL}}></Avatar>
                    <View style={{flex: 1, justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 24, paddingLeft: 10}}>{this.props.displayName}</Text>
                        <Text style={{paddingLeft: 10}}>{this.props.email}</Text>
                        <Text style={{paddingLeft: 10}}>User since: {this.props.userSince}</Text>
                    </View>
                </View>
            </Card>
        );
    };

    render() {
        return (
            <View>
                {this.renderUserInfoCard()}
                {this.renderStatsCard()}
            </View>
        );
    };

}

const mapStateToProps = (state) => {
    const { user } = state.auth;
    const profilePhotoURL = user.photoURL;
    const displayName = user.displayName;
    const email = user.email;
    const createDate = new Date(Date.parse(user.metadata.creationTime));
    
    const userSince = createDate.toLocaleDateString();
    const userStats = state.profile.stats;

    return {
        profilePhotoURL: profilePhotoURL,
        displayName: displayName,
        email: email,
        userSince: userSince,
        userStats: userStats
    }
};

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default connect(mapStateToProps)(Profile);