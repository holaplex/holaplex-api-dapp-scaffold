import { NextPage } from 'next'
import Head from 'next/head'
import { Navbar } from '../components/navbar'
import { useMemo, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { gql } from '@apollo/client'
import client from '../client'

const Home: NextPage = () => {
  const { publicKey } = useWallet()


  // Sample Query 1
  const GET_NFTS_BY_OWNER = gql`
    query GetNfts($owners: [PublicKey!], $limit: Int!, $offset: Int!) {
      nfts(owners: $owners, limit: $limit, offset: $offset) {
        address
        mintAddress
        name
        description
        image
        attributes {
          value
          traitType
        }
        files {
          uri
          fileType
          metadataAddress
        }
        owner {
          address
          associatedTokenAccountAddress
          profile {
            handle
            profileImageUrl
          }
        }
      }
    }
  `

  // Sample Query 2
  const GET_NFTS_BY_CREATORS = gql`
    query GetNfts($creators: [PublicKey!], $limit: Int!, $offset: Int!) {
      nfts(creators: $creators, limit: $limit, offset: $offset) {
        address
        mintAddress
        name
        description
        image
        attributes {
          value
          traitType
        }
        files {
          uri
          fileType
          metadataAddress
        }
        owner {
          address
          associatedTokenAccountAddress
          profile {
            handle
            profileImageUrl
          }
        }
      }
    }
  `

  interface NftFile {
    metadataAddress: String
    uri: String
    fileType: String
  }
  interface NftAttribute {
    metadataAddress: String
    value: String
    traitType: String
  }

  interface TwitterProfile {
    handle: String
    profileImageUrl: String
    bannerImageUrl: String
    description: String
  }
  interface NftOwner {
    address: String
    associatedTokenAccountAddress: String
    twitterHandle: String
    profile: TwitterProfile
  }
  interface Nft {
    name: string
    address: string
    description: string
    image: string
    mintAddress: string
    owner: NftOwner
    attributes: NftAttribute[]
    files: NftFile[]
  }

  const [nfts, setNfts] = useState<Nft[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useMemo(() => {
    if (publicKey?.toBase58()) {
      setLoading(true)
      client
        .query({
          query: GET_NFTS_BY_OWNER,
          variables: {
            owners: [publicKey?.toBase58()],
            offset: 0,
            limit: 200
          }
        })
        .then(res => {
          setNfts(res.data.nfts)
          setLoading(false)
        })
    } else {
      setNfts([])
    }
  }, [publicKey?.toBase58()])

  return (
    <div>
      <Head>
        <title>Holaplex GraphQL API dApp Scaffold</title>
        <meta name='description' content='Holaplex GraphQL API dApp Scaffold' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Navbar />

      <div className='container'>
        <h1>Connected to: {publicKey?.toBase58()}</h1>
        {!loading && nfts.length > 0 && <ul>{nfts.map((nft: Nft) => <li>{nft.name}</li>)}</ul>}
        {loading && <p>Loading NFTs....</p>}
        {!loading && nfts.length == 0 && <p>No NFTs in this wallet!</p>}
      </div>

      <footer></footer>
    </div>
  )
}

export default Home
