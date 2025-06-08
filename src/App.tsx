import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WorkingModelViewer } from './components/ARModel'
import NotFound from './components/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WorkingModelViewer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
