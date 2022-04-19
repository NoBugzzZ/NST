
async function getFormdata(id) {
    const data = await new Promise((resolve, reject) => {
        const formdata = formdatas[id];
        if (formdata) resolve(formdata);
        else reject({"message":`fetch fail`});
    })
    return data;
}

export { getFormdata }

const formdatas = {
    "test1": {
        "firstname": "z",
        "lastname": "t",
        "birthday": 1998
    },
    "test2": {
        "test1": "11",
    }
}