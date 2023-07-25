import { NotFoundPage } from './pages/NotFound.jsx';
import { ValidateEmail } from './pages/ValidateEmail.jsx';
import { Routes, Route } from 'react-router-dom';
// import { Comment } from './utils/Comment.jsx';
// import { RemoveComment } from './utils/Comment.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/validate-email" element={<ValidateEmail />} />
        {/* <Route path="/posts/:postId/comments/:commentId" element={<Comment />} />
        <Route path="/posts/:postId/comments/:commentId" element={<RemoveComment />} /> */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App