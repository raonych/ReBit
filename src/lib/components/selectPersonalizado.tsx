import { Listbox } from '@headlessui/react'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Props {
  opcoes: string[]
  onChange?: (valor: string) => void
}

export default function SelectPersonalizado({ opcoes, onChange }: Props) {
  const [selecionado, setSelecionado] = useState<string>(opcoes[0] || '')
  const [largura, setLargura] = useState<number>(0)
  const spanRef = useRef<HTMLSpanElement>(null)

  const handleChange = (valor: string) => {
    setSelecionado(valor)
    if (onChange) onChange(valor)
  }

  useEffect(() => {
    if (spanRef.current) {
      setLargura(spanRef.current.offsetWidth)
    }
  }, [opcoes])

  return (
    <>
      <span
        ref={spanRef}
        className="absolute invisible whitespace-nowrap text-lg font-semibold p-2"
      >
        {opcoes.reduce((a, b) => (a.length > b.length ? a : b), '')}
      </span>

      <div style={{ width: largura + 48 }} className="relative z-50">
        <Listbox value={selecionado} onChange={handleChange}>
          {({ open }) => (
            <div className="relative">
              <Listbox.Button
                as="button"
                className="w-full p-2 pr-10 text-lg font-semibold shadow-md rounded-xl bg-white text-left flex justify-between items-center focus: outline-0"
              >
                {selecionado}
                <span className="absolute right-3 pointer-events-none">
                  {open ? (
                    <ChevronUp size={20} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-500" />
                  )}
                </span>
              </Listbox.Button>

              <Listbox.Options className="absolute mt-1 w-full bg-white rounded-xl shadow-lg z-50 focus: outline-0">
                {opcoes.map((opcao, idx) => (   
                  <Listbox.Option
                    key={idx}
                    value={opcao}
                    className={({ active }) =>
                      `cursor-pointer p-2 rounded-xl ${
                        active ? 'bg-green-900 text-white' : 'text-gray-900'
                      }`
                    }
                  >
                    {opcao}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          )}
        </Listbox>
      </div>
    </>
  )
}
