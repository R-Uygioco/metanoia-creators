const imageProjection = `{asset->{_id,url,metadata{dimensions,lqip}},alt}`

const awardProjection = `
  _id,
  title,
  organization,
  category,
  recipient,
  recipientType,
  recognitionGroup,
  year,
  description,
  "certificate": certificate${imageProjection},
  "relatedWork": relatedWork->{_id,_type,title,"slug":slug.current}
`

const projectProjection = `
  _id,
  title,
  "slug": slug.current,
  client,
  "thumbnail": thumbnail${imageProjection},
  description,
  year,
  services,
  credits[]{_key,role,name},
  category,
  featured,
  youtubeUrl,
  "awards": awards[]->{${awardProjection}}
`

const filmProjection = `
  _id,
  title,
  "slug": slug.current,
  "poster": poster${imageProjection},
  "thumbnail": thumbnail${imageProjection},
  logline,
  synopsis,
  director,
  credits[]{_key,role,name},
  year,
  festivalSelections[]{_key,festival,title,year},
  "awards": awards[]->{${awardProjection}},
  "stills": stills[]{_key,asset->{_id,url,metadata{dimensions,lqip}},alt},
  "behindTheScenes": behindTheScenes[]{_key,asset->{_id,url,metadata{dimensions,lqip}},alt},
  festivalJourney[]{_key,date,title,description},
  publicationStatus,
  "youtubeUrl": select(publicationStatus in ["approvedTrailer","publiclyReleased"] => youtubeUrl, null)
`

export const clientProjectsQuery = `*[_type == "clientProject"] | order(year desc, title asc) {${projectProjection}}`

export const clientProjectBySlugQuery = `*[_type == "clientProject" && slug.current == $slug][0] {${projectProjection}}`

export const filmsQuery = `*[_type == "film"] | order(year desc, title asc) {${filmProjection}}`

export const filmBySlugQuery = `*[_type == "film" && slug.current == $slug][0] {${filmProjection}}`

export const recognitionQuery = `*[_type == "award"] | order(year desc, title asc) {${awardProjection}}`

export const aboutQuery = `{
  "pageContent": *[_type == "aboutPage"] | order(_createdAt asc)[0] {
    introduction,background,creativePhilosophy,mission,vision,productionApproach,
    "behindTheScenes": behindTheScenes[]{_key,asset->{_id,url,metadata{dimensions,lqip}},alt}
  },
  "teamMembers": *[_type == "teamMember"] | order(order asc, name asc) {
    _id,name,position,bio,order,
    "photo": photo${imageProjection},
    socialLinks[]{_key,platform,url}
  },
  "services": *[_type == "service"] | order(order asc, name asc) {
    _id,name,description,order,
    "featuredImage": featuredImage${imageProjection}
  }
}`

export const homeQuery = `{
  "aboutIntroduction": *[_type == "aboutPage"] | order(_createdAt asc) [0].introduction,
  "featuredProjects": *[_type == "clientProject" && featured == true] | order(year desc, title asc)[0...3] {${projectProjection}},
  "filmRecognition": *[_type == "award" && recipientType == "Metanoia / Film"] | order(year desc, title asc)[0] {${awardProjection}},
  "clientRecognition": *[_type == "award" && recipientType == "Client Project"] | order(year desc, title asc)[0] {${awardProjection}}
}`
