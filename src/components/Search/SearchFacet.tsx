import { useRefinementList } from 'react-instantsearch-core'
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import type { RefinementListItem } from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList'
import { ClassNameProp } from '../../types/react'

type SearchFacetProps = {
  attribute: string,
  label: string,
  getItemLabel?: (item: RefinementListItem) => string,
  getItemClassName?: (item: RefinementListItem) => string,
} & ClassNameProp;

export const SearchFacet = ({
  attribute,
  className,
  label,
  getItemLabel = item => item.label,
  getItemClassName = () => 'bg-gray-light text-blue-default',
}: SearchFacetProps) => {
  const {
    items,
    refine,
  } = useRefinementList({ attribute, limit: 1000 })

  const refinedItems = items.filter(item => item.isRefined)
  return (
    <Listbox value="" onChange={refine}>
      {({ open }) => (
        <div>
          <Listbox.Label className="sr-only">{label}</Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className={className}>
              <span className="w-full inline-flex truncate gap-2">
                {refinedItems.length
                  ? refinedItems.map(item => (
                    <span
                      key={item.value}
                      className={classNames(
                        'inline-flex items-center px-2 py-0.5 rounded-sm text-xs truncate',
                        getItemClassName(item),
                      )}
                    >
                      {getItemLabel(item)}
                    </span>
                  )) : <span className="text-gray-default text-sm">{label}</span>}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options as="ul" className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-hidden sm:text-sm">
                {items.map((item) => (
                  <Listbox.Option
                    key={item.value}
                    as="li"
                    className={({ active }) => classNames(
                      active
                        ? getItemClassName(item)
                        : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-3 pr-9',
                    )}
                    value={item.value}
                  >
                    {({
                      active,
                    }) => (
                      <>
                        <div className="flex items-baseline">
                          <span title={getItemLabel(item)} className={classNames(item.isRefined ? 'font-semibold' : 'font-normal', 'truncate')}>
                            {getItemLabel(item)}
                          </span>
                          <span className={classNames(active ? getItemClassName(item) : 'text-gray-400', 'text-xs italic ml-2')}>
                            ({item.count})
                          </span>
                        </div>

                        {item.isRefined ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-green-default',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}
