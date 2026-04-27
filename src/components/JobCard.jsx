import { useState } from "react"
import { Link } from "react-router-dom"

export function JobCard({ job }) {
  const [isApplied, setIsApplied] = useState(false)

  const handleApplyClick = () => {
    setIsApplied(true)
  }

  const buttonClasses = isApplied
    ? 'button-apply-job is-applied'
    : 'button-apply-job'

  const buttonText = isApplied ? 'Aplicado' : 'Aplicar'

  return (
    <article className="job-listing-card" >
      <div>
        <h3>
          <Link to={`/jobs/${job.id}`}>
            {job.titulo}
          </Link>
        </h3>

        <small>{job.empresa} | {job.ubicacion}</small>
        <p>{job.descripcion}</p>
      </div>

      <div>
        <Link to={`/jobs/${job.id}`} className="button-view-details">
          Ver detalles
        </Link>

        <button className={buttonClasses} onClick={handleApplyClick}>
          {buttonText}
        </button>
      </div>
    </article>
  )
}