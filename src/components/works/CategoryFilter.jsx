function CategoryFilter({ categories, value, onChange }) {
  const filters = ['All Projects', ...categories]

  return (
    <div className="category-filter" role="group" aria-label="Filter projects by category">
      {filters.map((category) => (
        <button
          className="category-filter__button"
          type="button"
          key={category}
          aria-pressed={value === category}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
