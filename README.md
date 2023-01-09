# Holaplex API dApp Starter

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
```


Then, start the development server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Holaplex GraphQL API

Our api service is a graphql endpoint serving up clean and organized solana program data.

Some example queries 

```graphql
query nfts(
  $owners: [PublicKey!],
  $creators: [PublicKey!],
  $updateAuthorities: [PublicKey!],
  $offerers: [PublicKey!],
  $attributes: [AttributeFilter!],
  $listed: Boolean,
  $allowUnverified: Boolean,
  $withOffers: Boolean,
  $auctionHouses: [PublicKey!],
  $collection: PublicKey,
  $collections: [PublicKey!],
  $term: String,
  $limit: Int!,
  $offset: Int!
)
```


```json
{
  nfts(creators:["232PpcrPc6Kz7geafvbRzt5HnHP4kX88yvzUCN69WXQC"], offset:0, limit:10){
    name
    description
    mintAddress
    owner{
      address
    }
  }
}
```

```json
{
  "data": {
    "nfts": [
      {
        "name": "Polymorphism",
        "description": "The polymorphic robot is truly a marvel of engineering. Its ability to change its form allows it to squeeze into small spaces, climb walls, and even swim. Its many arms and legs give it a grip that is unrivaled, and its advanced sensors allow it to navigate and interact with its surroundings with ease.\n\nThe polymorphic robot is still in its early stages, but it has already shown tremendous potential. It is sure to revolutionize the world of robotics, and change the way we interact with our machines.",
        "mintAddress": "BpkMcdAPcz5W3uiPbs2snJrBWnhU31LL6iUcZrDuyELN",
        "owner": {
          "address": "94PxvJEg2HvVPGenqStzLS8Bj8NDxvKCLbbgpAxX9PpF"
        }
      },
      ...
    ]
  }
}
```

## Learn More

To learn more about Holaplex, take a look at the following resources:

- [Holaplex API Documentation](https://docs.holaplex.com) - read about holaplex API and features. 
- [Learn more about Holaplex](https://https://www.holaplex.com/) - learn how Holaplex can help maximize your web3 potential.



## Holaplex Support
support@holaplex.com


## License

AGPLv3