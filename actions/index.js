let api_root, cdn_root

if (process.env.NODE_ENV === 'production') {
  api_root = 'http://pygmy-api.brickowls.com'
  cdn_root = 'http://d2cwkrm2jnrt6f.cloudfront.net'
} else if (process.env.NODE_ENV === 'development') {
  api_root = 'http://localhost:3000/api/v1'
  cdn_root = 'http://d2cwkrm2jnrt6f.cloudfront.net'
} else {
  api_root = 'http://pygmy-api.brickowls.com'
  cdn_root = 'http://d2cwkrm2jnrt6f.cloudfront.net'
}

export const API_ROOT = api_root
export const CDN_ROOT = cdn_root
