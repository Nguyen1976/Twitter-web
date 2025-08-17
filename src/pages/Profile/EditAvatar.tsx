import { Button } from 'flowbite-react'
import React, { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import Popup from '~/components/Popup'
import { getCroppedImg } from '~/utils/getCroppedImg'

interface EditAvatarProps {
  url: string
  setPreview: (url: string) => void
  setFile: (file: File) => void
  onClose: () => void
  aspect?: number
}

export default function EditAvatar({ url, setPreview, setFile, onClose, aspect = 1 }: EditAvatarProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleSave = async () => {
    if (croppedAreaPixels) {
      const croppedFile = await getCroppedImg(url, croppedAreaPixels)
      setFile(croppedFile)
      setPreview(URL.createObjectURL(croppedFile))
      onClose()
    }
  }

  //onclose là đóng popup này lại và đồng thời trả về ảnh đã được chỉnh sửa
  return (
    <>
      <Popup onNavigate={onClose} type='back'>
        <div className='w-full h-[300px] relative'>
          <Cropper
            image={url} //lấy mỗi link thay vì blob
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className='flex items-center justify-end'>
          <Button pill className='dark:!bg-white dark:!text-black font-bold' onClick={handleSave}>
            Save
          </Button>
        </div>
      </Popup>
    </>
  )
}
