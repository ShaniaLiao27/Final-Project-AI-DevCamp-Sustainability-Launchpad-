import React, { useState, useRef, useEffect } from 'react'
import './styles/App.css'

const ChatInterface = ({ mode, activeLanguage, onBack }) => {
  const [messages, setMessages] = useState([
    { 
      role: 'model', 
      content: mode === 'learn' 
        ? '🎓 Welcome to Learn Mode! What would you like to know about sustainability?' 
        : '✍️ Welcome to Generate Mode! Please tell me your company name, industry, location, and number of employees so we can draft your sustainability statement.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input, 
          session_id: `session_${mode}_${window.sessionStorage.getItem('chat_uuid')}`,
          language: activeLanguage
        })
      });
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', content: data.reply || 'No response.' }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', content: '❌ Connection error to backend API.' }]);
    }
    setIsLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '600px', backgroundColor: 'var(--surface-color)', borderRadius: '12px', boxShadow: 'var(--shadow-md)', overflow: 'hidden' }}>
      <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', backgroundColor: '#f9fafb' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ 
            marginBottom: '1rem', 
            textAlign: msg.role === 'user' ? 'right' : 'left',
            display: 'flex',
            flexDirection: 'column',
            alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start'
          }}>
            <div style={{
              backgroundColor: msg.role === 'user' ? 'var(--primary-color)' : 'white',
              color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
              padding: '1rem 1.25rem',
              borderRadius: '12px',
              borderBottomRightRadius: msg.role === 'user' ? '2px' : '12px',
              borderBottomLeftRadius: msg.role === 'model' ? '2px' : '12px',
              maxWidth: '80%',
              boxShadow: 'var(--shadow-sm)',
              whiteSpace: 'pre-wrap',
              border: msg.role === 'model' ? '1px solid var(--border-color)' : 'none'
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '12px', maxWidth: '80%', display: 'inline-block', color: 'var(--text-secondary)' }}>
              typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div style={{ padding: '1.5rem', backgroundColor: 'white', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '1rem',
              borderRadius: '8px',
              border: '2px solid var(--border-color)',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          <button 
            onClick={sendMessage}
            disabled={isLoading}
            style={{
              padding: '0 2rem',
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [mode, setMode] = useState('home'); // 'home', 'learn', 'generate'
  const [activeLanguage, setActiveLanguage] = useState('EN');

  const handleModeChange = (newMode) => {
    if (newMode !== 'home') {
      window.sessionStorage.setItem('chat_uuid', Math.random().toString(36).substring(7));
    }
    setMode(newMode);
  };

  const textMap = {
    'EN': {
      title: '🌱 Sustainability Launchpad',
      tagline: 'From "What is ESG?" to your first sustainability report — in 20 minutes.',
      learnBtn: '🎓 Learn Mode',
      generateBtn: '✍️ Generate Mode',
      footer: 'Built with Google ADK · GDG London AI DevCamp 2026'
    },
    '中文': {
      title: '🌱 永續發展啟動台',
      tagline: '從「什麼是 ESG？」到你的第一份永續報告 — 只要 20 分鐘。',
      learnBtn: '🎓 學習模式',
      generateBtn: '✍️ 生成模式',
      footer: '使用 Google ADK 打造 · GDG London AI DevCamp 2026'
    },
    '日本語': {
      title: '🌱 サステナビリティ・ローンチパッド',
      tagline: '「ESGとは？」から最初のサステナビリティ・レポート作成まで — 20分で。',
      learnBtn: '🎓 学習モード',
      generateBtn: '✍️ 生成モード',
      footer: 'Google ADK で構築 · GDG London AI DevCamp 2026'
    },
    'Español': {
      title: '🌱 Plataforma de Sostenibilidad',
      tagline: 'De "¿Qué es ESG?" a su primer informe de sostenibilidad en 20 minutos.',
      learnBtn: '🎓 Modo Aprendizaje',
      generateBtn: '✍️ Modo Generación',
      footer: 'Construido con Google ADK · GDG London AI DevCamp 2026'
    }
  };

  const t = textMap[activeLanguage] || textMap['EN'];

  if (mode === 'home') {
    return (
      <div className="app" style={{ backgroundColor: 'var(--bg-color)' }}>
        <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem 2rem' }}>
          <select 
            value={activeLanguage} 
            onChange={(e) => setActiveLanguage(e.target.value)}
            style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '2px solid var(--border-color)', fontSize: '1rem' }}
          >
            <option value="EN">EN</option>
            <option value="中文">中文</option>
            <option value="日本語">日本語</option>
            <option value="Español">Español</option>
          </select>
        </header>

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--primary-color)', marginBottom: '1rem' }}>
            {t.title}
          </h1>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px' }}>
            {t.tagline}
          </p>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button 
              onClick={() => handleModeChange('learn')}
              style={{
                padding: '1rem 2.5rem', fontSize: '1.25rem', fontWeight: '600', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', boxShadow: 'var(--shadow-md)'
              }}
            >
              {t.learnBtn}
            </button>

            <button 
              onClick={() => handleModeChange('generate')}
              style={{
                padding: '1rem 2.5rem', fontSize: '1.25rem', fontWeight: '600', backgroundColor: 'white', color: 'var(--primary-color)', border: '2px solid var(--primary-color)', borderRadius: '12px', cursor: 'pointer', boxShadow: 'var(--shadow-sm)'
              }}
            >
              {t.generateBtn}
            </button>
          </div>
        </main>

        <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)' }}>
          <p>{t.footer}</p>
        </footer>
      </div>
    )
  }

  // Chat Interface for Learn / Generate Modes
  return (
    <div className="app" style={{ backgroundColor: 'var(--bg-color)', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header className="app-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem' }}>
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>{t.title}</h1>
          <p style={{ margin: 0, opacity: 0.9 }}>{mode === 'learn' ? t.learnBtn : t.generateBtn}</p>
        </div>
        <button 
          onClick={() => handleModeChange('home')}
          style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ← Back
        </button>
      </header>

      <main style={{ flex: 1, padding: '2rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <ChatInterface mode={mode} activeLanguage={activeLanguage} onBack={() => handleModeChange('home')} />
      </main>
    </div>
  )
}

export default App
