function extend_nodes(nodearray) {
  var finalarray = new Array()
  var ghostnodes = new Array()
  var N = nodearray.length
  for (var node of nodearray) {
    ghostnodes.push({"id":node.id+N, "name": node.name, "x": 0, "y": 0})
  }
  finalarray.push(...nodearray)
  finalarray.push(...ghostnodes)
  return finalarray
}
function zeros(dimensions) {
    var array = [];
    for (var i = 0; i < dimensions[0]; ++i) {
      array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
    }
    return array;
    }

function save_positions() {
    var positions = new Array()
    for (var i of data.nodes) {
      positions.push(i.x)
      positions.push(",")
      positions.push(i.y)
      positions.push("\n")}
    var blob = new Blob(positions,
        { type: "text/plain;charset=utf-8" });
    saveAs(blob, "positions.csv");
}

function getparameters_plot(){
  let parameters = []
  let xs = []
  let ys = []
  // let n = nodes.length;
  for ( i = 0; i < n; i++ ) {
    xs.push(nodes[i+n].x)
    ys.push(nodes[i+n].y)
    parameters.push([nodes[i+n].x, nodes[i+n].y, nodes[i].color])
  }
  return [parameters,xs,ys]
}

  function eucDist(lhs, rhs)
{
   let deltaX = rhs[0] - lhs[0];
   let deltaY = rhs[1] - lhs[1];
   return Math.sqrt
   (
      deltaX * deltaX + deltaY * deltaY 
   );
}

function computeDistances(){
let n = nodes.length;
let D = zeros([n/2, n/2]);

  for ( i = 0; i < n/2; i++ ) {
    for ( j = i + 1; j < n/2; j++ ) {
      lhs = [data.nodes[i].x, data.nodes[i].y]
      rhs = [data.nodes[j].x, data.nodes[j].y]
      dist = eucDist(lhs,rhs)
      D[i][j] = dist;
      D[j][i] = dist;
} 
}
return D
}

function getparameters(){
  parameters = [];
  let n = nodes.length;
  for ( i = 0; i < n/2; i++ ) {
    parameters.push(nodes[i+n/2].x)
    parameters.push(nodes[i+n/2].y)
  }
  return parameters
}

function likelihood(parameters){
let lik = 0;
let n = parameters.length
let D = computeDistances()
  for ( i = 0; i < n/2; i++ ) {
    for ( j = i + 1; j < n/2; j++ ) {

      // read out as and bs
      ai = Math.exp(-parameters[2*i])
      aj = Math.exp(-parameters[2*j])
      bi = Math.exp(-parameters[(2*i)+1])
      bj = Math.exp(-parameters[(2*j)+1])

      d  = D[i][j]
      dcal = d**2 / d_0**2      

      if (A[i][j] != 0) {
        lik += Math.log( 1 / (1 + (aj * bi * Math.exp(dcal))) )
      }
      else {
        lik += Math.log( 1 - (1 / (1 + (aj * bi * Math.exp(dcal)))) )
      }
      if (A[j][i] != 0){
        lik += Math.log( 1 / (1 + (ai * bj * Math.exp(dcal))) )
      }
      else {
        lik += Math.log( 1 - (1 / (1 + (ai * bj * Math.exp(dcal)))) )
      }     
}
}
document.getElementById("initial_likelihood").innerHTML = -lik.toFixed(2);
return -lik}

function saveparams() {
let n = nodes.length;  
    var savedparams = new Array()
    for ( i = 0; i < n/2; i++ ) {
      savedparams.push(nodes[i+n/2].x)
      savedparams.push(",")
      savedparams.push(nodes[i+n/2].y)
      savedparams.push("\n")}

    // document.getElementById("paramshere").innerHTML = savedparams;
    var blob = new Blob(savedparams,
        { type: "text/plain;charset=utf-8" });
    saveAs(blob, "params.csv");
}

function reheat(){
  Graph.resumeAnimation()
  Graph.d3ReheatSimulation()
}

function pause(){
  Graph.pauseAnimation() 
}

function add_parameter_forces() {
  Graph.d3ReheatSimulation()
  Graph.d3Force("param_force_3D",param_force)
}

function add_follower_force() {
Graph.d3Force("follower_force_link_3D",follower_force_link)
// Graph.d3Force("repulsion",repulsion)
}
function add_repulsion() {
// Graph.d3Force("follower_force_link",follower_force_link)
Graph.d3Force("repulsion_3D",repulsion)
}
function zoomtofit() {
  Graph.zoomToFit()
}

//Save the value function - save it to localStorage as (ID, VALUE)
function saveValue(e){
    var id = e.id;  // get the sender's id to save it . 
    var val = e.value; // get the value. 
    localStorage.setItem(id, val);// Every time user writing something, the localStorage's value will override . 
}
//get the saved value function - return the value of "v" from localStorage. 
function getSavedValue  (v){
    if (!localStorage.getItem(v)) {
        return "";// You can change this to your defualt value. 
    }
    return localStorage.getItem(v);
}

function toggle_linkvisibility(){
    if (Graph.linkVisibility() == true){
        Graph.linkVisibility(false)
    }
    else {Graph.linkVisibility(true)}
}

// function nodesize_indegree(){
//   Graph.nodeVal(node => node.in_degree * 0.05)
// }
// function nodesize_outdegree(){
//   Graph.nodeVal(node => node.out_degree * 0.05)
// }