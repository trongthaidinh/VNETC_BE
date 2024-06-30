const { Department } = require("~/models/departentModel")

const create = async (data, creator) => {
    const department = new Department(data)
    department.createdBy = creator
    console.log(department);
    console.log(creator);
    await department.save()
    return department
}

const getAll = async() => {
    const departments = await Department.find()
    return departments
}

export const departmentService = {
    create,
    getAll
}