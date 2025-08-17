import { faFileImage, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Datepicker, FileInput, FloatingLabel, HelperText, Label, Textarea } from 'flowbite-react'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Popup from '~/components/Popup'
import { selectUser } from '~/redux/user/userSlice'
import {
  BIO_RULE,
  BIO_RULE_MESSAGE,
  NAME_RULE,
  NAME_RULE_MESSAGE,
  validateDateInput,
  WEBSITE_RULE,
  WEBSITE_RULE_MESSAGE
} from '~/utils/validators'

export default function EditProfile({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
    // reset
  } = useForm()

  const user = useSelector(selectUser)

  const onSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <Popup onNavigate={onClose} type='close'>
      {/* Header Profile */}
      <div>
        {/* header-img */}
        <div className='relative'>
          <img
            src='https://pbs.twimg.com/profile_banners/1541985824622796800/1754536449/1080x360'
            alt=''
            className='brightness-75'
          />
          <div className='flex justify-center gap-5 absolute top-1/2 -translate-y-1/2 left-0 right-0'>
            <Label
              className='h-12 w-12 rounded-full overflow-hidden bg-[#0f141977] hover:bg-[#0f141991] flex justify-center items-center cursor-pointer'
              htmlFor='file-upload-image-header'
            >
              <FontAwesomeIcon icon={faFileImage} className='text-white p-3' />
            </Label>
            <button className='h-12 w-12 rounded-full overflow-hidden bg-[#0f141977] hover:bg-[#0f141991]'>
              <FontAwesomeIcon icon={faXmark} className='text-white p-3' />
            </button>
          </div>
        </div>
        {/* Edit profile */}
        <div className='relative flex justify-end py-3 px-6'>
          <div className='h-36 w-36 rounded-full overflow-hidden absolute -top-[72px] left-6 border-4 border-black'>
            <img
              src='https://pbs.twimg.com/profile_images/1541985856071667713/9VYgARp-_400x400.png'
              alt=''
              className='brightness-75'
            />
            <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
              <Label
                className='h-12 w-12 rounded-full overflow-hidden bg-[#0f141977] hover:bg-[#0f141991] flex justify-center items-center cursor-pointer'
                htmlFor='file-upload-image-avatar'
              >
                <FontAwesomeIcon icon={faFileImage} className='text-white p-3' />
              </Label>
            </div>
          </div>
        </div>
      </div>
      <form action='' className='mt-16' onSubmit={handleSubmit(onSubmit)} noValidate>
        <FileInput id='file-upload-image-header' className='hidden' defaultValue={user.headerImageUrl} />
        <FileInput id='file-upload-image-avatar' className='hidden' defaultValue={user.avatarUrl} />
        <div className='mt-5'>
          <FloatingLabel
            type='text'
            label='Name'
            variant='outlined'
            defaultValue={user.displayName}
            {...register('name', {
              pattern: {
                value: NAME_RULE,
                message: NAME_RULE_MESSAGE
              }
            })}
          />
          <HelperText className='flex justify-start' color='failure'>
            {errors?.name?.message as string}
          </HelperText>
        </div>
        <div className='mt-5'>
          <Textarea
            className='dark:!bg-black white:!bg-white'
            placeholder='Bio'
            required
            rows={4}
            defaultValue={user.bio}
            {...register('bio', {
              pattern: {
                value: BIO_RULE,
                message: BIO_RULE_MESSAGE
              }
            })}
          />
          <HelperText className='flex justify-start' color='failure'>
            {errors?.bio?.message as string}
          </HelperText>
        </div>
        <div className='mt-5'>
          <FloatingLabel
            type='text'
            label='Website'
            variant='outlined'
            defaultValue={user.website}
            {...register('website', {
              pattern: {
                value: WEBSITE_RULE,
                message: WEBSITE_RULE_MESSAGE
              }
            })}
          />
          <HelperText className='flex justify-start' color='failure'>
            {errors?.website?.message as string}
          </HelperText>
        </div>
        <div className='mt-5'>
          <Controller
            name='birthDate'
            control={control}
            defaultValue={new Date(user.birthDate)}
            rules={{
              required: 'Ngày sinh là bắt buộc',
              validate: validateDateInput
            }}
            render={({ field }) => (
              <Datepicker
                {...field}
                theme={{
                  root: {
                    input: {
                      field: {
                        input: {
                          base: 'dark:!bg-black light:!bg-white'
                        }
                      }
                    }
                  }
                }}
              />
            )}
          />
          <HelperText className='flex justify-start' color='failure'>
            {errors?.birthDate?.message as string}
          </HelperText>
        </div>
        <Button
          pill
          type='submit'
          className={`dark:!bg-white dark:!text-black font-bold mt-10 w-full`}
          disabled={Object.keys(errors).length > 0}
        >
          Save
        </Button>
      </form>
    </Popup>
  )
}
