import React from 'react'
import { Fragment } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { Dialog, Transition } from '@headlessui/react'
import FormAcommodation from './FormAcommodation'



function ModalAcommodation({openModal, closeModal, modal, activeId, accomodations, fetchData}) {
  return (
    <>
    <div className="right-0 top-0 flex items-center justify-center">
      <button
         className='bg-black hover:bg-slate-800 text-white px-2 rounded-md text-sm p-3'
        type="button"
        onClick={openModal}
       
      >
      Nuevo Alojamiento
      </button>
    </div>

    <Transition appear show={modal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose ={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white py-6 text-left align-middle shadow-xl transition-all">
  
                 {/**aqui iria un componente */}

                 <FormAcommodation
                    closeModal = {closeModal}
                    activeId = {activeId}
                    accomodations = {accomodations}
                    fetchData = {fetchData}
                 />
  
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  </>
  )
}

export default ModalAcommodation