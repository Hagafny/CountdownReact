const queryService = require('./queryService');
const db = require('./../../pgConnection');

let getCoursesBasic = (classId, cb) => {
    let sql = queryService.getCoursesBasic(classId);
    db.any(sql)
        .then(cb)
        .catch(error => {
            console.log("ERROR:", error);
        });
}

let getCourses = (classId, cb) => {
    let sql = queryService.getCourses(classId);
    db.any(sql)
        .then(cb)
        .catch(error => {
            console.log("ERROR:", error);
        });
}

let saveCourse = (course, cb) => {
    let sql = queryService.saveCourse();
    let values = [
        course.title,
        course.drive_lectures_url,
        course.drive_recitations_url,
        course.piazza_id,
        course.classboost_id,
        course.class_id,
        course.year
    ]

    db.one(sql, values)
        .then((data) => {
            cb(data.id);
        })
        .catch(error => {
            console.log("ERROR:", error);
        });
}

let editCourse = (course, cb) => {
    let sql = queryService.editCourse(course.id);
    let values = [
        course.title,
        course.drive_lectures_url,
        course.drive_recitations_url,
        course.piazza_id,
        course.classboost_id
    ];
    db.none(sql, values)
        .then(cb)
        .catch(error => {
            console.log("ERROR:", error);
        });
}

let deleteCourse = (courseId, cb) => {
    let sql = queryService.deleteCourse(courseId);
    db.any(sql)
        .then(cb)
        .catch(error => {
            console.log("ERROR:", error);
        });
}


let service = {
    getCoursesBasic: getCoursesBasic,
    getCourses: getCourses,
    saveCourse: saveCourse,
    editCourse: editCourse,
    deleteCourse: deleteCourse
};

module.exports = service;