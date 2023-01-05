import {request, gql} from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async () => {
    const query = gql`
            query Assets {
              postsConnection {
                edges {
                  node {
                    author {
                      bio
                      name
                      id
                      photo {
                        url
                      }
                    }
                    createdAt
                    slug
                    title
                    excerpt
                    featuredImage {
                      url
                    }
                    categories {
                      name
                      slug
                    }
                  }
                }
              }
            }
    `

    const result = await request(graphqlAPI, query)

    return result.postsConnection.edges
}

export const getPostDetails = async (slug) => {
    const query = gql`
            query getPostDetails($slug: String!) {
                post(where: { slug: $slug }) {
                   author {
                      bio
                      name
                      id
                      photo {
                        url
                      }
                    }
                    createdAt
                    slug
                    title
                    excerpt
                    featuredImage {
                      url
                    }
                    categories {
                      name
                      slug
                    } 
                    content {
                        raw
                    }    
                }
            }
    `

    const result = await request(graphqlAPI, query, {slug})

    return result.post
}

export const getRecentPosts = async () => {
    const query = gql`
        query getPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query)

    return result.posts
}

export const getSimilarPosts = async (categories, slug) => {
    const query = gql`
        query getPostDetails($categories: [String!], $slug: String!) {
            posts(
                where: { 
                    slug_not: $slug, 
                    AND: { 
                        categories_some: { slug_in: $categories } 
                    }
                }
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query, {categories, slug})

    return result.posts
}

export const getCategories = async () => {
    const query = gql`
        query getCategories {
            categories {
                name
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query)

    return result.categories
}

export const getComments = async (slug) => {
    const query = gql`
        query getComments($slug: String!) {
            comments(where: { post: { slug: $slug }}) {
                name, createdAt, comment
            }
        }
    `

    const result = await request(graphqlAPI, query, {slug})

    return result.comments
}

export const getFeaturedPosts = async () => {
    const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

    const result = await request(graphqlAPI, query);

    return result.posts;
};

export const submitComment = async (obj) => {
    const result = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    })

    return result.json()
}