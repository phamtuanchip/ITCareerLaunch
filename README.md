# 5Minutes Education Platform

A comprehensive IT education platform with a professional landing page and robust admin management system. The application provides full content management capabilities, allowing dynamic updates to website content, handling of contact submissions, and secure administrative access.

## Tech Stack

- Frontend: React.js with TypeScript
- Backend: Node.js/Express
- Database: PostgreSQL
- ORM: Drizzle
- Authentication: Session-based with Express-session
- UI Components: shadcn/ui + Tailwind CSS

## Prerequisites

- Node.js v20.x or later
- PostgreSQL database
- npm or yarn package manager

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd 5minutes-education
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following content:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/your_database
```

4. Initialize the database:
```bash
npm run db:push
```
This will create all necessary database tables using Drizzle ORM.

## Running the Application

Development mode:
```bash
npm run dev
```
This will start both the frontend and backend servers in development mode.
- Frontend will be available at: http://localhost:5000
- Backend API will be available at: http://localhost:5000/api

## Admin Access

Default admin credentials:
- Email: admin@5minutes.edu.vn
- Password: 0902318580

After logging in as admin, you can:
- Manage services and team members
- View contact form submissions
- Update website content
- Modify footer information

## Project Structure

```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── lib/        # Utility functions
│   │   └── pages/      # Page components
├── server/             # Backend Express application
│   ├── auth.ts        # Authentication setup
│   ├── routes.ts      # API routes
│   └── storage.ts     # Database operations
├── shared/            # Shared code between frontend and backend
│   └── schema.ts     # Database schema and types
```

## Key Features

1. **Content Management**
   - Dynamic service management
   - Team member profiles
   - Contact form submissions

2. **Admin Dashboard**
   - Secure admin authentication
   - Content editing capabilities
   - Contact message management

3. **Responsive Design**
   - Mobile-first approach
   - Professional UI/UX
   - Optimized for all devices

## Development Guidelines

1. **Code Style**
   - Use TypeScript for type safety
   - Follow the existing project structure
   - Use shadcn/ui components for UI consistency

2. **Database Operations**
   - Use Drizzle ORM for database interactions
   - Follow the schema defined in `shared/schema.ts`
   - Run `npm run db:push` after schema changes

3. **API Development**
   - All API routes should be prefixed with `/api`
   - Use proper error handling
   - Validate requests using Zod schemas

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Database Management

The application uses PostgreSQL with Drizzle ORM. Key database operations:

1. View current schema:
```bash
npm run db:push
```

2. Update schema:
- Modify `shared/schema.ts`
- Run `npm run db:push` to apply changes

## Troubleshooting

1. **Database Connection Issues**
   - Verify DATABASE_URL in environment variables
   - Ensure PostgreSQL is running
   - Check database credentials

2. **Build Errors**
   - Clear node_modules and reinstall dependencies
   - Verify TypeScript compilation with `npm run check`

3. **Runtime Errors**
   - Check server logs for backend issues
   - Review browser console for frontend errors

## License

MIT
