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
import ButtonBottomPanelComponent from "../../componens/ButtonBottomPanel/ButtonBottomPanelComponent";
import {showMessage} from "react-native-flash-message";
import money from "../../utilities/money";
import PostsController from "../../controllers/PostsController";
import CategoriesController from "../../controllers/CategoriesController";


export default class AddScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: '-',
            amount: 0,
            category: null,
            date: new Date(),
            note: "",
            categories: [],

        };
        moment.locale('pl', {
            months: 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split('_'),
        })
    }

    getCategories() {
        CategoriesController.getAllCategories().then(function (response) {
            if (response.ok) {
                this.setState({
                    categories: response.data,
                    category: (this.props.editMode) ? response.data.find(c => c.c_id === this.props.post.category_id) : response.data.find(c => c.c_name === 'Nieznane')
                })
            }
        }.bind(this)).catch(function (error) {
            console.log(error)

            showMessage({
                message: "Wystąpił błąd - nie można pobrać kategorii",
                type: "danger",
                position: "center",
                icon: 'danger'
            });
        }.bind(this))
    }

    componentDidMount() {
        if (this.props.editMode) {

            let amount = money.format(this.props.post.p_amount)

            this.setState({
                type: this.props.post.p_type,
                amount: amount,
                date: new Date(this.props.post.p_date),
                note: this.props.post.p_note,
            })
        }
        else {
            setTimeout(function () {
                this.refs['_amountRef'].getElement().focus();
            }.bind(this), 50)
        }

        this.getCategories()
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
                <Icon name={item.c_icon} type={item.c_icongroup} style={[styles.P_optionIcon, {color: item.c_color, borderColor: item.c_color}]}/>
                <Text style={styles.P_optionText}>{item.c_name}</Text>
            </View>
        )
    }

    renderField(settings) {
        const {selectedItem, defaultText, getLabel, clear} = settings
        return (
            <View style={styles.P_container}>
                <View style={{
                    borderColor: '#fff',
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderRadius: 5,
                    backgroundColor: "#fff",
                    paddingTop: 3,
                    paddingBottom: 3,
                }}>
                    {!selectedItem && <Text style={[styles.P_text, {color: 'grey'}]}>{defaultText}</Text>}
                    {selectedItem && (
                        <View style={styles.P_innerContainer}>
                            <Icon name={selectedItem.c_icon} type={selectedItem.c_icongroup}
                                  style={[styles.P_selectedItem, {color: selectedItem.c_color, borderColor: selectedItem.c_color}]}/>
                            <Text style={styles.P_selectedItemText}>{selectedItem.c_name}</Text>
                        </View>
                    )}
                </View>
            </View>
        )
    }

    onPressDelete() {
        console.log('delete post')
        console.log(this.state.category)
    }

    onPressSave() {
        let proper = true;

        let amount = Number((((this.state.amount).toString().substring(0, this.state.amount.length - 3)).split('.').join('')).replace(',', '.'))

        let data = this.state.date.toJSON().substring(0, 10)

        if (amount <= 0) {
            proper = false

            showMessage({
                message: "Uzupełnij kwotę",
                type: "warning",
                position: "center",
                icon: 'warning'
            });
        }

        if (this.state.type !== "-" && this.state.type !== "+") {
            proper = false

            showMessage({
                message: "Wybierz typ wpisu",
                type: "warning",
                position: "center",
                icon: 'warning'
            });
        }

        if (!Boolean(this.state.category)) {
            proper = false

            showMessage({
                message: "Wybierz kategorię wpisu",
                type: "warning",
                position: "center",
                icon: 'warning'
            });
        }

        if (proper) {
            let obj = {
                p_date: data,
                category_id: this.state.category.c_id,
                p_note: this.state.note,
                p_amount: amount,
                p_type: this.state.type
            }

            console.log(obj)

            if (this.props.editMode) {
                // edition
            }
            else {
                PostsController.addPost(obj).then(
                    function (response) {
                        console.log(response)
                        if (response.ok) {
                            showMessage({
                                message: "Pomyślnie dodano nowy wpis",
                                type: "success",
                                position: "center",
                                icon: 'success'
                            });

                            setTimeout(function () {
                                Actions.push("HomeScene")
                            }, 1000)

                        }
                    }.bind(this))
                    .catch(function (err) {
                        console.log(err)

                        showMessage({
                            message: "Wystąpił błąd - nie można dodać nowego wpisu",
                            type: "danger",
                            position: "center",
                            icon: 'danger'
                        });

                    }.bind(this))
            }
        }

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
                                'DODAJ NOWY WPIS n'
                        }
                    </Text>
                </View>
                <ScrollView>
                    <Content style={{marginBottom: 50}}>
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
                                                              backgroundColor: (this.state.type === "-") ?
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
                                                              backgroundColor: (this.state.type === "+") ?
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
                                <CustomPicker
                                    placeholder={'Kliknij aby wybrać kategorię'}
                                    value={this.state.category}
                                    options={this.state.categories}
                                    getLabel={item => item.c_name}
                                    fieldTemplate={this.renderField}
                                    optionTemplate={this.renderOption}
                                    headerTemplate={this.renderHeader}
                                    onValueChange={item => {
                                        this.setState({category: item})
                                    }}
                                />
                            </View>
                            <View style={styles.F_date_container}>
                                <Text style={styles.F_date_label}>
                                    Data wpisu:
                                </Text>
                                <DatePicker
                                    defaultDate={this.props.editMode ? new Date(this.props.post.p_date) : new Date()}
                                    locale={"pl"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    textStyle={styles.F_date_date}
                                    onDateChange={(date) => this.setState({date: date})}
                                    disabled={false}
                                    formatChosenDate={date => {
                                        return moment(date).format('DD MMMM YYYY');
                                    }}
                                />
                            </View>
                            <View style={styles.F_note_container}>
                                <Text style={styles.F_note_label}>
                                    Notatka:
                                </Text>
                                <Textarea rowSpan={3} bordered style={styles.F_note_textarea}
                                          maxLength={50}
                                          defaultValue={
                                              this.props.editMode ? this.props.post.p_note : ''
                                          }/>
                            </View>
                        </Form>
                    </Content>
                </ScrollView>
                <ButtonBottomPanelComponent
                    onPressSave={() => this.onPressSave()}
                    onPressDelete={() => this.onPressDelete()}
                    onPressBack={() => Actions.pop()}
                    editMode={this.props.editMode}

                />
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
        padding: 15,
        marginTop: 5
    },

    F_amount_container: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },

    F_amount_input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5,
        padding: 3,
        fontWeight: "bold",
        textAlign: "right",
        fontSize: 26,
        backgroundColor: "white"
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
        textAlign: 'center',
        fontSize: 10,
        marginTop: 15
    },

    F_categories_container: {
        padding: 15,
    },

    P_header: {
        padding: 10,
        alignItems: 'center'
    },

    P_container: {
        borderColor: '#ddd',
        borderStyle: "solid",
        borderBottomWidth: 1,
    },

    P_innerContainer: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        paddingLeft: 5,
        paddingRight: 15,
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

    P_selectedItemText: {
        marginLeft: 15,
        marginTop: 5
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
        marginTop: 5,
    },

    F_date_container: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        paddingBottom: 5,
        marginTop: 5,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },

    F_date_label: {
        color: "gray",
        marginRight: 15,
        marginTop: 5
    },
    F_date_date: {
        padding: 5,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#ffffff",
        borderRadius: 5

    },

    F_note_container: {
        margin: 15,
        borderBottomWidth: 1,
        borderColor: "#ddd",

    },
    F_note_label: {
        color: "gray",
    },
    F_note_textarea: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#ffffff",
        borderRadius: 5
    },

});