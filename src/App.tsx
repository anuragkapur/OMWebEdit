import React from "react";

import createEngine, {
  DefaultNodeModel,
  DiagramModel, PortModelAlignment,
} from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import "./App.css";
import {SimplePortFactory} from "./components/resistor/SimplePortFactory";
import {ResistorPortModel} from "./components/resistor/ResistorPortModel";
import {ResistorNodeFactory} from "./components/resistor/ResistorNodeFactory";
import {ResistorNodeModel} from "./components/resistor/ResistorNodeModel";

function App() {

  //1) setup the diagram engine
  var engine = createEngine();

  // register some other factories as well
  engine
      .getPortFactories()
      .registerFactory(new SimplePortFactory('diamond', (config) => new ResistorPortModel(PortModelAlignment.LEFT)));
  engine.getNodeFactories().registerFactory(new ResistorNodeFactory());

  //2) setup the diagram model
  var model = new DiagramModel();

  //3-A) create a default node
  var node1 = new DefaultNodeModel('Node 1', 'rgb(0,192,255)');
  var port1 = node1.addOutPort('Out');
  node1.setPosition(100, 200);

  //3-B) create our new custom node
  var node2 = new ResistorNodeModel();
  node2.setPosition(250, 108);

  var node3 = new DefaultNodeModel('Node 3', 'red');
  var port3 = node3.addInPort('In');
  node3.setPosition(500, 100);

  //3-C) link the 2 nodes together
  var link1 = port1.link(node2.getPort(PortModelAlignment.LEFT));
  var link2 = port3.link(node2.getPort(PortModelAlignment.RIGHT));

  var node4 = new DefaultNodeModel('Node 4', 'rgb(0,192,255)');
  var port4 = node4.addOutPort('Out');
  node4.setPosition(200, 10);

  var link3 = port4.link(node2.getPort(PortModelAlignment.TOP));

  var node5 = new DefaultNodeModel('Node 5', 'mediumpurple');
  var port5 = node5.addInPort('In');
  node5.setPosition(400, 300);

  var link4 = port5.link(node2.getPort(PortModelAlignment.BOTTOM));

  //4) add the models to the root graph
  model.addAll(node1, node2, node3, link1, link2, node4, link3, link4, node5);

  //5) load model into engine
  engine.setModel(model);

  return <CanvasWidget engine={engine} className="canvas" />;
}

export default App;