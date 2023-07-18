import { NotFoundPage } from './pages/NotFound.jsx';
import { ValidateEmail } from './pages/ValidateEmail.jsx';
import { Routes, Route } from 'react-router-dom';
import { Comment } from './utils/Comment.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/users/validate-email" element={<ValidateEmail />} />
        <Route path="/posts/:postId/comments/:commentId" element={<Comment />} />
        {/* // <Route path="/posts/:postId/comments/:commentId" element={< />} / > */}

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App