import React from 'react';
import styled from 'styled-components';
import {Platform, StyleSheet, View} from 'react-native';
import {Header, Content, Button, Text} from 'native-base';
import {Actions} from "react-native-router-flux";

export default class AddScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Container>
                <Text>add scene</Text>
                <Button title={"Goto home"} onPress={()=>{
                 Actions.pop();
                }} />
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