const elem = document.getElementById('graph');
const Graph = ForceGraph()(elem)
.graphData({nodes: nodes, links: data.links})
.width(600)
.height(500)
.nodeId('id')
.nodeLabel('name')
.nodeColor(node => {if('color' in node)
                       {return node.color}
                    else
                       {return "black"}})
.nodeVal(5)
.nodeRelSize(2.5)
.backgroundColor('#fff')
.d3VelocityDecay(velocitydecay)
.d3AlphaDecay(alphadecay_init)
.linkVisibility(showlinks)
.cooldownTime(cooldowntime)
.nodeVisibility(node => {if (Number(node.id) < nodes.length / 2) 
                            {return true} 
                          else 
                            {return false}})
.linkSource('source')
.linkTarget('target')
.linkDirectionalArrowLength(5)
.linkDirectionalArrowRelPos(1)
.d3Force("charge", null)
.d3Force("link", null)
.d3Force("center", null)
.d3Force("follower_force_link",follower_force_link)
.d3Force("repulsion",repulsion)
.d3Force("param_force",param_force)