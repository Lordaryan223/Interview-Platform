import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PROBLEMS } from '../allProblem/allProblems';
import Navbar from '../components/Navbar';
import ProblemDescription from '../components/ProblemDescription';
import CodeEditorPanel from '../components/CodeEditorPanel';
import OutputPanel from '../components/OutputPanel';
import * as ResizablePanels from "react-resizable-panels";
import toast from 'react-hot-toast';
import { Toaster } from "react-hot-toast";


const Panel = ResizablePanels.Panel || ResizablePanels.default?.Panel;
const PanelGroup = ResizablePanels.PanelGroup || ResizablePanels.default?.PanelGroup;
const PanelResizeHandle = ResizablePanels.PanelResizeHandle || ResizablePanels.default?.PanelResizeHandle;

import { executeCode } from '../lib/piston.js'; 
import confetti from "canvas-confetti"



function ProblemPage() {
    const {id}=useParams()
    const navigate=useNavigate()
    

    const [currentProblemId, setCurrentProblemId] = useState("two-sum");
const [selectedLanguage, setSelectedLanguage] = useState("javascript");
const [code, setCode] = useState("");
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
  if (currentProblem && selectedLanguage) {
    setCode(currentProblem.starterCode?.[selectedLanguage] || "");
  }
}, [currentProblemId, selectedLanguage]);


const handleLanguageChange = (e) => {
  const newLang = e.target.value;
  setSelectedLanguage(newLang);

  if (currentProblem) {
    setCode(currentProblem.starterCode?.[newLang] || "");
  }

  setOutput(null);
};

const handleProblemChanges = (newProblemId) => {
  if (newProblemId !== currentProblemId) {
    navigate(`/problem/${newProblemId}`);
  }
};


const triggerConfetti = () => {
  confetti({
    particleCount: 80,
    spread: 250,
    origin: { x: 0.2, y: 0.6 },
  });

  confetti({
    particleCount: 80,
    spread: 250,
    origin: { x: 0.8, y: 0.6 },
  });
};






const checkIfTestsPassed = (actualOutput, expectedOutput) => {
  const actual = actualOutput.trim().replace(/'/g, '"').replace(/\s/g, "");
const expected = expectedOutput.trim().replace(/'/g, '"').replace(/\s/g, "");
  
  console.log("Actual:  ", actual);
  console.log("Expected:", expected);
  console.log("Match:", actual === expected);
  
  return actual === expected;
};

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);

    // check if code executed successfully and matches expected output

    if (result.success) {
      const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
      const testsPassed = checkIfTestsPassed(result.output, expectedOutput);

      if (testsPassed) {
        triggerConfetti();
        toast.success("All tests passed! Great job!");
      } else {
        toast.error("Tests failed. Check your output!");
      }
    } else {
      toast.error("Code execution failed!");
    }
  };

    




return (
  <div className="h-screen bg-base-100 flex flex-col">
    <Navbar />
    <Toaster />

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
              <OutputPanel
              output={output}  />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  </div>
);

}

export default ProblemPage
