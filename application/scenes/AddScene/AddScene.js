import React from 'react';
import styled from 'styled-components';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import {Header, Content, Button, Text, Form} from 'native-base';
import {Actions} from "react-native-router-flux";
import application_colors from "../../utilities/application_colors";

export default class AddScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Container>
                <View style={styles.H_container}>
                    <Text style={styles.H_container_text}>
                        DODAJ NOWY WPIS
                    </Text>
                </View>
                <ScrollView>
                    <Content>
                        <Form>
                            <View>
                                <View>

                                </View>
                                <View>

                                </View>
                            </View>
                            <View>

                            </View>
                        </Form>
                    </Content>
                </ScrollView>
            </Container>
        );
    }


}

const Container = styled.View`
    flex: 1;
    flexDirection: column;
    justifyContent: space-between;
`;

const styles = StyleSheet.create({

    H_container: {
        backgroundColor: application_colors.main_color,
    },

    H_container_text: {
        textAlign: "center",
        color: "white",
        padding: 14,
    },
});