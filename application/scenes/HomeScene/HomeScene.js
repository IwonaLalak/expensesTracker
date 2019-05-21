import React from 'react';
import styled from 'styled-components';
import {Platform, StyleSheet, View,} from 'react-native';
import {Actions} from "react-native-router-flux";
import {Header, Content, Button, Text} from 'native-base';


export default class HomeScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    onPressButton() {
        Actions.push("AddScene");
    }


    render() {


        return (
            <Container>
                <Text>home scene</Text>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                    }}
                >
                    <View style={{flex:1}}>
                        <Button full={true}>
                            <Text>Click Me!</Text>
                        </Button>
                    </View>
                    <View style={{flex:1}}>
                        <Button danger={true} full={true}>
                            <Text>Click Me!</Text>
                        </Button>

                    </View>
                </View>
            </Container>
        );
    }
}

const Container = styled.View`
    flex: 1;
    flexDirection: column;
    justifyContent: space-between;
`;

