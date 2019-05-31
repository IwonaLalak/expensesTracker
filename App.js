/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import RouterComponent from "./application/componens/Router/RouterComponent";
import styled from 'styled-components';
import FlashMessage from "react-native-flash-message";


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
                <FlashMessage position="center" />
            </Container>
        );
    }
}

const Container = styled.View`
    flex: 1;
    flexDirection: column;
    justifyContent: space-between;
`;
