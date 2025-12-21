# Backend Authentication Setup Guide

## Overview

This guide explains how to integrate Clerk authentication with your backend API. The frontend sends JWT tokens in HTTP headers, and your backend needs to validate these tokens to authenticate users.

---

## How Authentication Works

### Request Flow

```
Frontend (Next.js + Clerk)
    ↓
    Makes API request with headers:
    - Authorization: Bearer <clerk_jwt_token>
    - X-User-Id: <clerk_user_id>
    ↓
Backend API
    ↓
    Validates JWT token
    ↓
    Extracts user information
    ↓
    Processes request
```

### Expected Request Format

Every authenticated API request from the frontend will include these headers:

```http
GET /api/workflows HTTP/1.1
Host: your-backend.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
X-User-Id: user_2abcXYZ123
Content-Type: application/json
```

**Important**:

- `Authorization` header contains the Clerk JWT token
- `X-User-Id` header contains the Clerk user ID for convenience
- **Always validate the JWT token** - don't trust the `X-User-Id` header alone
- Extract the actual user ID from the verified token

---

## Clerk JWT Token Structure

### Token Claims

When decoded, a Clerk JWT looks like this:

```json
{
  "azp": "http://localhost:3000",
  "exp": 1702345678,
  "iat": 1702345618,
  "iss": "https://clerk.yourapp.com",
  "nbf": 1702345618,
  "sid": "sess_2abc...",
  "sub": "user_2abcXYZ123",
  "org_id": "org_2xyz...",
  "org_role": "admin",
  "org_slug": "myorg"
}
```

**Key Claims**:

- `sub`: User ID (subject) - this is the authenticated user
- `exp`: Expiration timestamp
- `iat`: Issued at timestamp
- `iss`: Issuer (your Clerk instance)
- `sid`: Session ID
- `org_id`, `org_role`: Organization data (if using Clerk Organizations)

---

## Backend Implementation

### Option 1: Using Clerk Backend SDK (Recommended)

The easiest and most secure approach.

#### Node.js / Express

```bash
npm install @clerk/backend
```

```javascript
import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

// Middleware to verify token
async function authenticateClerk(req, res, next) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify token and get session
    const session = await clerkClient.verifyToken(token);

    // Add user info to request
    req.userId = session.sub;
    req.sessionId = session.sid;

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
}

// Use in routes
app.get("/api/workflows", authenticateClerk, async (req, res) => {
  const userId = req.userId;
  // ... your business logic
});
```

#### Python / FastAPI

```bash
pip install pyclerk
```

```python
from fastapi import FastAPI, Header, HTTPException, Depends
from pyclerk import Clerk
import os

app = FastAPI()
clerk = Clerk(bearer_auth=os.getenv('CLERK_SECRET_KEY'))

async def verify_clerk_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="No token provided")

    try:
        token = authorization.replace("Bearer ", "")
        # Verify token
        session = clerk.sessions.verify_session(token)
        return session['user_id']
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.get("/api/workflows")
async def get_workflows(user_id: str = Depends(verify_clerk_token)):
    # user_id is now available
    return {"user_id": user_id, "workflows": []}
```

---

### Option 2: Manual JWT Verification

If you prefer not to use the Clerk SDK, you can verify JWTs manually.

#### Node.js

```bash
npm install jsonwebtoken jwks-rsa
```

```javascript
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

// Create JWKS client to fetch Clerk's public keys
const client = jwksClient({
  jwksUri: "https://YOUR_CLERK_DOMAIN/.well-known/jwks.json",
  // Get YOUR_CLERK_DOMAIN from Clerk Dashboard > API Keys
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

async function verifyClerkToken(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(
    token,
    getKey,
    {
      algorithms: ["RS256"],
      issuer: "https://YOUR_CLERK_DOMAIN",
    },
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }

      req.userId = decoded.sub;
      req.sessionId = decoded.sid;
      next();
    }
  );
}
```

#### Python

```bash
pip install pyjwt cryptography requests
```

```python
import jwt
import requests
from functools import lru_cache

CLERK_DOMAIN = "https://YOUR_CLERK_DOMAIN"

@lru_cache(maxsize=1)
def get_jwks():
    """Fetch and cache Clerk's public keys"""
    response = requests.get(f"{CLERK_DOMAIN}/.well-known/jwks.json")
    return response.json()

def verify_token(token: str) -> dict:
    """Verify JWT token and return claims"""
    jwks = get_jwks()

    # Get the key ID from token header
    unverified_header = jwt.get_unverified_header(token)
    kid = unverified_header['kid']

    # Find the matching key
    key = next((k for k in jwks['keys'] if k['kid'] == kid), None)
    if not key:
        raise ValueError("Public key not found")

    # Verify token
    claims = jwt.decode(
        token,
        key,
        algorithms=['RS256'],
        issuer=CLERK_DOMAIN,
    )

    return claims
```

#### Go

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "strings"
    "github.com/golang-jwt/jwt/v5"
)

const ClerkDomain = "https://YOUR_CLERK_DOMAIN"

func getJWKS() (*jwt.JWKS, error) {
    resp, err := http.Get(ClerkDomain + "/.well-known/jwks.json")
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    var jwks jwt.JWKS
    if err := json.NewDecoder(resp.Body).Decode(&jwks); err != nil {
        return nil, err
    }
    return &jwks, nil
}

func authMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        authHeader := r.Header.Get("Authorization")
        if authHeader == "" {
            http.Error(w, "No token provided", http.StatusUnauthorized)
            return
        }

        tokenString := strings.TrimPrefix(authHeader, "Bearer ")

        token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
            // Verify signing method
            if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
                return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
            }

            // Get JWKS and find the key
            jwks, err := getJWKS()
            if err != nil {
                return nil, err
            }

            // Find the key with matching kid
            kid := token.Header["kid"].(string)
            key := jwks.LookupKeyID(kid)
            if key == nil {
                return nil, fmt.Errorf("key not found")
            }

            return key, nil
        })

        if err != nil || !token.Valid {
            http.Error(w, "Invalid token", http.StatusUnauthorized)
            return
        }

        claims := token.Claims.(jwt.MapClaims)
        userID := claims["sub"].(string)

        // Add userID to request context
        // ... (use context to pass userID to handler)

        next(w, r)
    }
}
```

---

## Getting Your Clerk Configuration

### 1. Find Your Clerk Domain

Go to **Clerk Dashboard** > **API Keys**

Your domain looks like:

- `https://your-app-123.clerk.accounts.dev` (development)
- `https://clerk.yourapp.com` (production)

### 2. Get Your Secret Key

In the same **API Keys** section, copy your:

- **Secret Key** (starts with `sk_test_` or `sk_live_`)

Store this in your backend environment variables:

```bash
CLERK_SECRET_KEY=sk_test_...
```

### 3. JWKS URL

The public keys for JWT verification are at:

```
https://YOUR_CLERK_DOMAIN/.well-known/jwks.json
```

---

## Security Best Practices

### ✅ DO

1. **Always verify the JWT signature** using Clerk's public keys
2. **Check token expiration** (exp claim)
3. **Validate the issuer** (iss claim) matches your Clerk domain
4. **Use HTTPS** in production
5. **Store secret keys securely** (environment variables, secret managers)
6. **Extract user ID from verified token** (sub claim), don't trust headers alone
7. **Implement rate limiting** per user
8. **Log authentication failures** for security monitoring
9. **Cache JWKS** to reduce requests to Clerk (with reasonable TTL)
10. **Set appropriate CORS policies**

### ❌ DON'T

1. **Don't trust the X-User-Id header** without verifying the JWT
2. **Don't commit secret keys** to version control
3. **Don't skip token signature verification**
4. **Don't use the same secret for multiple environments**
5. **Don't implement your own JWT signing** - use Clerk's tokens
6. **Don't expose secret keys** in frontend code
7. **Don't cache tokens indefinitely** - respect expiration

---

## Error Handling

### Common Error Scenarios

| Error             | Status Code | Reason                              | Solution                             |
| ----------------- | ----------- | ----------------------------------- | ------------------------------------ |
| No token          | 401         | Authorization header missing        | Frontend needs to send token         |
| Invalid signature | 401         | Token tampered or wrong key         | Verify JWKS URL and secret key       |
| Token expired     | 401         | Token past expiration time          | Frontend should refresh token        |
| Invalid issuer    | 401         | Token from different Clerk instance | Check Clerk domain configuration     |
| Wrong algorithm   | 401         | Token not signed with RS256         | Ensure Clerk is configured correctly |

### Example Error Response

```json
{
  "error": "unauthorized",
  "message": "Invalid or expired token",
  "code": "AUTH_INVALID_TOKEN"
}
```

---

## Testing Authentication

### Test with cURL

```bash
# Get a token from your frontend (console.log it in dev)
TOKEN="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
USER_ID="user_2abcXYZ123"

# Make authenticated request
curl -X GET "http://localhost:8000/api/workflows" \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-User-Id: $USER_ID" \
  -H "Content-Type: application/json"
```

### Test in Development

1. **Frontend**: Log the token in browser console

   ```javascript
   const { getToken } = useAuth();
   const token = await getToken();
   console.log("Token:", token);
   ```

2. **Backend**: Add debug logging

   ```javascript
   console.log("Received token:", token);
   console.log("Token valid:", isValid);
   console.log("User ID:", userId);
   ```

3. **Verify JWT**: Use [jwt.io](https://jwt.io) to decode and inspect tokens

---

## Performance Optimization

### Cache JWKS

Public keys don't change frequently. Cache them:

```javascript
// Cache JWKS for 1 hour
let jwksCache = null;
let jwksCacheTime = 0;
const CACHE_TTL = 3600000; // 1 hour

async function getJWKS() {
  const now = Date.now();
  if (jwksCache && now - jwksCacheTime < CACHE_TTL) {
    return jwksCache;
  }

  const response = await fetch(
    "https://YOUR_CLERK_DOMAIN/.well-known/jwks.json"
  );
  jwksCache = await response.json();
  jwksCacheTime = now;

  return jwksCache;
}
```

---

## Questions?

**Frontend Repository**: This Next.js app with Clerk integration
**Backend Requirements**:

- Validate JWT tokens from `Authorization` header
- Extract user ID from token claims (`sub`)
- Return 401 for invalid/expired tokens
- Support standard REST/GraphQL patterns

**Need Help?**

- [Clerk Backend Documentation](https://clerk.com/docs/backend-requests/overview)
- [JWT.io](https://jwt.io) - Decode and inspect tokens
- [Clerk Discord](https://clerk.com/discord) - Community support
