import React from 'react';
import styled from 'styled-components';
import {Alert, StyleSheet, View,} from 'react-native';
import {Button, Text} from "native-base";
import application_colors from "../../utilities/application_colors";
import SettingsController from "../../controllers/SettingsController";
import {showMessage} from "react-native-flash-message";

export default class SettingsScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    onPressCleanAllPosts() {
        Alert.alert(
            "Czy na pewno chcesz usunąć wszystkie wpisy?",
            "Ta akcja skutkuje utraceniem wszystkich wpisów",
            [
                {text: "NIE", style: 'cancel'},
                {text: "TAK", onPress: () => this.deleteAllPosts()}
            ]
        )
    }

    deleteAllPosts() {
        SettingsController.deleteAllPosts().then(
            function (response) {
                if(response.ok){
                    showMessage({
                        message: "Pomyślnie usunięto "+response.data+' wpisów',
                        type: "success",
                        position: "center",
                        icon: 'success'
                    });
                }
            }.bind(this))
            .catch(function (err) {
                console.log(err)

                showMessage({
                    message: "Wystąpił błąd - nie można usunąć wpisów",
                    type: "danger",
                    position: "center",
                    icon: 'danger'
                });

            }.bind(this))
    }

    render() {
        return (
            <Container>
                <View style={styles.S1_container}>
                    <Button icon={'brush'} onPress={()=>this.onPressCleanAllPosts()} style={styles.S1_btn} block={true}><Text>Wyczyść wszystkie wpisy</Text></Button>
                </View>
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

const styles = StyleSheet.create({

    S1_container: {
        margin: 15,
    },

    S1_btn: {
        backgroundColor: application_colors.red_lighter,
    },
})