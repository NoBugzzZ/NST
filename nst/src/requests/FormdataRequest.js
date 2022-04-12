
async function getFormdata(id) {
    const data = await new Promise((resolve, reject) => {
        const formdata = formdatas[id];
        if (formdata) resolve(formdata);
        else reject({});
    })
    return data;
}

export { getFormdata }

const formdatas = {
    "test": {
        "firstname": "z",
        "lastname": "t",
        "birthday": 1998
    }
}