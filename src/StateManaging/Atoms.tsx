import { atom } from "jotai";
import { Node } from "reactflow";
import { Square } from "../components/nodes/Square";

export const INITIAL_NODES = atom([{
    id : crypto.randomUUID(),
    type: 'square',
    position: {
        x : 100,
        y : 100
    },
    data : {},
  }] as Node[])

export const NODES = atom<Node[]>([])