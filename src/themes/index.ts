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
      base: "dark:!bg-black light:!bg-white",
      success: {
        outlined: {
          md: 'dark:!bg-black light:!bg-white'
        }
      }
    }
  }
})
