# AI Mentor - Design Document

## System Architecture

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │    │  Express API    │    │    MongoDB      │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Cloudinary    │    │   OpenAI API    │    │     Stripe      │
│ (File Storage)  │    │  (AI Service)   │    │   (Payments)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Database Design

### User Schema
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  profile: {
    firstName: String,
    lastName: String,
    avatar: String (Cloudinary URL),
    bio: String,
    currentRole: String,
    targetRole: String,
    experience: String,
    skills: [String],
    interests: [String]
  },
  subscription: {
    type: String (free/premium),
    status: String (active/cancelled/expired),
    stripeCustomerId: String,
    subscriptionId: String,
    currentPeriodEnd: Date
  },
  preferences: {
    theme: String (light/dark),
    notifications: Boolean,
    language: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Chat Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  title: String,
  messages: [{
    role: String (user/assistant),
    content: String,
    timestamp: Date,
    metadata: {
      tokens: Number,
      model: String,
      responseTime: Number
    }
  }],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Roadmap Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  title: String,
  description: String,
  targetRole: String,
  difficulty: String (beginner/intermediate/advanced),
  estimatedDuration: String,
  milestones: [{
    title: String,
    description: String,
    resources: [{
      title: String,
      url: String,
      type: String (article/video/course/book)
    }],
    completed: Boolean,
    completedAt: Date
  }],
  tags: [String],
  isPublic: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Interview Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  type: String (technical/behavioral/system-design),
  difficulty: String,
  questions: [{
    question: String,
    userAnswer: String,
    aiResponse: String,
    score: Number,
    feedback: String,
    timestamp: Date
  }],
  overallScore: Number,
  duration: Number,
  feedback: {
    strengths: [String],
    improvements: [String],
    recommendations: [String]
  },
  createdAt: Date
}
```

## API Design

### Authentication Endpoints
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### User Management
```
GET    /api/users/profile
PUT    /api/users/profile
DELETE /api/users/account
POST   /api/users/upload-avatar
```

### Chat System
```
GET    /api/chats                    # Get user's chat history
POST   /api/chats                    # Create new chat
GET    /api/chats/:id                # Get specific chat
PUT    /api/chats/:id                # Update chat title
DELETE /api/chats/:id                # Delete chat
POST   /api/chats/:id/messages       # Send message
```

### Roadmap Management
```
GET    /api/roadmaps                 # Get user's roadmaps
POST   /api/roadmaps                 # Generate new roadmap
GET    /api/roadmaps/:id             # Get specific roadmap
PUT    /api/roadmaps/:id             # Update roadmap
DELETE /api/roadmaps/:id             # Delete roadmap
PUT    /api/roadmaps/:id/milestone   # Update milestone progress
```

### Interview System (Premium)
```
GET    /api/interviews               # Get interview history
POST   /api/interviews               # Start new interview
GET    /api/interviews/:id           # Get interview details
POST   /api/interviews/:id/answer    # Submit answer
POST   /api/interviews/:id/complete  # Complete interview
```

### Subscription Management
```
GET    /api/subscriptions/plans      # Get available plans
POST   /api/subscriptions/create     # Create subscription
POST   /api/subscriptions/cancel     # Cancel subscription
GET    /api/subscriptions/status     # Get subscription status
POST   /api/subscriptions/webhook    # Stripe webhook
```

## Frontend Architecture

### Component Structure
```
src/
├── components/
│   ├── common/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Sidebar.jsx
│   │   └── LoadingSpinner.jsx
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   └── ProtectedRoute.jsx
│   ├── chat/
│   │   ├── ChatInterface.jsx
│   │   ├── MessageList.jsx
│   │   ├── MessageInput.jsx
│   │   └── ChatHistory.jsx
│   ├── roadmap/
│   │   ├── RoadmapGenerator.jsx
│   │   ├── RoadmapViewer.jsx
│   │   ├── MilestoneCard.jsx
│   │   └── ProgressTracker.jsx
│   └── interview/
│       ├── InterviewSetup.jsx
│       ├── InterviewInterface.jsx
│       ├── QuestionCard.jsx
│       └── ResultsAnalysis.jsx
├── pages/
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   ├── Chat.jsx
│   ├── Roadmaps.jsx
│   ├── Interviews.jsx
│   ├── Internships.jsx
│   ├── Hackathons.jsx
│   └── Profile.jsx
├── hooks/
│   ├── useAuth.js
│   ├── useChat.js
│   ├── useSubscription.js
│   └── useLocalStorage.js
├── services/
│   ├── api.js
│   ├── auth.js
│   ├── chat.js
│   └── subscription.js
└── utils/
    ├── constants.js
    ├── helpers.js
    └── validation.js
```

### State Management
- React Context for global state (auth, theme, user preferences)
- Local state with useState for component-specific data
- Custom hooks for complex state logic
- React Query for server state management

## Security Design

### Authentication Flow
1. User submits credentials
2. Server validates and generates JWT tokens (access + refresh)
3. Access token stored in memory, refresh token in httpOnly cookie
4. Protected routes verify JWT on each request
5. Token refresh mechanism for seamless UX

### Data Protection
- Input validation using Joi/express-validator
- SQL injection prevention through parameterized queries
- XSS protection with content sanitization
- CSRF protection with SameSite cookies
- Rate limiting to prevent abuse
- Helmet.js for security headers

### API Security
- HTTPS enforcement
- CORS configuration
- Request size limits
- Authentication middleware
- Role-based access control
- API versioning strategy

## Performance Optimization

### Frontend
- Code splitting with React.lazy()
- Image optimization and lazy loading
- Memoization with React.memo and useMemo
- Virtual scrolling for large lists
- Service worker for caching
- Bundle size optimization

### Backend
- Database indexing strategy
- Query optimization
- Response caching with Redis
- Compression middleware
- Connection pooling
- Background job processing

### Infrastructure
- CDN for static assets
- Load balancing
- Database read replicas
- Horizontal scaling capabilities
- Monitoring and alerting

## Error Handling Strategy

### Frontend Error Boundaries
```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### Backend Error Handling
- Centralized error handling middleware
- Structured error responses
- Logging with Winston
- Error categorization (client/server errors)
- Graceful degradation strategies

## Testing Strategy

### Frontend Testing
- Unit tests with Jest and React Testing Library
- Integration tests for user flows
- E2E tests with Cypress
- Visual regression testing
- Accessibility testing

### Backend Testing
- Unit tests for business logic
- Integration tests for API endpoints
- Database testing with test fixtures
- Load testing with Artillery
- Security testing

## Deployment Architecture

### Development Environment
- Local development with hot reloading
- Docker containers for consistency
- Environment variable management
- Database seeding scripts

### Production Environment
- Container orchestration (Docker/Kubernetes)
- Load balancer configuration
- SSL certificate management
- Environment-specific configurations
- Monitoring and logging setup

### CI/CD Pipeline
1. Code commit triggers pipeline
2. Run automated tests
3. Build and containerize application
4. Deploy to staging environment
5. Run integration tests
6. Deploy to production with blue-green strategy
7. Monitor deployment health

## Monitoring & Analytics

### Application Monitoring
- Performance metrics (response times, throughput)
- Error tracking and alerting
- User behavior analytics
- Resource utilization monitoring
- Uptime monitoring

### Business Metrics
- User engagement metrics
- Conversion funnel analysis
- Feature usage statistics
- Revenue and subscription metrics
- Customer satisfaction scores