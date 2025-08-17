import { createTheme } from 'flowbite-react'
import { CustomFlowbiteTheme } from 'flowbite-react/types'

export const customTheme: CustomFlowbiteTheme = createTheme({
  floatingLabel: {
    label: {
      default: {
        outlined: {
          md: 'dark:!bg-black light:!bg-white'
        }
      },
      success: {
        outlined: {
          md: 'dark:!bg-black light:!bg-white'
        }
      },
      error: {
        outlined: {
          md: 'dark:!bg-black light:!bg-white'
        }
      }
    },
    input: {
      base: 'dark:!bg-black light:!bg-white',
      success: {
        outlined: {
          md: 'dark:!bg-black light:!bg-white'
        }
      }
    }
  },
  button: {
    base: 'flex items-center gap-4 focus:ring-0 dark:!bg-black light:!bg-white',
    color: {
      default: 'dark:!bg-black dark:!text-white light:!bg-white light:!text-black'
    }
  }
})
