import { graphql } from "@octokit/graphql";

export const isValidRepo = (repo: string) =>
  /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}\/[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(
    repo,
  );

async function fetchUserPullRequests(repo: string, username: string) {
  if (!isValidRepo(repo)) throw new Error("Invalid repo name: " + repo);
  if (!username || username.length <= 1)
    throw new Error("Invalid username: " + username);

  const [owner, name] = repo.split("/");
  const searchQuery = `repo:${owner}/${name} is:pr author:${username}`;

  const result = await graphql({
    query: `
        query ($owner: String!, $name: String!, $searchQuery: String!) {
          repository(owner: $owner, name: $name) {
            name
            forkCount
          }
          search(query: $searchQuery, type: ISSUE, first: 50) {
            nodes {
              ... on PullRequest {
                title
                url
                state
                author {
                  login
                }
                createdAt
                mergedAt
              }
            }
          }
        }
      `,
    owner,
    name,
    author: username,
    searchQuery,
    headers: {
      authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
  });

  console.log(result);
  return result;
}

// fetchUserPullRequests().catch(console.error);

// export async function fetchUserPullRequests(
//   repo: `${string}/${string}`,
//   username: string,
// ) {
//   if (!isValidRepo(repo)) {
//     throw new Error("Invalid repo name: " + repo);
//   }
//   const [owner, name] = repo.split("/");
//   const payload = { owner, name, author: username };
//   console.log("payload", payload);
//   const result = await graphql({
//     query: `
//       query (owner:${owner}, name:${name}) {
//         repository(owner: $owner, name: $name) {
//           name
//           forkCount
//         }
//         search(
//           query: "repo:${owner}/${name} is:pr author:${username}"
//           type: ISSUE
//           first: 50
//         ) {
//           nodes {
//             ... on PullRequest {
//               title
//               url
//               state
//               author {
//                 login
//               }
//               createdAt
//               mergedAt
//             }
//           }
//         }
//       }
//    `,
//     ...payload,
//     headers: {
//       authorization: `token ${process.env.GITHUB_TOKEN}`,
//     },
//   });

//   // console.log(result);
//   return result;
// }

fetchUserPullRequests("moby/moby", "justsml")
  .catch(console.error)
  .then(
    (result) =>
      (console.log("result", JSON.stringify(result, null, 2)) ?? 0) ||
      process.exit(0),
  );
