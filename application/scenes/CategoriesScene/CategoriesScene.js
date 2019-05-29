import React from 'react';
import styled from 'styled-components';
import {Platform, StyleSheet, Text, View,} from 'react-native';
import local_categories from "../../localfiles/local_categories";
import CategoriesList from "./components/CategoriesList";
import {Fab, Icon} from "native-base";
import application_colors from "../../utilities/application_colors";
import {Actions} from "react-native-router-flux";

export default class CategoriesScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories:[]
        };
    }

    componentDidMount(){
        this.setState({
            categories: Array.from(local_categories.categories).filter(item=>item.name!=="Nieznane")
        })
    }

    render() {
        return (
            <Container>
                                <View flex={1}>
                    <CategoriesList categories={this.state.categories}/>
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
            </Container>
        );
    }


}
const Container = styled.View`
    flex: 1;
    flexDirection: column;
    justifyContent: space-between;
`;