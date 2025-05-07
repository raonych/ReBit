import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { categoriaService } from "@/lib/request/categorias";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
    ChevronDownIcon

  } from "lucide-react";
  import Link from "next/link";

export default function DropDownCategorias() {

    const [categorias, setCategorias] = useState<any[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    
      useEffect(() => {
        const exibeCategorias = async () => {
          const categorias = await categoriaService.categorias();
          setCategorias(categorias.categorias);
        }
        exibeCategorias();
      },[]);
    

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm  text-gray-900 ring-inset hover:bg-gray-50">
          Categorias
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton> 
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        {
          categorias.map((categoria) => (
            <div key={categoria.id} className="py-1">
              <MenuItem>
                <Link
                  href={"/produtos"+categoria.id}
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                >
                  {categoria.nome}
                </Link>
              </MenuItem>
            </div>
          ))
        }
        
      </MenuItems>
    </Menu>
  )
}
