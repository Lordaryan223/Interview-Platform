import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PROBLEMS } from '../allProblem/allProblems';
import Navbar from '../components/Navbar';
import ProblemDescription from '../components/ProblemDescription';
import CodeEditorPanel from '../components/CodeEditorPanel';
import OutputPanel from '../components/OutputPanel';
import * as ResizablePanels from "react-resizable-panels";
const Panel = ResizablePanels.Panel || ResizablePanels.default?.Panel;
const PanelGroup = ResizablePanels.PanelGroup || ResizablePanels.default?.PanelGroup;
const PanelResizeHandle = ResizablePanels.PanelResizeHandle || ResizablePanels.default?.PanelResizeHandle;

// Debug (remove later)
console.log("Panels:", { Panel, PanelGroup, PanelResizeHandle });

function ProblemPage() {
    const {id}=useParams()
    const navigate=useNavigate()

    const [currentProblemId, setCurrentProblemId] = useState("two-sum");
const [selectedLanguage, setSelectLanguage] = useState("javascript");
const [code, setCode] = useState(PROBLEMS["two-sum"].starterCode.javascript);
const [output, setOutput] = useState(null);
const [isRunning, setIsRunning] = useState(false);

const currentProblem = PROBLEMS[currentProblemId];

// when problem changes
useEffect(() => {
  if (id && PROBLEMS[id]) {
    setCurrentProblemId(id);
    setOutput(null);
  }
}, [id]);

// when language changes
useEffect(() => {
  if (currentProblemId) {
    setCode(PROBLEMS[currentProblemId].starterCode[selectedLanguage]);
  }
}, [selectedLanguage, currentProblemId]);


const handleLanguageChange=()=>{


}
const handleProblemChanges = (newProblemId) => {
  if (newProblemId !== currentProblemId) {
    navigate(`/problem/${newProblemId}`);
  }
};


const triggerConfetti=()=>{

}

const  checkIfTestsPassed=()=>{

}

const handleRunCode=()=>{

}



return (
  <div className="h-screen bg-base-100 flex flex-col">
    <Navbar />

    <div className="flex-1 overflow-hidden " >
      <PanelGroup direction="horizontal">
        {/* left panel- problem desc */}
        <Panel defaultSize={40} minSize={30} className="relative z-10">
          <ProblemDescription
          problem={currentProblem}
          currentProblemId={currentProblemId}
          onProblemChange={handleProblemChanges}
          allProblems={Object.values(PROBLEMS)}  
          />
        </Panel>

        <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize z-0" />

        {/* right panel- code editor & output */}
        <Panel defaultSize={60} minSize={30} className="relative z-10" >
          <PanelGroup direction="vertical">
            {/* Top panel - Code editor */}
            <Panel defaultSize={70} minSize={30}>
              <CodeEditorPanel
              selectedLanguage={selectedLanguage}
              code={code}
              isRunning={isRunning}
              onLanguageChange={handleLanguageChange}
              onCodeChange={setCode}
              onRunCode={handleRunCode}
               
              />
            </Panel>

            <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize z-0" />

            {/* Bottom panel - Output Panel*/}

            <Panel defaultSize={30} minSize={30}>
              <OutputPanel  />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  </div>
);

}

export default ProblemPage
