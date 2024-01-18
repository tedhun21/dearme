"use client";

import { todoListState } from "@/store/atoms";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Test() {
  const [currentStep, setCurrentStep] = useState(1);
  console.log(currentStep);
  return (
    <div>
      {currentStep === 1 && <div>안녕하세요1</div>}
      {currentStep === 2 && <div>안녕하세요2</div>}
      {currentStep === 3 && <div>안녕하세요3</div>}
      {currentStep === 4 && <div>안녕하세요4</div>}

      <div>
        <button onClick={() => setCurrentStep(1)}>1</button>
        <button onClick={() => setCurrentStep(2)}>2</button>
        <button onClick={() => setCurrentStep(3)}>3</button>
        <button onClick={() => setCurrentStep(4)}>4</button>
      </div>
    </div>
  );
}
// 보이시죠?
