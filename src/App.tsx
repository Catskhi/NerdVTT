import { Background, ReactFlow, Controls, useNodesState, Node, ConnectionMode } from 'reactflow';
import { zinc } from 'tailwindcss/colors'
import 'reactflow/dist/style.css';

import { Square } from './components/nodes/Square';
import { Toolbar } from './components/toolbar/Toolbar';
import SquareButton from './components/toolbar/buttons/SquareButton';

import { Provider, useAtom } from 'jotai';
import { INITIAL_NODES, NODES } from './StateManaging/Atoms';
import { updateNodesList } from './StateManaging/NodeStorage';

import { storage } from './StateManaging/NodeStorage';
import { UndoButton } from './components/toolbar/buttons/UndoButton';
import { useEffect, useState } from 'react';
import { RedoButton } from './components/toolbar/buttons/RedoButton';

const NODE_TYPES = {
  square : Square
}

function App() {

  const [initialNodes] = useAtom(INITIAL_NODES)

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)

  const [testNodes, setTest] = useState(storage.get(NODES))

  function addNode () : void {

      updateNodesList({
        id : crypto.randomUUID(),
        type: 'square',
        position: {
            x : 100,
            y : 100
        },
        style: { height : 100, width : 100 },
        data : {},
      })
      setNodes(storage.get(NODES))
  }

  function updateNodes() {
    setNodes(storage.get(NODES))
  }

  useEffect(() => {
      console.log(storage.get(NODES))
  }, [storage.get(NODES)])

  return (
    <Provider store={storage}>
    <div className='h-screen w-screen'>
        <ReactFlow
          nodeTypes={NODE_TYPES}
          nodes={nodes}
          onNodesChange={onNodesChange}
          connectionMode={ConnectionMode.Loose}
        >
            <Background/>
            <Controls/>
        </ReactFlow>
        <Toolbar>
              <SquareButton addNodeFunction={() => addNode} />
              <UndoButton updateNodesFunction={() => updateNodes()}/>
              <RedoButton updateNodesFunction={() => updateNodes()}/>
        </Toolbar>
    </div>
    </Provider>
  )
}

export default App
