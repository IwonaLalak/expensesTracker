import React from 'react';
import {Actions, Router, Scene, Stack} from 'react-native-router-flux';
import HomeScene from "../../scenes/HomeScene/HomeScene";
import AddScene from "../../scenes/AddScene/AddScene";
import AboutScene from "../../scenes/AboutScene/AboutScene";
import Drawer from "react-native-drawer";
import SidebarComponent from "../Sidebar/SidebarComponent";
import {Button, Icon, Text} from "native-base";
import {Dimensions,View, TouchableOpacity, StyleSheet} from 'react-native';
import application_colors from "../../utilities/application_colors";
import CategoriesScene from "../../scenes/CategoriesScene/CategoriesScene";

export default class RouterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDrawerOpen: false,
        }
    }

    render() {
        return (

            <Drawer
                open={this.state.isDrawerOpen}
                type="overlay"
                content={<SidebarComponent closeDrawer={() => {
                    this.setState({isDrawerOpen: false})
                }}/>}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                styles={{drawer: {color: "red"}, main: {color: "blue"}}}
                tweenHandler={(ratio) => ({main: {opacity: (2 - ratio) / 2}})}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                }}>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <View>
                            <TouchableOpacity onPress={() => this.setState({isDrawerOpen: true})}>
                                <Icon name='menu' style={styles.iconStyle}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            {
                                Actions.currentScene === "HomeScene"?
                                    <View style={styles.quickAddContainter}>
                                        <TouchableOpacity onPress={() => Actions.push("AddScene")}>
                                            <Text style={styles.quickAddText}>+ DODAJ WPIS</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View></View>
                            }

                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                    }}>
                        <Router scenes={scenes}/>
                    </View>
                </View>
            </Drawer>
        );
    }
}


const styles = StyleSheet.create({

    sidebarContainer: {
        flex: 1,
    },

    iconStyle: {
        fontSize: 40,
        padding: 5,
        paddingLeft: 15,
        color: application_colors.main_color
    },

    quickAddContainter:{

        width: Dimensions.get('window').width - 80,
        margin:13,
    },

    quickAddText:{
        color:application_colors.add_color,
        fontWeight:"bold",
        textAlign: "right",
        fontSize:15
    }

});

const scenes = Actions.create(
    <Scene
        key="root"
        back={false}
        title="root"
        hideNavBar
        lazy
    >
        <Scene
            key="HomeScene"
            name="HomeScene"
            component={HomeScene}
            initial
            title="Scena home"
            hideNavBar
            reset

        />
        <Scene
            key="AddScene"
            name="AddScene"
            component={AddScene}
            title="Scena dodawania"
            hideNavBar
        />
        <Scene
            key="CategoriesScene"
            name="CategoriesScene"
            component={CategoriesScene}
            title="Scena kategorii"
            hideNavBar
        />
        <Scene
            key="AboutScene"
            name="AboutScene"
            component={AboutScene}
            title="Scena about"
            hideNavBar
        />
    </Scene>);