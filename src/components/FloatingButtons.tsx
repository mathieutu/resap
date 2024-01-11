import classNames from 'classnames'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share'
import { ClassNameProp } from '../types/react'

const buttonClassName = 'print:hidden w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-green-default hover:bg-blue-default flex items-center justify-center cursor-pointer'

const PrintButton = () => (
  <button
    type="button"
    className={buttonClassName}
    onClick={() => window.print()}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-3/5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
    </svg>
  </button>
)

const ShareButton = () => (
  <Menu as="div" className="relative inline-block text-left">
    <div>
      <Menu.Button className={buttonClassName}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-3/5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
      </Menu.Button>
    </div>

    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="z-10 absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <LinkedinShareButton
                resetButtonStyle={false}
                url={window.location.href}
                className={classNames(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm w-full',
                )}
              >
                <LinkedinIcon className="mr-3 h-5 w-5 rounded-full" />
                Linkedin
              </LinkedinShareButton>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <TwitterShareButton
                resetButtonStyle={false}
                url={window.location.href}
                className={classNames(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm w-full',
                )}
              >
                <TwitterIcon className="mr-3 h-5 w-5 rounded-full" />
                Twitter
              </TwitterShareButton>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <FacebookShareButton
                resetButtonStyle={false}
                url={window.location.href}
                className={classNames(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm w-full',
                )}
              >
                <FacebookIcon className="mr-3 h-5 w-5 rounded-full" />
                Facebook
              </FacebookShareButton>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <EmailShareButton
                resetButtonStyle={false}
                openShareDialogOnClick={true}
                url={window.location.href}
                className={classNames(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm w-full',
                )}
              >
                <EmailIcon className="mr-3 h-5 w-5 rounded-full" />
                Email
              </EmailShareButton>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <WhatsappShareButton
                resetButtonStyle={false}
                url={window.location.href}
                className={classNames(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm w-full',
                )}
              >
                <WhatsappIcon className="mr-3 h-5 w-5 rounded-full" />
                WhatsApp
              </WhatsappShareButton>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Transition>
  </Menu>

)

export const FloatingButtons = ({ className }: ClassNameProp) => (
  <div
    className={classNames('flex gap-4', className)}
  >
    <PrintButton />
    <ShareButton />
  </div>
)
