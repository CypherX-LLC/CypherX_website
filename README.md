CypherX Company Website

created with gatsbyjs


  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>

## install dependencies 
`yarn install`

## run on localhost
```
gatsby develop                      Start development server. Watches files, rebuilds, and hot reloads if something changes

gatsby build                        Build a Gatsby project.

gatsby serve                        Serve previously built Gatsby site.
```

## blog
blog articles are here: `src/posts`

images should be placed here: `static/images/blog/` 

## how to add pages for landingpage FEATURES section

add page with content to src/features/<NAME_OF_NEW_PAGE>.mdx

add page <NAME_OF_NEW_PAGE> as `link` to src/data/features.yml

Example code:
```
  - title: Quality assurance
    icon: /svg/07.svg
    text: Ensuring your software meets standards via testing, QA processes, and continuous enhancement for optimal performance and user satisfaction.
    link: /quality-assurance/
```

layout of feature pages can be edited here:
`src/components/Features.js`

## Webpage is also served also on IPFS:
https://cypherx.eth.limo/
https://cypherx.eth.link

### IPFS content hash
https://app.ens.domains/cypherx.eth?tab=records

### How it was deployed to IPFS:
https://www.youtube.com/watch?v=H-0Drm0-ZeM&ab_channel=SarahBenson
https://blog.fleek.co/posts/Gatsby-Fleek

#### The official docker image of fleek did not work; used this:
`https://hub.docker.com/r/futureys/gatsby`

