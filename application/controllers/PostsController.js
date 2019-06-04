var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'database.db', createFromLocation: '~database.db'})

export default {

    getLastPosts() {
        return new Promise((resolve, reject) => {

            let data = [];

            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM posts INNER JOIN categories ON posts.category_id = categories.c_id ORDER BY posts.p_date DESC LIMIT 7', [], (tx, results) => {
                    for (let i = 0; i < results.rows.length; i++) {
                        data.push(results.rows.item(i))
                    }
                    resolve({
                        data: data,
                        msg: 'Get all posts successfully',
                        ok: true,
                    });
                }, (error) => {
                    reject({
                        data: [],
                        msg: `${error.message}`,
                        ok: false,
                    })
                });
            });
        });
    },

    getTotalSum() {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT SUM(CASE WHEN posts.p_type="+" THEN posts.p_amount WHEN posts.p_type="-" THEN -posts.p_amount ELSE 0 END) AS total FROM posts'
                    , [], (tx, results) => {

                    resolve({
                        data: results.rows.item(0).total,
                        msg: 'Get total sum successfully',
                        ok: true,
                    });
                }, (error) => {
                    reject({
                        data: 0,
                        msg: `${error.message}`,
                        ok: false,
                    })
                });
            });
        });
    },
}