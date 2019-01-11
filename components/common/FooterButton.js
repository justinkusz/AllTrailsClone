import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

class FooterButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            icon: props.icon,
            iconType: props.iconType,
            text: props.text,
            selected: props.selected
        };

    }

    componentWillReceiveProps(props) {
        this.setState({ selected: props.selected });
    }
    
    render() {
        const { container, button, selectedButton } = styles;
        const { icon, iconType, text, selected } = this.state;

        let isSelected = (selected) ? 'true' : 'false';

        return (
            <View style={container}>
                <Icon name={icon} type={iconType} iconStyle={selected ? selectedButton : button}></Icon>
                <Text style={this.state.selected ? selectedButton : button}>{text}</Text>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        color: 'black'
    },
    selectedButton: {
        color: 'green'
    }
})

export default FooterButton;