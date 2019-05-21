import React from 'react';
import styled from 'styled-components';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
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
            </Container>
        );
    }


}

const Container = styled.View`
    flex: 1;
    flexDirection: column;
    justifyContent: space-between;
`;