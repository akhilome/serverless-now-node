# Serverless Deployment w/ Zeit/now

exploring deploying "serverless" node apis with [Now](https://now.sh)

## Next Steps

Now that config and deployment seems to be working alright, next steps I believe would be to implement CRUD API operations with some sort of database.

- [x] Create &rarr; `POST` data
- [ ] Read &rarr; `GET` data
- [ ] Update &rarr; `PUT` / `PATCH` data
- [ ] Delete &rarr; `DELETE` data

Implementing this, I think I would be building a **public** blog api with no auth.

### Goals

- [x] Add new posts to blog
- [ ] View all posts on the blog
- [ ] View an individual post on the blog
- [ ] Update a post on the blog (anyone can update any post, no auth required! 🔥)
- [ ] Delete a post from a blog
