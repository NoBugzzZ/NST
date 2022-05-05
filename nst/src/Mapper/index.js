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
  changeFormdata(event) {
    return this.setDataByPath(event.path, event.value, this.formdata);
  }
  transform(events) {
    events.forEach(event => {
      this.formdata = this.changeFormdata(event);
    })

    const depsSet = new Set();
    events.forEach(event => {
      if (event.path in this.graph) {
        const deps = this.graph[event.path];
        deps.forEach(dep => {
          depsSet.add(dep)
        })
      }
    })

    const changes = []
    nextdep: for (let dep of depsSet) {
      const { source, target, expression } = dep
      const sourceData = [];
      for (let s of source) {
        const d = this.getDataByPath(s, this.formdata);
        if (d === null || d === undefined) break nextdep;
        sourceData.push(d);
      }
      const computedData = expression.apply(null, sourceData);
      target.forEach(t => {
        changes.push({ path: t, value: computedData });
        this.formdata = this.setDataByPath(t, computedData, this.formdata);
      })
    }
    return changes;
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
    this.formdata = newData;
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

console.log(mapper.transform([
  {
    path: "root.birthday",
    value: 1999
  },
  {
    path: "root.lastname",
    value: "tang"
  },
  {
    path: "root.firstname",
    value: "zheng"
  }
]))

function debounce(func, ms) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, ms)
  }
}

class Event {
  constructor(mapper, formdata) {
    this.mapper = new Mapper(mapper);
    this.formdata = mapper.initializeFormdata(formdata);
    this.subscriber = {};
    this.queue = {};
    this.transform = debounce(this.mapper.transform.bind(this.mapper), 1000)
  }
  changeFormdata() {
    const transforms = this.transform(Object.values(this.queue));
  }
  publish(path, value) {
    this.queue[path] = {
      path,
      value,
    }
  }
  subscribe(paths, callback) {
    paths.forEach(path => {
      if (!this.subscriber[path]) {
        this.subscriber[path] = [];
      }
      this.subscriber[path].push({ callback, paths });
    })
  }
}