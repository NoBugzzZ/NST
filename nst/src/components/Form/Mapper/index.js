var _ = require("lodash")

class Mapper {
  constructor(mapper) {
    this.mapper = mapper;
  }
  transform(oldData) {
    let newData = _.cloneDeep(oldData);
    const derivedData = this.mapper
      .reduce((previousValue, currentValue) => {
        const { source, target, expresstion } = currentValue;
        const computedData = expresstion.apply(null, source.map(s => {
          return this.getDataByPath(s, oldData);
        }))
        console.log(computedData)
        previousValue.push({ target, computedData })
        return previousValue
      }, []);

    derivedData.forEach(d => {
      const { target, computedData } = d;
      target.forEach(t => {
        this.setDataByPath(t, computedData, newData);
      })
    })
    console.log(newData);
  }
  setDataByPath(path = "root", value, formdata) {
    const paths = path.split(".");
    if (paths.length === 1) formdata = value;
    formdata = formdata ? formdata : {};
    let temp = formdata;
    const len = paths.length;
    for (let i = 1; i < len; i++) {
      let key = paths[i];
      if ((len - 1) === i) temp[key] = value;
      else {
        if (key in temp) temp = temp[key];
        else {
          temp[key] = {};
          temp = temp[key];
        }
      }
    }
    return formdata;
  }
  getDataByPath(path, formdata) {
    const paths = path.split(".");
    if (paths.length === 1) return formdata;
    let temp = formdata;
    const len = paths.length;
    for (let i = 1; i < len; i++) {
      let key = paths[i];
      if ((len - 1) === i) return temp[key];
      else {
        temp = temp[key];
        if (!temp) return undefined;
      }
    }
    return formdata;
  }
}


const mapper = new Mapper([
  {
    source: ["root.lastname", "root.firstname"],
    target: ["root.name"],
    expresstion: function (lastname, firstname) {
      return `${lastname} ${firstname}`;
    }
  }
])
mapper.transform({ lastname: "t", firstname: "z" })