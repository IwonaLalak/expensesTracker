import React from 'react';
import styled from 'styled-components';
import {Platform, StyleSheet, Text, View,} from 'react-native';

export default class SettingsScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Container>
                <Text>settings scene</Text>
            </Container>
        );
    }


}
const Container = styled.View`
    flex: 1;
    flexDirection: column;
    justifyContent: space-between;
    backgroundColor:whitesmoke;
`;