const db = require("../model/db")


exports.createCourse = async (req, res) => {
    try {
        const data = {
            courseName: req.body.courseName,
            courseField: req.body.courseField,  // Note: courseFild was probably meant to be courseField
            courseFees: req.body.courseFees
        };
        console.log("====data=====", data);

        const createdCourse = await db.courses.create(data);
        const response = {
            success: createdCourse,
            message: "Course created successfully"
        };

        res.status(200).json(response);

    } catch (error) {
        console.log("=====error====", error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};
 


exports.getCourse = async (req, res) => {
    try {
        const getDataCourse = await db.courses.findAll({
            where: {
                courseFees: {
                    [Op.lte]: 50000
                },
                courseName: {
                    [Op.in]: ["JavaScript Adavanse"]
                }
            }
        });
        console.log("++++++++++getDataCourse+++++++++++", getDataCourse);
        res.status(200).json({
            data: getDataCourse,
            message: "Course data retrieved successfully"
        });
    } catch (error) {
        console.log("----error-----", error);
        res.status(404).json({
            success: false,
            message: "Course data not retrieved"
        });
    }
};





exports.getAllCourse = async (req, res) => {
    try {
        const getDataCourse = await db.courses.findAll();
        console.log("++++++++++getDataCourse+++++++++++", getDataCourse);
        res.status(200).json({
            data: getDataCourse,
            message: "All courses retrieved successfully"
        });
    } catch (error) {
        console.log("----error-----", error);
        res.status(404).json({
            success: false,
            message: "Courses not retrieved"
        });
    }
};




exports.getCourseId = async (req, res) => {
    try {
        const getDataCourseId = await db.courses.findByPk(req.params.id);
        console.log("++++++++++getDataCourseId+++++++++++", getDataCourseId);
        res.status(200).json({
            data: getDataCourseId,
            message: "Course ID data retrieved successfully"
        });
    } catch (error) {
        console.log("----error-----", error);
        res.status(404).json({
            success: false,
            message: "Course ID data not retrieved"
        });
    }
};




exports.updateByCourseId = async (req, res) => {
    try {
        const updateCourse = await db.courses.update(req.body, {
            where: { id: req.params.id }
        });

        res.status(200).json({
            data: updateCourse,
            message: "Course ID updated successfully"
        });
    } catch (error) {
        console.log("=====error====", error);
        res.status(404).json({
            data: false,
            message: "Course ID not updated"
        });
    }
};






exports.deleteByCourseId = async (req, res) => {
    try {
        const deleteCourse = await db.courses.destroy({
            where: { id: req.params.id }
        });

        res.status(200).json({
            data: deleteCourse,
            message: "Course ID deleted successfully"
        });
    } catch (error) {
        console.log("=====error====", error);
        res.status(404).json({
            data: false,
            message: "Course ID not deleted"
        });
    }
};





