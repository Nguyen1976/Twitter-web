import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Datepicker, FileInput, FloatingLabel, HelperText, Label, Textarea } from 'flowbite-react'

import { faFileImage, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { selectUser, updateUserProfileAPI } from '~/redux/user/userSlice'
import Popup from '~/components/Popup'
import {
  BIO_RULE,
  BIO_RULE_MESSAGE,
  NAME_RULE,
  NAME_RULE_MESSAGE,
  singleFileValidator,
  validateDateInput,
  WEBSITE_RULE,
  WEBSITE_RULE_MESSAGE
} from '~/utils/validators'

import EditImage from './EditImage'
import { AppDispatch } from '~/redux/store'

type FormData = {
  displayName?: string
  bio?: string
  location?: string
  website?: string
  avatarUrl?: any
  headerImageUrl?: any
  // birthDate?: string //tạm thời chưa cần update birthDate
}

export default function EditProfile({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
    // reset
  } = useForm<FormData>()

  const user = useSelector(selectUser)

  const dispatch = useDispatch<AppDispatch>()

  const [previewAvatar, setPreviewAvatar] = useState<string>(user.avatarUrl) //vừa set preview vửa set url tạm vì cần truyền vào EditImage url để edit
  const [fileAvatar, setFileAvatar] = useState<File | null>(null) //file này sẽ gửi lên server và set file từ cropped

  const [previewHeader, setPreviewHeader] = useState<string>(user.headerImageUrl)
  const [fileHeader, setFileHeader] = useState<File | null>(null)

  const [openEditFileAvatar, setOpenEditFileAvatar] = useState<boolean>(false)
  const [openEditFileHeader, setOpenEditFileHeader] = useState<boolean>(false)

  const uploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) {
      return
    }
    const error = singleFileValidator(f)

    if (error) {
      return
    }

    setPreviewAvatar(URL.createObjectURL(f)) //set preview để hiển thị ảnh đã chọn
    setFileAvatar(f)

    setOpenEditFileAvatar(true)
  }

  const uploadHeader = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) {
      return
    }

    const error = singleFileValidator(f)

    if (error) {
      return
    }

    setPreviewHeader(URL.createObjectURL(f))
    setFileHeader(f)

    setOpenEditFileHeader(true)
  }

  const handleCloseEditFileAvatar = () => {
    setOpenEditFileAvatar(false)
    setPreviewAvatar(user.avatarUrl)
    setFileAvatar(null)
  }

  const handleCloseEditFileHeader = () => {
    setOpenEditFileHeader(false)
    setPreviewHeader(user.headerImageUrl)
    setFileHeader(null)
  }

  const onSubmit = (data: FormData) => {
    let formData = new FormData()
    if (fileAvatar) {
      formData.append('avatarUrl', fileAvatar)
    }
    if (fileHeader) {
      formData.append('headerImageUrl', fileHeader)
    }
    formData.append('displayName', data.displayName || '')
    formData.append('bio', data.bio || '')
    formData.append('location', data.location || '')
    formData.append('website', data.website || '')

    // Call API to update profile
    /*vì ở phía db sẽ không trả về url ảnh vậy mà khi người dùng thoát ra 
    cũng chưa chắc db đã xử lý xong để ném vào db vì upload 
    và trang chính là 2 page lên nó sẽ thực hiện reload lại để get thông tin user
    Vậy lên ở component này vẫn phải xử lý chuyển ảnh thành base 64 để tạm thời lưu vào redux trong trường hợp mà server chưa xử lý xong ảnh sẽ hiện là ảnh base 64 
    Nhưng vẫn có 1 vần đề khi thoát ra trang profile thì nó sẽ thực hiện load lại trang và get thoogn tin user từ db
    mà trường trường hợp server chưa xử lý xong tức là chưa lưu vào db thì trang vẫn sẽ get ảnh cũ 
    Vậy nên tạm thời chấp nhận việc chưa đồng bộ ảnh và sẽ tìm giải pháp sau*/
    dispatch(updateUserProfileAPI(formData))
  }

  return (
    <>
      {!openEditFileAvatar &&
        !openEditFileHeader && ( //tức là popup chỉ mở khi mà openEditFile đóng
          <Popup onNavigate={onClose} type='close'>
            <div>
              {/* header-img */}
              <div className='relative'>
                <img src={previewHeader} alt='' className='brightness-75 h-[200px]' />
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
                  {/* Avatar */}
                  <img src={previewAvatar} alt='' className='brightness-75' />
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
              <FileInput
                id='file-upload-image-header'
                className='hidden'
                onChange={uploadHeader}
                accept='image/jpg,image/jpeg,image/png'
              />
              <FileInput
                id='file-upload-image-avatar'
                className='hidden'
                onChange={uploadAvatar}
                accept='image/jpg,image/jpeg,image/png'
              />
              <div className='mt-5'>
                <FloatingLabel
                  type='text'
                  label='Name'
                  variant='outlined'
                  defaultValue={user.displayName}
                  {...register('displayName', {
                    pattern: {
                      value: NAME_RULE,
                      message: NAME_RULE_MESSAGE
                    }
                  })}
                />
                <HelperText className='flex justify-start' color='failure'>
                  {errors?.displayName?.message as string}
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
              {/* <div className='mt-5'>
                <Controller
                  name='birthDate'
                  control={control}
                  defaultValue={user.birthDate}
                  rules={{
                    required: 'Ngày sinh là bắt buộc',
                    validate: validateDateInput
                  }}
                  render={({ field }) => (
                    <Datepicker
                      {...field}
                      value={field.value ? new Date(field.value) : null}
                      onChange={(date) => {
                        field.onChange(date ? new Date(date).toISOString() : '') // Date -> string ISO
                      }}
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
              </div> */}
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
        )}
      {openEditFileAvatar && (
        <EditImage
          url={previewAvatar}
          setPreview={setPreviewAvatar}
          setFile={setFileAvatar}
          setOpen={setOpenEditFileAvatar}
          handleClose={handleCloseEditFileAvatar}
        />
      )}
      {openEditFileHeader && (
        <EditImage
          url={previewHeader}
          setPreview={setPreviewHeader}
          setFile={setFileHeader}
          setOpen={setOpenEditFileHeader}
          handleClose={handleCloseEditFileHeader}
          aspect={28 / 9}
        />
      )}
    </>
  )
}
