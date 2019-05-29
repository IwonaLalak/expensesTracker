import React from 'react';
import styled from 'styled-components';
import {Platform, ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Header, Content, Button, Text, Form, Icon, DatePicker, Textarea} from 'native-base';
import {Actions} from "react-native-router-flux";
import application_colors from "../../utilities/application_colors";
import {TextInputMask} from "react-native-masked-text";
import {CustomPicker} from "react-native-custom-picker";
import local_categories from "../../localfiles/local_categories";
import moment from "moment";


export default class AddScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: '-',
            amount: 0,
            category:null,
            date:new Date(),

        };
        moment.locale('pl',{
            months : 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split('_'),
        })
    }

    componentDidMount(){
        setTimeout(function () {
            this.refs['_amountRef'].getElement().focus();
        }.bind(this),200)

        this.setState({
            category:{id:"-1",name:'Nieznane', icon:'question-circle', iconGroup:'FontAwesome', color:'#858285'}
        })
    }

    renderHeader() {
        return (
            <View style={styles.P_header}>
                <Text>Wybierz kategorię</Text>
            </View>
        )
    }

    renderOption(settings) {
        const {item, getLabel} = settings
        return (
            <View style={styles.P_optionContainer}>
                <Icon name={item.icon} type={item.iconGroup} style={[styles.P_optionIcon, {color:item.color, borderColor:item.color}]}/>
                <Text style={styles.P_optionText}>{item.name}</Text>
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
                            <Icon name={selectedItem.icon} type={selectedItem.iconGroup}
                                  style={[styles.P_selectedItem, {color: selectedItem.color, borderColor: selectedItem.color}]}/>
                            <Text style={styles.P_selectedItemText}>{selectedItem.name}</Text>
                        </View>
                    )}
                </View>
            </View>
        )
    }

    setDate(newDate) {
        this.setState({ date: newDate });
    }

    render() {
        return (
            <Container>
                <View style={styles.H_container}>
                    <Text style={styles.H_container_text}>
                        {
                            (this.props.editMode) ?
                                'EDYTUJ WPIS'
                                :
                                'DODAJ NOWY WPIS'
                        }
                    </Text>
                </View>
                <ScrollView>
                    <Content>
                        <Form>
                            <View style={styles.F_currency_container}>
                                <View style={styles.F_amount_container}>
                                    <TextInputMask
                                        type={'money'}
                                        options={{
                                            precision: 2,
                                            separator: ',',
                                            delimiter: '.',
                                            unit: '',
                                            suffixUnit: 'zł'
                                        }}
                                        value={this.state.amount}
                                        onChangeText={amount => {
                                            this.setState({
                                                amount: amount
                                            })
                                        }}
                                        style={styles.F_amount_input}
                                        ref={'_amountRef'}
                                    />
                                </View>
                                <View style={styles.F_type_container}>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({type: '-'});
                                    }}
                                                      style={[styles.F_type_container_spend,
                                                          {
                                                           backgroundColor: (this.state.type === "-")?
                                                           application_colors.red_lighter
                                                               :
                                                               "#ccc"
                                                          }
                                    ]}>
                                        <Text style={styles.F_type_text}>WYDATEK</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({type: '+'})
                                    }}
                                                      style={[styles.F_type_container_income,
                                                          {
                                                              backgroundColor: (this.state.type === "+")?
                                                                  application_colors.green_lighter
                                                                  :
                                                                  "#ccc"
                                                          }
                                                      ]}>
                                        <Text style={styles.F_type_text}>PRZYCHÓD</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.F_categories_container}>
                                <View flex={1} style={{
                                    borderBottomWidth: 1,
                                    borderColor: "#ddd",
                                    paddingBottom:5
                                }}>
                                    <CustomPicker
                                        placeholder={'Kliknij aby wybrać ikonę'}
                                        value={this.state.category}
                                        options={local_categories.categories}
                                        getLabel={item => item.name}
                                        fieldTemplate={this.renderField}
                                        optionTemplate={this.renderOption}
                                        headerTemplate={this.renderHeader}
                                        onValueChange={value => {
                                            this.setState({icon: value})
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={styles.F_date_container}>
                                <Text style={styles.F_date_label}>
                                    Data wpisu:
                                </Text>
                                <DatePicker
                                    defaultDate={new Date()}
                                    locale={"pl"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    textStyle={styles.F_date_date}
                                    onDateChange={this.setDate}
                                    disabled={false}
                                    formatChosenDate={date => {return moment(date).format('DD MMMM YYYY');}}
                                />
                            </View>
                            <View style={styles.F_note_container}>
                                <Text style={styles.F_note_label}>
                                    Notatka:
                                </Text>
                                <Textarea rowSpan={3} bordered style={styles.F_note_textarea}/>
                            </View>
                        </Form>
                    </Content>
                </ScrollView>
            </Container>
        );
    }


}

const Container = styled.View`
    flex: 1;
    flexDirection: column;
    justifyContent: space-between;
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

    F_currency_container: {
        flex: 1,
        flexDirection: 'row',
        padding: 15
    },

    F_amount_container: {
        flex: 1,
    },

    F_amount_input: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        padding: 3,
        fontWeight: "bold",
        textAlign: "right",
        fontSize: 26,
    },

    F_type_container: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 20
    },

    F_type_container_spend: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: application_colors.red_lighter,
        flex: 1,
    },

    F_type_container_income: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: application_colors.green_lighter,
        flex: 1
    },

    F_type_text: {
        color: "#ffffff",
        paddingLeft: 3,
        textAlign:'center',
        fontSize:10,
        marginTop:15
    },

    F_categories_container:{
        padding: 15,
    },

    P_header: {
        padding: 10,
        alignItems: 'center'
    },

    P_innerContainer: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        paddingLeft: 5,
        paddingRight: 15
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

    P_selectedItemText:{
        marginLeft: 15,
        marginTop: 3
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
        marginTop: 3,
    },

    F_date_container:{
        flex:1,
        flexDirection:'row',
        marginLeft:15,
        marginRight:15,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        paddingBottom:5,
    },

    F_date_label:{
        color:"gray",
        marginRight:15,
        marginTop:5
    },
    F_date_date:{
        padding:5,
        backgroundColor:"#ffffff",
        borderWidth:1,
        borderColor:"#ffffff",
        borderRadius:5

    },

    F_note_container:{
        padding:15
    },
    F_note_label:{
        color:"gray",
    },
    F_note_textarea:{
        backgroundColor:"#ffffff",
        borderWidth:1,
        borderColor:"#ffffff",
        borderRadius:5
    },




});