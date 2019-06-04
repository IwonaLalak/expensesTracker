var SQLite = require('react-native-sqlite-storage')

export default class Database{
    static instance = null;

    Database(){}

    static getInstance(){
        if(this.instance === null){
            this.instance = SQLite.openDatabase({name: 'database.db', createFromLocation: '~database.db'})
            console.log('create instance')
        }
        console.log('return instance')
        return this.instance
    }

}