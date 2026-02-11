import express from 'express'
import { 
  addComment, 
  deleteBlogById, 
  getAllBlogs, 
  getBlogById, 
  getBlogComments, 
  publishBlog,
  unpublishBlog 
} from '../controllers/blogController.js'
import auth from '../middleware/auth.js'
import { commentLimiter } from '../middleware/rateLimiter.js'
import { validateComment } from '../validators/blogValidator.js'

const blogRouter = express.Router()

// Public routes
blogRouter.get('/all', getAllBlogs)
blogRouter.get('/:blogId', getBlogById)
blogRouter.post('/add-comment', commentLimiter, validateComment, addComment)
blogRouter.post('/comments', getBlogComments)

// Apply auth middleware to all routes below this point
blogRouter.use(auth)

// Protected routes
blogRouter.post('/delete', deleteBlogById)
blogRouter.post('/publish', publishBlog)
blogRouter.post('/unpublish', unpublishBlog)

export default blogRouter