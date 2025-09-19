'use client' // Error boundaries deben ser Client Components

import { AlertTriangle, Badge, RotateCcw } from 'lucide-react'
import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Aquí puedes enviar el error a un servicio de monitoreo
    console.error(error)
  }, [error])

  return (
   <div className="min-h-screen bg-gradient-to-br from-red-400 via-orange-500 to-yellow-400 p-4 flex items-center justify-center">
      <div className="pokemon-card rounded-2xl p-3 max-w-sm w-full transform hover:scale-105 transition-transform duration-300">
        <div className="pokemon-card-inner rounded-xl p-6 h-full">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">Servidor</h1>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-destructive">500</span>
                <AlertTriangle className="w-6 h-6 text-destructive fill-current" />
              </div>
            </div>
            <div className="text-right">
              <Badge className="bg-red-600 text-white mb-2">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Error
              </Badge>
              <div className="text-sm text-muted-foreground">Estado Crítico</div>
            </div>
          </div>

          {/* Pokemon Image - Fainted Psyduck */}
          <div className="relative mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-lg p-4 border-4 border-red-300">
            <div className="holographic-border absolute inset-0 rounded-lg opacity-20"></div>
            <div className="w-full h-48 flex items-center justify-center relative z-10">
              <div className="text-center">
                <div className="text-8xl mb-2 transform rotate-180">🦆</div>
                <div className="text-2xl">💫💫💫</div>
                <p className="text-sm text-red-600 font-semibold mt-2">¡Psyduck se ha desmayado!</p>
              </div>
            </div>
            <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Error Details */}
          <div className="space-y-4 mb-6">
            <div className="border-2 border-red-300 rounded-lg p-3 bg-red-50">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-red-700">Error Interno</span>
                </div>
                <span className="text-2xl font-bold text-red-600">500</span>
              </div>
              <p className="text-sm text-red-600">
                El servidor ha encontrado un error inesperado y no puede completar tu solicitud.
              </p>
            </div>

            <div className="border-2 border-orange-300 rounded-lg p-3 bg-orange-50">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                    <RotateCcw className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-orange-700">Reintentar</span>
                </div>
                <span className="text-lg font-bold text-orange-600">∞</span>
              </div>
              <p className="text-sm text-orange-600">
                Intenta recargar la página o vuelve más tarde. Nuestro equipo ya está trabajando en solucionarlo.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="mb-6">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Reintentar Conexión
            </button>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-border pt-4 flex justify-between items-end text-sm">
            <div>
              <p className="text-muted-foreground mb-1">
                <strong>Tipo:</strong> Error del Servidor
              </p>
              <p className="text-muted-foreground">
                <strong>Código:</strong> HTTP 500
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-500 fill-current" />
                <span className="font-bold text-red-600">Crítico</span>
              </div>
              <p className="text-muted-foreground">Error #500</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-4 pt-2 border-t border-border text-xs text-muted-foreground text-center">
            <p>Sistema de Monitoreo Pokémon</p>
            <p className="mt-1">© 2024 Centro Pokémon de Sistemas</p>
          </div>
        </div>
      </div>
    </div>
  )
}
