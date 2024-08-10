import { StatusCodes } from "http-status-codes"
import { ChildNav, ParentNav } from "~/models/navigationModel"
import ApiErr from "~/utils/ApiError"
import { NAVIGATION as NAV } from "~/utils/appConst"
import slugify from "~/utils/stringToSlug"

const getAllNavigation = async () => {
    let parentNavs = await ParentNav.find({}, { title: 1, slug: 1, position: 1 }) 
    let childNavs = await ChildNav.find({}, { title: 1, parentNavId: 1, slug: 1, position: 1 })
    return parentNavs.map((parent) => {
        const childs = childNavs.filter((child) => parent._id.toString() === child.parentNavId.toString())
        return { ...parent._doc, childs }
    })
}

const getNavigationBySlug = async (slug) => {
    const parentNav = await ParentNav.findOne({ slug }, { title: 1, position: 1 }) 
    if (!parentNav) {
        throw new ApiErr(StatusCodes.NOT_FOUND, "Not found")
    }
    const childNavs = await ChildNav.find({ parentNavId: parentNav._id.toString() }, { title: 1, position: 1 }) 
    if (!childNavs) {
        throw new ApiErr(StatusCodes.NOT_FOUND, "Not found")
    }
    parentNav._doc.childs = childNavs
    return parentNav
}

const getNavigationById = async (id) => {
    const parentNav = await ParentNav.findById(id);

    if (!parentNav) {
        const childNav = await ChildNav.findById(id);
        if (!childNav) {
            throw new ApiErr(StatusCodes.NOT_FOUND, "Not found");
        }
        return childNav;
    }

    const childNavs = await ChildNav.find({ parentNavId: parentNav._id });
    if (!childNavs.length) {
        throw new ApiErr(StatusCodes.NOT_FOUND, "Child navigations not found");
    }

    return { ...parentNav.toObject(), childs: childNavs };
};

const addNavigation = async (data, creator) => {
    const { type, title, parentNavId, position } = data; 
    const slug = slugify(title);

    if (type === NAV.PARENT) {
        const navExists = await ParentNav.exists({ title });
        if (navExists) {
            throw new ApiErr(StatusCodes.CONFLICT, "Navigation already exists!");
        }

        const nav = new ParentNav({ title, slug, position, createdBy: creator }); 
        return await nav.save();
    } else {
        const [parentNavExist, childNavExists] = await Promise.all([
            ParentNav.exists({ _id: parentNavId }),
            ChildNav.exists({ parentNavId, title }),
        ]);

        if (!parentNavExist) {
            throw new ApiErr(StatusCodes.NOT_FOUND, "Parent navigation not found");
        }
        if (childNavExists) {
            throw new ApiErr(StatusCodes.CONFLICT, "Navigation already exists");
        }

        const nav = new ChildNav({ title, parentNavId, slug, position, createdBy: creator }); 
        return await nav.save();
    }
};

const updateNavigation = async (id, data, updater) => {
    let nav;
    if (data.type === NAV.PARENT) {
        const { title, position } = data; 
        nav = await ParentNav.findById(id);
        if (!nav) {
            throw new ApiErr(StatusCodes.NOT_FOUND, "Parent navigation not found");
        }

        if (title && title !== nav.title) {
            const navExists = await ParentNav.exists({ title });
            if (navExists) {
                throw new ApiErr(StatusCodes.CONFLICT, "Navigation with this title already exists");
            }
        }

        if (title) {
            nav.title = title;
            nav.slug = slugify(title);
        }
        if (position !== undefined) {
            nav.position = position; 
        }
        nav.updatedBy = updater;

        await nav.save();
    } else {
        const { title, position } = data; 
        nav = await ChildNav.findById(id);
        if (!nav) {
            throw new ApiErr(StatusCodes.NOT_FOUND, "Child navigation not found");
        }

        if (title && title !== nav.title) {
            const childNavExists = await ChildNav.exists({
                title, _id: { $ne: id },
            });
            if (childNavExists) {
                throw new ApiErr(StatusCodes.CONFLICT, "Child navigation with this title already exists");
            }
        }

        if (title) {
            nav.title = title;
            nav.slug = slugify(title);
        }
        if (position !== undefined) {
            nav.position = position;
        }
        nav.updatedBy = updater;

        await nav.save();
    }
    return nav;
};

const deleteNavigation = async (data) => {
    const { type, id } = data;
    let deleted;
    if (type === NAV.PARENT) {
        deleted = await ParentNav.findByIdAndDelete(id);
    } else {
        deleted = await ChildNav.findByIdAndDelete(id);
    }
    if (!deleted) {
        throw new ApiErr(StatusCodes.CONFLICT, "Delete failed");
    }
    return deleted;
};

export const navigationService = {
    getAllNavigation,
    getNavigationBySlug,
    addNavigation,
    deleteNavigation,
    getNavigationById,
    updateNavigation,
};
