# Gemini file search

## Installation

### Prerequisites
- Node.js 18 or higher
- Docker and Docker Compose
- Git

### Quick Start with Docker

1. Clone the repository:
```bash
git clone https://github.com/Sanyuri/Gemini-file-search.git
cd Gemini-file-search
```

2. Configure environment variables:
```bash
cp .env.example .env.development (for development)
cp .env.example .env.production (for production)
# Edit .env.development and .env.production with your Gemini API key and other required variables
```

3. Run with Docker Compose:
```bash
docker compose -f docker-compose.yml --env-file .env.production up -d   (for production)
docker compose -f docker-compose.yml --env-file .env.development up -d  (for development)
```

The application will be available at `http://localhost:5173/`

### Manual Installation

1. Clone the repository:
```bash
git clone https://github.com/Sanyuri/Gemini-file-search.git
cd Gemini-file-search
```

2. Install dependencies:
```bash
cd Backend (FrontEnd)
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env (in backend and frontend folder)
# Edit .env with your Gemini API key and other required variables
```

4. Start the backend (Express.js):
```bash
cd Backend
npm run start
```

5. In another terminal, start the frontend (Vue):
```bash
cd Frontend
npm run dev
```

### Troubleshooting
- Ensure Node.js 18+ is installed: `node --version`
- Verify Docker is running before using docker-compose
- Check that API credentials are correctly set in .env
- Ensure ports 3000 and 5173 are available (or update configuration)

