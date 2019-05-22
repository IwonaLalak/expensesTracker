import React from 'react';
import styled from 'styled-components';
import {Platform, StyleSheet, View,} from 'react-native';
import {Actions} from "react-native-router-flux";
import {Header, Content, Button, Text} from 'native-base';
import local_posts from "../../localfiles/local_posts";
import local_categories from "../../localfiles/local_categories";


export default class HomeScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts:[],
            categories:[]
        };
    }

    componentDidMount(){
        this.getCategories();
        this.getPosts();
    }

    getPosts(){
        this.setState({
            posts:local_posts.posts
        })
    }

    getCategories(){
        this.setState({
            categories:local_categories.categories
        })
    }

    render() {


        return (
            <Container>
                <View>

                </View>
                <Text>home sceane</Text>

            </Container>
        );
    }
}

const Container = styled.View`
    flex: 1;
    flexDirection: column;
    justifyContent: space-between;
`;

