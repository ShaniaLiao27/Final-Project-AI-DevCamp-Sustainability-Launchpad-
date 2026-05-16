import React, { useState } from 'react'
import ContentForm from './components/ContentForm'
import ContentDisplay from './components/ContentDisplay'
import ProgressIndicator from './components/ProgressIndicator'
import TextAnalyzer from './components/TextAnalyzer'
import './styles/App.css'

function App() {
  const [mode, setMode] = useState('home') // 'home', 'learn', 'generate'
  const [activeLanguage, setActiveLanguage] = useState('EN')

  // Existing states for the app
  const [activeTab, setActiveTab] = useState('create')
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState([])
  const [contentPieces, setContentPieces] = useState({})
  const [error, setError] = useState(null)
  const [lastFormData, setLastFormData] = useState(null)

  const handleContentGeneration = (formData) => {
    setLastFormData(formData)
    setIsGenerating(true)
    setProgress([])
    setContentPieces({})
    setError(null)

    const apiUrl = '/api/create-content'

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: formData.topic,
        target_audience: formData.targetAudience,
        tone: formData.tone,
        keywords: formData.keywords,
        language: activeLanguage // Send selected language
      }),
    })
      .then(response => {
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        const readStream = () => {
          reader.read().then(({ done, value }) => {
            if (done) {
              setIsGenerating(false)
              return
            }

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split('\n')
            buffer = lines.pop()

            lines.forEach(line => {
              if (line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.substring(6))

                  if (data.type === 'status') {
                    setProgress(prev => [...prev, { type: 'info', message: data.message }])
                  } else if (data.type === 'content_piece') {
                    setContentPieces(prev => ({
                      ...prev,
                      [data.channel]: (prev[data.channel] || '') + data.content
                    }))
                  } else if (data.type === 'event') {
                    setProgress(prev => [...prev, {
                      type: 'event',
                      author: data.author,
                      preview: data.content_preview
                    }])
                  } else if (data.type === 'complete') {
                    setIsGenerating(false)
                  } else if (data.type === 'error') {
                    setError({ message: data.message, retryable: data.retryable })
                    setIsGenerating(false)
                  }
                } catch (e) {
                  console.error('Error parsing SSE data:', e)
                }
              }
            })

            readStream()
          })
        }

        readStream()
      })
      .catch(err => {
        setError({ message: 'Could not connect to the server. Please check if the backend is running.', retryable: true })
        setIsGenerating(false)
      })
  }

  const hasContent = Object.keys(contentPieces).length > 0

  if (mode === 'home') {
    return (
      <div className="app" style={{ backgroundColor: 'var(--bg-color)' }}>
        <header style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          padding: '1rem 2rem',
          backgroundColor: 'transparent',
          boxShadow: 'none'
        }}>
          <select 
            value={activeLanguage} 
            onChange={(e) => setActiveLanguage(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '2px solid var(--border-color)',
              fontSize: '1rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="EN">EN</option>
            <option value="中文">中文</option>
            <option value="日本語">日本語</option>
            <option value="Español">Español</option>
          </select>
        </header>

        <main style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--primary-color)', marginBottom: '1rem' }}>
            🌱 Sustainability Launchpad
          </h1>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px' }}>
            From "What is ESG?" to your first sustainability report — in 20 minutes.
          </p>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button 
              onClick={() => setMode('learn')}
              style={{
                padding: '1rem 2.5rem',
                fontSize: '1.25rem',
                fontWeight: '600',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--primary-color)'}
            >
              🎓 Learn Mode
            </button>

            <button 
              onClick={() => setMode('generate')}
              style={{
                padding: '1rem 2.5rem',
                fontSize: '1.25rem',
                fontWeight: '600',
                backgroundColor: 'white',
                color: 'var(--primary-color)',
                border: '2px solid var(--primary-color)',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = 'rgba(46, 125, 50, 0.05)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = 'white'
              }}
            >
              ✍️ Generate Mode
            </button>
          </div>
        </main>

        <footer style={{
          textAlign: 'center',
          padding: '2rem',
          color: 'var(--text-secondary)',
          borderTop: '1px solid var(--border-color)'
        }}>
          <p>Built with Google ADK · GDG London AI DevCamp 2026</p>
        </footer>
      </div>
    )
  }

  // App Interface (Learn / Generate Modes)
  return (
    <div className="app">
      <header className="app-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ textAlign: 'left' }}>
          <h1>🌱 Sustainability Launchpad</h1>
          <p>{mode === 'learn' ? '🎓 Learn Mode' : '✍️ Generate Mode'}</p>
        </div>
        <div>
           <button 
              onClick={() => setMode('home')}
              style={{
                padding: '0.5rem 1rem',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ← Back to Home
            </button>
        </div>
      </header>

      <main className="app-main">
        <div className="content-container">
          <>
            <div className="form-section">
              <ContentForm
                onSubmit={handleContentGeneration}
                isGenerating={isGenerating}
              />
            </div>

            {(isGenerating || progress.length > 0) && (
              <div className="progress-section">
                <ProgressIndicator
                  progress={progress}
                  isGenerating={isGenerating}
                />
              </div>
            )}

            {error && (
              <div className="error-section">
                <div className="error-banner">
                  <div className="error-icon">&#9888;</div>
                  <div className="error-body">
                    <p className="error-text">{error.message}</p>
                    {error.retryable && lastFormData && (
                      <button
                        className="retry-button"
                        onClick={() => handleContentGeneration(lastFormData)}
                      >
                        Try Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {hasContent && (
              <ContentDisplay
                contentPieces={contentPieces}
                isGenerating={isGenerating}
              />
            )}
          </>
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with Google ADK · GDG London AI DevCamp 2026</p>
      </footer>
    </div>
  )
}

export default App
