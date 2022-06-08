var _ = require("lodash");

function constructSchemaWithUI(schema, uischema) {
    const res = _.cloneDeep(schema);
    attachUischema(res,uischema);
    return res;
}

function attachUischema(schema,uischema){
    const { type } = schema;
    if (type === "object") {
        const properties=schema["properties"]
        for(let key in properties){
            attachUischema(properties[key],uischema[key]);
        }
    } else if (type === "array") {
        attachUischema(schema["items"],uischema["items"]);
    } else {
        if (!schema["x-context"]) {
            schema["x-context"] = {};
        }
        schema["x-context"] = { ...schema["x-context"], ...uischema["ui:location"] }
    }
}

function constructSchemaWithAuth(schema,authentication){
    const res=_.cloneDeep(schema);
    for(let path in authentication){
        findPosition(res,path,authentication[path]);
    }
    return res;
}

function findPosition(schema,path,auth){
    const auths=resolveAuth(auth);
    const paths=path.split(".");
    if(paths.length===1){
        const field=schema["properties"][paths[0]];
        if(!field["x-context"]){
            field["x-context"]={};
        }
        field["x-context"]={...field["x-context"],...auths};
    }
}

function resolveAuth(auth){
    return {
        readable:auth[0]==="r"?true:false,
        writable:auth[1]==="w"?true:false,
    }
}

function constructGrid(schema,formdata){
    const grid=[];
    traverse(schema,formdata,grid);
    return grid;
}

function traverse(schema,formdata,grid){
    const { type } = schema;
    if (type === "object") {
        const properties=schema["properties"]
        for(let key in properties){
            traverse(properties[key],formdata?.[key],grid);
        }
    } else if (type === "array") {
        
    } else {
        const context=schema["x-context"];
        const {row,col,readable,writable,rowSpan=1,colSpan=1}=context;
        const cell={rowSpan,colSpan,readOnly:!writable,value:readable?formdata:"***"};
        addCellToGrid(grid,row-1,col-1,cell);
    }
}

const CELL_OPTIONS={width:"100px"}

function addCellToGrid(grid, rowIndex, colIndex, cell) {
    const gridMaxRowIndex = grid.length - 1
    for (let i = gridMaxRowIndex + 1; i <= rowIndex; i++) {
        grid.push([])
    }
    const gridColIndex = grid[rowIndex].length - 1
    for (let i = gridColIndex + 1; i <= colIndex; i++) {
        grid[rowIndex][i] = { ...CELL_OPTIONS }
    }
    grid[rowIndex][colIndex] = { ...grid[rowIndex][colIndex], ...cell }
    return grid;
  }

function reduceDimension(data,dimension){
    let lowDimensionData=[data];
    for(let i=dimension;i>2;i--){
        for(let j=0,len=lowDimensionData.length;j<len;j++){
            const d=lowDimensionData.shift();
            for(let value of Object.values(d)){
                lowDimensionData.push(value);
            }
        }
    }
    let res=[];
    lowDimensionData.forEach(d=>{
        for(let value of Object.values(d)){
            const row=[];
            for(let v of Object.values(value)){
                row.push(v);
            }
            res.push(row);
        }
        
    })
    return res;
}

export {
    constructSchemaWithUI,
    constructSchemaWithAuth,
    constructGrid,
    reduceDimension
}