var nodes = extend_nodes(data.nodes)
var links = data.links
var n = nodes.length / 2;

var A = zeros([n, n]);
for (var i = 0, link, n_l = links.length; i < n_l; ++i) {
link = links[i], source = link.source, target = link.target;
A[source][target] = 1;
} 

function follower_force_link(alpha) {
  for (var i = 0; i < data.links.length; ++i){
    link = data.links[i], source = link.source, target = link.target;
    source_idx = source.index, target_idx = target.index;
    x1 = source.x, y1 = source.y;
    x2 = target.x, y2 = target.y;
    di = Math.sqrt((source.x-target.x)**2+(source.y-target.y)**2);
    dc = (di**2)/(d_0**2);
    k_forces = prf_forces * alpha;
    source.vx -=  k_forces*(1/d_0**2 * (x1-x2));
    source.vy -=  k_forces*(1/d_0**2 * (y1-y2));
    target.vx -=  k_forces*(1/d_0**2 * (x2-x1));
    target.vy -=  k_forces*(1/d_0**2 * (y2-y1));
    }
  }

function repulsion(alpha) {
  for (var i = 0; i < n; ++i){
    for (var j = i+1; j < n; ++j){
      source = nodes[i], target = nodes[j];
      source_idx = source.index, target_idx = target.index;
      source_params = nodes[source_idx+n];
      target_params = nodes[target_idx+n];
      ai = source_params.x;
      bi = source_params.y;
      aj = target_params.x;
      bj = target_params.y;     
      x1 = source.x, y1 = source.y;
      x2 = target.x, y2 = target.y;      
      di = Math.sqrt((x1-x2)**2+(y1-y2)**2);
      dc = (di**2)/(d_0**2);
      k_forces = prf_forces * alpha;
      source.vx +=  k_forces*(
        1/((1+Math.exp(-bi-aj)*Math.exp(di**2/d_0**2))*d_0**2) * (x1-x2) + 
        1/((1+Math.exp(-bj-ai)*Math.exp(di**2/d_0**2))*d_0**2) * (x1-x2));
      source.vy +=  k_forces*(
        1/((1+Math.exp(-ai-bj)*Math.exp(di**2/d_0**2))*d_0**2) * (y1-y2) + 
        1/((1+Math.exp(-bi-aj)*Math.exp(di**2/d_0**2))*d_0**2) * (y1-y2));
      target.vx +=  k_forces*(
        1/((1+Math.exp(-bi-aj)*Math.exp(di**2/d_0**2))*d_0**2) * (x2-x1) + 
        1/((1+Math.exp(-bj-ai)*Math.exp(di**2/d_0**2))*d_0**2) * (x2-x1));
      target.vy +=  k_forces*(
        1/((1+Math.exp(-bj-ai)*Math.exp(di**2/d_0**2))*d_0**2) * (y2-y1) + 
        1/((1+Math.exp(-bi-aj)*Math.exp(di**2/d_0**2))*d_0**2) * (y2-y1));
    }
  }
}

function param_force(alpha) {
  for (var i = 0; i < n; ++i){
    for (var j = i+1; j < n; ++j){
      source = nodes[i], target = nodes[j];
      source_idx = source.index, target_idx = target.index;
      source_params = nodes[source_idx+n];
      target_params = nodes[target_idx+n];
      ai = source_params.x;
      bi = source_params.y;
      aj = target_params.x;
      bj = target_params.y;     
      x1 = source.x, y1 = source.y;
      x2 = target.x, y2 = target.y;      
      di = Math.sqrt((x1-x2)**2+(y1-y2)**2);
      dc = (di**2)/(d_0**2);
      k_params = prf_params * alpha;
      source_params.vx += k_params*(A[j][i] - (1/(1+Math.exp(-ai-bj+dc))))
      source_params.vy += k_params*(A[i][j] - (1/(1 + Math.exp(-aj-bi+dc))))
      target_params.vx += k_params*(A[i][j] - (1/(1 + Math.exp(-aj-bi+dc))))
      target_params.vy += k_params*(A[j][i]-(1/(1 + Math.exp(-ai-bj+dc))))
    }
  }
}
console.log(nodes[0])
// function swapgroups(){
//   var grp1 = document.getElementById('GRP01').value
//   var grp2 = document.getElementById('GRP02').value
//   var positions_grp01 = []
//   var positions_grp02 = []  
//   // first, get the current positions of block01 and block02
//   for (var i = 0; i < n/2; ++i){
//     node = nodes[i]
//     if (node.block == grp1) {
//       positions_grp01.push([node.x,node.y])
//     }
//     else if (node.block == grp2) {
//       positions_grp02.push([node.x,node.y])
//     }
//   }
//   // now, assign the positions of block02 to block01 and vice versa
//   for (var i = 0; i < n/2; ++i){
//       node = nodes[i]
//       if (node.block == grp1) {  
//         newpositions = positions_grp02.shift()
//         node.x = newpositions[0]
//         node.y = newpositions[1]
//           }
//       else if (node.block == grp2) {  
//         newpositions = positions_grp01.shift()
//         node.x = newpositions[0]
//         node.y = newpositions[1]
//           }
//       }
// }

  