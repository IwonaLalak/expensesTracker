import React from 'react';
import {Platform, StyleSheet, View,} from 'react-native';
import {Button, Icon, Text} from "native-base";


export default class ButtonBottomPanelComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }



    render() {
        return (
            <View style={styles.B_container}>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <View flex={1}>
                        {
                            (this.props.editMode)?
                                <Button danger={true} full={true} onPress={()=>this.props.onPressDelete()}>
                                    <Icon name='trash'/>
                                    <Text>Usuń</Text>
                                </Button>
                                :
                                <Button primary={true} full={true} style={{backgroundColor:'#999999'}} onPress={()=>this.props.onPressBack()}>
                                    <Icon name='arrow-back'/>
                                    <Text>Powrót</Text>
                                </Button>
                        }

                    </View>
                    <View flex={1}>
                        <Button success={true} full={true} onPress={()=>this.props.onPressSave()}>
                            <Icon name={this.props.editMode?'checkmark':'add'}/>
                            <Text>{this.props.editMode?"Zapisz":"Dodaj"}</Text>
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    B_container: {
        position: "absolute",
        bottom: 0,
        width: "100%",
    },

});