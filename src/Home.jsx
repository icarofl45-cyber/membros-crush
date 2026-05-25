import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ContentRow from './components/ContentRow'
import './App.css'

function Home() {
  // Mock Data
  const aulasMasculinas = [
    { id: 1, title: 'Entrenamiento del Día 1 al 21 (Playlist 1)', type: 'video', thumb: '/Entrenamiento del Día 1 al 21 (Playlist 1) M.png', url: 'https://youtube.com/playlist?list=PLn7X7_tj-QEe_fUDqwJM6RIOztfV8gugb&si=Xjr-jp4K4fC8EDrf' },
    { id: 2, title: 'Entrenamiento del Día 1 al 21 (Playlist 2)', type: 'video', thumb: '/Entrenamiento del Día 1 al 21 (Playlist 2) M.png', url: 'https://youtube.com/playlist?list=PLHGzEmdHkckUsdhZadiNTBE0e2QQu4icy&si=kS3-UAdZtLdW7A1h' },
    { id: 4, title: 'Rutina de Cardio', type: 'video', thumb: '/Rutina de Cardio M.png', url: 'https://youtube.com/playlist?list=PLceu9St3qOOzsceChaLwIPXM6oXO2Lxmm&si=oq4Hg3GEBPr8p7LI' },
    { id: 18, title: 'Tai Chi', type: 'video', thumb: '/Tai Chi.png', url: 'https://youtube.com/playlist?list=PL11Xj_vsfptsQKby8yUBmuRqRdrloxjUg&si=QaV4Fs-LQbtGUxEQ' },
  ];

  const aulasFemininas = [
    { id: 5, title: 'Entrenamiento del Día 1 al 21 (Playlist 1)', type: 'video', thumb: '/Entrenamiento del Día 1 al 21 (Playlist 1).png', url: 'https://youtube.com/playlist?list=PLn7X7_tj-QEe_fUDqwJM6RIOztfV8gugb&si=Xjr-jp4K4fC8EDrf' },
    { id: 6, title: 'Entrenamiento del Día 1 al 21 (Playlist 2)', type: 'video', thumb: '/Entrenamiento del Día 1 al 21 (Playlist 2).png', url: 'https://youtube.com/playlist?list=PLn0lBRjLQvKz9hUfTHfIhzh-1O7Bt6YTx&si=9dBqFHokTPGufH53' },
    { id: 7, title: 'Pilates en Casa', type: 'video', thumb: '/Pilates en Casa.png', url: 'https://youtube.com/playlist?list=PLNZlZ3khelrGws9PC7rnzaSajO3ru8uKz&si=W8Th0Oov3fwat47i' },
    { id: 8, title: 'Rutina de Cardio', type: 'video', thumb: '/Rutina de Cardio.png', url: 'https://youtube.com/playlist?list=PLrrCkrdMu3iQL7bJAIvJLd68J5jU3ojny&si=pgCybykFfJGQjYP2' },
  ];

  const materiais = [
    { id: 9, title: 'Entrenamiento en Casa (Hombres)', type: 'pdf', thumb: '/Entrenamiento en Casa (Hombres).png', url: '/Entrenamiento-en-Casa-Edicion-Hombres.pdf' },
    { id: 10, title: 'Entrenamiento en Casa (Mujeres)', type: 'pdf', thumb: '/Entrenamiento en Casa (Mujeres).png', url: '/Entrenamiento-en-Casa-Edicion-Mujeres.pdf' },
    { id: 13, title: 'Protocolo de Hipertrofia', type: 'pdf', thumb: '/Protocolo de Hipertrofia.png', url: '/Protocolo-de-Hipertrofia-y-Construccion-Muscular.pdf' },
    { id: 14, title: 'Protocolo de Quema de Grasa', type: 'pdf', thumb: '/Protocolo de Quema de Grasa.png', url: '/Protocolo-de-Quema-de-Grasa-Acelerada.pdf' },
  ];

  const bonus = [
    { id: 11, title: 'Bono 1: Sustitutos Inteligentes', type: 'pdf', thumb: '/Bono 1 Sustitutos Inteligentes.png', url: '/BONUS-1-Guia-de-Sustitutos-Inteligentes.pdf' },
    { id: 12, title: 'Bono 2: Viajes y Vacaciones', type: 'pdf', thumb: '/Bono 2 Viajes y Vacaciones.png', url: '/BONUS-2-Protocolo-de-Viaje-y-Vacaciones.pdf' },
    { id: 15, title: 'Bono 3: Lista de Compras', type: 'pdf', thumb: '/Bono 3 Lista de Compras.png', url: '/BONUS-3-Lista-de-Compras-Ahorro-Maximo.pdf' },
    { id: 16, title: 'Bono 4: Recetas Express (5 Min)', type: 'pdf', thumb: '/Bono 4 Recetas Express (5 Min).png', url: '/BONUS-4-Recetario-Express-de-5-Minutos-Suplementacion.pdf' },
  ];

  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <main className="main-content">
        <div id="row-hombres"><ContentRow title="Clases para Hombres" items={aulasMasculinas} /></div>
        <div id="row-mujeres"><ContentRow title="Clases para Mujeres" items={aulasFemininas} /></div>
        <div id="row-pdf"><ContentRow title="PDFs y Materiales" items={materiais} /></div>
        <div id="row-bonos"><ContentRow title="Bonos" items={bonus} /></div>
        

      </main>
    </div>
  )
}

export default Home
