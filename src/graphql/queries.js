/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLike = /* GraphQL */ `
  query GetLike($id: ID!) {
    getLike(id: $id) {
      id
      blogID
      owner
      blog {
        id
        title
        content
        coverImage
        owner
        createdAt
        updatedAt
        userBlogsId
        __typename
      }
      createdAt
      updatedAt
      blogLikesId
      __typename
    }
  }
`;
export const listLikes = /* GraphQL */ `
  query ListLikes(
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        blogID
        owner
        createdAt
        updatedAt
        blogLikesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const likesByBlogID = /* GraphQL */ `
  query LikesByBlogID(
    $blogID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    likesByBlogID(
      blogID: $blogID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        blogID
        owner
        createdAt
        updatedAt
        blogLikesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBlog = /* GraphQL */ `
  query GetBlog($id: ID!) {
    getBlog(id: $id) {
      id
      title
      content
      coverImage
      owner
      createdAt
      updatedAt
      # Removed likes and comments fields to simplify query for public access
      # Removed potentially outdated userBlogsId field
      __typename
    }
  }
`;
export const listBlogs = /* GraphQL */ `
  query ListBlogs(
    $filter: ModelBlogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        coverImage
        owner
        createdAt
        updatedAt
        userBlogsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      blogID
      content
      owner
      createdAt
      blog {
        id
        title
        content
        coverImage
        owner
        createdAt
        updatedAt
        userBlogsId
        __typename
      }
      updatedAt
      blogCommentsId
      __typename
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        blogID
        content
        owner
        createdAt
        updatedAt
        blogCommentsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const commentsByBlogID = /* GraphQL */ `
  query CommentsByBlogID(
    $blogID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByBlogID(
      blogID: $blogID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        blogID
        content
        owner
        createdAt
        updatedAt
        blogCommentsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      bio
      profilePicture
      blogs {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        bio
        profilePicture
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
