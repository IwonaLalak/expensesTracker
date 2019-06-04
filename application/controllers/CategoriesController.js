import Database from "./Database";
var db = Database.getInstance()

export default {

    getAllCategories() {
        return new Promise((resolve, reject) => {

            let data = [];

            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM categories', [], (tx, results) => {
                    for (let i = 0; i < results.rows.length; i++) {
                        data.push(results.rows.item(i))
                    }
                    resolve({
                        data: data,
                        msg: 'Get all categories successfully',
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

    addCategory(obj) {
        return new Promise((resolve, reject) => {
            if (!obj) {
                reject({
                    msg: 'Object cannot be null',
                    ok: false,
                })
            } else {
                db.transaction((tx) => {
                    tx.executeSql(
                        'INSERT INTO categories (c_name,c_icon,c_icongroup,c_color) VALUES (?,?,?,?)',
                        [obj.c_name, obj.c_icon, obj.c_icongroup, obj.c_color],
                        (tx, result) => {
                            if (result.rowsAffected > 0) {
                                resolve({
                                    msg: 'Category inserted successfully',
                                    ok: true
                                })
                            }
                            else {
                                reject({
                                    msg: 'Category insert failed',
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
    },

    updateCategory(obj) {
        return new Promise((resolve, reject) => {
            if (!obj) {
                reject({
                    msg: 'Object cannot be null',
                    ok: false,
                })
            } else {
                db.transaction((tx) => {
                    tx.executeSql(
                        'UPDATE categories SET c_name=?,c_icon=?,c_icongroup=?,c_color=? WHERE c_id=?',
                        [obj.c_name, obj.c_icon, obj.c_icongroup, obj.c_color, obj.c_id],
                        (tx, result) => {
                            if (result.rowsAffected > 0) {
                                resolve({
                                    msg: 'Category updated successfully',
                                    ok: true
                                })
                            }
                            else {
                                reject({
                                    msg: 'Category update failed',
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
    },

    deleteCategory(id) {

        return new Promise((resolve, reject) => {
            if (!id) {
                reject({
                    msg: 'ID cannot be null',
                    ok: false,
                })
            } else {

                //todo check if category is used, if yes, change to category uknown id 0

                db.transaction((tx) => {
                    tx.executeSql(
                        'DELETE FROM categories WHERE c_id=?',
                        [id],
                        (tx, result) => {
                            if (result.rowsAffected > 0) {
                                resolve({
                                    msg: 'Category deleted successfully',
                                    ok: true
                                })
                            }
                            else {
                                reject({
                                    msg: 'Category delete failed',
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
    },



}