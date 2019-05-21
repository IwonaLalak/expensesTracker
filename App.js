/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,} from 'react-native';
import RouterComponent from "./application/componens/Router/RouterComponent";
import styled from 'styled-components';
import {Button} from "native-base";


type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container>
                <RouterComponent />
            </Container>
        );
    }
}

const Container = styled.View`
    flex: 1;
    flexDirection: column;
    justifyContent: space-between;
`;
