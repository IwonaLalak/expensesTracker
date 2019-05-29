import React from 'react';
import {Content, Icon, List, Container as ListContainer, ListItem, Text} from "native-base";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import application_colors from "../../../utilities/application_colors";
import money from "../../../utilities/money";
import {Actions} from "react-native-router-flux";

export default class PostsList extends React.Component {
    render() {

        if(this.props.posts.length === 0){
            return(<Text style={styles.noposts}>BRAK WPISÓW</Text>)
        }
        else
        return (
            <ListContainer>
                <Content>
                    <List>
                        {
                            this.props.posts.map(post => {
                                return (
                                    <ListItem key={post.id}>
                                        <TouchableOpacity flex={1} style={styles.L_main_container}
                                                          onPress={() => {
                                                              Actions.push("AddScene",{post:post, editMode:true})
                                                          }}>
                                            <View style={styles.L_icon_container}>
                                                <Icon name={post.category_icon} type={post.category_iconGroup}
                                                      style={[styles.L_icon, {
                                                          color: post.category_color,
                                                          borderColor: post.category_color
                                                      }]}/>
                                            </View>
                                            <View flex={1} style={styles.L_text_container}>
                                                <View style={styles.L_date_container}>
                                                    <Text style={styles.L_date}>
                                                        {post.date}
                                                    </Text>
                                                </View>
                                                <View style={styles.L_descr_container}>
                                                    <Text style={styles.L_descr}>{post.category_name}</Text>
                                                    {
                                                        (Boolean(post.note) && this.props.showNotes)?
                                                            <Text style={styles.L_note}>{post.note}</Text>
                                                            :
                                                            <View></View>
                                                    }
                                                </View>
                                            </View>
                                            <View style={styles.L_price_container}>
                                                <Text style={
                                                    [
                                                        styles.L_price,
                                                        {color: (post.type === '-') ? application_colors.red_medium : application_colors.green_medium}
                                                    ]
                                                }>
                                                    {post.type}{money.format(post.amount)}
                                                </Text>
                                            </View>
                                            <View>
                                                <TouchableOpacity onPress={() => {
                                                    Actions.push("AddScene",{post:post, editMode:true})
                                                }}><Icon name={'pencil'} type={'FontAwesome'} style={styles.L_edit}/></TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Content>
            </ListContainer>
        )
    }
}

const styles = StyleSheet.create({

    noposts:{
      textAlign: "center",
      color:"grey",
      fontSize:10,
        marginTop:15
    },

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
        borderColor: "black",
        color: "black",
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 4,
        paddingBottom: 2,
        textAlign: "center",
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
        alignSelf:'flex-start'
    },

    L_note:{
        fontSize:10,
        color:"grey",
        fontStyle:'italic',
        alignSelf:'flex-start'
    },

    L_price_container: {},

    L_price: {
        marginTop: 8,
        marginLeft: 5,
        marginRight: 10,
        fontWeight: "bold",
        color: "firebrick"

    },

    L_edit_container: {},

    L_edit: {
        color: 'grey',
        fontSize: 20,
        marginTop: 8,
    },

});