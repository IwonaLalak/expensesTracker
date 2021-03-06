import Database from "./Database";
var db = Database.getInstance()

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

    getPostFromMonth(datesince,dateto){
        return new Promise((resolve, reject) => {

            let data = [];

            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM posts INNER JOIN categories ON posts.category_id = categories.c_id WHERE posts.p_date BETWEEN ? AND ? ORDER BY posts.p_date DESC',
                    [datesince,dateto], (tx, results) => {
                    for (let i = 0; i < results.rows.length; i++) {
                        data.push(results.rows.item(i))
                    }
                    resolve({
                        data: data,
                        msg: 'Get month posts successfully',
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


    getSumFromMonth(datesince, dateto){
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT SUM(CASE WHEN posts.p_type="+" THEN posts.p_amount WHEN posts.p_type="-" THEN -posts.p_amount ELSE 0 END) AS total FROM posts  WHERE posts.p_date BETWEEN ? AND ?'
                    , [datesince,dateto], (tx, results) => {

                        resolve({
                            data: results.rows.item(0).total,
                            msg: 'Get month sum successfully',
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

    addPost(obj) {
        return new Promise((resolve, reject) => {
            if (!obj) {
                reject({
                    msg: 'Object cannot be null',
                    ok: false,
                })
            } else {
                db.transaction((tx) => {
                    tx.executeSql(
                        'INSERT INTO posts (p_date,p_note,p_amount,p_type,category_id) VALUES (?,?,?,?,?)',
                        [obj.p_date, obj.p_note, obj.p_amount, obj.p_type,obj.category_id],
                        (tx, result) => {
                            if (result.rowsAffected > 0) {
                                resolve({
                                    msg: 'Post inserted successfully',
                                    ok: true
                                })
                            }
                            else {

                                reject({
                                    msg: 'Post insert failed',
                                    ok: false
                                })
                            }
                        },
                        (error) => {
                            console.log(error)
                            reject({
                                msg: `${error.message}`,
                                ok: false
                            })
                        });
                });
            }

        });
    },

    updatePost(obj) {
        return new Promise((resolve, reject) => {
            if (!obj) {
                reject({
                    msg: 'Object cannot be null',
                    ok: false,
                })
            } else {
                db.transaction((tx) => {
                    tx.executeSql(
                        'UPDATE posts SET p_date=?,p_note=?,p_amount=?,p_type=?,category_id=? WHERE p_id=?',
                        [obj.p_date, obj.p_note, obj.p_amount, obj.p_type,obj.category_id, obj.p_id],
                        (tx, result) => {
                            if (result.rowsAffected > 0) {
                                resolve({
                                    msg: 'Post updated successfully',
                                    ok: true
                                })
                            }
                            else {
                                reject({
                                    msg: 'Post update failed',
                                    ok: false
                                })
                            }
                        },
                        (error) => {
                            console.log(error)
                            reject({
                                msg: `${error.message}`,
                                ok: false
                            })
                        });
                });
            }

        });
    },

    deletePost(id){
        return new Promise((resolve, reject) => {
            if (!id) {
                reject({
                    msg: 'ID cannot be null',
                    ok: false,
                })
            } else {
                db.transaction((tx) => {
                    tx.executeSql(
                        'DELETE FROM posts WHERE p_id=?',
                        [id],
                        (tx, result) => {
                            if (result.rowsAffected > 0) {
                                resolve({
                                    msg: 'Post deleted successfully',
                                    ok: true
                                })
                            }
                            else {
                                reject({
                                    msg: 'Post delete failed',
                                    ok: false
                                })
                            }
                        },
                        (error) => {
                            reject({
                                msg: `${error.message}`,
                                ok: false
                            })
                        });
                });
            }

        });

    }

}