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
import PostsController from "../../controllers/PostsController";
import {showMessage} from "react-native-flash-message";


export default class HomeScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            total: 0,
            noposts:false
        };
    }

    componentDidMount() {
        this.getSum();
        this.getPosts();
    }

    getPosts() {
        PostsController.getLastPosts()
            .then(
                function (response) {
                    this.setState({
                        posts:response.data,
                        noposts:response.data.length === 0
                    })
                }.bind(this))
            .catch(function (err) {
                console.log(err)
                this.setState({posts:[],total: 0, noposts:true})
                showMessage({
                    message: "Wystąpił błąd - nie można załadować listy postów",
                    type: "danger",
                    position: "center",
                    icon: 'danger'
                });
            }.bind(this))
    }

    getSum(){
        PostsController.getTotalSum().then(function (response) {
            if(response.ok){
                this.setState({
                    total:response.data
                })
            }
        }.bind(this)).catch(function (error) {
            console.log(error)
            this.setState({
                total:0,
            })
            showMessage({
                message: "Wystąpił błąd - nie można wyświetlić całkowitego salda",
                type: "danger",
                position: "center",
                icon: 'danger'
            });
        }.bind(this))
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
                        {
                            this.state.posts.length === 0?
                            <View></View>
                            :
                            <TouchableOpacity onPress={() => {
                            Actions.push("AllPostsScene")
                        }} style={styles.P_all_posts_touchable}>
                            <Icon name={"list"} style={styles.P_icon}/>
                            <Text style={styles.P_text}>{'Zobacz wszystkie wpisy'.toUpperCase()}</Text>
                            </TouchableOpacity>
                        }
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
                    {
                        (this.state.noposts)?
                            <View style={styles.NP_noposts_container}>
                                <Text style={styles.NP_noposts_text}>Kliknij na przycisk aby rozpocząć</Text>
                                <Icon style={styles.NP_noposts_icon} name={'arrow-top-right'} type={'MaterialCommunityIcons'} />
                            </View>
                            :
                            <View></View>
                    }
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
    },

    NP_noposts_container:{
        flexDirection: "row",
        justifyContent: "center"
    },

    NP_noposts_text:{
        marginTop: 10,
        color: application_colors.green_lighter,
        textShadowColor:"#fff",
        textShadowOffset: {width: 2, height: 1},
        textShadowRadius: 5
    },

    NP_noposts_icon:{
        transform: [{ rotate: '-25deg'}],
        fontSize: 30,
        color: application_colors.green_lighter,
        textShadowColor:"#fff",
        textShadowOffset: {width: 2, height: 1},
        textShadowRadius: 5
    }

});

