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
