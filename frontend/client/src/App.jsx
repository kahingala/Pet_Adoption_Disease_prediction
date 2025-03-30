import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Symptom from "./Symptom";
import Disease from "./Disease";

function App() {
    return (
        <Router>
            <Routes>
                
                <Route path="/" element={<Navigate to="/symptom" replace />} />
                <Route path="/symptom" element={<Symptom />} />
                <Route path="/disease" element={<Disease />} />
            </Routes>
        </Router>
    );
}

export default App;
