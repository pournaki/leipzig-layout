function d3graph_to_gml(){
  var gml_string = "graph\n[\n"
  var options = Object.keys(data.nodes[0])
  for (var i = 0; i < n/2; ++i){
    node = nodes[i]
    gml_string += "node\n"
    gml_string += "[\n"
    for (option of options){
      if (node[option].constructor !== Array || typeof node[option] !== 'object') {
      if (typeof node[option] === 'string' || node[option] instanceof String){
        gml_string += option + " " + '"' + node[option] + '"' + "\n"
      }
      else {
      gml_string += option + " " + node[option] + "\n"
    }}}
    gml_string += "alpha " + nodes[i+n/2].x + "\n"
    gml_string += "beta " + nodes[i+n/2].y + "\n"
    gml_string += "]\n"
  }
  for (var i = 0; i < data.links.length; ++i){
    link = data.links[i], source = link.source, target = link.target;
    gml_string += "edge\n"
    gml_string += "[\n" 
    gml_string += "source " + source.id + "\n"
    gml_string += "target " + target.id + "\n"
    gml_string += "]\n"
  }
  gml_string += "]"
  var blob = new Blob([gml_string],
      { type: "text/plain;charset=utf-8" });
  saveAs(blob, "graph.gml");
}
