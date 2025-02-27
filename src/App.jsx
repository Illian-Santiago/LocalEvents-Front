import { Route, Routes } from 'react-router'
import Layout from './layout/Layout'
import Eventos from './pages/Eventos'
import Asociaciones from './pages/Asociaciones'
import Perfil from './pages/Perfil'
import Gestion from './pages/Gestion'
import Notificaciones from './pages/Notificaciones'
import CreacionAsociacion from './pages/CreacionAsociacion'
import CreacionEventos from './pages/CreacionEventos'
import EditarEvento from './pages/EditarEvento'
import { ProviderEstetico } from './providers/ProviderEstetico'
import EventoInfo from './components/EventoInfo'

function App() {
  return (
    <ProviderEstetico>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Eventos />} />
          <Route path="/asociaciones" element={<Asociaciones />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/gestion" element={<Gestion />} />
          <Route path="/creacionAsociaciones" element={<CreacionAsociacion />} />
          <Route path="/creacionEventos" element={<CreacionEventos />} />
          <Route path="/editarEvento/:id" element={<EditarEvento />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/EventoInfo/:id" element={<EventoInfo />} />
        </Route>
      </Routes>
    </ProviderEstetico>
  )
}

export default App
