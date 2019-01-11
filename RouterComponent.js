import React from 'react';
import { StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-elements';
import { Stack, Scene, Router, Tabs, Actions } from 'react-native-router-flux';
import TabIcon from './components/common/TabIcon';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Trails from './components/Trails';
import Hikes from './components/Hikes';
import Profile from './components/Profile';
import Recorder from './components/Recorder';
import EditHike from './components/EditHike';
import ViewRecording from './components/ViewRecording';
import Settings from './components/Settings';

const RouterComponent = () => {
    return (
        <Router navigationBarStyle={styles.navbar} >
            <Scene headerForceInset={{ top: 'never' }} key='root'>
                <Stack key='auth' title='MyTrails' titleStyle={styles.title}>
                    <Scene
                        hideNavBar
                        key='login'
                        title='MyTrails'
                        titleStyle={styles.title}
                        component={LoginForm}
                    />
                    <Scene
                        hideNavBar
                        key='signup'
                        title='MyTrails'
                        titleStyle={styles.title}
                        component={SignupForm}
                    />
                </Stack>
                <Tabs key='home' hideNavBar labelStyle={{color: 'black'}} activeTintColor='green' inactiveTintColor='black'>
                    <Scene component={Trails} title='My Trails' titleStyle={styles.title} icon={TabIcon} iconName={'map'}/>
                    <Scene component={Hikes} title='My Hikes' titleStyle={styles.title} icon={TabIcon} iconName={'directions-walk'}/>
                    <Scene component={Recorder} title='Record' titleStyle={styles.title} icon={TabIcon} iconName={'fiber-manual-record'}/>
                    <Scene 
                        component={Profile} 
                        title='Profile' 
                        titleStyle={styles.title} 
                        icon={TabIcon} 
                        iconName='person'
                        onRight={() => Actions.push('settings')}
                        rightTitle={'Settings'}
                        rightButtonTextStyle={styles.title}
                    />
                </Tabs>
                <Scene 
                    key='editHike'
                    title='Hike Info'
                    titleStyle={styles.title}
                    navBarButtonColor={'white'}
                    component={EditHike}
                />
                <Scene
                    key='viewRecording'
                    title='Recording'
                    titleStyle={styles.title}
                    navBarButtonColor={'white'}
                    component={ViewRecording}
                />
                <Scene 
                    key='settings'
                    title='Settings'
                    titleStyle={styles.title}
                    navBarButtonColor={'white'}
                    component={Settings}
                />
            </Scene>
        </Router>
    );
};

trailsIcon = () => {
    return (
        <Icon name='map'></Icon>
    )
}

hikesIcon = () => {
    return (
        <Icon name={'directions-walk'} color={this.props.activeTintColor}></Icon>
    )
}

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: 'green',
    },
    title: {
        color: 'white'
    }
});

export default RouterComponent;