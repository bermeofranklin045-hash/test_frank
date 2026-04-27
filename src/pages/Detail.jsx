
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import snarkdown from 'snarkdown'
import styles from './detail.module.css'
import { useAuth } from "react";

const JobSection = ({ title, content }) => {
  const html = snarkdown(content)

  return (
    <section className={styles.section}>
      <h2 className={styles.sectiontitle}>
        {title}
        </h2>
     <div dangerouslySetInnerHTML={{ __html: html }} >
      </div>
    </section>
  )
}
function DetailApplyButton(){
  const {isLoggedIn} = useAuth()
  return (
    <button disabled={!isLoggedIn} className={styles.applyButton} >
  {isLoggedIn ? 'Aplicar' : 'Inicia sesion para aplicar'}
    </button>
  )
}
export default function JobDetail ()  {
  const { jobId } = useParams()
  const navigate = useNavigate()
console.log(jobId)
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!jobId) return

    const controller = new AbortController()

    setLoading(true)
    setError(null)

    fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Job not found')
        }
        return response.json()
      })
      .then((data) => {
        setJob(data)
      })
      .catch((error) => {
        if (error.name === 'AbortError') return
        setError(error.message)
        setJob(null)
      })
      .finally(() => {
        setLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [jobId])

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Cargando oferta...</p>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className={styles.notFound}>
        <h1>Oferta no encontrada</h1>
        <p>Puede que esta oferta haya caducado o que la URL no sea correcta.</p>
        <button className={styles.backButton} onClick={() => navigate('/jobs')}>
          Volver a la lista de empleos
        </button>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <a href="/jobs" className={styles.breadcrumbLink}>
          Empleos
        </a>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbTitle}>{job.titulo}</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>{job.titulo}</h1>
        <div className={styles.meta}>
          <p className={styles.company}>{job.empresa}</p>
          <p className={styles.location}>{job.ubucacion}</p>
        </div>
        <button className={styles.applyButton}>Aplicar a esta oferta</button>
      </header>content

      <JobSection title="Descripción del puesto" content={job.content.description} />

      <JobSection title="Responsabilidades" content={job.content.responsibilities} />

      <JobSection title="Requisitos" content={job.content.requirements} />

      <JobSection title="Acerca de la empresa" content={job.content.about} />
    </div>
  )
}