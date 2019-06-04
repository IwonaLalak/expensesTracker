import React from 'react';
import {Text, Button, Icon} from "native-base";
import {View, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import application_colors from "../../utilities/application_colors";
import {Actions} from "react-native-router-flux";

export default class SidebarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.sidebarContainer}>
                <ScrollView>
                    <View>
                        <TouchableOpacity onPress={() => {
                            this.props.closeDrawer(Actions.currentScene)
                        }}>
                            <Icon name='close' style={styles.iconStyle} color={"white"}/>
                        </TouchableOpacity>
                        <View style={styles.menuContainer}>
                            <TouchableOpacity onPress={() => {
                                Actions.push("HomeScene");
                                this.props.closeDrawer("HomeScene")
                            }}>
                                <Text style={styles.menuLink}>HOME</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                Actions.push("AddScene");
                                this.props.closeDrawer("AddScene")
                            }}>
                                <Text style={styles.menuLink}>NOWY WPIS</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                Actions.push("AllPostsScene");
                                this.props.closeDrawer("AllPostsScene")
                            }}>
                                <Text style={styles.menuLink}>WSZYSTKIE WPISY</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                Actions.push("CategoriesScene");
                                this.props.closeDrawer("CategoriesScene")
                            }}>
                                <Text style={styles.menuLink}>KATEGORIE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                Actions.push("SettingsScene");
                                this.props.closeDrawer("SettingsScene")
                            }}>
                                <Text style={styles.menuLink}>USTAWIENIA</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.versionContainer}>
                        <Text style={styles.versionText}>ver 0.1 2019-05-21</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({

    sidebarContainer: {
        backgroundColor: application_colors.main_color,
        flex: 1,

    },

    iconStyle: {
        fontSize: 40,
        padding: 5,
        paddingLeft: 15,
        color: "white"
    },

    menuContainer: {
        paddingTop: 15,
        paddingLeft: 5,
        paddingRight: 5,
    },

    menuLink: {
        borderStyle: "solid",
        borderColor: application_colors.main_color_lighter,
        borderBottomWidth: 1,
        color: "white",
        padding: 15,
        paddingLeft: 10,
        fontSize: 16,

    },

    versionContainer: {},

    versionText: {
        color: "white",
        fontSize: 10,
        padding: 15,
    }

});


