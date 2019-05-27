import React from 'react';
import styled from 'styled-components';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Header, Content, Button, Text, Icon, Input, Form, Label, Item, Picker} from 'native-base';
import {Actions} from "react-native-router-flux";
import application_colors from "../../utilities/application_colors";
import {CustomPicker} from "react-native-custom-picker";
import local_icons from "../../localfiles/local_icons";

export default class AddCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            icon: null,
        };
    }

    renderHeader() {
        return (
            <View style={styles.P_header}>
                <Text>Wybierz ikonę</Text>
            </View>
        )
    }

    renderOption(settings) {
        const {item, getLabel} = settings
        return (
            <View style={styles.P_optionContainer}>
                <Icon name={item.name} type={item.groupName}/>
            </View>
        )
    }

    renderField(settings) {
        const {selectedItem, defaultText, getLabel, clear} = settings
        return (
            <View style={styles.P_container}>
                <View>
                    {!selectedItem && <Text style={[styles.P_text, {color: 'grey'}]}>{defaultText}</Text>}
                    {selectedItem && (
                        <View style={styles.P_innerContainer}>
                            <Icon name={selectedItem.name} type={selectedItem.groupName}/>
                            <TouchableOpacity style={styles.P_clearButton} onPress={clear}>
                                <Icon name={"close"} style={styles.P_clear_icon}/>
                                <Text style={styles.P_clear_text}>Usuń</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        )
    }

    render() {
        return (
            <Container>
                <View style={styles.H_container}>
                    <Text style={styles.H_container_text}>
                        DODAJ NOWĄ KATEGORIĘ
                    </Text>
                </View>
                <Content>
                    <Form>

                        <View style={styles.F_container}>
                            <View style={styles.F_container_name}>
                                <Item floatingLabel>
                                    <Label style={styles.F_text_name}>{(this.state.name.length>0)?"Nazwa kategorii":"Podaj nazwę kategorii"}</Label>
                                    <Input onChangeText={(text) => this.setState({name: text})} style={{
                                        paddingLeft: 5
                                    }}/>
                                </Item>
                            </View>
                            <View style={styles.F_container_icon}>
                                <View flex={1}>
                                    <CustomPicker
                                        placeholder={'Kliknij aby wybrać ikonę'}
                                        options={local_icons.icons}
                                        getLabel={item => item.label}
                                        fieldTemplate={this.renderField}
                                        optionTemplate={this.renderOption}
                                        headerTemplate={this.renderHeader}
                                        onValueChange={value => {
                                            this.setState({icon: value})
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={styles.F_container_color}>
                                <Text style={styles.F_text_color}>Kolor</Text>
                            </View>
                        </View>
                    </Form>
                </Content>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <View style={{flex: 1}}>
                        <Button danger={true} full={true}>
                            <Icon name='trash'/>
                            <Text>Usuń</Text>
                        </Button>

                    </View>
                    <View style={{flex: 1}}>
                        <Button success={true} full={true}>
                            <Icon name='add'/>
                            <Text>Dodaj</Text>
                        </Button>
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

    H_container: {
        backgroundColor: application_colors.main_color
    },

    H_container_text: {
        textAlign: "center",
        color: "white",
        padding: 14,
    },

    F_container: {
        marginTop: 5,
        flex: 1
    },

    F_container_name: {},

    F_text_name: {
        fontSize: 16,
        color: "grey",
        paddingBottom: 5,
    },

    F_container_icon: {
        flex: 1
    },

    F_container_color: {},

    F_text_color: {},

    P_container: {
        borderColor: '#ddd',
        borderStyle: "solid",
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: 15,
        marginTop: 15
    },

    P_innerContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingLeft: 5,
        paddingRight: 15
    },

    P_text: {
        fontSize: 16,
        color: "grey",
    },

    P_clearButton: {
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },

    P_clear_icon: {
        color: 'firebrick',
        fontSize: 25
    },

    P_clear_text: {
        color: 'firebrick',
        fontSize: 14,
        marginLeft: 5
    },

    P_header: {
        padding: 10,
        alignItems: 'center'
    },

    P_optionContainer: {
        padding: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
});