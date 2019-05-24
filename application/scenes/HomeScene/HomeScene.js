import React from 'react';
import styled from 'styled-components';
import {Platform, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Actions} from "react-native-router-flux";
import {Button, Text, Icon, Fab} from 'native-base';
import local_posts from "../../localfiles/local_posts";
import local_categories from "../../localfiles/local_categories";
import application_colors from "../../utilities/application_colors";
import money from "../../utilities/money";
import PostsList from "../AllPostsScene/components/PostsList";


export default class HomeScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            total:0,
        };
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        let total = 0;
        let posts = Array.from(local_posts.posts, item => {
            let category = local_categories.categories.find(c => c.id === item.category_id)
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

        posts.sort((a,b)=>{
            if(a.date > b.date) return -1
            else return 1
        })



        this.setState({
            posts: posts.slice(0,7),    // reduce to 7
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
                    <PostsList posts={this.state.posts} showNotes={false}/>
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
                            onPress={() => Actions.push("AddCategory")}>
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

