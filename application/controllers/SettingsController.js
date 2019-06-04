var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'database.db', createFromLocation: '~database.db'})

export default{

    deleteAllPosts() {
        return new Promise((resolve, reject) => {

            db.transaction((tx) => {
                tx.executeSql('DELETE FROM posts', [], (tx, results) => {

                    resolve({
                        data:results.rowsAffected,
                        msg: 'All posts were removed successfully',
                        ok: true,
                    });
                }, (error) => {
                    reject({
                        data:0,
                        msg: `${error.message}`,
                        ok: false,
                    })
                });
            });
        });
    },

}