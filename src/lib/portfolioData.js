export const workCategories = [
  'Short Films',
  'Commercials & Advertisements',
  'Tourism & Promotional Videos',
  'Corporate & Institutional Videos',
  'Event Coverage',
  'Music Videos & Creative Projects',
]

export const filmPublicationStatus = {
  FESTIVAL_ONLY: 'festivalOnly',
  APPROVED_TRAILER: 'approvedTrailer',
  PUBLICLY_RELEASED: 'publiclyReleased',
}

const publicationDetails = {
  [filmPublicationStatus.FESTIVAL_ONLY]: {
    label: 'Festival Showcase Only',
    videoMode: 'none',
  },
  [filmPublicationStatus.APPROVED_TRAILER]: {
    label: 'Approved Trailer Available',
    videoMode: 'trailer',
  },
  [filmPublicationStatus.PUBLICLY_RELEASED]: {
    label: 'Publicly Released',
    videoMode: 'full',
  },
}

export function getFilmPublicationDetails(status) {
  return (
    publicationDetails[status] ??
    publicationDetails[filmPublicationStatus.FESTIVAL_ONLY]
  )
}

export const recognitionGroups = [
  { id: 'filmAwards', title: 'Metanoia Creators Film Awards' },
  { id: 'festivalSelections', title: 'Official Festival Selections' },
  { id: 'nationalRecognition', title: 'National Recognition' },
  { id: 'internationalRecognition', title: 'International Recognition' },
  { id: 'clientProjectAwards', title: 'Client Project Awards' },
]
