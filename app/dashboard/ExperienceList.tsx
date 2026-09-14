"use client";



import { useState } from "react";

import Card from "../components/ui/Card";

import { Modal } from "../components/ui/Modal";



type Experience = {

  title?: string;

  company?: string;

  period?: string;

  description?: string;

};



type ExperienceListProps = {

  experiences?: Experience[] | null;

};



export function ExperienceList({

  experiences = [],

}: ExperienceListProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);



  const experienceList = experiences ?? [];

  const totalExperiences = experienceList.length;



  // Mostra somente duas experiências dentro do card.

  const visibleExperiences = experienceList.slice(0, 2);



  return (

    <>

      <Card variant="dashboard" className="overflow-hidden">

        <div className="flex h-full w-full flex-col p-5">

          {/* Header */}

          <div className="mb-8 flex items-center justify-center gap-4">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-100 text-2xl">

              💼

            </div>



            <h2 className="text-[24px] font-bold text-gray-900">

              Experiência detectada

            </h2>

          </div>



          {/* Experience list */}

          <div className="flex flex-1 items-center justify-center">

            {totalExperiences === 0 ? (

              <p className="text-center text-sm text-gray-400">

                Envie seu currículo para visualizar suas experiências.

              </p>

            ) : (

              <div className="relative w-full max-w-[340px]">

                {/* Timeline line */}

                {visibleExperiences.length > 1 && (

                  <div className="absolute left-[9px] top-5 h-[100px] w-px bg-yellow-200" />

                )}



                <div className="space-y-7">

                  {visibleExperiences.map((experience, index) => (

                    <div

                      key={`${experience.title}-${experience.company}-${index}`}

                      className="relative flex gap-6"

                    >

                      {/* Dot */}

                      <span className="mt-2 h-5 w-5 shrink-0 rounded-full bg-yellow-500" />



                      {/* Content */}

                      <div className="min-w-0 flex-1 border-b border-gray-200 pb-6">

                        <div className="flex min-w-0 items-start justify-between gap-5">

                          <div className="min-w-0">

                            <h3 className="truncate text-[18px] font-bold text-gray-900">

                              {experience.title || "Cargo não informado"}

                            </h3>



                            <p className="truncate text-[17px] text-gray-500">

                              {experience.company || "Empresa não informada"}

                            </p>

                          </div>



                          <div className="flex shrink-0 items-center gap-3">

                            <span className="whitespace-nowrap text-[16px] text-gray-500">

                              {experience.period || "Período não informado"}

                            </span>



                            {index === 0 && (

                              <span className="rounded-full bg-green-100 px-3 py-1 text-[14px] font-semibold text-green-700">

                                Atual

                              </span>

                            )}

                          </div>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            )}

          </div>



          {/* Footer */}

          <div className="mt-4 flex w-full justify-center px-[22px]">

            <footer className="flex w-full max-w-[450px] items-center justify-between">

              <button

                type="button"

                disabled={totalExperiences === 0}

                onClick={() => setIsModalOpen(true)}

                className="text-[18px] font-semibold text-yellow-600 transition hover:text-yellow-700 disabled:cursor-not-allowed disabled:text-gray-400"

              >

                Ver todas as experiências ({totalExperiences})

              </button>



              <button

                type="button"

                disabled={totalExperiences === 0}

                onClick={() => setIsModalOpen(true)}

                aria-label="Ver todas as experiências"

                className="text-2xl text-yellow-500 transition hover:translate-x-1 disabled:text-gray-300"

              >

                →

              </button>

            </footer>

          </div>

        </div>

      </Card>



      <Modal

        isOpen={isModalOpen}

        title={`Experiências profissionais (${totalExperiences})`}

        onClose={() => setIsModalOpen(false)}

      >

        <div className="space-y-6">

          {experienceList.map((experience, index) => (

            <article

              key={`${experience.title}-${experience.company}-${index}`}

              className="border-b border-gray-200 pb-6 last:border-b-0"

            >

              <div className="flex flex-col justify-between gap-3 sm:flex-row">

                <div className="min-w-0">

                  <h3 className="text-lg font-bold text-gray-900">

                    {experience.title || "Cargo não informado"}

                  </h3>



                  <p className="mt-1 text-sm text-gray-500">

                    {experience.company || "Empresa não informada"}

                  </p>

                </div>



                <div className="flex shrink-0 items-center gap-3">

                  <span className="text-sm text-gray-500">

                    {experience.period || "Período não informado"}

                  </span>



                  {index === 0 && (

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                      Atual

                    </span>

                  )}

                </div>

              </div>



              {experience.description && (

                <p className="mt-4 text-sm leading-6 text-gray-600">

                  {experience.description}

                </p>

              )}

            </article>

          ))}

        </div>

      </Modal>

    </>

  );

}