# Leipzig Layout

## Description
This is a first implementation of the Leipzig Layout, an interpretable force-directed graph layout based on a latent space model. For more detailed information, please refer to the preprint: 
Gaisbauer, F., Pournaki, A., Banisch, S., & Olbrich, E. (2021). Grounding force-directed network layouts with latent space models. arXiv preprint [arXiv:2110.11772](https://arxiv.org/abs/2110.11772).

## Getting started
Try out the layout algorithm on a Twitter follower network of German parliamentarians by running `index.html` in your preferred browser (we recommend Firefox, for it is what we use for testing). To use your own layout, please create a file in the same format as `bundestag.js`. Here is a Python snippet to show you how to translate a given NetworkX graph to the required format:

```python
# import libraries
import networkx as nx
from networkx.readwrite import json_graph
import json

# create a graph
G = nx.karate_club_graph()

# convert it to json and keep the relevant entries
G_json = json_graph.node_link_data(G)
netdict = {'nodes':nxjson['nodes'],
           'links':nxjson['links']}

# save
with open('./data/network.js', 'w') as outfile:
    outfile.write("data = " + json.dumps(netdict))
```

Then, in line 19 in `index.html`, replace 'bundestag.js' by 'network.js'.

By default, nodes will be colored according to the "color" entry in their dictionary, which should be a hex code. If there is no such entry, the nodes will be rendered in black. You can also auto-color nodes according to any other entry via the interface.

## Screenshots
![Interface Screenshot](/doc/img/interface.png)

## Acknowledgements
The Leipzig Layout stands on the shoulders of giants:
- [d3-force](https://github.com/d3/d3-force)  
  The numerical force estimation based on velocity Verlet relies on the d3-force library.
- [force-graph](https://github.com/vasturiano/force-graph)  
  The interactive graph visualization relies on the force-graph library.

## Funding
This project has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No 732942.

## License
The Leipzig Layout is licensed under the [GNU GPLV3](https://www.gnu.org/licenses/gpl-3.0.en.html) license.
