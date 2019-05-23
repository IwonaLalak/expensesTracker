import React from 'react';
import styled from 'styled-components';
import {Platform, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Actions} from "react-native-router-flux";
import {Content, Button, Text, List, ListItem, Icon, Container as ListContainer, Fab} from 'native-base';
import local_posts from "../../localfiles/local_posts";
import local_categories from "../../localfiles/local_categories";
import application_colors from "../../utilities/application_colors";
import money from "../../utilities/money";


export default class HomeScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            categories: [],
            total:0,
        };
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        this.setState({
            categories: local_categories.categories
        })
        this.getPosts(local_categories.categories);
    }

    getPosts(categories) {
        let total = 0;
        let posts = Array.from(local_posts.posts, item => {
            let category = categories.find(c => c.id === item.category_id)
            if (Boolean(category))
                if(item.type ==='-'){
                    total -= parseFloat(item.amount)
                }
                else{
                    total += parseFloat(item.amount)
                }

                return {
                    category_name: category.name,
                    category_icon: category.icon,
                    category_iconGroup: category.iconGroup,
                    category_color: category.color,
                    ...item
                }
        })
        this.setState({
            posts: posts,
            total:total
        })
    }

    render() {


        return (
            <Container>
                <View style={styles.T_total_container}>
                    <Text style={styles.T_total_text}>Saldo konta:</Text>
                    <Text style={styles.T_total_amount}>{money.format(this.state.total)}</Text>
                </View>
                <View flex={1}>
                    <ListContainer>
                        <Content>
                            <List>
                                {
                                    this.state.posts.map(post => {
                                        return (
                                            <ListItem>
                                                <View flex={1} style={styles.L_main_container}>
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
                                                        }}><Icon name={'pencil'} type={'FontAwesome'} style={styles.L_edit}/></TouchableOpacity>
                                                    </View>
                                                </View>
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </Content>
                    </ListContainer>
                    <View style={styles.P_all_posts_container}>
                        <TouchableOpacity onPress={() => {
                            Actions.push("AllPostsScene")
                        }} style={styles.P_all_posts_touchable}>
                            <Icon name={"list"} style={styles.P_icon}/>
                            <Text style={styles.P_text}>{'Zobacz wszystkie wpisy'.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Fab
                            active={false}
                            direction="up"
                            containerStyle={{}}
                            style={{backgroundColor: application_colors.add_color_float_btn}}
                            position="bottomRight"
                            onPress={() => Actions.push("AddScene")}>
                            <Icon name="add"/>
                        </Fab>
                    </View>
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
    T_total_container: {
        alignSelf: "center",
        flexDirection: "row",
        padding: 14,
    },

    T_total_text: {
        fontWeight: "bold",
        color: "grey",
        marginTop: 6,
        marginRight: 6
    },

    T_total_amount: {
        fontSize: 22,
        fontWeight: "bold"
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
    },

    L_price_container: {},

    L_price: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 10,
        fontWeight: "bold",
        color: "firebrick"

    },

    L_edit_container: {},

    L_edit: {
        color: 'grey',
        fontSize: 20,
        marginTop: 10,
    },

    P_all_posts_container: {
        height: 50
    },

    P_all_posts_touchable: {
        marginTop: 15,
        marginLeft: 25,
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
    },

    P_icon: {
        fontSize: 18,
        color: "grey"
    },

    P_text: {
        color: "grey",
        marginLeft: 5,
        fontSize: 13,
    }

});

