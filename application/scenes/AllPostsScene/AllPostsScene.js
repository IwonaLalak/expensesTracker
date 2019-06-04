import React from 'react';
import styled from 'styled-components';
import {Platform, StyleSheet, TouchableOpacity, View,} from 'react-native';
import {Icon, Text} from "native-base";
import application_colors from "../../utilities/application_colors";
import utils from "../../utilities/utils";
import PostsList from "./components/PostsList";
import money from "../../utilities/money";
import PostsController from "../../controllers/PostsController";
import {showMessage} from "react-native-flash-message";

export default class AllPostsScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current_month: new Date().toJSON().substr(5, 2),
            current_year: new Date().toJSON().substr(0, 4),
            months: utils.monthsArray,
            posts: [],
            monthAmount: 0,
        };
    }

    componentDidMount() {
        this.getPosts(new Date().toJSON().substr(5, 2), new Date().toJSON().substr(0, 4))
        this.getSum(new Date().toJSON().substr(5, 2), new Date().toJSON().substr(0, 4))
    }

    decrease() {
        let cm = parseInt(this.state.current_month)
        let cy = parseInt(this.state.current_year)

        if (cm !== 1) {
            cm -= 1
        } else {
            cm = 12
            cy -= 1
        }

        if (cm < 10) {
            cm = "0" + cm
        }

        this.setState({
            current_month: cm.toString(),
            current_year: cy.toString()
        })

        this.getPosts(cm.toString(), cy.toString())
        this.getSum(cm.toString(), cy.toString())
    }

    increase() {
        let cm = parseInt(this.state.current_month)
        let cy = parseInt(this.state.current_year)

        if (cm !== 12) {
            cm += 1
        } else {
            cm = 1
            cy += 1
        }

        if (cm < 10) {
            cm = "0" + cm
        }

        this.setState({
            current_month: cm.toString(),
            current_year: cy.toString()
        })

        this.getPosts(cm.toString(), cy.toString())
        this.getSum(cm.toString(), cy.toString())
    }

    getPosts(month, year) {
        this.setState({posts: []})

        PostsController.getPostFromMonth((year+'-'+month+'-01'),(year+'-'+month+'-31')).then(function (response) {
            if(response.ok){
                this.setState({posts:response.data})
            }
        }.bind(this))
            .catch(function (err) {
                console.log(err)
                showMessage({
                    message: "Wystąpił błąd - nie można pobrać wpisów",
                    type: "danger",
                    position: "center",
                    icon: 'danger'
                });
            })
    }

    getSum(month,year){
        PostsController.getSumFromMonth((year+'-'+month+'-01'),(year+'-'+month+'-31')).then(function (response) {
            if(response.ok){
                this.setState({monthAmount:response.data})
            }
        }.bind(this))
            .catch(function (err) {
                console.log(err)
                showMessage({
                    message: "Wystąpił błąd - nie można pobrać sumy z danego miesiąca",
                    type: "danger",
                    position: "center",
                    icon: 'danger'
                });
            })
    }

    render() {
        return (
            <Container>
                <View style={styles.H_container}>
                    <View style={styles.H_container_icon}>
                        <TouchableOpacity onPress={() => {
                            this.decrease();
                        }}>
                            <Icon name="arrow-back" style={styles.H_icon_back}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.H_container_text}>
                        <Text style={styles.H_header}>
                            {(this.state.months.find(m => m.value === this.state.current_month)) ? (this.state.months.find(m => m.value === this.state.current_month)).label.toUpperCase() : ''} {this.state.current_year}
                        </Text>
                    </View>
                    <View style={styles.H_container_icon}>
                        <TouchableOpacity onPress={() => {
                            this.increase();
                        }}>
                            <Icon name="arrow-forward" style={styles.H_icon_foward}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View flex={1}>
                    <PostsList posts={this.state.posts} showNotes={true}/>
                </View>
                <View style={styles.S_sum_container}>
                <Text style={styles.S_sum_text_static}>
                    ZMIANA:
                </Text>
                <Text style={styles.S_sum_text}>
                    {money.format(this.state.monthAmount)}
                </Text>
                    {
                        this.state.monthAmount <= 0?
                            <Icon name={'trending-down'} style={styles.S_sum_icon}/>
                            :
                            <Icon name={'trending-up'} style={styles.S_sum_icon}/>
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
    H_container: {
        flexDirection: "row",
        padding: 14,
        backgroundColor: application_colors.main_color
    },


    H_container_icon: {
        width: 50
    },

    H_container_text: {
        flex: 1,
    },

    H_header: {
        textAlign: "center",
        color: "white",
    },

    H_icon_back: {
        color: "white"
    },

    H_icon_foward: {
        alignSelf: 'flex-end',
        color: "white"
    },

    S_sum_container:{
        flexDirection: "row",
        justifyContent:"center",
        padding: 10
    },

    S_sum_icon:{
        fontSize:18,
        marginLeft:10,
    },

    S_sum_text_static:{
        color:'grey',
        marginRight:10,
        fontSize:13
    },

    S_sum_text:{
        fontSize:13,
        fontWeight:"bold"

    }

});
