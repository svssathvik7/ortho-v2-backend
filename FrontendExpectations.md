# Image frontend expectations

```js
investigations: [
  {
    phase: "pre-op" | "per-op" | "post-op",
    notes: "Optional investigation notes",
    assets: [
      {
        url: "data:image/jpeg;base64,/9j/4AAQSkZJRg...", // Base64 encoded image string
      },
    ],
  },
];
```

# Search frontend expectations

```js
// GET /api/patients/search?gender=male&complaints=pain&illness=fracture&examination=swelling&diagnosis=fracture&diseaseTags=trauma

// Query Parameters
type SearchParams = {
  gender?: "male" | "female" | "other", // Optional, case-insensitive
  complaints?: string, // Optional, supports partial matches
  illness?: string, // Optional, supports partial matches
  examination?: string, // Optional, supports partial matches
  diagnosis?: string, // Optional, supports partial matches
  diseaseTags?: string, // Optional, supports partial matches
};

// Response format
type SearchResponse = {
  success: boolean,
  message: string,
  data: Patient[],
};

// Example Request
fetch("/api/patients/search?gender=male&complaints=knee pain", {
  method: "GET",
  headers: {
    Authorization: "Bearer <your_jwt_token>",
  },
});
```
