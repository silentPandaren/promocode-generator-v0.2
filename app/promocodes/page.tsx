'use client'

import { useState } from 'react'

export default function PromoCodesPage() {
  const [count, setCount] = useState<number>(10)
  const [length, setLength] = useState<number>(8)
  const [uppercase, setUppercase] = useState<boolean>(false)
  const [promoCodes, setPromoCodes] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  // Генерация случайного промокода
  const generatePromoCode = (len: number, toUpper: boolean): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return toUpper ? result.toUpperCase() : result
  }

  // Генерация уникальных промокодов
  const generatePromoCodes = () => {
    setIsGenerating(true)
    const codes = new Set<string>()
    
    while (codes.size < count) {
      codes.add(generatePromoCode(length, uppercase))
    }
    
    setPromoCodes(Array.from(codes))
    setIsGenerating(false)
  }

  // Экспорт в TXT
  const exportToTxt = () => {
    const content = promoCodes.join('\n')
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `promocodes_${count}_${length}_${Date.now()}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Экспорт в CSV
  const exportToCsv = () => {
    const csvContent = ['PromoCode', ...promoCodes].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `promocodes_${count}_${length}_${Date.now()}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Генератор промокодов
          </h1>

          {/* Форма параметров */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="count" className="block text-sm font-medium text-gray-700 mb-2">
                Количество промокодов
              </label>
              <input
                id="count"
                type="number"
                min="1"
                max="10000"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-2">
                Длина промокода
              </label>
              <input
                id="length"
                type="number"
                min="1"
                max="50"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Чекбокс для верхнего регистра */}
          <div className="mb-8">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                Перевести все символы в верхний регистр
              </span>
            </label>
          </div>

          {/* Кнопка генерации */}
          <div className="mb-8">
            <button
              onClick={generatePromoCodes}
              disabled={isGenerating || count <= 0 || length <= 0}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? 'Генерация...' : 'Сгенерировать промокоды'}
            </button>
          </div>

          {/* Результаты */}
          {promoCodes.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Сгенерировано промокодов: {promoCodes.length}
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={exportToTxt}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Экспорт в TXT
                  </button>
                  <button
                    onClick={exportToCsv}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Экспорт в CSV
                  </button>
                </div>
              </div>

              {/* Список промокодов */}
              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {promoCodes.map((code, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded border border-gray-200 font-mono text-sm text-gray-800"
                    >
                      {code}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Информация */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Примечание:</strong> Промокоды генерируются с использованием латинских букв (A-Z, a-z) и цифр (0-9). 
              Каждый промокод уникален.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

