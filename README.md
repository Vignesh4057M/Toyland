# ToyLand MERN E-Commerce

This ZIP is converted from the provided Women’s Styles MERN concept into a ToyLand toys e-commerce website.

## Styling
- Tailwind CSS removed from Vite config and frontend dependencies.
- Normal CSS is used.
- Each main JSX component/page has its own separate CSS file.

## Run Backend
```bash
cd backend
npm install
npm run seed
npm start
```

Backend URL: `http://localhost:5000`

## Run Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

## Admin Login
URL: `http://localhost:5173/admin/login`

```txt
Username: Admin
Password: Admin123
```

Backend `.env` must include:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/toyland
JWT_SECRET=toylandsecret
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=Admin123
FRONTEND_URL=http://localhost:5173
```
