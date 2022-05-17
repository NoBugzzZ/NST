var _ = require("lodash")

function setDataByPath(path = "root", value, formdata) {
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
function getDataByPath(path, formdata) {
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

class Mapper {
  constructor(mapper = []) {
    this.mapper = mapper;
    this.graph = this.constructDependencyGraph(mapper);
    // console.log(this.graph);
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
  changeFormdata(event, formdata) {
    return setDataByPath(event.path, event.value, formdata);
  }
  transform(events, formdata) {
    const changes = []
    let newFormdata = formdata;
    events.forEach(event => {
      newFormdata = this.changeFormdata(event, formdata);
      changes.push(event);
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

    nextdep: for (let dep of depsSet) {
      const { source, target, expression } = dep
      const sourceData = [];
      for (let s of source) {
        const d = getDataByPath(s, newFormdata);
        if (d === null || d === undefined) break nextdep;
        sourceData.push(d);
      }
      const computedData = expression.apply(null, sourceData);
      target.forEach(t => {
        changes.push({ path: t, value: computedData });
        newFormdata = setDataByPath(t, computedData, newFormdata);
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
          const d = getDataByPath(s, oldData);
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
        setDataByPath(t, computedData, newData);
      })
    })
    return newData;
  }
}


// export default Mapper;

// const mapper = new Mapper([
//   {
//     source: ["root.lastname", "root.firstname"],
//     target: ["root.name"],
//     expression: (lastname, firstname) => `${lastname} ${firstname}`
//   },
//   {
//     source: ["root.birthday"],
//     target: ["root.age"],
//     expression: (birthday) => new Date().getFullYear() - birthday
//   }
// ])

// const formdata = mapper.initializeFormdata({
//   lastname: "t",
//   firstname: "z",
//   birthday: 1998
// })
// console.log(formdata)

// console.log(mapper.transform([
//   {
//     path: "root.birthday",
//     value: 1999
//   },
//   {
//     path: "root.lastname",
//     value: "tang"
//   }
// ], formdata))

// function debounce(func, ms) {
//   let timer;
//   return function (...args) {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       func.apply(this, args);
//     }, ms)
//   }
// }

class MyEvent {
  constructor(mapper = [], formdata = {}) {
    this.mapper = new Mapper(mapper);
    this.formdata = this.mapper.initializeFormdata(formdata);
    this.subscriber = {};
  }
  getData(path){
    return getDataByPath(path,this.formdata);
  }
  publish(path, value) {
    const changes = this.mapper.transform([{ path, value }], this.formdata);
    // console.log(changes)
    changes.forEach(({ path }) => {
      if (this.subscriber[path]) {
        this.subscriber[path].forEach(sub => {
          const { paths, callback } = sub;
          const values = paths.map(p => getDataByPath(p, this.formdata));
          callback(...values)
        })
      }
    })
  }
  subscribe(paths, callback) {
    paths.forEach(path => {
      if (!this.subscriber[path]) {
        this.subscriber[path] = [];
      }
      this.subscriber[path].push({ callback, paths });
    })
  }
  unsubscribe(paths, callback) {
    paths.forEach(path => {
      if (!this.subscriber[path]) return;
      const index = this.subscriber[path].findIndex(sub => sub.callback === callback);
      this.subscriber[path].splice(index, 1);
    })
  }
}

export default MyEvent;

// const event = new Event([
//   {
//     source: [".lastname", ".firstname"],
//     target: [".name"],
//     expression: (lastname, firstname) => `${lastname} ${firstname}`
//   },
//   {
//     source: [".birthday"],
//     target: [".age"],
//     expression: (birthday) => new Date().getFullYear() - birthday
//   }
// ])


// console.log(event.formdata)

// event.subscribe([".lastname"],(lastname)=>{
//   console.log(`[lastname] ${lastname}`)
// })
// event.subscribe([".firstname"],(firstname)=>{
//   console.log(`[firstname] ${firstname}`)
// })
// event.subscribe([".birthday"],(birthday)=>{
//   console.log(`[birthday] ${birthday}`)
// })
// event.subscribe([".name"],(name)=>{
//   console.log(`[name] ${name}`)
// })
// event.subscribe([".age"],(age)=>{
//   console.log(`[age] ${age}`)
// })

// event.publish(".lastname","tang")
// event.publish(".birthday",1997)
// event.publish(".firstname","zheng")