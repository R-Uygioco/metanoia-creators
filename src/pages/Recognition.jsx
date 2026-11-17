import AwardGroup from '../components/awards/AwardGroup.jsx'
import '../components/awards/awards.css'
import EmptyState from '../components/ui/EmptyState.jsx'
import ErrorState from '../components/ui/ErrorState.jsx'
import Loader from '../components/ui/Loader.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import useSanityQuery from '../hooks/useSanityQuery.js'
import { recognitionQuery } from '../lib/queries.js'
import { recognitionGroups } from '../lib/portfolioData.js'

function Recognition() {
  const { data, isLoading, error, retry } = useSanityQuery(recognitionQuery)
  const awards = data || []

  usePageMeta(
    'Recognition',
    'Awards, official festival selections, and recognition attributed to Metanoia films or client projects.',
  )

  return (
    <div className="recognition-page">
      <PageHeader
        eyebrow="Awards & achievements"
        title="Recognition"
        description="Recognition is attributed to its verified recipient. Metanoia film achievements and client project awards are presented separately."
      />
      <div className="recognition-page__content container">
        {isLoading ? (
          <Loader label="Loading published recognition" />
        ) : error ? (
          <ErrorState title="Recognition could not be loaded" message={error.message} onRetry={retry} />
        ) : awards.length === 0 ? (
          <EmptyState title="No recognition published yet">
            Published awards and festival selections will appear here.
          </EmptyState>
        ) : (
          recognitionGroups.map((group) => (
            <AwardGroup
              group={{
                ...group,
                entries: awards.filter((award) => award.recognitionGroup === group.id),
              }}
              key={group.id}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Recognition
