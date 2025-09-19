"use client"
import { Badge } from "@/components/ui/badge"
import { Search, Home, MapPin } from "lucide-react"
import { useState, useEffect } from "react"
import Sidebar from '../components/Sidebar';


export default function NotFound() {

    const [isSearching] = useState(false)
    const [pokemonPosition, setPokemonPosition] = useState({ x: 0, y: 0 })
    const [showSparkles, setShowSparkles] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setPokemonPosition({
                x: Math.sin(Date.now() / 1000) * 20,
                y: Math.cos(Date.now() / 1500) * 10,
            })
        }, 100)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const sparkleInterval = setInterval(() => {
            setShowSparkles(true)
            setTimeout(() => setShowSparkles(false), 1000)
        }, 3000)
        return () => clearInterval(sparkleInterval)
    }, [])


    return (<div className="flex">
        <Sidebar />
        <div className=" w-full min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 p-4 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            <div className="pokemon-card rounded-2xl p-3 max-w-lg w-full transform hover:scale-105 transition-all duration-500 relative z-10">
                <div className="pokemon-card-inner rounded-xl p-6 h-full relative">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground mb-1 animate-pulse">Página Perdida</h1>
                            <div className="flex items-center gap-2">
                                <span className="text-4xl font-bold text-blue-600 animate-bounce">404</span>
                                <Search className={`w-6 h-6 text-blue-600 ${isSearching ? "animate-spin" : "animate-pulse"}`} />
                            </div>
                        </div>
                        <div className="text-right">
                            <Badge className="bg-blue-600 text-white mb-2 animate-pulse">
                                <MapPin className="w-4 h-4 mr-1" />
                                Perdido
                            </Badge>
                            <div className="text-sm text-muted-foreground">Estado: Explorando</div>
                        </div>
                    </div>

                    <div className="relative mb-6 bg-gradient-to-br from-blue-100 to-purple-200 rounded-lg p-4 border-4 border-blue-300 overflow-hidden">
                        <div className="holographic-border absolute inset-0 rounded-lg opacity-30 animate-pulse"></div>

                        {/* Animated Pikachu searching */}
                        <div
                            className="w-full h-48 flex items-center justify-center relative z-10 transition-transform duration-300"
                            style={{ transform: `translate(${pokemonPosition.x}px, ${pokemonPosition.y}px)` }}
                        >
                            <div className="text-center relative">
                                <div className="text-8xl mb-2 animate-bounce">⚡</div>
                                <div className="text-2xl animate-pulse">🔍</div>
                                <p className="text-sm text-blue-600 font-semibold mt-2 animate-pulse">
                                    ¡Pikachu está buscando la página!
                                </p>

                                {showSparkles && (
                                    <div className="absolute -inset-8">
                                        {[...Array(8)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                                                style={{
                                                    left: `${20 + Math.random() * 60}%`,
                                                    top: `${20 + Math.random() * 60}%`,
                                                    animationDelay: `${Math.random() * 0.5}s`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center animate-pulse">
                            <Search className="w-5 h-5 text-white" />
                        </div>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="border-2 border-blue-300 rounded-lg p-3 bg-blue-50 transform hover:scale-105 transition-transform duration-300">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center animate-pulse">
                                        <Search className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="font-semibold text-blue-700">Página No Encontrada</span>
                                </div>
                                <span className="text-2xl font-bold text-blue-600 animate-bounce">404</span>
                            </div>
                            <p className="text-sm text-blue-600">
                                ¡Ups! Parece que esta página se ha escapado como un Pokémon salvaje. No pudimos encontrarla en nuestra
                                Pokédex.
                            </p>
                        </div>

                        <div className="border-2 border-purple-300 rounded-lg p-3 bg-purple-50 transform hover:scale-105 transition-transform duration-300">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center animate-spin">
                                        <MapPin className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="font-semibold text-purple-700">Explorar Rutas</span>
                                </div>
                                <span className="text-lg font-bold text-purple-600">∞</span>
                            </div>
                            <p className="text-sm text-purple-600">
                                Intenta navegar a otra ruta o regresa al Centro Pokémon (página principal).
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3 mb-6">
                        <button
                            onClick={() => (window.location.href = "/dashboard/pokemons")}
                            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                        >
                            <Home className="w-5 h-5" />
                            Volver al Centro Pokémon
                        </button>
                    </div>

                    <div className="border-t-2 border-border pt-4 flex justify-between items-end text-sm">
                        <div>
                            <p className="text-muted-foreground mb-1">
                                <strong>Tipo:</strong> Página Perdida
                            </p>
                            <p className="text-muted-foreground">
                                <strong>Código:</strong> HTTP 404
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                                <Search className="w-4 h-4 text-blue-500 animate-pulse" />
                                <span className="font-bold text-blue-600">Buscando</span>
                            </div>
                            <p className="text-muted-foreground">Error #404</p>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-4 pt-2 border-t border-border text-xs text-muted-foreground text-center">
                        <p>Centro de Navegación Pokémon</p>
                        <p className="mt-1">© 2024 Liga Pokémon Digital</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}