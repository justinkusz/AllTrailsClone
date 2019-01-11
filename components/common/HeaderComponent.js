import React from 'react';
import { Text } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { sceneChanged } from '../../actions';

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Header
                backgroundColor={'green'}
                statusBarProps={{translucent: true, barStyle: 'light-content', backgroundColor: 'green'}}
                leftComponent={this.renderTitle()}
                // centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                // rightComponent={{ icon: 'search', color: '#fff' }}
            />
        )
    }

    renderTitle = () => {
        let title;
        switch (this.props.scene) {
            case 'login':
                title = 'MyTrails';
            case 'signup':
                title = 'Sign Up' 
        }

        return (
            <Text style={{color: 'white', fontSize: 18}}>{title}</Text>
        );
    }
}

const mapStateToProps = (state) => {
    const { scene } = state;

    return {
        scene: scene
    }
};

export default connect(mapStateToProps, { sceneChanged })(HeaderComponent);