import React from 'react';
import {Content, Icon, List, Container as ListContainer, ListItem, Text} from "native-base";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Actions} from "react-native-router-flux";

export default class CategoriesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ListContainer>
                <Content>
                    <List>
                        {
                            this.props.categories.map(category => {
                                return (
                                    <ListItem key={category.id}>
                                        <TouchableOpacity flex={1} style={styles.L_main_container}
                                                          onPress={() => {
                                                              Actions.push("AddCategory", {category: category, editMode: true})
                                                          }}>
                                            <View style={styles.L_icon_container}>
                                                <Icon name={category.icon} type={category.iconGroup}
                                                      style={[styles.L_icon, {
                                                          color: category.color,
                                                          borderColor: category.color
                                                      }]}/>
                                            </View>
                                            <View flex={1} style={styles.L_text_container}>
                                                <View style={styles.L_descr_container}>
                                                    <Text style={styles.L_descr}>{category.name}</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <TouchableOpacity onPress={() => {
                                                    Actions.push("AddCategory", {category: category, editMode: true})
                                                }}><Icon name={'pencil'} type={'FontAwesome'} style={styles.L_edit}/></TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                        {/*</View>*/}
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Content>
            </ListContainer>
        );
    }


}

const styles = StyleSheet.create({

    L_main_container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    L_icon_container: {
        marginRight: 10
    },

    L_icon: {
        fontSize: 20,
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 25,
        borderColor: "blue",
        color: "blue",
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 4,
        paddingBottom: 2,
        textAlign: "center",
        marginTop: 3,
        width: 30,

    },

    L_text_container: {
        alignSelf: "flex-start"
    },

    L_date_container: {
        alignSelf: "flex-start"
    },

    L_date: {
        color: "grey",
        fontSize: 12,
    },

    L_descr_container: {
        alignSelf: "flex-start"
    },

    L_descr: {
        fontSize: 14,
        alignSelf: 'flex-start',
        marginTop: 8
    },

    L_edit_container: {},

    L_edit: {
        color: 'grey',
        fontSize: 20,
        marginTop: 8,
    },

});