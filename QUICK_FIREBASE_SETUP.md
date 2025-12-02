# ⚡ Quick Firebase Setup Guide
**Time Required:** 20 minutes

This will enable your staff portal authentication.

---

## 🔥 Step 1: Create Firebase Project (5 mins)

1. **Go to Firebase Console:**
   https://console.firebase.google.com

2. **Click "Add project"**

3. **Name your project:** "Peninsula Equine"

4. **Google Analytics:** Disable (optional)

5. **Click "Create project"** → Wait ~30 seconds

6. **Click "Continue"**

---

## 🔐 Step 2: Enable Authentication (3 mins)

1. **In left sidebar:** Click "Authentication"

2. **Click "Get started"**

3. **Sign-in method tab** → Click "Email/Password"

4. **Enable** the toggle switch

5. **Click "Save"**

---

## 💾 Step 3: Create Firestore Database (3 mins)

1. **In left sidebar:** Click "Firestore Database"

2. **Click "Create database"**

3. **Start in production mode** → Next

4. **Select location:** `australia-southeast1` (or closest to you)

5. **Click "Enable"** → Wait ~1 minute

---

## 🔑 Step 4: Get Your Credentials (2 mins)

1. **Click gear icon** (⚙️) → "Project settings"

2. **Scroll to "Your apps"**

3. **Click the Web icon** `</>`

4. **Register app:**
   - Name: "Peninsula Equine Web"
   - Don't check "Firebase Hosting"
   - Click "Register app"

5. **Copy the `firebaseConfig` object** - looks like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "peninsula-equine-xxx.firebaseapp.com",
     projectId: "peninsula-equine-xxx",
     storageBucket: "peninsula-equine-xxx.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```

6. **Click "Continue to console"**

---

## 📝 Step 5: Update Your Code (2 mins)

1. **Open file:** `src/lib/firebase-config.ts`

2. **Replace the config** with your credentials:

```typescript
// Firebase Configuration
export const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",  // Paste from Firebase
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

3. **Save the file** (Ctrl+S or Cmd+S)

4. **Refresh browser** - dev server hot-reloads automatically

---

## 🔒 Step 6: Add Security Rules (3 mins)

1. **In Firebase Console:** Firestore Database → Rules

2. **Replace with these rules:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Authenticated users can submit forms
    match /timesheets/{document} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    match /swms/{document} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    match /incidents/{document} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /toolboxTalks/{document} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
    }
    
    // Admin-only collections
    match /analytics/{document} {
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

3. **Click "Publish"**

---

## 👤 Step 7: Create First User (2 mins)

### Create Admin Account:

1. **Authentication → Users → Add user**

2. **Fill in:**
   - Email: `admin@peninsulaequine.com.au` (or your email)
   - Password: Choose a strong password
   
3. **Click "Add user"**

4. **Copy the User UID** (shows after creation)

### Set Admin Role:

1. **Firestore Database → Start collection**

2. **Collection ID:** `users`

3. **Document ID:** Paste the User UID you copied

4. **Add fields:**
   - Field: `email` | Type: string | Value: `admin@peninsulaequine.com.au`
   - Field: `role` | Type: string | Value: `admin`
   - Field: `displayName` | Type: string | Value: `Admin User`
   - Field: `createdAt` | Type: timestamp | Value: (click "Set to current time")

5. **Click "Save"**

### Create Worker Account (Optional):

Repeat above with:
- Email: `worker@peninsulaequine.com.au`
- Role: `worker`
- DisplayName: `Test Worker`

---

## ✅ Step 8: Test It! (1 min)

1. **Go to:** http://localhost:3000

2. **Click "Portal"** button

3. **Try logging in:**
   - Email: `admin@peninsulaequine.com.au`
   - Password: (the one you set)

4. **Should see:** Dashboard loads!

**Success!** ✅ Your portal authentication now works.

---

## 🎯 Quick Command Reference

**If you need to restart dev server:**
```bash
# Stop server (Ctrl+C), then:
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
cd /Users/cirocasa/Documents/GitHub/PeninsulaEquineWeb-Deploy
npm run dev
```

---

## 🔧 Troubleshooting

**Error: "Firebase not initialized"**
- Check credentials in `src/lib/firebase-config.ts`
- Make sure you saved the file
- Refresh browser

**Error: "Auth domain mismatch"**
- Check `authDomain` matches Firebase Console
- Should be: `your-project.firebaseapp.com`

**Error: "Permission denied"**
- Check Firestore rules are published
- Verify user exists in Authentication
- Check user role in Firestore

**Login fails silently**
- Check browser console for errors
- Verify email/password correct
- Check user enabled in Firebase Console

---

## 📚 What You Get

After Firebase setup:

**Staff Portal:**
- ✅ Secure login/logout
- ✅ Worker dashboard
- ✅ Timesheet submission
- ✅ SWMS forms
- ✅ Incident reports
- ✅ Toolbox talks
- ✅ Document access

**Admin Portal:**
- ✅ User management
- ✅ Timesheet approvals
- ✅ Analytics dashboard
- ✅ System settings
- ✅ Data export

---

## 🚀 Ready?

Follow the steps above, then test your portal at:
**http://localhost:3000/portal**

Total time: ~20 minutes
Difficulty: Easy ⭐⭐☆☆☆

---

**Need help?** See `COMPREHENSIVE_FIX_REPORT.md` → Phase 4 for detailed instructions.
