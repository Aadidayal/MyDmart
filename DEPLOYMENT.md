# Vercel Deployment Guide

## ✅ Changes Made for Vercel Deployment

### 1. **API Configuration**
- Created `src/config/api.js` for environment-aware API URLs
- Automatically uses `localhost:5000` in development
- Uses Vercel domain in production

### 2. **Updated All Components**
- Replaced hardcoded `http://localhost:5000` with dynamic `API_URL`
- Updated all fetch calls and axios requests
- Components affected:
  - AuthContext.jsx
  - App.jsx  
  - SellerPage.jsx
  - SellerLogin.jsx
  - SellerDashboard.jsx
  - ProductList.jsx
  - Cart.jsx (both versions)
  - AdminDashboard.jsx
  - All Category components (Groceries, Electronics, Clothing)

### 3. **Vercel Configuration**
- Added `vercel.json` with proper routing
- Frontend routes to `index.html`
- API routes to `/backend/server.js`

### 4. **Branch Cleanup**
- ✅ Merged feature branch into main
- ✅ Deleted feature branch (local and remote)
- ✅ Now using single `main` branch

## 🚀 Vercel Deployment Steps

### 1. **Set Vercel Production Branch**
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Git**
3. Set **Production Branch** to `main`
4. Save changes

### 2. **Environment Variables**
Add these in Vercel Dashboard → Settings → Environment Variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
```

### 3. **Build Configuration**
Vercel should automatically detect:
- **Framework Preset**: Vite
- **Build Command**: `vite build` 
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. **Redeploy**
- Trigger a new deployment from Vercel dashboard
- Or push any small change to main branch

## 🧪 Testing

### Local Development
```bash
npm run dev
# Should use http://localhost:5000 for API calls
```

### Production
- All API calls will automatically use your Vercel domain
- Example: `https://your-app.vercel.app/api/products`

## 🔧 Troubleshooting

### If API calls still fail:
1. Check Vercel function logs in dashboard
2. Verify environment variables are set
3. Ensure MongoDB connection string is correct
4. Check that backend functions are deploying properly

### Backend Issues:
- Ensure `backend/server.js` exports properly for Vercel
- Check if all backend dependencies are in `backend/package.json`

## 📝 Files Changed
- ✅ `src/config/api.js` (new)
- ✅ `vercel.json` (new)
- ✅ `package.json` (added vercel-build script)
- ✅ All component files with API calls
- ✅ Cleaned up branches

Your app should now work correctly on Vercel! 🎉