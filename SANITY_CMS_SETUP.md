# Archemist — Sanity CMS Integration Guide

## Overview

Archemist uses **Sanity** as its headless CMS to manage all content including products, collections, and site settings.

## 1. Create a Sanity Project

```bash
npm install -g @sanity/cli
cd /mnt/agents/output/app
sanity init
```

## 2. Configure Content Schemas

Copy the schema files from `sanity-schemas/` into your Sanity studio:

```bash
cp sanity-schemas/*.ts studio/schemaTypes/
```

Update `studio/schemaTypes/index.ts`:
```typescript
import product from './product'
import collection from './collection'
import siteSettings from './siteSettings'
export const schemaTypes = [product, collection, siteSettings]
```

## 3. Content Models

### Product Schema
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Product name |
| `slug` | slug | Yes | URL-friendly identifier |
| `price` | number | Yes | Price in SOL |
| `image` | image | Yes | Product image (with hotspot) |
| `category` | string | Yes | `physical`, `digital`, or `nft` |
| `description` | text | No | Product description |
| `isDigital` | boolean | No | Marks as digital/NFT product |
| `nftMetadata` | object | No | Mint address, collection, royalty |
| `featured` | boolean | No | Show on homepage |
| `stock` | number | No | Physical stock quantity |

### Collection Schema
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Collection name |
| `slug` | slug | Yes | URL-friendly identifier |
| `coverImage` | image | Yes | Collection cover |
| `description` | text | No | Collection description |
| `products` | array | No | Referenced products |
| `featured` | boolean | No | Show in featured gallery |

### Site Settings Schema
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `siteName` | string | No | Website name |
| `tagline` | string | No | Hero subtitle |
| `heroCta` | string | No | Hero button text |
| `footerCta` | string | No | Footer headline |
| `socialLinks` | object | No | Social media URLs |
| `seo` | object | No | Meta title, description, OG image |

## 4. Start Sanity Studio

```bash
cd studio
npm run dev
```

## 5. Configure Frontend

Edit `src/lib/sanity.ts` and replace `your-project-id` with your actual Sanity project ID.

## 6. API Endpoints

### Fetch All Products
```groq
*[_type == "product"] | order(_createdAt desc) { _id, title, slug, price, image, category, description, isDigital, nftMetadata }
```

### Fetch Featured Collections
```groq
*[_type == "collection" && featured == true] | order(_createdAt desc) { _id, title, slug, coverImage, description }
```

### Fetch Site Settings
```groq
*[_type == "siteSettings"][0]
```