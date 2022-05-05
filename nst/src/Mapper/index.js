var _ = require("lodash")

class Mapper {
  constructor(mapper) {
    this.mapper = mapper;
    this.graph = this.constructDependencyGraph(mapper);
    console.log(this.graph);
  }
  constructDependencyGraph(mapper) {
    const graph = {}
    mapper.forEach(m => {
      const { source } = m;
      source.forEach(s => {
        if (!(s in graph)) {
          graph[s] = [];
        }
        graph[s].push(m)
      })
    })
    return graph;
  }
  changeFormdata(oldData, event) {
    return this.setDataByPath(event.path, event.value, oldData);
  }
  transform(oldData, events) {
    events.forEach(event => {
      oldData = this.changeFormdata(oldData, event);
    })

    events.forEach(event => {
      if (event.path in this.graph) {
        const deps = this.graph[event.path];
        deps.forEach(dep => {
          const { source, target, expression } = dep
          const sourceData = [];
          for (let s of source) {
            const d = this.getDataByPath(s, oldData);
            if (d === null || d === undefined) return;
            sourceData.push(d);
          }
          const computedData = expression.apply(null, sourceData);
          target.forEach(t => {
            oldData = this.setDataByPath(t, computedData, oldData);
          })
        })
      }
    })
    return oldData;
  }
  initializeFormdata(oldData) {
    let newData = _.cloneDeep(oldData);
    const derivedData = this.mapper
      .reduce((previousValue, currentValue) => {
        const { source, target, expression } = currentValue;
        const sourceData = [];
        for (let s of source) {
          const d = this.getDataByPath(s, oldData);
          if (d === null || d === undefined) return previousValue;
          sourceData.push(d);
        }
        const computedData = expression.apply(null, sourceData)
        previousValue.push({ target, computedData })
        return previousValue
      }, []);

    derivedData.forEach(d => {
      const { target, computedData } = d;
      target.forEach(t => {
        this.setDataByPath(t, computedData, newData);
      })
    })
    return newData;
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
    expression: (lastname, firstname) => `${lastname} ${firstname}`
  },
  {
    source: ["root.birthday"],
    target: ["root.age"],
    expression: (birthday) => new Date().getFullYear() - birthday
  }
])

const formdata = mapper.initializeFormdata({
  lastname: "t",
  firstname: "z",
  birthday: 1998
})
console.log(formdata)

console.log(mapper.transform(formdata, [
  {
    path: "root.birthday",
    value: 1999
  }
]))