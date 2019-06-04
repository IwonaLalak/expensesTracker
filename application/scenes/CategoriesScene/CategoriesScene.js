import React from 'react';
import styled from 'styled-components';
import {View} from 'react-native';
import CategoriesList from "./components/CategoriesList";
import {Fab, Icon} from "native-base";
import application_colors from "../../utilities/application_colors";
import {Actions} from "react-native-router-flux";
import CategoriesController from "../../controllers/CategoriesController";
import {showMessage} from "react-native-flash-message";
import Spinner from "react-native-loading-spinner-overlay";

export default class CategoriesScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            spinner: false
        };
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        this.setState({spinner: true})
        CategoriesController.getAllCategories()
            .then(
                function (response) {
                    this.setState({
                        categories: Array.from(response.data).filter(item => item.c_name !== "Nieznane"),
                        spinner: false
                    })
                }.bind(this))
            .catch(function (err) {
                console.log(err)
                this.setState({categories: [], spinner: false})
                showMessage({
                    message: "Wystąpił błąd - nie można załadować listy kategorii",
                    type: "danger",
                    position: "center",
                    icon: 'danger'
                });

            }.bind(this))
    }

    render() {
        return (
            <Container>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Trwa ładowanie...'}
                    textStyle={{color: '#fff'}}

                />
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