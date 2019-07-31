# Serverless Deployment w/ Zeit/now

exploring deploying "serverless" node apis with [Now](https://now.sh)

## Next Steps

Now that config and deployment seems to be working alright, next steps I believe would be to implement CRUD API operations with some sort of database.

- [x] Create &rarr; `POST` data
- [x] Read &rarr; `GET` data
- [x] Update &rarr; `PUT` / `PATCH` data
- [x] Delete &rarr; `DELETE` data

Implementing this, I think I would be building a **public** blog api with no auth.

### Goals

- [x] [Add new posts to blog](#add-new-post)
- [x] [View all posts on the blog](#get-all-posts)
- [x] [View an individual post on the blog](#get-single-post)
- [x] [Update a post on the blog](#update-a-post) (anyone can update any post, no auth required! 🔥)
- [x] [Delete a post from a blog](#delete-a-post)

## Available Endpoints

### Add New Post

```http
POST api/v1/articles
```

Hitting this endpoint, anyone can create a new article (no auth required 🤞🏾).

#### Request Body Shape

```json
{
  "body": {
    "title": "The Article's title 💪🏾",
    "body": "The body of the article 💪🏾",
    "author": "Author's name 🤤"
  }
}
```

#### Example Usage

```sh
curl \
  -X POST https://akhilome-snn.now.sh/api/v1/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Eternal 🎵🎼",
    "body":"Side chicks cant dance like this",
    "author":"Chance"
  }'
```

### Get all Posts

```http
GET api/v1/articles
```

Hitting this endpoint, anyone can get all articles

#### Example Usage

```sh
curl -X GET https://akhilome-snn.now.sh/api/v1/articles
```

### Get Single Post

```http
GET api/v1/articles/<id>
```

Hitting this endpoint, anyone can view the contents of a single article

#### Example Usage

```sh
curl -X GET https://akhilome-snn.now.sh/api/v1/articles/5d41689f2e9e3b07f0281170
```

### Update a Post

```http
PUT api/v1/articles/<id>
```

Hitting this endpoint, anyone can update the content of an article (but not the article's author)

#### Request Body Shape

```json
{
  "body": {
    "title": "Updated Article Title ✍🏾",
    "body": "Updated article body 💥"
  }
}
```

#### Example Usage

```sh
curl \
  -X PUT https://akhilome-snn.now.sh/api/v1/articles/5d41689f2e9e3b07f0281170 \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Eternal 🎵",
    "body":"Side chicks cant step like this"
  }'
```

### Delete a Post

```http
DELETE api/v1/articles/<id>
```

Hitting this endpoint, anyone can remove an article from the database

```sh
curl -X DELETE https://akhilome-snn.now.sh/api/v1/articles/5d41689f2e9e3b07f0281170
```

## Important Notes

- Lax error handling and input validation
- No tests (yet)
- Again, no auth 🤷🏾‍♂️

## Tools

- Now.sh
- Typescript/Node
- MongoDB (Mongoose as ODM)
