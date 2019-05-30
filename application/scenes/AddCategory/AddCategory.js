import React from 'react';
import styled from 'styled-components';
import {Platform, StyleSheet, TouchableOpacity, View, ScrollView, Dimensions} from 'react-native';
import {Header, Content, Button, Text, Icon, Input, Form, Label, Item} from 'native-base';
import {Actions} from "react-native-router-flux";
import application_colors from "../../utilities/application_colors";
import {CustomPicker} from "react-native-custom-picker";
import local_icons from "../../localfiles/local_icons";
import {HueSlider, SaturationSlider, LightnessSlider} from 'react-native-color';
import tinycolor from 'tinycolor2';

export default class AddCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            icon: null,
            color: tinycolor('#000000').toHsl(),
        };
    }

    componentDidMount() {
        if (this.props.editMode) {
            this.setState({
                color: tinycolor(this.props.category.color).toHsl(),
                icon: {name: this.props.category.icon, groupName: this.props.category.iconGroup},
                name: this.props.category.name
            })
        }
    }

    updateHue = h => this.setState({color: {...this.state.color, h}});
    updateSaturation = s => this.setState({color: {...this.state.color, s}});
    updateLightness = l => this.setState({color: {...this.state.color, l}});

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
                <Icon name={item.name} type={item.groupName} style={styles.P_optionIcon}/>
                <Text style={styles.P_optionText}>{item.name}</Text>
            </View>
        )
    }

    renderField(settings, color) {
        const {selectedItem, defaultText, getLabel, clear} = settings
        return (
            <View style={styles.P_container}>
                <View>
                    {!selectedItem && <Text style={[styles.P_text, {color: 'grey'}]}>{defaultText}</Text>}
                    {selectedItem && (
                        <View style={styles.P_innerContainer}>
                            <Icon name={selectedItem.name} type={selectedItem.groupName}
                                  style={[styles.P_selectedItem, {color: color, borderColor: color}]}/>
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
                        {
                            (this.props.editMode)?
                                'EDYTUJ KATEGORIĘ'
                                :
                                'DODAJ NOWĄ KATEGORIĘ'
                        }

                    </Text>
                </View>
                <ScrollView>
                    <Content>
                        <Form>
                            <View style={styles.F_container}>
                                <View style={styles.F_container_name}>
                                    <Item floatingLabel>
                                        <Label
                                            style={styles.F_text_name}>{(this.state.name.length > 0) ? "Nazwa kategorii" : "Podaj nazwę kategorii"}</Label>
                                        <Input onChangeText={(text) => this.setState({name: text})}
                                               value={this.state.name}
                                               style={{
                                                   paddingLeft: 5
                                               }}
                                        />
                                    </Item>
                                </View>
                                <View style={styles.F_container_icon}>
                                    <View flex={1}>
                                        <CustomPicker
                                            placeholder={'Kliknij aby wybrać ikonę'}
                                            value={this.state.icon}
                                            options={local_icons.icons}
                                            getLabel={item => item.label}
                                            fieldTemplate={(sett) => this.renderField(sett, tinycolor(this.state.color).toHexString())}
                                            optionTemplate={this.renderOption}
                                            headerTemplate={this.renderHeader}
                                            onValueChange={value => {
                                                this.setState({icon: value})
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={styles.F_container_color}>
                                    {/*<View style={{flex:1,flexDirection:'row'}}>
                                <Text style={styles.F_text_color}>Obecny kolor</Text>
                                    <View style={{
                                        backgroundColor:tinycolor(this.state.color).toHexString(),
                                        height:20,
                                        width:20,
                                        marginLeft:15,
                                        marginTop:10
                                    }}>
                                        </View>
                                </View>*/}
                                    <View flex={1}>
                                        <HueSlider
                                            style={styles.sliderRow}
                                            gradientSteps={40}
                                            value={this.state.color.h}
                                            color={this.state.color}
                                            onValueChange={this.updateHue}
                                        />
                                        <SaturationSlider
                                            style={styles.sliderRow}
                                            gradientSteps={40}
                                            value={this.state.color.s}
                                            color={this.state.color}
                                            onValueChange={this.updateSaturation}
                                        />
                                        <LightnessSlider
                                            style={styles.sliderRow}
                                            gradientSteps={20}
                                            value={this.state.color.l}
                                            color={this.state.color}
                                            onValueChange={this.updateLightness}
                                        />
                                    </View>
                                </View>
                            </View>
                        </Form>
                    </Content>
                </ScrollView>
                <View style={styles.B_container}>
                    <View style={{flex: 1, flexDirection: "row"}}>
                        <View flex={1}>
                            {
                                (this.props.editMode)?
                                    <Button danger={true} full={true}>
                                        <Icon name='trash'/>
                                        <Text>Usuń</Text>
                                    </Button>
                                    :
                                    <Button primary={true} full={true} style={{backgroundColor:'#999999'}} onPress={()=>Actions.pop()}>
                                        <Icon name='arrow-back'/>
                                        <Text>Powrót</Text>
                                    </Button>
                            }

                        </View>
                        <View flex={1}>
                            <Button success={true} full={true} onPress={() => {
                                console.log(this.state);
                            }}>
                                <Icon name={this.props.editMode?'checkmark':'add'}/>
                                <Text>{this.props.editMode?"Zapisz":"Dodaj"}</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Container>
        );
    }


}

const Container = styled.View`
    flex: 1;
    flexDirection: column;
    justifyContent: center;
    backgroundColor:whitesmoke;
`;

const styles = StyleSheet.create({

    H_container: {
        backgroundColor: application_colors.main_color,
    },

    H_container_text: {
        textAlign: "center",
        color: "white",
        padding: 14,
    },

    F_container: {
        flexDirection: "column",
        flex: 1
    },

    F_container_name: {
        flex: 1,
        paddingRight:15
    },

    F_text_name: {
        fontSize: 16,
        color: "grey",
        paddingBottom: 5,
    },

    F_container_icon: {
        flex: 1,
        paddingRight:15
    },

    F_container_color: {
        marginRight: 15,
        flex: 1
    },

    F_text_color: {
        fontSize: 16,
        color: "grey",
        marginLeft: 15,
        marginTop: 10,
    },

    P_container: {
        borderColor: '#ddd',
        borderStyle: "solid",
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: 15,
        marginTop: 35,
        marginBottom: 25
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
        alignSelf: 'flex-end',
        marginLeft: 25
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

    P_selectedItem: {
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
        marginTop: 3,
        width: 30,
    },

    P_optionContainer: {
        padding: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        flexDirection: "row"
    },

    P_optionIcon: {
        marginLeft: 15,
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
        marginTop: 3,
        width: 30,

    },

    P_optionText: {
        marginLeft: 15,
        marginTop: 5
    },

    sliderRow: {
        alignSelf: 'stretch',
        marginLeft: 12,
        marginTop: 12,
        flex: 1
    },

    B_container: {
        position: "absolute",
        bottom: 0,
        width: "100%",
    },

});