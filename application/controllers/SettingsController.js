import Database from "./Database";
var db = Database.getInstance()

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