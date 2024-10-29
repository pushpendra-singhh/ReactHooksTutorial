import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UseStateDemo from './pages/UseStateDemo';
import UseEffectDemo from './pages/UseEffectDemo';
import UseContextDemo from './pages/UseContextDemo';
import UseReducerDemo from './pages/UseReducerDemo';
import UseRefDemo from './pages/UseRefDemo';
import UseMemoDemo from './pages/UseMemoDemo';
import UseCallbackDemo from './pages/UseCallbackDemo';
import UseLayoutEffectDemo from './pages/UseLayoutEffectDemo';
import UseImperativeHandleDemo from './pages/UseImperativeHandleDemo';
import UseDebugValueDemo from './pages/UseDebugValueDemo';
import UseDeferredValueDemo from './pages/AdvancedHooks/UseDeferredValueDemo';
import UseTransitionDemo from './pages/AdvancedHooks/UseTransitionDemo';
import UseIdDemo from './pages/AdvancedHooks/UseIdDemo';
import UseSyncExternalStoreDemo from './pages/AdvancedHooks/UseSyncExternalStoreDemo';
import UseInsertionEffectDemo from './pages/AdvancedHooks/UseInsertionEffectDemo';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usestate" element={<UseStateDemo />} />
            <Route path="/useeffect" element={<UseEffectDemo />} />
            <Route path="/usecontext" element={<UseContextDemo />} />
            <Route path="/usereducer" element={<UseReducerDemo />} />
            <Route path="/useref" element={<UseRefDemo />} />
            <Route path="/usememo" element={<UseMemoDemo />} />
            <Route path="/usecallback" element={<UseCallbackDemo />} />
            <Route path="/uselayouteffect" element={<UseLayoutEffectDemo />} />
            <Route path="/useimperativehandle" element={<UseImperativeHandleDemo />} />
            <Route path="/usedebugvalue" element={<UseDebugValueDemo />} />
            <Route path="/usedeferredvalue" element={<UseDeferredValueDemo />} />
            <Route path="/usetransition" element={<UseTransitionDemo />} />
            <Route path="/useid" element={<UseIdDemo />} />
            <Route path="/usesynexternalstore" element={<UseSyncExternalStoreDemo />} />
            <Route path="/useinsertioneffect" element={<UseInsertionEffectDemo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;